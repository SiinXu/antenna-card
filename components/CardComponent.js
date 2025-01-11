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
      className={`h-fit w-200 m-5 transition duration-300 ease-in-out ${
        excitedNotes.includes(note)
          ? "bg-custom-card-gradient less-intense-ping"
          : noteColors[randomIndex][0]
      } ${
        !excitedNotes.includes(note)
          ? `hover:${noteColors[randomIndex][1]}`
          : ""
      } focus:ring focus:ring-yellow-500 flex justify-center rounded-md`}
    >
      <CardContent>
        <div className="p-2 markdown">
          <Markdown className="p-2 markdown">{note}</Markdown>
        </div>
      </CardContent>
      {hoveredClose === key ? (
        <IoIosCloseCircle
          className="relative min-w-7 min-h-7 max-h-7 max-w-7 top-6 right-4 cursor-pointer"
          onMouseEnter={() => setHoveredClose(key)}
          onMouseLeave={() => setHoveredClose(null)}
          onClick={() => deleteNote(key)}
        />
      ) : (
        <IoIosCloseCircleOutline
          className="relative min-w-7 min-h-7 max-h-7 max-w-7  top-6 right-4 cursor-pointer"
          onMouseEnter={() => setHoveredClose(key)}
          onMouseLeave={() => setHoveredClose(null)}
          onClick={() => deleteNote(key)}
        />
      )}
    </Card>
  );
};

export default CardComponent;
