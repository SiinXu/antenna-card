import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Markdown from "react-markdown";
import { IoIosCloseCircle, IoIosCloseCircleOutline } from "react-icons/io";
import { useDrag } from "react-dnd";
import { ItemTypes } from "./Constants";

const CardComponent = ({
  note,
  key,
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
  return (
    <Card
      ref={drag}
      key={key}
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
      <CardContent>
        <div className="p-3">
          <Markdown className="prose max-w-none text-gray-700">{note}</Markdown>
        </div>
      </CardContent>
      {hoveredClose === key ? (
        <IoIosCloseCircle
          className="relative min-w-7 min-h-7 max-h-7 max-w-7 top-6 right-4 cursor-pointer text-gray-600 hover:text-gray-800 transition-colors duration-200"
          onMouseEnter={() => setHoveredClose(key)}
          onMouseLeave={() => setHoveredClose(null)}
          onClick={() => deleteNote(key)}
        />
      ) : (
        <IoIosCloseCircleOutline
          className="relative min-w-7 min-h-7 max-h-7 max-w-7 top-6 right-4 cursor-pointer text-gray-500/70 hover:text-gray-700 transition-colors duration-200"
          onMouseEnter={() => setHoveredClose(key)}
          onMouseLeave={() => setHoveredClose(null)}
          onClick={() => deleteNote(key)}
        />
      )}
    </Card>
  );
};

export default CardComponent;
