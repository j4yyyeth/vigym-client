import { useState } from "react";
import { baseUrl } from "../services/baseUrl";

const Trainer = () => {

  const [ userMessage, setUserMessage ] = useState('');
  const [ AIMessage, setAIMessage ] = useState('');

  const sendMessage = async () => {
    setUserMessage('');
    try {
      const response = await fetch(`${baseUrl}/trainer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage }),
      });
      
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const responseData = await response.json();
      setAIMessage(responseData.response);
    }
    catch (err) {
      console.log(err);
    }
  }
  
  
  return (
    <div>
      <h1>AI Trainer</h1>
      <br></br>
      <input type="text" value={userMessage} onChange={(e) => setUserMessage(e.target.value)}></input>
      <button onClick={sendMessage}>Send</button>
      <br></br>
      <br></br>
      <h3>{AIMessage}</h3>
    </div>
  )
}

export default Trainer
