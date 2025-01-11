import React from "react";
import { Button } from "./ui/button";
import { useState } from "react";
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";
import CardComponent from "./CardComponent";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { motion, AnimatePresence } from "framer-motion";

const NoteBoard = ({ title, notes, newNotes, excitedNotes }) => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [hoveredClose, setHoveredClose] = useState(null);
  const noteColors = [
    ["bg-gradient-to-br from-rose-200/30 to-pink-300/30", "bg-gradient-to-br from-rose-300/40 to-pink-400/40"],
    ["bg-gradient-to-br from-sky-200/30 to-indigo-300/30", "bg-gradient-to-br from-sky-300/40 to-indigo-400/40"],
    ["bg-gradient-to-br from-violet-200/30 to-purple-300/30", "bg-gradient-to-br from-violet-300/40 to-purple-400/40"],
    ["bg-gradient-to-br from-fuchsia-200/30 to-pink-300/30", "bg-gradient-to-br from-fuchsia-300/40 to-pink-400/40"],
    ["bg-gradient-to-br from-blue-200/30 to-cyan-300/30", "bg-gradient-to-br from-blue-300/40 to-cyan-400/40"],
  ];

  const deleteNote = (deleteIndex) => {
    newNotes(notes.filter((_, index) => index !== deleteIndex));
  };

  return (
    <div className="p-8 w-full h-full max-w-[1200px] mx-auto">
      <DndProvider backend={HTML5Backend}>
        <div className="relative flex items-start min-h-[400px]">
          <AnimatePresence mode="popLayout">
            {notes.map((note, index) => {
              const randomIndex = Math.floor(Math.random() * noteColors.length);
              const isNew = index === notes.length - 1;
              const offset = index * 60; // 增加偏移量让卡片重叠更明显
              const isHovered = hoveredIndex === index;
              
              // 计算相邻卡片的位置偏移
              const getNeighborOffset = (idx) => {
                if (!isHovered) return 0;
                const distance = idx - index;
                if (distance === 0) return 0;
                return distance > 0 ? 40 : -40; // 相邻卡片向两侧偏移
              };

              return (
                <motion.div
                  key={note}
                  className="absolute"
                  style={{
                    left: `${offset}px`,
                    width: '320px',
                    zIndex: isHovered ? 10 : index,
                    transformOrigin: "center center",
                  }}
                  initial={isNew ? { 
                    x: 100, 
                    scale: 0.8, 
                    opacity: 0,
                    rotateY: 45
                  } : { 
                    x: -100, 
                    scale: 0.8, 
                    opacity: 0,
                    rotateY: -45
                  }}
                  animate={{ 
                    x: getNeighborOffset(index),
                    scale: isHovered ? 1.05 : 1,
                    opacity: 1,
                    rotateY: 0,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 30,
                      mass: 1,
                      scale: {
                        duration: 0.2,
                        ease: "easeOut"
                      }
                    }
                  }}
                  exit={{ 
                    x: -100,
                    scale: 0.8,
                    opacity: 0,
                    rotateY: -45,
                    transition: {
                      duration: 0.3,
                      ease: "easeInOut"
                    }
                  }}
                  onHoverStart={() => setHoveredIndex(index)}
                  onHoverEnd={() => setHoveredIndex(null)}
                  whileHover={{
                    y: -5,
                    transition: {
                      duration: 0.2,
                      ease: "easeOut"
                    }
                  }}
                >
                  <div className="relative">
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
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 rounded-[24px]"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
                          transition: "box-shadow 0.3s ease-in-out"
                        }}
                      />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </DndProvider>
    </div>
  );
};

export default NoteBoard;
