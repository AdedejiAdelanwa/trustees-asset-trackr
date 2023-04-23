import Image from "next/image"
import Link from "next/link"
import logo from "../../public/assets/Logo.png"


const Logocomponent = () => {

    return(
        <Link href="/">
            <div className="w-full px-[6.3rem] md:px-[1.3rem] sm:px-[1.6rem] pt-[4rem] h-[10vh] top-0 left-0 cursor-pointer absolute">
                <Image src={logo} alt="Meristem Logo" />
            </div>
        </Link>

    )
}

export default Logocomponent