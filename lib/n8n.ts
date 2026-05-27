const webhookUrl = import.meta.env.VITE_N8N_WEBHOOK_URL as string | undefined;

export type Appointment = {
  name: string;
  phone: string;
  email: string;
  appointment_date: string;
  appointment_time: string;
  service: string;
  message?: string;
};

export async function submitAppointment(appointment: Appointment): Promise<void> {
  if (!webhookUrl) return;

  const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(appointment),
  });

  if (!response.ok) {
    throw new Error(`Webhook request failed: ${response.status}`);
  }
}
