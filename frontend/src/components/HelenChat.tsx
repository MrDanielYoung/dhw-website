import { useState, useRef, useEffect, useCallback } from 'react'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

const STARTER_PROMPTS = [
  { icon: '🏥', text: 'How do I enter the US hospital market with a new medical device?' },
  { icon: '💰', text: 'What reimbursement strategies work for digital health products?' },
  { icon: '📋', text: 'How do I move from a pilot to a commercial contract?' },
  { icon: '🔬', text: 'What does a go-to-market plan look like for a SaMD product?' },
]

const BOOKING_URL = 'https://outlook.office.com/book/DHWWebsiteMeeting@digitalhealthworks.com/'

const VENTURE_STAGES = [
  'Pre-CE/FDA',
  'Cleared, Pre-Commercial',
  'Actively Commercializing',
  'Scaling',
]

const TARGET_MARKETS = ['US', 'EU', 'UK', 'US + EU', 'Global', 'Other']

function parseMarkdown(text: string): string {
  let html = text
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  html = html.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>')
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
  html = html.split('\n\n').map(block => {
    const trimmed = block.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol')) return trimmed
    if (trimmed.startsWith('<li>')) return `<ul>${trimmed}</ul>`
    return `<p>${trimmed}</p>`
  }).join('')
  html = html.replace(/<p><\/p>/g, '')
  return html
}

