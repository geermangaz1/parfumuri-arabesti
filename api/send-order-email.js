export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { name, email, message } = req.body;

  const brevoKey = "xkeysib-....(cheia ta Brevo completă aici)";

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "content-type": "application/json",
        "api-key": brevoKey,
      },
      body: JSON.stringify({
        sender: { name: "Oriental Essence", email: "orientalessence.shop@gmail.com" },
        to: [
          { email: "orientalessence.shop@gmail.com" }, // tu primești comanda
          { email }, // clientul primește confirmarea
        ],
        subject: "Confirmare comandă - Oriental Essence",
        htmlContent: `
          <h2>Mulțumim pentru comandă, ${name}!</h2>
          <p>Comanda ta a fost primită cu succes. Vom reveni curând cu detalii despre livrare.</p>
          <hr>
          <p><strong>Mesajul tău:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    const data = await response.json();
    return res.status(200).json({ message: "Email trimis cu succes!", data });
  } catch (error) {
    return res.status(500).json({ message: "Eroare la trimiterea emailului", error });
  }
}
