import { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { AiOutlineMenu } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { GrDiamond, GrHomeRounded } from "react-icons/gr";
import { RiFileList3Line, RiQuestionMark } from "react-icons/ri";

const SideNav = ({ href }) => {
  const [isSideNavOpen, setIsSidNavOpen] = useState(false);
  const router = useRouter();
  console.log(router.pathname);

  return (
    <nav
      className={`side-nav text-black py-[2.5rem] bg-lightgrey w-[20%] md:w-[12%] sm:hidden flex flex-col items-center   h-[90vh]  left-0 bottom-0 fixed ${
        isSideNavOpen ? "-translate-x-full" : "translate-x-0"
      } ease-in-out duration-300`}
    >
      {/* <AiOutlineMenu
        fontSize={"3rem"}
        className="menu-btn cursor-pointer hover:text-darkgreen"
        onClick={() => setIsSidNavOpen(!isSideNavOpen)}
      /> */}
      <ul className="menu-list w-[100%]">
        <li className={`side-nav-item hover:bg-lightgreen ${router.pathname === "/dashboard/home" ? `bg-lightgreen`: ""}`}>
          <Link href="/dashboard/home" >
            <GrHomeRounded fontSize={"2.4rem"} />
          </Link>
          <Link href="/dashboard/home" >
            Home
          </Link>
        </li>
        <li className={`side-nav-item hover:bg-lightgreen ${router.pathname === "/dashboard/assets" ? `bg-lightgreen`: ""}`}>
        <Link href="/dashboard/assets">
          <GrDiamond fontSize={"2.4rem"} />
          </Link>
          <Link href="/dashboard/assets">Assets</Link>
        </li>
        <li className={`side-nav-item hover:bg-lightgreen ${router.pathname === "/dashboard/estate-plans" ? `bg-lightgreen`: ""}`}>
        <Link href="/dashboard/estate-plans">
          <RiFileList3Line fontSize={"2.4rem"} />
          </Link>
          <Link href="/dashboard/estate-plans">Estate plans</Link>
        </li>
        <li className={`side-nav-item hover:bg-lightgreen ${router.pathname === "/dashboard/settings" ? `bg-lightgreen`: ""}`}>
        <Link href="/dashboard/settings">
          <FiSettings fontSize={"2.4rem"} />
          </Link>
          <Link href="/dashboard/settings">Settings</Link>
        </li>
      </ul>
      <Link href="/help-and-support">
        <button className=" w-3/4 absolute bottom-40  py-4 px-6  text-darkgreen text-center  rounded-md border-solid border-2 border-darkgreen hover:bg-lightgreen hover:shadow-md">
          <p className="help-text md:hidden">Help & Support</p>
          <RiQuestionMark className="help-icon hidden md:block" fontSize={"2.4rem"} />
        </button>
      </Link>
    </nav>
  );
};
export default SideNav;
