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
    <div className="flex">
      <div className="w-80 bg-glass-gradient backdrop-blur-glass flex flex-col justify-end items-center h-screen border-r border-white/20">
        <div className="flex flex-col items-center m-10 space-y-5">
          <div className="relative group">
            <div className="absolute inset-0 rounded-full animate-avatar-glow"></div>
            <img 
              src="https://i.pinimg.com/originals/a2/b2/9f/a2b29f0577de8897aa845c7dc11f3d3b.gif" 
              alt="Avatar"
              className="relative w-32 h-32 rounded-full object-cover border-2 border-purple-400/30 group-hover:border-purple-400/50 transition-all duration-300 z-10"
            />
          </div>
          <div className="text-[#7B78FF] text-center font-bold bg-white/20 px-6 py-3 rounded-[16px] backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
            和我一起头脑风暴你的项目想法吧！
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
          <Controls className="bg-button-gradient hover:bg-button-hover-gradient backdrop-blur-glass rounded-[16px] border border-white/20 transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md" />
        </VoiceProvider>
      </div>
      <div className="flex-1 min-h-screen bg-custom-radial-gradient relative overflow-hidden">
        <div className="absolute w-[300px] h-[300px] rounded-full bg-purple-200/50 filter blur-[60px] animate-float top-1/4 left-1/3"></div>
        <div className="absolute w-[300px] h-[300px] rounded-full bg-blue-200/50 filter blur-[60px] animate-glow bottom-1/3 right-1/4"></div>
        <NoteBoard
          title="Notes"
          notes={notes}
          newNotes={newNotes}
          excitedNotes={excitedNotes}
          newExcitedNotes={newExcitedNotes}
        />
      </div>
    </div>
  );
}
