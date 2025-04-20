const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.listen(8080, () => {
  console.log("Server started on port 8080");
});

app.post("/api", async (req, res) => {
  const { text } = req.body;

  const fetchData = async () => {
    const res = await fetch(
      `https://api.api-ninjas.com/v1/qrcode?format=png&data=${text}`,
      {
        method: "GET",
        headers: {
          "X-Api-Key": "YOUR API KEY HERE",
          "Content-Type": "application/json",
        },
      }
    );

    return res.text();
  };

  try {
    const data = await fetchData();
    res.json({ data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
});
