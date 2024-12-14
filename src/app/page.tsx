"use client";

import { useState } from "react";

type Message = {
  role: "user" | "ai";
  content: string;
};

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", content: "Hello! How can I help you today?" },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;

    // Add user message to the conversation
    const userMessage = { role: "user" as const, content: message };
    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      // TODO: Handle the response from the chat API to display the AI response in the UI
      const data = await response.json();
      console.log("Data: ", data);

      setMessages(prev => [...prev, {role: "ai", content: data.message}]);




    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };


  // TODO: Modify the color schemes, fonts, and UI as needed for a good user experience
  // Refer to the Tailwind CSS docs here: https://tailwindcss.com/docs/customizing-colors, and here: https://tailwindcss.com/docs/hover-focus-and-other-states
  // return (
  //   <div className="flex flex-col h-screen bg-gray-900">
  //     {/* Header */}
  //     <div className="w-full bg-gray-800 border-b border-gray-700 p-4">
  //       <div className="max-w-3xl mx-auto">
  //         <h1 className="text-xl font-semibold text-white">Chat</h1>
  //       </div>
  //     </div>

  //     {/* Messages Container */}
  //     <div className="flex-1 overflow-y-auto pb-32 pt-4">
  //       <div className="max-w-3xl mx-auto px-4">
  //         {messages.map((msg, index) => (
  //           <div
  //             key={index}
  //             className={`flex gap-4 mb-4 ${
  //               msg.role === "ai"
  //                 ? "justify-start"
  //                 : "justify-end flex-row-reverse"
  //             }`}
  //           >
  //             <div
  //               className={`px-4 py-2 rounded-2xl max-w-[80%] ${
  //                 msg.role === "ai"
  //                   ? "bg-gray-800 border border-gray-700 text-gray-100"
  //                   : "bg-cyan-600 text-white ml-auto"
  //               }`}
  //             >
  //               {msg.content}
  //             </div>
  //           </div>
  //         ))}
  //         {isLoading && (
  //           <div className="flex gap-4 mb-4">
  //             <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
  //               <svg
  //                 className="w-5 h-5 text-gray-400"
  //                 viewBox="0 0 24 24"
  //                 fill="currentColor"
  //               >
  //                 <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-4-8c.79 0 1.5-.71 1.5-1.5S8.79 9 8 9s-1.5.71-1.5 1.5S7.21 11 8 11zm8 0c.79 0 1.5-.71 1.5-1.5S16.79 9 16 9s-1.5.71-1.5 1.5.71 1.5 1.5 1.5zm-4 4c2.21 0 4-1.79 4-4h-8c0 2.21 1.79 4 4 4z" />
  //               </svg>
  //             </div>
  //             <div className="px-4 py-2 rounded-2xl bg-gray-800 border border-gray-700 text-gray-100">
  //               <div className="flex items-center gap-1">
  //                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
  //                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
  //                 <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
  //               </div>
  //             </div>
  //           </div>
  //         )}
  //       </div>
  //     </div>

  //     {/* Input Area */}
  //     <div className="fixed bottom-0 w-full bg-gray-800 border-t border-gray-700 p-4">
  //       <div className="max-w-3xl mx-auto">
  //         <div className="flex gap-3 items-center">
  //           <input
  //             type="text"
  //             value={message}
  //             onChange={e => setMessage(e.target.value)}
  //             onKeyPress={e => e.key === "Enter" && handleSend()}
  //             placeholder="Type your message..."
  //             className="flex-1 rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent placeholder-gray-400"
  //           />
  //           <button
  //             onClick={handleSend}
  //             disabled={isLoading}
  //             className="bg-cyan-600 text-white px-5 py-3 rounded-xl hover:bg-cyan-700 transition-all disabled:bg-cyan-800 disabled:opacity-50 disabled:cursor-not-allowed"
  //           >
  //             {isLoading ? "Sending..." : "Send"}
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div className="flex flex-col h-screen bg-[#f8f8f6]"> {/* Off-white outer background */}
      {/* Header */}
      <div className="w-full bg-blue-300 border-b border-blue-200 p-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-800">Your Academic AI Assitant</h1>
        </div>
      </div>
  
      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto pb-32 pt-4">
        <div className="max-w-3xl mx-auto bg-[#faf3e0] px-4 py-6 rounded-lg"> {/* Pastel blue-gray chat background */}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex gap-4 mb-4 ${
                msg.role === "ai" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-2xl max-w-[80%] ${
                  msg.role === "ai"
                    ? "bg-blue-900 text-white"
                    : "bg-green-100 border border-green-200 text-gray-800"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 mb-4 justify-start">
              <div className="px-4 py-2 rounded-2xl bg-blue-900 text-white">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-2 h-2 bg-gray-200 rounded-full animate-bounce"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
  
      {/* Input Area */}
      <div className="fixed bottom-0 w-full bg-blue-300 border-t border-blue-200 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex-1 rounded-xl border border-blue-200 bg-white px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500"
            />
            <button
              onClick={handleSend}
              disabled={isLoading}
              className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 transition-all disabled:bg-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  
  
  
  
  
  
}