import Image from "next/image"
import Link from "next/link"
import loginIcon from "../public/assets/loginIcon.png"


const Loginmodal = () => {

    return (
        <>
            <div className="bg-white font-Poppins flex flex-col items-center justify-center my-[20rem] mx-[50rem] py-[3rem] rounded-[0.7rem]  drop-shadow-md ">
                <div className=" w-[3.7rem] h-[3.7rem] bg-lightgreen  pt-[1rem] pl-[0.8rem] mt-[5rem] rounded-full  ">
                    <Image src={loginIcon} alt=""/>
                </div>
                <p className=" font-semibold text-[2rem] text-darkgreen mt-[2rem ] ">Pasword reset link sent</p>
                <h1 className="w-[54rem] text-center text-[1.6rem] text-black mt-[0.5rem]">A password reset link has been sent to your mail. Use the link to set a new password, then use that password to log in.</h1>
                <Link href="/resetpassword">
                <div className="font-medium text-white text-[1.4rem] w-fit rounded-[0.4rem] bg-darkgreen py-[1rem] px-[2.1rem] my-[4.5rem] cursor-pointer">
                  Done
                </div>
              </Link>
                
            </div>
        </>
    )
}

export default Loginmodal