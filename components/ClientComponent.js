"use client";
import { useState } from "react";
import { VoiceProvider } from "@humeai/voice-react";
import Messages from "./Messages";
import Controls from "./Controls";
import NoteBoard from "./NoteBoard";
import CategoryPage2 from "./CategoryPage2";
import Avatar, { genConfig } from "react-nice-avatar";
import { Button } from "./ui/button";

export default function ClientComponent({ accessToken }) {
  const [notes, setNotes] = useState([]);
  const [colors, setColors] = useState([]);
  const [excitedNotes, setExcitedNotes] = useState([]);

  const config = genConfig({
    sex: "woman",
    faceColor: "#F9C9B6",
    earSize: "small",
    eyeStyle: "circle",
    noseStyle: "short",
    mouthStyle: "smile",
    shirtStyle: "hoody",
    glassesStyle: "none",
    hairColor: "#000",
    hairStyle: "womanLong",
    hatStyle: "none",
    hatColor: "#000",
    eyeBrowStyle: "up",
    shirtColor: "#F4D150",
    bgColor: "#E0DDFF",
  });

  const newNotes = (noteList) => {
    setNotes(noteList);
  };

  const newExcitedNotes = (excitedNotesList) => {
    setExcitedNotes(excitedNotesList);
  };

  return (
    <div className=" flex">
      <div className="flex-1 min-h-screen bg-custom-radial-gradient">
        <NoteBoard
          title="Jabber AI"
          notes={notes}
          newNotes={newNotes}
          excitedNotes={excitedNotes}
        />
      </div>

      <div className="w-80 bg-slate-800 flex flex-col justify-end items-center h-screen">
        <div className="flex flex-col items-center m-10 space-y-5">
          <Avatar className="w-32 h-32" {...config} />
          <div className=" text-white text-center font-bold">
            Brainstorm your project ideas with me!
          </div>
        </div>
        <VoiceProvider
          auth={{
            type: "accessToken",
            value: accessToken,
          }}
          configId={process.env.NEXT_PUBLIC_HUME_CONFIG_ID}
          className="max-h-3/4"
        >
          <Messages
            notes={notes}
            newNotes={newNotes}
            newExcitedNotes={newExcitedNotes}
          />
          <Controls />
        </VoiceProvider>
      </div>
    </div>
  );
}
