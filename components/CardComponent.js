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
    <Card
      ref={drag}
      index={index}
      className={`relative h-fit min-h-[250px] w-[300px] m-5 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-1 backdrop-blur-sm overflow-hidden ${
        excitedNotes.includes(note)
          ? "bg-custom-card-gradient less-intense-ping"
          : noteColors[randomIndex][0]
      } ${
        !excitedNotes.includes(note)
          ? noteColors[randomIndex][1]
          : ""
      } focus:ring-2 focus:ring-purple-400/50 flex justify-center rounded-[20px] border border-white/20`}
    >
      <CardContent className="w-full h-full relative">
        <div className="relative h-full pb-12"> {/* Add padding bottom for navigation */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="w-full"
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
            >
              {renderContent(currentPage)}
            </motion.div>
          </AnimatePresence>
        </div>
        
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
          <motion.div
            className={`cursor-pointer transition-colors duration-200 ${
              excitedNotes.includes(note)
                ? "text-[#6B7AE5] hover:text-[#5666E5]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(-1)}
          >
            <IoIosArrowBack size={24} />
          </motion.div>
          <div className="flex gap-1">
            {[0, 1, 2].map((page) => (
              <motion.div
                key={page}
                className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                  currentPage === page
                    ? excitedNotes.includes(note)
                      ? "bg-[#6B7AE5]"
                      : "bg-gray-600"
                    : excitedNotes.includes(note)
                    ? "bg-[#A5AFEF]"
                    : "bg-gray-300"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setPage([page, page - currentPage])}
              />
            ))}
          </div>
          <motion.div
            className={`cursor-pointer transition-colors duration-200 ${
              excitedNotes.includes(note)
                ? "text-[#6B7AE5] hover:text-[#5666E5]"
                : "text-gray-600 hover:text-gray-800"
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => paginate(1)}
          >
            <IoIosArrowForward size={24} />
          </motion.div>
        </div>
      </CardContent>
      {hoveredClose === index ? (
        <div
          className="absolute -top-2 -right-2 cursor-pointer z-10 bg-white rounded-full"
          onClick={() => deleteNote(index)}
          onMouseEnter={() => setHoveredClose(index)}
          onMouseLeave={() => setHoveredClose(null)}
        >
          <IoIosCloseCircle className="w-6 h-6 text-red-500" />
        </div>
      ) : (
        <div
          className="absolute -top-2 -right-2 cursor-pointer z-10 bg-white rounded-full"
          onMouseEnter={() => setHoveredClose(index)}
          onMouseLeave={() => setHoveredClose(null)}
        >
          <IoIosCloseCircleOutline className="w-6 h-6 text-gray-500" />
        </div>
      )}
    </Card>
  );
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default CardComponent;
