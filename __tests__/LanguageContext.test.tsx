import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '../context/LanguageContext';

function LangDisplay() {
  const { lang, setLang } = useLanguage();
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <button onClick={() => setLang('pt')}>Set PT</button>
      <button onClick={() => setLang('en')}>Set EN</button>
    </div>
  );
}

describe('LanguageContext', () => {
  it('defaults to English', () => {
    render(
      <LanguageProvider>
        <LangDisplay />
      </LanguageProvider>
    );
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });

  it('switches to Portuguese when setLang("pt") is called', () => {
    render(
      <LanguageProvider>
        <LangDisplay />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText('Set PT'));
    expect(screen.getByTestId('lang')).toHaveTextContent('pt');
  });

  it('switches back to English from Portuguese', () => {
    render(
      <LanguageProvider>
        <LangDisplay />
      </LanguageProvider>
    );
    fireEvent.click(screen.getByText('Set PT'));
    fireEvent.click(screen.getByText('Set EN'));
    expect(screen.getByTestId('lang')).toHaveTextContent('en');
  });
});
