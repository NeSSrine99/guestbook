const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let messages = [];

try {
  const data = fs.readFileSync("messages.json", "utf8");
  messages = JSON.parse(data);
} catch (err) {
  messages = [];
}

app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const { name, text } = req.body;

  if (!name || !text) {
    return res.status(400).json({ error: "the name and the message sanding " });
  }

  const newMessage = {
    id: Date.now(),
    name,
    text,
  };

  messages.push(newMessage);

  fs.writeFile("messages.json", JSON.stringify(messages, null, 2), (err) => {
    if (err) {
      console.error("Problem of saving message ", err);
      return res.status(500).json({ error: "don't saving " });
    }

    res.status(201).json(newMessage);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 The PORT of project http://localhost:${PORT}`);
});
