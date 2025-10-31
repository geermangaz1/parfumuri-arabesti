import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  try {
    // email către tine
    await resend.emails.send({
      from: 'Oriental Essence <no-reply@resend.dev>',
      to: 'orientalessence.shop@gmail.com',
      subject: `Comandă nouă de la ${name}`,
      html: `
        <h2>Detalii Comandă</h2>
        <p><b>Nume:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Mesaj:</b> ${message}</p>
      `,
    });

    // email către client
    await resend.emails.send({
      from: 'Oriental Essence <no-reply@resend.dev>',
      to: email,
      subject: 'Comanda ta a fost primită!',
      html: `
        <p>Bună, ${name}!</p>
        <p>Îți mulțumim pentru comandă! Echipa Oriental Essence te va contacta în curând pentru confirmare.</p>
        <p>Cu drag,</p>
        <p><b>Oriental Essence</b></p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Eroare la trimiterea emailului:', error);
    res.status(500).json({ error: 'Eroare la trimiterea emailului' });
  }
}
