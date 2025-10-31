// src/api/sendEmail.js
export async function sendOrderEmails({ name, email, message }) {
  const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

  if (!RESEND_API_KEY) {
    throw new Error("Missing RESEND_API_KEY in .env");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "Oriental Essence <noreply@orientalessence.shop>",
      to: [
        "emailultau@gmail.com", // <-- înlocuiește cu adresa ta reală
        email // clientul primește și el
      ],
      subject: "Confirmare Comandă Oriental Essence",
      html: `
        <h2>Mulțumim pentru comanda ta, ${name}!</h2>
        <p>Comanda ta a fost primită cu succes.</p>
        <p><b>Detalii:</b></p>
        <p>${message}</p>
        <p>Te vom contacta în cel mai scurt timp!</p>
      `
    })
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Eroare la trimiterea e-mailului:", error);
    throw new Error("Failed to send email");
  }

  return await response.json();
}
