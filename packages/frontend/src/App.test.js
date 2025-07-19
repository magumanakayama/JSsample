import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders Users link', () => {
    render(<App />);
    const linkElement = screen.getByText(/Users/i);
    expect(linkElement).toBeInTheDocument();
  });
});