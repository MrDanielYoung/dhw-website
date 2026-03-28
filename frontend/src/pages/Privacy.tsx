export default function Privacy() {
  const clearCookies = () => {
    try {
      localStorage.removeItem('dhw-cookies')
      window.location.reload()
    } catch {}
  }

  return (
    <main id="main">
      <section className="page-hero">
        <div className="page-hero__content">
          <p className="page-hero__label">Legal</p>
          <h1 className="page-hero__title">Privacy Policy</h1>
          <p className="page-hero__subtitle">Our commitment to your privacy.</p>
        </div>
      </section>

      <article className="section article-body">
        <div className="container container--narrow">
          <div className="article-body__content">
            <p><strong>Last updated:</strong> March 28, 2026</p>

            <p>
              Welcome to the Digital Health Works website (the "Site"). Digital Health Works is operated by two affiliated companies: <strong>Digital Health Works Inc.</strong> (a U.S. company) and <strong>Digital Health Works Europe GmbH (fka Bold Works GmbH)</strong>, a company registered in Germany.
            </p>
            <p>
              Digital Health Works Inc. is responsible for the Site for users outside the European Union (EU), while Digital Health Works Europe GmbH is responsible for users in the EU, UK, Switzerland, Norway, and related jurisdictions. In this Privacy Policy, "Digital Health Works", "we", "us" or "our" refers to both of these entities.
            </p>
            <p>
              This Policy explains how we collect, use, disclose, and protect your personal information when you use <a href="https://digitalhealthworks.com">digitalhealthworks.com</a> and related services.
            </p>
            <p>
              We are committed to protecting your privacy in compliance with applicable data protection laws, including the EU General Data Protection Regulation (GDPR) and relevant U.S. privacy laws.
            </p>

            <h2>Information We Collect</h2>
            <p>
              We do not require you to create an account or provide personal information to browse our Site. You can generally visit our Site without telling us who you are. We only collect personal information that you voluntarily provide or that is collected automatically through tools we use, as detailed below:
            </p>

            <h3>Information You Provide (Contact Form Data)</h3>
            <p>
              If you choose to contact us via our online form (powered by Pipedrive), we will collect the personal information you provide, such as your name, email address, company/organization, and any details you include in your message. We use this information solely to respond to your inquiry or request. Providing this information is completely voluntary. We ask that you do not include sensitive personal information (e.g. health, financial, or account passwords) in the contact form.
            </p>

            <h3>Information Collected Automatically (Usage Data)</h3>
            <p>
              When you visit our Site and accept cookies, we collect certain technical data about your visit through Google Analytics. This includes information like your browser type, device type, operating system, referral source, pages you visit, the date and time of each page request, and the time spent on our pages. This information helps us understand how visitors use our Site and enables us to improve its performance and content.
            </p>

            <h3>AI Advisor ("Meet Helen")</h3>
            <p>
              Our AI-powered advisor uses Anthropic's Claude to provide general commercialization guidance. Conversations are processed in real-time and are not stored on our servers after your session ends. We do not use your conversations to train AI models. See <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">Anthropic's Privacy Policy</a> for details on their data handling.
            </p>

            <h2>Cookies and Consent</h2>
            <p>
              Our site uses a consent-based approach to cookies and tracking. <strong>By default, no third-party tracking scripts are loaded.</strong> When you first visit our site, you will see a cookie consent banner with two options: Accept or Decline.
            </p>

            <h3>If You Accept Cookies</h3>
            <p>We load the following services:</p>
            <ul>
              <li><strong>Google Analytics (GA4):</strong> Collects anonymized usage data — pages visited, time on site, device type, approximate geographic region. Google Analytics may anonymize IP addresses (especially for EU users). Google acts as our data processor for analytics. See <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.</li>
              <li><strong>Pipedrive LeadBooster:</strong> A contact form and chat widget. Data you voluntarily submit (name, email, message) is stored in our Pipedrive CRM. See <a href="https://www.pipedrive.com/en/privacy" target="_blank" rel="noopener noreferrer">Pipedrive's Privacy Policy</a>.</li>
            </ul>

            <h3>If You Decline Cookies</h3>
            <p>
              No tracking scripts are loaded. No cookies are set by third parties. We store only your consent preference in your browser's localStorage so we don't ask again on every visit.
            </p>

            <h3>Cookies and Local Storage We Use</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 'var(--space-6)' }}>
              <thead>
                <tr style={{ textAlign: 'left', borderBottom: '2px solid var(--color-divider)' }}>
                  <th style={{ padding: 'var(--space-3)', color: 'var(--color-text)', fontWeight: 600 }}>Name</th>
                  <th style={{ padding: 'var(--space-3)', color: 'var(--color-text)', fontWeight: 600 }}>Purpose</th>
                  <th style={{ padding: 'var(--space-3)', color: 'var(--color-text)', fontWeight: 600 }}>Type</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--color-divider)' }}>
                  <td style={{ padding: 'var(--space-3)' }}><code>dhw-cookies</code></td>
                  <td style={{ padding: 'var(--space-3)' }}>Stores your cookie consent choice (accepted/declined)</td>
                  <td style={{ padding: 'var(--space-3)' }}>localStorage (persistent)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-divider)' }}>
                  <td style={{ padding: 'var(--space-3)' }}><code>dhw-theme</code></td>
                  <td style={{ padding: 'var(--space-3)' }}>Stores your dark/light mode preference</td>
                  <td style={{ padding: 'var(--space-3)' }}>localStorage (persistent)</td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--color-divider)' }}>
                  <td style={{ padding: 'var(--space-3)' }}><code>_ga</code>, <code>_ga_*</code></td>
                  <td style={{ padding: 'var(--space-3)' }}>Google Analytics — only set if you accept cookies</td>
                  <td style={{ padding: 'var(--space-3)' }}>Cookie (2 years)</td>
                </tr>
              </tbody>
            </table>

            <h2>How We Use Your Information</h2>
            <ul>
              <li><strong>To Respond to Your Inquiries:</strong> If you contact us through the Site, we use your provided information to communicate with you and respond to your inquiry. We will not use your contact information for unrelated marketing without your permission.</li>
              <li><strong>For Analytics and Site Improvement:</strong> We use aggregated data about visits to understand how our Site is used and to improve its content, layout, and performance.</li>
              <li><strong>To Secure and Maintain our Site:</strong> We may use information like IP addresses and browser data to protect our website against malicious activity and ensure its integrity.</li>
              <li><strong>To Comply with Legal Obligations:</strong> If required by law, we may retain or disclose certain information to satisfy legal requirements.</li>
            </ul>
            <p>
              We will <strong>not</strong> use your personal information for purposes other than those described above without your permission. We do not use your data for third-party marketing or advertising, and we do not sell your personal information.
            </p>

            <h2>Legal Bases for Processing (GDPR)</h2>
            <p>For individuals in the EEA, UK, Switzerland, or similar jurisdictions:</p>
            <ul>
              <li><strong>Consent (Art. 6(1)(a) GDPR):</strong> We rely on consent for non-essential cookies and analytics tracking. You provide consent when you click "Accept cookies" in our banner, and when you voluntarily submit information through our contact form. You may withdraw consent at any time.</li>
              <li><strong>Legitimate Interests (Art. 6(1)(f) GDPR):</strong> We process certain data based on our legitimate interests in understanding how our Site is used, improving our services, and communicating with individuals who have shown interest in our offerings.</li>
              <li><strong>Contractual Necessity (Art. 6(1)(b) GDPR):</strong> If you contact us about our services, processing your information may be necessary as a pre-contractual step at your request.</li>
              <li><strong>Legal Obligation (Art. 6(1)(c) GDPR):</strong> We may process or retain data to comply with legal obligations such as accounting or tax requirements.</li>
            </ul>

            <h2>How We Share Information</h2>
            <p>
              We <strong>do not sell</strong> your personal information to third parties. We only share information in limited circumstances:
            </p>
            <ul>
              <li><strong>Service Providers:</strong> We use Pipedrive (CRM and contact forms), Google Analytics (website analytics), and Anthropic (AI advisor). These providers act as data processors under our direction and are bound by contractual obligations to protect your information.</li>
              <li><strong>Legal Requirements:</strong> We may disclose information if required by law, court order, or to protect our rights and the safety of our users.</li>
              <li><strong>Business Transfers:</strong> If Digital Health Works undergoes a merger or acquisition, user information may be transferred to the successor entity with equivalent privacy protections.</li>
            </ul>

            <h2>International Data Transfers</h2>
            <p>
              Digital Health Works operates in both the United States and Europe. Your personal information may be transferred to, stored in, or accessed from jurisdictions outside your own. Our service providers (Google, Pipedrive, Anthropic) may process data in the United States.
            </p>
            <p>
              For EU/EEA users, transfers to the US are protected by Standard Contractual Clauses (SCCs) and/or the EU-US Data Privacy Framework, as applicable. We ensure all international transfers comply with GDPR requirements.
            </p>

            <h2>Data Retention</h2>
            <ul>
              <li><strong>Contact form data:</strong> Retained as long as needed to respond to your inquiry and manage the business relationship. You may request deletion at any time.</li>
              <li><strong>Analytics data:</strong> Retained according to Google's default settings (14 months). Pipedrive CRM data is periodically reviewed and purged.</li>
              <li><strong>Server logs:</strong> Kept for a short duration (typically a few weeks) for performance monitoring and security.</li>
            </ul>

            <h2>Your Rights</h2>

            <h3>EU/EEA/UK Residents (GDPR)</h3>
            <p>You have the right to:</p>
            <ul>
              <li><strong>Access</strong> the personal data we hold about you</li>
              <li><strong>Rectify</strong> inaccurate or incomplete data</li>
              <li><strong>Erase</strong> your data ("right to be forgotten")</li>
              <li><strong>Restrict</strong> processing in certain circumstances</li>
              <li><strong>Data portability</strong> — receive your data in a structured, machine-readable format</li>
              <li><strong>Object</strong> to processing based on legitimate interests</li>
              <li><strong>Withdraw consent</strong> at any time without affecting prior processing</li>
              <li><strong>Lodge a complaint</strong> with your local data protection authority</li>
            </ul>

            <h3>California Residents (CCPA/CPRA)</h3>
            <p>
              While our primary business is B2B, we honor the spirit of California privacy laws. You have rights to know, access, delete, and correct your personal information. We do not sell personal information or share it for cross-context behavioral advertising.
            </p>

            <h3>How to Exercise Your Rights</h3>
            <p>
              Contact us at <a href="mailto:hello@digitalhealthworks.com">hello@digitalhealthworks.com</a> with your request. We will respond within the timeframe required by law (generally within one month for GDPR).
            </p>

            <h2>Withdraw Cookie Consent</h2>
            <p>
              You can withdraw your cookie consent at any time. This will reset your preference and the consent banner will appear again on your next visit.
            </p>
            <button
              onClick={clearCookies}
              className="cookie-banner__btn cookie-banner__btn--decline"
              style={{ marginTop: 'var(--space-2)' }}
            >
              Reset cookie preferences
            </button>

            <h2>Children's Privacy</h2>
            <p>
              Our Site is not directed at children under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have inadvertently collected personal data from a child, we will take steps to delete it.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this policy from time to time. Material changes will be noted with an updated "Last updated" date at the top of this page. We encourage you to review this policy periodically.
            </p>

            <h2>Contact Us</h2>
            <p>
              <strong>Digital Health Works Inc. (U.S.):</strong><br />
              82 Wendell Avenue, Suite 100, Pittsfield, MA 01201<br />
              Email: <a href="mailto:hello@digitalhealthworks.com">hello@digitalhealthworks.com</a>
            </p>
            <p>
              <strong>Digital Health Works Europe GmbH (fka Bold Works GmbH):</strong><br />
              Torstraße 99, 10119 Berlin, Germany<br />
              Email: <a href="mailto:hallo@boldworks.de">hallo@boldworks.de</a>
            </p>
          </div>
        </div>
      </article>
    </main>
  )
}
