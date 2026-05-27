import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LanguageProvider } from '../context/LanguageContext';
import Header from '../Components/Header';

function renderHeader() {
  return render(
    <LanguageProvider>
      <Header />
    </LanguageProvider>
  );
}

describe('Header', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true, configurable: true });
  });

  it('renders the logo', () => {
    renderHeader();
    expect(screen.getByAltText('RBOSS BARBER')).toBeInTheDocument();
  });

  it('renders the Book Now button', () => {
    renderHeader();
    expect(screen.getByRole('button', { name: /book now/i })).toBeInTheDocument();
  });

  it('adds scrolled style when window.scrollY exceeds 40', () => {
    renderHeader();
    const header = screen.getByRole('banner');
    expect(header.className).not.toContain('bg-brand-black/95');

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 60, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(header.className).toContain('bg-brand-black/95');
  });

  it('does not add scrolled style when scrollY is below threshold', () => {
    renderHeader();
    const header = screen.getByRole('banner');

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 20, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(header.className).not.toContain('bg-brand-black/95');
  });

  it('toggles mobile menu on hamburger click', () => {
    renderHeader();
    expect(screen.queryByRole('button', { name: /book appointment/i })).not.toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Toggle menu'));
    expect(screen.getByRole('button', { name: /book appointment/i })).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Toggle menu'));
    expect(screen.queryByRole('button', { name: /book appointment/i })).not.toBeInTheDocument();
  });

  it('closes mobile menu when a nav link is clicked', () => {
    renderHeader();
    fireEvent.click(screen.getByLabelText('Toggle menu'));
    const links = screen.getAllByRole('link', { name: /services/i });
    // Click the mobile version (second occurrence)
    fireEvent.click(links[links.length - 1]);
    expect(screen.queryByRole('button', { name: /book appointment/i })).not.toBeInTheDocument();
  });

  it('switches language to PT', () => {
    renderHeader();
    const ptButton = screen.getAllByText('PT')[0];
    fireEvent.click(ptButton);
    // Nav label should change to Portuguese
    expect(screen.getByText('Serviços')).toBeInTheDocument();
  });

  it('scrolls to #booking when Book Now is clicked', () => {
    const mockBookingEl = { scrollIntoView: vi.fn() };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockBookingEl as unknown as HTMLElement);

    renderHeader();
    fireEvent.click(screen.getByRole('button', { name: /book now/i }));

    expect(document.getElementById).toHaveBeenCalledWith('booking');
    expect(mockBookingEl.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
    vi.restoreAllMocks();
  });
});
