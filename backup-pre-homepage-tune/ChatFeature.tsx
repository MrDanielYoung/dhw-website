import ChatWidget from './ChatWidget'

export default function ChatFeature() {
  return (
    <section className="section chat-feature" id="advisor">
      <div className="container">
        <div className="chat-feature__grid">
          <div className="chat-feature__intro fade-in">
            <div className="chat-feature__badge">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a4 4 0 0 0-4 4v2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V10a2 2 0 0 0-2-2h-2V6a4 4 0 0 0-4-4z"/></svg>
              AI-Powered
            </div>
            <h2 className="chat-feature__title">Commercialization Advisor</h2>
            <p className="chat-feature__desc">
              Get instant, expert-level guidance on bringing your medical device or digital health product to market. Built on the DHW "Working Backwards from the Invoice" methodology.
            </p>
            <ul className="chat-feature__highlights">
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                US and EU market entry strategy
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                Reimbursement and healthcare market access
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                Hospital sales and procurement navigation
              </li>
              <li>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6 9 17l-5-5"/></svg>
                From pilot to commercial contract
              </li>
            </ul>
          </div>
          <div className="fade-in">
            <ChatWidget />
          </div>
        </div>
      </div>
    </section>
  )
}
