import { useState, useEffect, useContext, useRef } from "react";
import { baseUrl } from "../services/baseUrl";
import { LoadingContext } from "../context/loadingContext";

const Trainer = () => {
  const [userMessage, setUserMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ type: "user" | "AI"; content: string }>>([]);
  const loadingContext = useContext(LoadingContext);

  const user = loadingContext ? loadingContext.user : undefined;

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
        body: JSON.stringify({
          message: userMessage,
          userId: user?._id
        }),
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

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div className=" min-h-screen">
      <div className="container mx-auto px-4 flex flex-col h-full">
        <div className="mb-16">
          <br></br>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`bg-white shadow-md rounded-lg p-4 mb-4 ${
                message.type === "user" ? "text-custom-light-blue" : "text-gray-500"
              }`}
            >
              <h3 className="message-from-AI">{message.content}</h3>
            </div>
          ))}
          <div ref={messagesEndRef} />
          {isLoading && (
            <div className="flex justify-center">
            <div id="loading" className="m-2"></div>
            </div>
          )}
        </div>
        <div className="flex items-center fixed bottom-0 left-0 w-full px-4 pb-4">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type a message ..."
            className="w-full border rounded-lg p-2 mr-4"
          />
          <button
            onClick={sendMessage}
            className="bg-custom-white shadow-md rounded-md p-4 text-blue-600 px-4 py-2 m-2 text-center"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trainer;

