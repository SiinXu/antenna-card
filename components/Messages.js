"use client";
import { useVoice } from "@humeai/voice-react";
import { takeNotes, summarizeContent } from "@/utils/openai";
import { useState, useEffect } from "react";

export default function Messages({ notes, newNotes, newExcitedNotes }) {
  const { messages } = useVoice();
  const [summary, setSummary] = useState("");

  const handleTakeNotes = async (userMessage, excited) => {
    console.log(userMessage);
    const processedNotes = await takeNotes(userMessage);
    if (processedNotes !== "") {
      newNotes((prevNotes) => [...prevNotes, processedNotes]);
      if (excited) {
        console.log("HEREE");
        newExcitedNotes((prevExcitedNotes) => [
          ...prevExcitedNotes,
          processedNotes,
        ]);
      }
    }
  };

  const handleSetSummary = async (notes) => {
    const summarizedNotes = await summarizeContent(notes);
    setSummary(summarizedNotes);
  };

  useEffect(() => {
    console.log(messages);
    if (messages.length > 0) {
      const latestMessage = messages[messages.length - 1];
      if (latestMessage.type === "user_message") {
        const prosodyScores = latestMessage.models.prosody.scores;

        let excited = false;
        if (
          prosodyScores.Interest > 0.7 ||
          prosodyScores.Excitement > 0.7 ||
          prosodyScores.Surprise > 0.7
        ) {
          excited = true;
        }
        console.log(
          latestMessage.message.content,
          "prosody scores: ",
          prosodyScores
        );
        handleTakeNotes(latestMessage.message.content, excited);
      }

      if (notes.length !== 0 && notes.length % 3 === 0) {
        handleSetSummary(notes);
      }
    }
  }, [messages]);

  return (
    <div className="flex flex-col-reverse flex-nowrap overflow-y-auto w-80 h-2/3 mt-1/2 p-6 ">
      {messages.toReversed().map((msg, index) => {
        if (msg.type === "user_message" || msg.type === "assistant_message") {
          return (
            <div
              key={msg.type + index}
              className="justify-start items-start my-2 px-4"
            >
              <p
                className={`${
                  index == 0 ? "text-white" : "text-slate-400"
                } font-bold`}
              >
                {msg.type === "user_message" ? "You:" : "Mindy:"}
              </p>
              <p className={index == 0 ? "text-white" : "text-slate-400"}>
                {msg.message.content}
              </p>
            </div>
          );
        }
      })}
    </div>
  );
}
