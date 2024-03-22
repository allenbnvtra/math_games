import Image from "next/image";
import MDAS from "@/assets/mdaslogo.jpeg";

const GameCards = () => {
  return (
    <div className="w-[10rem] flex flex-col gap-3 border border-slate-200 px-2 py-3 bg-slate-50 transition-all hover:scale-[1.05] cursor-pointer">
      <Image src={MDAS} height={150} alt="" />
      <h4 className="text-center text-slate-700 text-md font-medium">
        Human Calculator
      </h4>
    </div>
  );
};

export default GameCards;
