import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LanguageProvider } from '../context/LanguageContext';
import Booking from '../Components/Booking';

vi.mock('../lib/n8n', () => ({
  submitAppointment: vi.fn(),
}));

import { submitAppointment } from '../lib/n8n';
const mockSubmit = submitAppointment as ReturnType<typeof vi.fn>;

function renderBooking(selectedService = '') {
  return render(
    <LanguageProvider>
      <Booking selectedService={selectedService} />
    </LanguageProvider>
  );
}

async function fillForm() {
  await userEvent.type(screen.getByLabelText(/full name/i), 'John Doe');
  await userEvent.type(screen.getByLabelText(/^phone/i), '+351900000000');
  await userEvent.type(screen.getByLabelText(/^email/i), 'john@example.com');
  fireEvent.change(screen.getByLabelText(/^date/i), { target: { value: '2026-06-15' } });
  fireEvent.change(screen.getByLabelText(/^time/i), { target: { value: '10:00' } });
  fireEvent.change(screen.getByLabelText(/^service/i), { target: { value: 'Full Haircut' } });
}

describe('Booking', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all required form fields', () => {
    renderBooking();
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^phone/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^service/i)).toBeInTheDocument();
  });

  it('pre-fills the service dropdown when selectedService prop is provided', () => {
    renderBooking('Haircut + Beard');
    const serviceSelect = screen.getByLabelText(/^service/i) as HTMLSelectElement;
    expect(serviceSelect.value).toBe('Haircut + Beard');
  });

  it('updates service when selectedService prop changes', () => {
    const { rerender } = renderBooking('');
    rerender(
      <LanguageProvider>
        <Booking selectedService="Kids Haircut" />
      </LanguageProvider>
    );
    const serviceSelect = screen.getByLabelText(/^service/i) as HTMLSelectElement;
    expect(serviceSelect.value).toBe('Kids Haircut');
  });

  it('shows success state after successful submission', async () => {
    mockSubmit.mockResolvedValueOnce(undefined);
    renderBooking();
    await fillForm();

    fireEvent.click(screen.getByRole('button', { name: /confirm appointment/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /book another/i })).toBeInTheDocument();
    });
  });

  it('resets form after successful submission and clicking Book Another', async () => {
    mockSubmit.mockResolvedValueOnce(undefined);
    renderBooking();
    await fillForm();

    fireEvent.click(screen.getByRole('button', { name: /confirm appointment/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /book another/i })).toBeInTheDocument();
    });

    fireEvent.click(screen.getByRole('button', { name: /book another/i }));

    const nameInput = screen.getByLabelText(/full name/i) as HTMLInputElement;
    expect(nameInput.value).toBe('');
  });

  it('shows error message when submission fails', async () => {
    mockSubmit.mockRejectedValueOnce(new Error('Network error'));
    renderBooking();
    await fillForm();

    fireEvent.click(screen.getByRole('button', { name: /confirm appointment/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });
  });

  it('disables submit button while loading', async () => {
    let resolveSubmit!: () => void;
    mockSubmit.mockReturnValueOnce(new Promise<void>((res) => { resolveSubmit = res; }));
    renderBooking();
    await fillForm();

    fireEvent.click(screen.getByRole('button', { name: /confirm appointment/i }));

    expect(screen.getByRole('button', { name: /sending/i })).toBeDisabled();
    resolveSubmit();
  });

  it('calls submitAppointment with correct payload', async () => {
    mockSubmit.mockResolvedValueOnce(undefined);
    renderBooking();
    await fillForm();

    fireEvent.click(screen.getByRole('button', { name: /confirm appointment/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'John Doe',
        phone: '+351900000000',
        email: 'john@example.com',
        appointment_date: '2026-06-15',
        appointment_time: '10:00',
        service: 'Full Haircut',
        message: '',
      });
    });
  });
});
