import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';
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

function TopBar() {
  return (
    <header className="topbar">
      <div className="brand-block">
        <div className="brand-mark">C</div>
        <span className="brand-name">CollabCraft</span>
      </div>

      <nav className="nav-links" aria-label="Primary navigation">
        <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/">
          Home
        </NavLink>
        <NavLink className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')} to="/opportunities">
          Opportunities
        </NavLink>
      </nav>

      <div className="topbar-actions">
        <div className="user-badge">AL</div>
        <button className="ghost-btn" type="button">Log out</button>
      </div>
    </header>
  );
}

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
      <TopBar />

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
            <Link className="secondary-btn" to="/opportunities">
              View opportunities
            </Link>
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

function OpportunitiesList() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadOpportunities = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL || 'https://jsonplaceholder.typicode.com'}/posts`);
        if (!response.ok) {
          throw new Error('Unable to fetch opportunities');
        }

        const data = await response.json();
        if (!active) {
          return;
        }

        setOpportunities(Array.isArray(data) ? data.slice(0, 6) : []);
      } catch (err) {
        if (!active) {
          return;
        }

        setError('We could not load opportunities right now. Please try again in a moment.');
        setOpportunities([]);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadOpportunities();

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="landing-shell opportunities-page">
      <TopBar />

      <main className="opportunities-layout">
        <section className="opportunities-intro">
          <p className="eyebrow">Live pipeline</p>
          <h1>Explore fresh collaboration opportunities from the community feed.</h1>
          <p className="hero-text">
            Each card below is pulled from the API so you can see how the list behaves as data arrives and when states change.
          </p>
        </section>

        <section className="opportunities-panel" aria-label="Opportunities list">
          {loading && <div className="state-card">Loading opportunities...</div>}
          {!loading && error && <div className="state-card error-state">{error}</div>}
          {!loading && !error && opportunities.length === 0 && <div className="state-card">No opportunities found</div>}
          {!loading && !error && opportunities.length > 0 && (
            <div className="card-list opportunities-grid">
              {opportunities.map((opportunity) => (
                <article className="opportunity-card" key={opportunity.id}>
                  <span className="tag">Post #{opportunity.id}</span>
                  <h3>{opportunity.title}</h3>
                  <p>{opportunity.body}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/opportunities" element={<OpportunitiesList />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
