import { useState } from "react";
import { baseUrl } from "../services/baseUrl";

const Trainer = () => {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: "user" | "AI"; content: string }>>([]);

  const sendMessage = async () => {
    setMessages([...messages, { type: "user", content: userMessage }]);
    setUserMessage("");
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/trainer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const responseData = await response.json();
      setMessages([...messages, { type: "user", content: userMessage }, { type: "AI", content: responseData.response }]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>AI Trainer</h1>
      <br />
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      ></input>
      <button onClick={sendMessage}>Send</button>
      <br />
      <br />
      <div>
        {messages.map((message, index) => (
          <div key={index} className={message.type === "user" ? "user-message" : "AI-message"}>
            <br></br>
            <h3>{message.content}</h3>
          </div>
        ))}
        {isLoading && (
          <>
            <br></br>
            <h3>Loading...</h3>
          </>
        )}
      </div>
    </div>
  );
};

export default Trainer;

