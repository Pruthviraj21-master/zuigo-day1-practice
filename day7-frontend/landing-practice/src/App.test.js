import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('CreatorBridge landing app', () => {
  beforeEach(() => {
    window.history.pushState({}, '', '/');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  test('renders the landing page hero and lead form', () => {
    render(<App />);
    expect(screen.getByText(/where visionary creators/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /book a demo/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /start a collaboration/i })).toBeInTheDocument();
  });

  test('shows an error state when opportunities cannot be loaded', async () => {
    global.fetch = jest.fn().mockRejectedValue(new Error('Network down'));
    window.history.pushState({}, '', '/opportunities');

    render(<App />);

    expect(screen.getByText(/loading opportunities/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(/we could not load opportunities/i)).toBeInTheDocument();
    });
  });
});