export default function HelenChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [bookingSubmitted, setBookingSubmitted] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)
  const [exportLoading, setExportLoading] = useState(false)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Booking form state
  const [bookingName, setBookingName] = useState('')
  const [bookingEmail, setBookingEmail] = useState('')
  const [bookingCompany, setBookingCompany] = useState('')
  const [bookingProduct, setBookingProduct] = useState('')
  const [bookingStage, setBookingStage] = useState('')
  const [bookingMarkets, setBookingMarkets] = useState('')

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, showBookingForm, scrollToBottom])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return

    setShowWelcome(false)
    const userMsg: Message = { role: 'user', content: content.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setIsStreaming(true)

    const history = newMessages.slice(-20).map(m => ({
      role: m.role,
      content: m.content,
    }))

    try {
      const response = await fetch('/api/helen/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!response.ok) throw new Error('Chat request failed')

      const reader = response.body?.getReader()
      if (!reader) throw new Error('No reader available')

      const decoder = new TextDecoder()
      let assistantContent = ''
      let buffer = ''

      setMessages(prev => [...prev, { role: 'assistant', content: '' }])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''

        for (const line of lines) {
          const trimmed = line.trim()
          if (trimmed.startsWith('data: ')) {
            const data = trimmed.slice(6)
            if (data === '[DONE]') continue
            try {
              const parsed = JSON.parse(data)
              if (parsed.error) {
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: `I apologize, but something went wrong. Please try again or [schedule a call](${BOOKING_URL}) with our team directly.`,
                  }
                  return updated
                })
              } else if (parsed.text) {
                assistantContent += parsed.text
                setMessages(prev => {
                  const updated = [...prev]
                  updated[updated.length - 1] = {
                    role: 'assistant',
                    content: assistantContent,
                  }
                  return updated
                })
              }
            } catch {
              // Ignore parse errors for incomplete chunks
            }
          }
        }
      }
    } catch (err) {
      console.error('Chat error:', err)
      setMessages(prev => [
        ...prev.filter(m => !(m.role === 'assistant' && m.content === '')),
        {
          role: 'assistant',
          content: `I apologize, but I'm unable to connect right now. Please try again later or [schedule a call](${BOOKING_URL}) with our team directly.`,
        },
      ])
    } finally {
      setIsStreaming(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(input)
    }
  }

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!bookingName || !bookingEmail || !bookingCompany) return
    setBookingLoading(true)

    try {
      await fetch('/api/helen/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: bookingName,
          email: bookingEmail,
          company: bookingCompany,
          product_description: bookingProduct || undefined,
          venture_stage: bookingStage || undefined,
          target_markets: bookingMarkets || undefined,
          messages: messages.map(m => ({ role: m.role, content: m.content })),
        }),
      })
      setBookingSubmitted(true)
      setShowBookingForm(false)

      // Add a confirmation message from Helen
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `I've passed your details to Daniel and Romy — they'll review what we've discussed and come prepared.\n\n**[Book your 30-minute call here](${BOOKING_URL})** — pick a time that works and they'll confirm.\n\nYou'll hear from them within one business day.`,
        },
      ])
    } catch (err) {
      console.error('Booking error:', err)
    } finally {
      setBookingLoading(false)
    }
  }

  const handleExport = async () => {
    if (messages.length === 0) return
    setExportLoading(true)

    try {
      const response = await fetch('/api/helen/talking-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages.map(m => ({ role: m.role, content: m.content })),
          contact_name: bookingName || undefined,
          contact_email: bookingEmail || undefined,
          company_name: bookingCompany || undefined,
          product_description: bookingProduct || undefined,
          venture_stage: bookingStage || undefined,
          target_markets: bookingMarkets || undefined,
        }),
      })
      const data = await response.json()
      if (data.talking_points) {
        const blob = new Blob([data.talking_points], { type: 'text/plain' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = `DHW_TalkingPoints_${new Date().toISOString().split('T')[0]}.txt`
        a.click()
        URL.revokeObjectURL(url)
      }
    } catch (err) {
      console.error('Export error:', err)
    } finally {
      setExportLoading(false)
    }
  }

  const hasMessages = messages.length > 0

  return (
    <div className="chat-widget helen-chat">
      {/* Toolbar — shown after messages start */}
      {hasMessages && (
        <div className="helen-chat__toolbar">
          <button
            className="helen-chat__tool-btn"
            onClick={handleExport}
            disabled={exportLoading}
            title="Export talking points"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            {exportLoading ? 'Exporting...' : 'Export'}
          </button>
          {!bookingSubmitted && (
            <button
              className="helen-chat__tool-btn helen-chat__tool-btn--accent"
              onClick={() => setShowBookingForm(!showBookingForm)}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              Book a call
            </button>
          )}
        </div>
      )}

      <div className="chat-widget__messages" ref={messagesRef}>
        {showWelcome ? (
          <div className="chat-widget__welcome">
            <div className="chat-widget__welcome-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
              </svg>
            </div>
            <h3 className="chat-widget__welcome-title">Commercialization Advisor</h3>
            <p className="chat-widget__welcome-desc">
              Ask about market entry, reimbursement, sales strategy, or any medical device commercialization topic.
            </p>
            <div className="chat-widget__starters">
              {STARTER_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  className="chat-widget__starter"
                  onClick={() => sendMessage(prompt.text)}
                >
                  <span className="chat-widget__starter-icon">{prompt.icon}</span>
                  <span className="chat-widget__starter-text">{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg chat-msg--${msg.role}`}>
                <div className="chat-msg__bubble">
                  {msg.role === 'assistant' ? (
                    msg.content ? (
                      <div
                        className="chat-msg__content"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
                      />
                    ) : (
                      <div className="chat-msg__typing">
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    )
                  ) : (
                    <div className="chat-msg__content"><p>{msg.content}</p></div>
                  )}
                </div>
              </div>
            ))}

            {/* Inline booking form */}
            {showBookingForm && (
              <div className="helen-chat__booking-form">
                <h4 className="helen-chat__form-title">Book a call with Daniel & Romy</h4>
                <p className="helen-chat__form-desc">
                  Quick details so the team can prepare for your conversation.
                </p>
                <form onSubmit={handleBookingSubmit}>
                  <div className="helen-chat__form-grid">
                    <input
                      type="text"
                      placeholder="Your name *"
                      value={bookingName}
                      onChange={e => setBookingName(e.target.value)}
                      required
                      className="helen-chat__form-input"
                    />
                    <input
                      type="email"
                      placeholder="Email *"
                      value={bookingEmail}
                      onChange={e => setBookingEmail(e.target.value)}
                      required
                      className="helen-chat__form-input"
                    />
                    <input
                      type="text"
                      placeholder="Company *"
                      value={bookingCompany}
                      onChange={e => setBookingCompany(e.target.value)}
                      required
                      className="helen-chat__form-input"
                    />
                    <input
                      type="text"
                      placeholder="Product (one sentence)"
                      value={bookingProduct}
                      onChange={e => setBookingProduct(e.target.value)}
                      className="helen-chat__form-input"
                    />
                    <select
                      value={bookingStage}
                      onChange={e => setBookingStage(e.target.value)}
                      className="helen-chat__form-input"
                    >
                      <option value="">Venture stage</option>
                      {VENTURE_STAGES.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <select
                      value={bookingMarkets}
                      onChange={e => setBookingMarkets(e.target.value)}
                      className="helen-chat__form-input"
                    >
                      <option value="">Target markets</option>
                      {TARGET_MARKETS.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))}
                    </select>
                  </div>
                  <div className="helen-chat__form-actions">
                    <button
                      type="button"
                      className="helen-chat__form-cancel"
                      onClick={() => setShowBookingForm(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="helen-chat__form-submit"
                      disabled={bookingLoading || !bookingName || !bookingEmail || !bookingCompany}
                    >
                      {bookingLoading ? 'Submitting...' : 'Submit & book'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>

      <div className="chat-widget__input-area">
        <form onSubmit={handleSubmit} className="chat-widget__input-wrap">
          <textarea
            ref={inputRef}
            className="chat-widget__input"
            placeholder="Ask about commercialization strategy..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={isStreaming}
          />
          <button
            type="submit"
            className="chat-widget__send"
            disabled={!input.trim() || isStreaming}
            aria-label="Send message"
          >
            {isStreaming ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="helen-chat__spinner">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>
              </svg>
            )}
          </button>
        </form>
        <p className="chat-widget__disclaimer">
          AI advisor — not a substitute for professional consulting.{' '}
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer">Schedule a call</a> for tailored guidance.
        </p>
      </div>
    </div>
  )
}
