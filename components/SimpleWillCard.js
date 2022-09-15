import Image from "next/image";
import React from "react";
import Writer from "../public/assets/will-writer.png";

export default function SimpleWillCard() {
  return (
    <div className=" w-[30rem] sm:w-[40rem] md:w-[60rem] h-[30.5rem] m-[1rem] bg-white flex-grow flex-shrink-0 flex-[25rem] rounded-[5px] shadow-lg transition-all duration-200 ease-in-out hover:shadow-md hover:translate-y-[-1px] overflow-hidden">
      <Image src={Writer} alt="describe" />
      <div className="p-[1.8rem]">
        <h5 className="text-[2.4rem]">Simple Will</h5>
        <p className="text-[1.4rem] font-normal">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate libero et velit interdum, ac aliquet odio mattis.
        </p>
      </div>
    </div>
  );
}
