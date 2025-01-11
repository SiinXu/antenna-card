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
        600: 1,
        750: 2,
        900: 3,
        1200: 4,
        1400: 5,
        1600: 6,
      }}
    >
      <Masonry>{children}</Masonry>
    </ResponsiveMasonry>
  );
};

const NoteBoard = ({ title, notes, newNotes, excitedNotes }) => {
  console.log(notes);
  const [hoveredClose, setHoveredClose] = useState(null);
  const [hoverCard, setHoverCard] = useState(null);
  const noteColors = [
    ["bg-rose-200", "bg-rose-400"],
    ["bg-sky-200", "bg-sky-400"],
    ["bg-violet-200", "bg-violet-400"],
    ["bg-pink-200", "bg-pink-400"],
    ["bg-emerald-200", "bg-emerald-400"],
  ];

  const deleteNote = (deleteKey) => {
    newNotes(notes.filter((_, key) => key !== deleteKey));
  };

  return (
    <div className="flex flex-col h-screen">
      <div className=" px-6 py-4 bg-slate-900 h-20 ">
        <p className="gradient-text text-5xl font-bold">{title}</p>
      </div>
      <div className="flex flex-col overflow-y-auto flex-grow">
        <div className="m-5">
          <DndProvider backend={HTML5Backend}>
            <MyWrapper>
              {notes.map((note, key) => {
                // Generate a random index for each note
                const randomIndex = Math.floor(
                  Math.random() * noteColors.length
                );
                return (
                  <CardComponent
                    note={note}
                    key={key}
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
      </div>
    </div>
  );
};

export default NoteBoard;
