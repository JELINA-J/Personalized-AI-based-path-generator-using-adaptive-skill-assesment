import { useState } from "react";

/*export default function ChatbotWidget({
  course = "",
  level = "",
  roadmap = null,
  onRoadmapUpdate = () => {}
}: {
  course?: string;
  level?: string;
  roadmap?: any;
  onRoadmapUpdate?: (roadmap: any) => void;
}) */
export default function ChatbotWidget({
  course,
  level,
  roadmap,
  onRoadmapUpdate
}: {
  course: string;
  level: string;
  roadmap: any;
  onRoadmapUpdate: (roadmap: any) => void;
}) 


{
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: "user", content: input }]);

    const res = await fetch("http://localhost:8000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        course,
        level,
        roadmap,
        message: input
      })
    });

    const data = await res.json();

    setMessages(prev => [
      ...prev,
      { role: "assistant", content: data.reply }
    ]);
if (data.updated_roadmap) {
  onRoadmapUpdate({
    ...roadmap,
    milestones: data.updated_roadmap.milestones ?? data.updated_roadmap
  });
}

    setInput("");
  };

  return (
    <>
      {/* CHAT ICON */}
      <div
        onClick={() => setOpen(true)}
        style={{
          position: "fixed",
          bottom: 20,
          right: 20,
          width: 60,
          height: 60,
          borderRadius: "50%",
          backgroundColor: "#4f46e5",
          color: "white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          fontSize: 26
        }}
      >
        🤖
      </div>

      {/* CHAT WINDOW */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 360,
            height: 460,
            background: "#fff",
            borderRadius: 12,
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column"
          }}
        >
          <div style={{ padding: 10, fontWeight: "bold" }}>
            Learning Assistant
            <span
              style={{ float: "right", cursor: "pointer" }}
              onClick={() => setOpen(false)}
            >
              ✖
            </span>
          </div>

          <div style={{ flex: 1, padding: 10, overflowY: "auto" }}>
            {messages.map((m, i) => (
              <div
                key={i}
                style={{
                  marginBottom: 8,
                  textAlign: m.role === "user" ? "right" : "left"
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    padding: 8,
                    borderRadius: 8,
                    background: m.role === "user" ? "#4f46e5" : "#eee",
                    color: m.role === "user" ? "#fff" : "#000"
                  }}
                >
                  {m.content}
                </span>
              </div>
            ))}
          </div>

          <div style={{ padding: 10, display: "flex" }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about the roadmap..."
              style={{ flex: 1, padding: 8 }}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}
