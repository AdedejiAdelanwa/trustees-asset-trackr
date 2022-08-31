import Link from "next/link";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { FiSettings } from "react-icons/fi";
import { GrDiamond, GrHomeRounded } from "react-icons/gr";
import { RiFileList3Line, RiQuestionMark } from "react-icons/ri";

const SideNav = () => {
  const [isSideNavOpen, setIsSidNavOpen] = useState(false);
  return (
    <nav
      className={`side-nav text-black py-[2.5rem] bg-lightgrey w-[20%] flex flex-col items-center   h-[90vh]  left-0 bottom-0 absolute ${
        isSideNavOpen ? "-translate-x-full" : "translate-x-0"
      } ease-in-out duration-300`}
    >
      {/* <AiOutlineMenu
        fontSize={"3rem"}
        className="menu-btn cursor-pointer hover:text-darkgreen"
        onClick={() => setIsSidNavOpen(!isSideNavOpen)}
      /> */}
      <ul className="menu-list w-[100%]">
        <li className="side-nav-item hover:bg-lightgreen">
          <Link href="/">
            <GrHomeRounded fontSize={"2.4rem"} />
          </Link>
          <Link href="/dashboard/home" className="link-text">
            Home
          </Link>
        </li>
        <li className="side-nav-item hover:bg-lightgreen">
          <GrDiamond fontSize={"2.4rem"} />
          <Link href="/dashboard/assets">Assets</Link>
        </li>
        <li className="side-nav-item hover:bg-lightgreen">
          <RiFileList3Line fontSize={"2.4rem"} />
          <Link href="/dashboard/estate-plans">Estate plans</Link>
        </li>
        <li className="side-nav-item hover:bg-lightgreen">
          <FiSettings fontSize={"2.4rem"} />
          <Link href="/dashboard/settings">Settings</Link>
        </li>
      </ul>
      <Link href="/help-and-support">
        <button className=" w-3/4 absolute bottom-40  py-4 px-6 text-darkgreen text-center  rounded-md border-solid border-2 border-darkgreen hover:bg-lightgreen hover:shadow-md">
          <p className="help-text">Help & Support</p>
          <RiQuestionMark className="help-icon" fontSize={"2.4rem"} />
        </button>
      </Link>
    </nav>
  );
};
export default SideNav;
