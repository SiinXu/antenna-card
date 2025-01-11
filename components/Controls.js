"use client";
import { useVoice, VoiceReadyState } from "@humeai/voice-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Controls() {
  const { connect, disconnect, readyState } = useVoice();
  const [connecting, setConnecting] = useState(false);

  return (
    <div className="m-8">
      {readyState === VoiceReadyState.OPEN ? (
        <Button
          className="w-48 h-16 bg-button-purple-glow backdrop-blur-sm text-white font-bold text-lg border border-white/20 hover:bg-button-indigo-glow hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 rounded-[20px]"
          onClick={() => {
            disconnect();
          }}
        >
          结束对话
        </Button>
      ) : (
        <Button
          className={`w-48 h-16 font-bold text-lg border border-white/20 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 rounded-[20px] text-white ${
            connecting
              ? "bg-button-indigo-glow"
              : "bg-button-blue-glow hover:bg-button-purple-glow"
          }`}
          onClick={() => {
            setConnecting(true);
            connect()
              .then(() => {
                setConnecting(false);
              })
              .catch(() => {
                /* handle error */
              });
          }}
        >
          {connecting ? "连接中..." : "开始对话"}
        </Button>
      )}
    </div>
  );
}
