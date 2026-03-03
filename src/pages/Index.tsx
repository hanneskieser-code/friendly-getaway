import { useState } from "react";
import { Send } from "lucide-react";
import twintLogo from "@/assets/twint-logo.png";

const Index = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");
    
    // TODO: Connect to AI backend
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header with logo */}
      <header className="w-full py-6 px-8">
        <div className="bg-black rounded-xl p-4 inline-block">
          <img 
            src={twintLogo} 
            alt="TWINT" 
            className="h-16 w-auto"
          />
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex px-6 pb-8">
        {/* Left sidebar - Search History */}
        {messages.length === 0 && (
          <aside className="w-64 shrink-0 pt-8 pr-6">
            <div className="border border-border rounded-xl p-4">
              <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3">
                Recent conversations
              </h2>
              <ul className="space-y-2">
                {[
                  { id: "1", title: "What is TWINT's data retention policy?" },
                  { id: "2", title: "How do I handle a customer complaint under the new directive?" },
                  { id: "3", title: "Summary of the anti-fraud guidelines" },
                ].map((item) => (
                  <li key={item.id}>
                    <button
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted transition-colors text-sm text-foreground"
                      onClick={() => {/* TODO: navigate to chat */}}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        )}

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-2xl space-y-8">
            {/* Title and intro */}
            {messages.length === 0 && (
              <div className="text-center space-y-6 animate-in fade-in duration-500">
                <h1 className="text-4xl font-light tracking-tight text-foreground">
                  Welcome to <span className="font-medium">TL;DR</span>
                </h1>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl mx-auto">
                  Hi, I'm TL;DR. I've memorized the fine print so you can actually get back to work. 
                  Ask me anything about our policies or directives and I'll give you 
                  the answer in plain English (or any other language you prefer).
                </p>
              </div>
            )}

            {/* Chat messages */}
            {messages.length > 0 && (
              <div className="space-y-4 mb-6">
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                        msg.role === "user"
                          ? "bg-foreground text-background"
                          : "bg-muted text-foreground"
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Chat input */}
            <form onSubmit={handleSubmit} className="relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask me anything about TWINT's policies or directives..."
                  className="w-full px-6 py-4 pr-14 text-foreground bg-background border border-border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all placeholder:text-muted-foreground"
                />
                <button
                  type="submit"
                  disabled={!message.trim()}
                  className="absolute right-2 p-3 rounded-full bg-foreground text-background hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 px-8">
        <p className="text-center text-xs text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          TL;DR can make mistakes so double-check the answers by reviewing the source. 
          In case of any issues, please reach out to{" "}
          <a href="mailto:legalcompliance@twint.ch" className="underline hover:text-foreground transition-colors">
            legalcompliance@twint.ch
          </a>
          . For quality control, answers and questions are recorded and may be reviewed by humans.
        </p>
      </footer>
    </div>
  );
};

export default Index;
