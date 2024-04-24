"use client";

import { useDrop } from "react-dnd";
import { useEffect, useState } from "react";

const Puzzle = () => {
  const [canDrop, setCanDrop] = useState(false);
  const [isOver, setIsOver] = useState(false);

  const [{ isOver: isDraggingOver }, drop] = useDrop({
    accept: "puzzlePiece",
    drop: (item, monitor) => {
      // Handle drop logic
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  useEffect(() => {
    setIsOver(isDraggingOver);
  }, [isDraggingOver]);

  useEffect(() => {
    setCanDrop(canDrop);
  }, [canDrop]);

  return (
    <div
      ref={drop}
      style={{
        width: "500px",
        height: "500px",
        border: "2px solid #333",
      }}
    >
      {/* Render puzzle pieces here */}
    </div>
  );
};

export default Puzzle;
