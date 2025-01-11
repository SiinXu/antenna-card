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
          className="w-48 h-16 border-2 rounded-md bg-red-400 text-lg"
          onClick={() => {
            disconnect();
          }}
        >
          End Session
        </Button>
      ) : (
        <Button
          className={`w-48 h-16 border-2 font-bold text-lg ${
            connecting ? " bg-yellow-200" : "bg-green-200"
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
          {connecting ? "Loading" : "Talk to Mindy!"}
        </Button>
      )}
    </div>
  );
}
