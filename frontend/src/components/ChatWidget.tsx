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

function parseMarkdown(text: string): string {
  let html = text
  // Headings
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  // Bold
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  // Unordered lists
  html = html.replace(/^[\-\*] (.+)$/gm, '<li>$1</li>')
  html = html.replace(/((?:<li>.*<\/li>\n?)+)/g, '<ul>$1</ul>')
  // Ordered lists
  html = html.replace(/^\d+\. (.+)$/gm, '<li>$1</li>')
  // Paragraphs
  html = html.split('\n\n').map(block => {
    const trimmed = block.trim()
    if (!trimmed) return ''
    if (trimmed.startsWith('<h') || trimmed.startsWith('<ul') || trimmed.startsWith('<ol')) return trimmed
    if (trimmed.startsWith('<li>')) return `<ul>${trimmed}</ul>`
    return `<p>${trimmed}</p>`
  }).join('')
  // Clean up
  html = html.replace(/<p><\/p>/g, '')
  return html
}

export default function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [showWelcome, setShowWelcome] = useState(true)
  const messagesRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const scrollToBottom = useCallback(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isStreaming) return

    setShowWelcome(false)
    const userMsg: Message = { role: 'user', content: content.trim() }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setIsStreaming(true)

    // Build history (last 20 messages)
    const history = newMessages.slice(-20).map(m => ({
      role: m.role,
      content: m.content,
    }))

    try {
      const response = await fetch('/api/chat', {
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

      // Add empty assistant message
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
              if (parsed.text) {
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
          content: 'I apologize, but I\'m unable to connect right now. Please try again later or [schedule a call](https://outlook.office.com/book/DHWWebsiteMeeting@digitalhealthworks.com/) with our team directly.',
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

  return (
    <div className="chat-widget">
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>
            </svg>
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
