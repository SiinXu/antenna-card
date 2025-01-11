import { Card, CardContent } from "@/components/ui/card";
import Markdown from "react-markdown";
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./Constants";
import { useState, useEffect } from "react";
import { analyzeIdea, createActionPlan } from "@/utils/openai";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const CardComponent = ({
  note,
  index,
  randomIndex,
  noteColors,
  excitedNotes,
  hoveredClose,
  setHoveredClose,
  deleteNote,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.KNIGHT,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const [[currentPage, direction], setPage] = useState([0, 0]);
  const [suggestion, setSuggestion] = useState("");
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadSuggestionAndAction = async () => {
      if (currentPage === 1 && !suggestion) {
        setLoading(true);
        const result = await analyzeIdea(note);
        setSuggestion(result);
        setLoading(false);
      } else if (currentPage === 2 && !action) {
        setLoading(true);
        const result = await createActionPlan(note);
        setAction(result);
        setLoading(false);
      }
    };
    loadSuggestionAndAction();
  }, [currentPage, note, suggestion, action]);

  const paginate = (newDirection) => {
    const newPage = (currentPage + newDirection + 3) % 3;
    setPage([newPage, newDirection]);
  };

  const renderContent = (pageIndex) => {
    switch (pageIndex) {
      case 0:
        return (
          <div className="p-3 min-h-[200px]">
            <Markdown className="prose max-w-none text-gray-700">{note}</Markdown>
          </div>
        );
      case 1:
        return (
          <div className="p-3 min-h-[200px]">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">建议</h4>
            {loading ? (
              <p className="text-sm text-gray-600">加载中...</p>
            ) : (
              <Markdown className="prose max-w-none text-sm text-gray-600">
                {suggestion}
              </Markdown>
            )}
          </div>
        );
      case 2:
        return (
          <div className="p-3 min-h-[200px]">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">下一步行动</h4>
            {loading ? (
              <p className="text-sm text-gray-600">加载中...</p>
            ) : (
              <Markdown className="prose max-w-none text-sm text-gray-600">
                {action}
              </Markdown>
            )}
          </div>
        );
    }
  };

  return (
    <div
      ref={drag}
      className={`relative ${isDragging ? "opacity-50" : "opacity-100"}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentPage}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          className="absolute"
        >
          <Card
            className={`w-[350px] ${
              excitedNotes.includes(note)
                ? "bg-custom-card-gradient less-intense-ping"
                : noteColors[randomIndex][0]
            } ${
              !excitedNotes.includes(note)
                ? noteColors[randomIndex][1]
                : ""
            } hover:shadow-lg transition-shadow duration-200 relative`}
          >
            {isHovered && (
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-colors duration-200 z-10"
                onClick={() => deleteNote(index)}
              >
                <IoIosCloseCircle className="w-6 h-6" />
              </button>
            )}
            <CardContent className="pt-6">
              {renderContent(currentPage)}
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>

      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => paginate(-1)}
          className={`p-2 rounded-full ${
            noteColors[randomIndex][0].includes("bg-pink")
              ? "bg-pink-100 hover:bg-pink-200"
              : noteColors[randomIndex][0].includes("bg-blue")
              ? "bg-blue-100 hover:bg-blue-200"
              : "bg-purple-100 hover:bg-purple-200"
          } transition-colors duration-200`}
        >
          <IoIosArrowBack className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-1">
          {[0, 1, 2].map((dot) => (
            <div
              key={dot}
              className={`w-2 h-2 rounded-full ${
                currentPage === dot
                  ? noteColors[randomIndex][0].includes("bg-pink")
                    ? "bg-pink-500"
                    : noteColors[randomIndex][0].includes("bg-blue")
                    ? "bg-blue-500"
                    : "bg-purple-500"
                  : "bg-gray-300"
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => paginate(1)}
          className={`p-2 rounded-full ${
            noteColors[randomIndex][0].includes("bg-pink")
              ? "bg-pink-100 hover:bg-pink-200"
              : noteColors[randomIndex][0].includes("bg-blue")
              ? "bg-blue-100 hover:bg-blue-200"
              : "bg-purple-100 hover:bg-purple-200"
          } transition-colors duration-200`}
        >
          <IoIosArrowForward className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default CardComponent;
