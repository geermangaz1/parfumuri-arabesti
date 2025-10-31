import SibApiV3Sdk from 'sib-api-v3-sdk';

export default async function handler(req, res) {
  console.log('Cheia API:', process.env.SENDINBLUE_API_KEY ? 'OK' : 'LIPSEȘTE');
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, message } = req.body;

  // Inițializează clientul Brevo
  const client = SibApiV3Sdk.ApiClient.instance;
  client.authentications['api-key'].apiKey = process.env.SENDINBLUE_API_KEY;

  const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

  const sender = {
    email: 'orientalessence.shop@gmail.com',
    name: 'Oriental Essence',
  };

  const receivers = [
    { email: 'orientalessence.shop@gmail.com' },
  ];

  try {
    await tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: `Mesaj nou de la ${name}`,
      htmlContent: `
        <p><strong>Nume:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mesaj:</strong> ${message}</p>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Eroare trimitere email:', error);
    return res.status(500).json({ error: 'Eroare la trimiterea emailului' });
  }
}
