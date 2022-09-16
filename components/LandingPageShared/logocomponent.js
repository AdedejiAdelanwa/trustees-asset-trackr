import Image from "next/image"
import Link from "next/link"
import logo from "../../public/assets/Meristemlogo.png"


const Logocomponent = () => {

    return(
        <Link href="/">
            <div className="w-fit mx-[6.3rem] md:mx-[1.3rem] mt-[4.3rem] sm:mx-[2rem] md:mt-[4.4rem] cursor-pointer   absolute">
                <Image src={logo} alt="logo" />
            </div>
        </Link>

    )
}

export default Logocomponent