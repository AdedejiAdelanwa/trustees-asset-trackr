import Image from "next/dist/client/image"




const Cards = ({picture, word, instruction}) => {

    return(
        <div className="w-[31rem]  h-[40vh] mt-[6rem] flex flex-col font-Poppins bg-white rounded-[1rem] border-2 border-white shadow-lg">
            <div className=" m-[1.9rem] ">
                <Image src={picture} alt="trackAssetImage" className="rounded-[1em]"/>
            </div>
            <div >
                <h1 className="text-black font-semibold text-[2rem] px-10">
                  {word}  
                </h1>
            </div>
            <div className="p-10">
                <h1 className="text-black text-[1.6rem] ">
                    {instruction}
                </h1> 
            </div>
        </div>
    
    )
}

export default Cards