import { useMemo, useState } from 'react';
import './App.css';

const collaborationOptions = [
  {
    title: 'Brand Story Sprint',
    label: 'Fast-moving startup',
    detail: 'Pair your next launch with a design-led creator strategy in 7 days.',
  },
  {
    title: 'Creator Match Lab',
    label: 'Community-led growth',
    detail: 'Discover niche collaborators whose audience aligns with your product.',
  },
  {
    title: 'Revenue Amplifier',
    label: 'Commerce-ready',
    detail: 'Turn audience trust into launches, bundles, and sponsor-ready moments.',
  },
];

function LandingPage() {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', goal: '' });

  const submissionHint = useMemo(() => {
    if (!formData.name && !formData.email) {
      return 'Start a collaboration';
    }
    return `Ready to shape ${formData.goal || 'your next launch'}`;
  }, [formData.email, formData.goal, formData.name]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  return (
    <div className="landing-shell">
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark">C</div>
          <span className="brand-name">CollabCraft</span>
        </div>

        <nav className="nav-links" aria-label="Primary navigation">
          <a href="#discover">Discover</a>
          <a href="#for-creators">For creators</a>
          <a href="#insights">Insights</a>
        </nav>

        <div className="topbar-actions">
          <div className="user-badge">AL</div>
          <button className="ghost-btn" type="button">Log out</button>
        </div>
      </header>

      {bannerVisible && (
        <div className="announcement-banner" role="status">
          <span>New: Weekly creator-intent signals now available for premium teams.</span>
          <button onClick={() => setBannerVisible(false)} aria-label="Dismiss announcement" type="button">
            ×
          </button>
        </div>
      )}

      <main className="hero-section">
        <section className="hero-copy">
          <p className="eyebrow">Creator-business orchestration</p>
          <h1>Where visionary creators and modern brands build momentum together.</h1>
          <p className="hero-text">
            Match with aligned partners, launch collaborative campaigns, and turn audience trust into measurable growth.
          </p>
          <div className="cta-row">
            <button className="primary-btn" type="button">Book a demo</button>
            <button className="secondary-btn" type="button">View opportunities</button>
          </div>

          <form className="lead-form" onSubmit={(event) => event.preventDefault()}>
            <h2>Start a collaboration</h2>
            <p className="form-caption">{submissionHint}</p>
            <label>
              <span>Name</span>
              <input name="name" value={formData.name} onChange={handleChange} placeholder="Ava Chen" />
            </label>
            <label>
              <span>Email</span>
              <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="ava@brand.com" />
            </label>
            <label>
              <span>What are you building?</span>
              <textarea name="goal" value={formData.goal} onChange={handleChange} placeholder="Launch a creator-led campaign for our next product drop." />
            </label>
            <button className="primary-btn full-width" type="submit">Request access</button>
          </form>
        </section>

        <aside className="opportunity-panel" aria-label="Example opportunities">
          <div className="panel-header">
            <p className="eyebrow">Live opportunities</p>
            <h2>High-fit collaborations</h2>
          </div>
          <div className="card-list">
            {collaborationOptions.map((item) => (
              <article className="opportunity-card" key={item.title}>
                <span className="tag">{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </aside>
      </main>
    </div>
  );
}

function App() {
  return <LandingPage />;
}

export default App;
