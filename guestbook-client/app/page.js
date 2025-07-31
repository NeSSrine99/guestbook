"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

  useEffect(() => {
    fetch(`${API_URL}/messages`)
      .then((res) => res.json())
      .then((data) => setMessages(data));
  }, []);

  // Submit message
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, text: message }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, data]);
    setName("");
    setMessage("");
  };

  return (
    <main className="max-w-xl mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold mb-6 text-blue-700">📘 Guestbook</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4 border"
      >
        <input
          type="text"
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <textarea
          placeholder="Your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          rows={4}
          className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Submit
        </button>
      </form>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          📩 Messages:
        </h2>
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-gray-50 border border-gray-200 p-4 rounded-md"
            >
              <p className="font-medium text-blue-800">{msg.name}</p>
              <p className="text-gray-700">{msg.text}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
