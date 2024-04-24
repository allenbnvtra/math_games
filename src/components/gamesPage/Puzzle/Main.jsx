import Puzzle from "./Puzzle";
import PuzzlePiece from "./PuzzlePiece";

const puzzlePieces = [
  { id: 1, src: "@/assets/circle.png" },
  { id: 2, src: "@/assets/cylinder.jpg" },
  // Add more puzzle pieces here
];

const Main = () => {
  return (
    <div>
      <Puzzle>
        {puzzlePieces.map((piece) => (
          <PuzzlePiece key={piece.id} src={piece.src} />
        ))}
      </Puzzle>
    </div>
  );
};

export default Main;
