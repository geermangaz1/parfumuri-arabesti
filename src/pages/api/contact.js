export default function handler(req, res) {
  if (req.method === "POST") {
    console.log("✅ API a primit cererea!");
    res.status(200).json({ message: "API funcționează perfect 🎉" });
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
