import { useDrag } from "react-dnd";

const PuzzlePiece = ({ src }) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: "puzzlePiece", src },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <img
      ref={drag}
      src={src}
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: "100px",
        height: "100px",
        cursor: "move",
      }}
    />
  );
};

export default PuzzlePiece;
