import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider } from '../context/LanguageContext';
import Gallery from '../Components/Gallery';

function renderGallery() {
  return render(
    <LanguageProvider>
      <Gallery />
    </LanguageProvider>
  );
}

describe('Gallery', () => {
  it('renders 6 gallery images', () => {
    renderGallery();
    const buttons = screen.getAllByRole('button', { name: /view:/i });
    expect(buttons).toHaveLength(6);
  });

  it('opens lightbox when an image is clicked', () => {
    renderGallery();
    fireEvent.click(screen.getAllByRole('button', { name: /view:/i })[0]);
    expect(screen.getByAltText('Gallery preview')).toBeInTheDocument();
  });

  it('lightbox shows the correct image src', () => {
    renderGallery();
    fireEvent.click(screen.getAllByRole('button', { name: /view: barber at work/i })[0]);
    const preview = screen.getByAltText('Gallery preview') as HTMLImageElement;
    expect(preview.src).toContain('barber-action-shot.jpeg');
  });

  it('closes lightbox when the close button is clicked', () => {
    renderGallery();
    fireEvent.click(screen.getAllByRole('button', { name: /view:/i })[0]);
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(screen.queryByAltText('Gallery preview')).not.toBeInTheDocument();
  });

  it('closes lightbox when the backdrop is clicked', () => {
    renderGallery();
    fireEvent.click(screen.getAllByRole('button', { name: /view:/i })[0]);
    // Click the backdrop div (parent of the image)
    const backdrop = screen.getByAltText('Gallery preview').parentElement!;
    fireEvent.click(backdrop);
    expect(screen.queryByAltText('Gallery preview')).not.toBeInTheDocument();
  });
});
