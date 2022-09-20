import Image from "next/dist/client/image"




const Cards = ({picture, word, instruction}) => {

    return(
        <div className="w-[31rem] md:w-[23rem] sm:w-[31rem]  h-[40vh] md:h-[33vh] sm:h-[40vh] mt-[6rem] flex flex-col font-Poppins bg-white rounded-[1rem] border-2 border-white shadow-lg">
            <div className=" m-[1.9rem] ">
                <Image src={picture} alt="trackAssetImage" className="rounded-[1em]"/>
            </div>
                <h1 className="text-black font-semibold text-[2rem] md:text-[1.6rem] sm:text-[2rem] px-10">
                  {word}  
                </h1>
                <h2 className="p-10 text-black text-[1.6rem] sm:text-[1.6rem] md:text-[1.2rem] ">
                    {instruction}
                </h2> 
        </div>
    
    )
}

export default Cards