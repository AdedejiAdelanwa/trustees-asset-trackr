import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { FiSettings } from "react-icons/fi";
import { GrDiamond, GrHomeRounded } from "react-icons/gr";
import { RiFileList3Line, RiQuestionMark } from "react-icons/ri";

const SideNav = () => {
  const [isSideNavOpen, setIsSidNavOpen] = useState(false);
  const router = useRouter();

  return (
    <nav
      className={`side-nav text-black py-[2.5rem] bg-lightgrey w-[20%] md:w-[12%] sm:hidden flex flex-col items-center   h-[90vh]  left-0 top-[10vh] fixed ${
        isSideNavOpen ? "-translate-x-full" : "translate-x-0"
      } ease-in-out duration-300`}
    >
      {/* <AiOutlineMenu
        fontSize={"3rem"}
        className="menu-btn cursor-pointer hover:text-darkgreen"
        onClick={() => setIsSidNavOpen(!isSideNavOpen)}
      /> */}
      <ul className="menu-list w-[100%]">
        <li
          className={`side-nav-item hover:text-darkgreen hover:font-bold ${
            router.pathname === "/dashboard/home" ? `bg-lightgreen` : ""
          }`}
        >
          <Link href="/dashboard/home">
            <GrHomeRounded fontSize={"2.4rem"} />
          </Link>
          <Link href="/dashboard/home">Home</Link>
        </li>
        <li
          className={`side-nav-item hover:text-darkgreen hover:font-bold ${
            router.pathname === "/dashboard/assets" ? `bg-lightgreen` : ""
          }`}
        >
          <Link href="/dashboard/assets">
            <GrDiamond fontSize={"2.4rem"} />
          </Link>
          <Link href="/dashboard/assets">Assets</Link>
        </li>
        <li
          className={`side-nav-item hover:text-darkgreen hover:font-bold ${
            router.pathname === "/dashboard/estate-plans" ? `bg-lightgreen` : ""
          }`}
        >
          <Link href="/dashboard/estate-plans">
            <RiFileList3Line fontSize={"2.4rem"} />
          </Link>
          <Link href="/dashboard/estate-plans">Estate plans</Link>
        </li>
        <li
          className={`side-nav-item hover:text-darkgreen hover:font-bold ${
            router.pathname === "/dashboard/settings" ? `bg-lightgreen` : ""
          }`}
        >
          <Link href="/dashboard/settings">
            <FiSettings fontSize={"2.4rem"} />
          </Link>
          <Link href="/dashboard/settings">Settings</Link>
        </li>
      </ul>
    </nav>
  );
};
export default SideNav;
