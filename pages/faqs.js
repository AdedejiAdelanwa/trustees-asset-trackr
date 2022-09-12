import Link from "next/link"
import React, { useState } from "react";


const FAQs = () => {


  return(
  <main className="font-Poppins text-[1.8rem]">
    {/* The banna */}
    <div className="w-full h-[182px] px-[10rem] sm:px-[4rem] md:px-[5rem] p-5 bg-[#BBF1D1] ">
        <h1 className="w-[50rem] text-[4.8rem] text-[#345C45] sm:w-[32rem] sm:h-[10rem] sm:text-[3rem] sm:mt-[2rem] md:w-[40rem] md:h-[16rem] md:text-[4rem] ">Got a question?We’ve got answers</h1>
    </div>
    {/* Banna end */}

    
  <div className="flex mt-[5rem] justify-between px-[10rem] sm:flex-col sm:px-[4rem] md:px-[5rem] md:flex-col">
    {/*First Section*/}
    <div className=" w-[33.5rem] h-[35rem] sm:flex-col sm:w-[32rem] sm:h-[40rem] sm:px-[3rem] md:flex md:w-[50rem] md:h-[20rem]">
      <div className="w-[33.5rem] mb-10 sm:w-[25rem]">
        <h2 className="mb-3 text-[3.2rem] sm:text-[2.5rem] sm:mb-1 md:mb-2 md:text-[2.9rem]">Estate Plans</h2>
        <p><u><Link href="#">What is a trust?</Link></u></p>
        <p><u><Link href="#">Who is a trustee?</Link></u></p>
        <p><u><Link href="#">What is the process for transfering assets to beneficiaries?</Link></u></p>
      </div>

      <div className="w-[335px] sm:w-[25rem]">
        <h1 className="mb-3 text-[3.2rem] sm:text-[2.5rem] sm:mb-1 md:mb-2 md:text-[2.9rem]">Real Estate</h1>
        <p><u><Link href="#">What is a trust?</Link></u></p>
        <p><u><Link href="#">Who is a trustee?</Link></u></p>
        <p><u><Link href="#">What is the process for transfering assets to beneficiaries?</Link></u></p>
      </div>
    </div>

    {/* Second Section */}
    <div className="w-[33.5rem] sm:flex-col sm:w-[32rem] sm:mb-3 sm:px-[3rem] md:flex md:w-[70rem]">
      <div className="w-[33.5rem] mb-10 sm:w-[25rem]">
          <h1 className="mb-3 text-[3.2rem] sm:text-[2.5rem] md:text-[2.9rem]">Assets </h1>
          <p><u><Link href="#">What is a trust?</Link></u></p>
          <p><u><Link href="#">Who is a trustee?</Link></u></p>
          <p><u><Link href="#">What is the process for transfering assets to beneficiaries?</Link></u></p>
        </div>

        <div className="w-[33.5rem] mb-10 sm:w-[25rem]">
        <h1 className="mb-3 text-[3.2rem] sm:text-[2.5rem] md:text-[2.9rem]">Beneficiaries</h1>
        <p><u><Link href="#">What is a trust?</Link></u></p>
        <p><u><Link href="#">Who is a trustee?</Link></u></p>
        <p><u><Link href="#">What is the process for transfering assets to beneficiaries?</Link></u></p>
      </div>

      <div className="w-[33.5rem] sm:w-[25rem]">
        <h1 className="mb-3 text-[3.2rem] sm:text-[2.5rem] md:text-[2.9rem]">General FAQ</h1>
        <p><u><Link href="#">What is a trust?</Link></u></p>
        <p><u><Link href="#">Who is a trustee?</Link></u></p>
        <p><u><Link href="#">What is the process for transfering assets to beneficiaries?</Link></u></p>
      </div>
    </div>

    {/* Thrid Section */}
    <div className="w-[33.5rem] h-[37rem] sm:flex-col sm:w-[32rem] sm:h-[40rem] sm:px-[3rem] md:flex md:w-[50rem] md:h-[20rem]">
      <div className="w-[33.5rem] mb-7 sm:w-[25rem] ">
        <h1 className=" mb-3 text-[3.2rem] sm:text-[2.5rem] sm:mb-1 md:text-[2.9rem] md:mb-2">Trust</h1>
        <p><u><Link href="#">What is a trust?</Link></u></p>
        <p><u><Link href="#">Who is a trustee?</Link></u></p>
        <p><u><Link href="#">What is the process for transfering assets to beneficiaries?</Link></u></p>
      </div>

        <div className="w-[33.5rem] mb-7 sm:w-[25rem]">
        <h1 className="mb-3 text-[3.2rem] sm:text-[2.5rem]  md:text-[2.9rem]">Stocks</h1>
        <p><u><Link href="#">What is a trust?</Link></u></p>
        <p><u><Link href="#">Who is a trustee?</Link></u></p>
        <p><u><Link href="#">What is the process for transfering assets to beneficiaries?</Link></u></p>
      </div>
    </div>
  </div>

  </main>
);
}

export default FAQs;



