import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { LanguageProvider } from '../context/LanguageContext';
import Hero from '../Components/Hero';

function renderHero() {
  return render(
    <LanguageProvider>
      <Hero />
    </LanguageProvider>
  );
}

describe('Hero', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('renders all 5 dot navigation buttons', () => {
    renderHero();
    const dots = screen.getAllByRole('button', { name: /go to slide/i });
    expect(dots).toHaveLength(5);
  });

  it('first slide is visible on initial render', () => {
    renderHero();
    const slides = document.querySelectorAll('[style]');
    // First image div should have opacity 1
    const firstSlide = slides[0] as HTMLElement;
    expect(firstSlide.style.opacity).toBe('1');
  });

  it('clicking dot 3 jumps to slide 3', () => {
    renderHero();
    fireEvent.click(screen.getByRole('button', { name: /go to slide 3/i }));
    const dots = screen.getAllByRole('button', { name: /go to slide/i });
    // Dot 3 should now have the active width class (w-6)
    expect(dots[2].className).toContain('w-6');
  });

  it('auto-advances the carousel after 5 seconds', () => {
    renderHero();
    const dotsBefore = screen.getAllByRole('button', { name: /go to slide/i });
    expect(dotsBefore[0].className).toContain('w-6');

    act(() => {
      vi.advanceTimersByTime(5600);
    });

    const dotsAfter = screen.getAllByRole('button', { name: /go to slide/i });
    expect(dotsAfter[1].className).toContain('w-6');
  });

  it('scrolls to #booking when Book Appointment is clicked', () => {
    const mockEl = { scrollIntoView: vi.fn() };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockEl as unknown as HTMLElement);

    renderHero();
    fireEvent.click(screen.getByRole('button', { name: /book appointment/i }));

    expect(document.getElementById).toHaveBeenCalledWith('booking');
    expect(mockEl.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('scrolls to #services when View Services is clicked', () => {
    const mockEl = { scrollIntoView: vi.fn() };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockEl as unknown as HTMLElement);

    renderHero();
    fireEvent.click(screen.getByRole('button', { name: /view services/i }));

    expect(document.getElementById).toHaveBeenCalledWith('services');
  });
});
