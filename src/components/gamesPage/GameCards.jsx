import Image from "next/image";
import Link from "next/link";

const GameCards = ({ imgUrl, gameUrl, gameTitle }) => {
  return (
    <Link
      href={`/games/${gameUrl}`}
      className="relative w-[22rem] flex flex-col gap-3 transition-all hover:scale-[1.05] cursor-pointer"
    >
      <Image
        src={imgUrl}
        className="h-[11rem] rounded-lg w-full object-cover"
        height={150}
        alt=""
      />
      <div className="absolute rounded-bl-lg rounded-tr-lg text-white text-xl font-extrabold bottom-0 left-0 text-left bg-black px-3 py-2 opacity-70 hover:opacity-85">
        <h4 className="opacity-100">{gameTitle}</h4>
      </div>
    </Link>
  );
};

export default GameCards;
