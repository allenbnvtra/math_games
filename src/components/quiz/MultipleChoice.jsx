import React from "react";
import Link from "next/link";
import { TiArrowBackOutline } from "react-icons/ti";

const MultipleChoice = () => {
  return (
    <div className="px-[4rem] py-5">
      <div className="flex text-4xl font-extralight">
        <Link className="cursor-pointer" href="/games">
          <TiArrowBackOutline />
        </Link>
      </div>

      <div>
        <div></div>
      </div>
    </div>
  );
};

export default MultipleChoice;
