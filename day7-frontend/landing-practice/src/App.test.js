import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the landing page hero and lead form', () => {
  render(<App />);
  expect(screen.getByText(/where visionary creators/i)).toBeInTheDocument();
  expect(screen.getByRole('button', { name: /book a demo/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /start a collaboration/i })).toBeInTheDocument();
});
