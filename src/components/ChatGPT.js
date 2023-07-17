import React, { useState } from "react";
import axios from "axios";

const API_KEY = "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";
const API_URL = "https://api.openai.com/v1/models";
const API_ENDPOINT =
  "https://cors-anywhere.herokuapp.com/https://api.openai.com/v1/Personal";

const Chat = () => {
  const [conversation, setConversation] = useState([
    { text: "Hi, how can I help you today?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue) return;

   
    const response = await axios.get(
      API_URL,
      {
        prompt: `${conversation.map((m) => m.text).join("\n")}\n${inputValue}`,
        max_tokens: 100,
        n: 1,
        stop: null,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    setConversation([
      ...conversation,
      { text: inputValue },
      { text: response.data.choices[0].text },
    ]);
    setInputValue("");
  };

  return (
    <div>
      {conversation.map((m, i) => (
        <div key={i}>
          <p>{m.text}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
