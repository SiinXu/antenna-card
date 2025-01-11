import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Markdown from "react-markdown";
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./Constants";
import { useState } from "react";
import { analyzeIdea, createActionPlan } from "@/utils/openai";
import { Button } from "./ui/button";

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

  const [suggestion, setSuggestion] = useState("");
  const [action, setAction] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGetSuggestion = async () => {
    setLoading(true);
    const result = await analyzeIdea(note);
    setSuggestion(result);
    setLoading(false);
  };

  const handleGetAction = async () => {
    setLoading(true);
    const result = await createActionPlan(note);
    setAction(result);
    setLoading(false);
  };

  return (
    <Card
      ref={drag}
      index={index}
      className={`h-fit w-200 m-5 transition-all duration-300 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-1 backdrop-blur-sm ${
        excitedNotes.includes(note)
          ? "bg-custom-card-gradient less-intense-ping"
          : noteColors[randomIndex][0]
      } ${
        !excitedNotes.includes(note)
          ? noteColors[randomIndex][1]
          : ""
      } focus:ring-2 focus:ring-purple-400/50 flex justify-center rounded-[20px] border border-white/20`}
    >
      <CardContent className="w-full">
        <div className="p-3">
          <Markdown className="prose max-w-none text-gray-700">{note}</Markdown>
          {suggestion && (
            <div className="mt-4 p-3 bg-white/30 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">建议</h4>
              <p className="text-sm text-gray-600">{suggestion}</p>
            </div>
          )}
          {action && (
            <div className="mt-4 p-3 bg-white/30 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">下一步行动</h4>
              <p className="text-sm text-gray-600">{action}</p>
            </div>
          )}
          <div className="flex gap-2 mt-4">
            <Button
              onClick={handleGetSuggestion}
              disabled={loading}
              className="text-sm bg-purple-500 hover:bg-purple-600 text-white"
            >
              {loading ? "加载中..." : "获取建议"}
            </Button>
            <Button
              onClick={handleGetAction}
              disabled={loading}
              className="text-sm bg-indigo-500 hover:bg-indigo-600 text-white"
            >
              {loading ? "加载中..." : "下一步行动"}
            </Button>
          </div>
        </div>
      </CardContent>
      {hoveredClose === index ? (
        <IoIosCloseCircle
          className="relative min-w-7 min-h-7 max-h-7 max-w-7 top-6 right-4 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors duration-200"
          onMouseEnter={() => setHoveredClose(index)}
          onMouseLeave={() => setHoveredClose(null)}
          onClick={() => deleteNote(index)}
        />
      ) : (
        <IoIosCloseCircleOutline
          className="relative min-w-7 min-h-7 max-h-7 max-w-7 top-6 right-4 cursor-pointer text-gray-500/70 hover:text-gray-700 transition-colors duration-200"
          onMouseEnter={() => setHoveredClose(index)}
          onMouseLeave={() => setHoveredClose(null)}
          onClick={() => deleteNote(index)}
        />
      )}
    </Card>
  );
};

export default CardComponent;
