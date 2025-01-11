import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import Markdown from "react-markdown";
import { Button } from "./ui/button";
import { useState } from "react";
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";
import CardComponent from "./CardComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const MyWrapper = ({ children }) => {
  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{
        350: 1,
        750: 2,
        1024: 3,
        1280: 4,
        1536: 5,
      }}
    >
      <Masonry gutter="1rem">{children}</Masonry>
    </ResponsiveMasonry>
  );
};

const NoteBoard = ({ title, notes, newNotes, excitedNotes }) => {
  const [hoveredClose, setHoveredClose] = useState(null);
  const noteColors = [
    ["bg-gradient-to-br from-rose-200/30 to-pink-300/30", "bg-gradient-to-br from-rose-300/40 to-pink-400/40"],
    ["bg-gradient-to-br from-sky-200/30 to-indigo-300/30", "bg-gradient-to-br from-sky-300/40 to-indigo-400/40"],
    ["bg-gradient-to-br from-violet-200/30 to-purple-300/30", "bg-gradient-to-br from-violet-300/40 to-purple-400/40"],
    ["bg-gradient-to-br from-fuchsia-200/30 to-pink-300/30", "bg-gradient-to-br from-fuchsia-300/40 to-pink-400/40"],
    ["bg-gradient-to-br from-blue-200/30 to-cyan-300/30", "bg-gradient-to-br from-blue-300/40 to-cyan-400/40"],
  ];

  const deleteNote = (noteContent) => {
    newNotes(notes.filter(note => note !== noteContent));
  };

  return (
    <div className="p-8">
      <DndProvider backend={HTML5Backend}>
        <MyWrapper>
          {notes.map((note, index) => {
            const randomIndex = Math.floor(Math.random() * noteColors.length);
            return (
              <CardComponent
                note={note}
                key={index}
                index={index}
                randomIndex={randomIndex}
                noteColors={noteColors}
                excitedNotes={excitedNotes}
                hoveredClose={hoveredClose}
                setHoveredClose={setHoveredClose}
                deleteNote={deleteNote}
              />
            );
          })}
        </MyWrapper>
      </DndProvider>
    </div>
  );
};

export default NoteBoard;
