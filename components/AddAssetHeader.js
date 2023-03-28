import Image from "next/image";

import {
  AiOutlineClose,
  AiOutlineMenu,
  AiOutlineQuestionCircle,
} from "react-icons/ai";
import { GrDiamond, GrHomeRounded } from "react-icons/gr";
import { RiFileList3Line, RiQuestionMark } from "react-icons/ri";
import { FiSettings } from "react-icons/fi";
import styled from "styled-components";
import Logo from "../public/assets/Logo.svg";
import User from "../public/assets/user-icon.png";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Link,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { logout } from "../redux/user/userSlice";

const HeaderWrapper = styled.header`
  width: 100vw;
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: inherit;
  font-size: 1.3rem;
  padding: 0 2.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);

  .logo-group {
    align-items: flex-end;
  }
  .mobile-nav {
    padding: 1rem 0;

    .close-btn {
      padding-left: 2rem;
      font-size: 4rem;
    }

    .list-item {
      height: 4.5rem;
      display: flex;
      align-items: center;
      padding-left: 2rem;
      cursor: pointer;
    }
  }

  .user-box {
    align-items: center;
    justify-content: space-between;
    width: 12rem;
  }

  svg {
    display: none;
  }

  @media screen and (max-width: 768px) {
    padding: 0 2rem;
  }
  @media screen and (max-width: 414px) {
    padding: 0 1.5rem;
    svg {
      display: block;
      margin-right: 1.5rem;
    }
    .user-box {
      align-items: center;
      justify-content: center;
      width: 4rem;

      p {
        display: none;
      }
    }
  }
`;

const AddAssetHeader = ({ assetCategories, handleChangeAssetClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { userDetails } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  return (
    userDetails && (
      <HeaderWrapper className="relative text-black bg-white">
        <div className="logo-group  w-2/3 flex">
          {!isOpen ? (
            <AiOutlineMenu
              fontSize={"2.4rem"}
              className="cursor-pointer hover:text-darkgreen"
              onClick={() => setIsOpen(!isOpen)}
            />
          ) : (
            ""
          )}
          <nav
            className={`mobile-nav text-black bg-lightgrey w-3/4 h-[90vh]  left-0 bottom-0 z-10 fixed ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            } ease-in-out duration-300`}
          >
            <AiOutlineClose
              fontSize={"3rem"}
              className="close-btn cursor-pointer hover:text-darkgreen"
              onClick={() => setIsOpen(!isOpen)}
            />
            <Heading
              w="100%"
              fontSize={["1.8rem", "2.8rem"]}
              pl="2rem"
              mb="1.75rem"
              fontFamily={"Poppins"}
            >
              New Asset
            </Heading>
            <Flex alignItems={"center"} mb="1.5rem">
              <Text mr={"1rem"} pl="2rem">
                Choose Category
              </Text>
              <Tooltip
                hasArrow
                label="about categories"
                bg="gray.300"
                color="black"
              >
                <span>
                  <AiOutlineQuestionCircle fontSize="1.5rem" color="grey" />
                </span>
              </Tooltip>
            </Flex>
            <Stack pl={["0rem", "2rem"]} fontWeight="bold">
              <ul className="menu-list">
                {assetCategories.map((assetCategory, i) => (
                  <Link
                    key={assetCategory.sn + i}
                    borderRadius={"4px"}
                    p={"1rem"}
                    _activeLink={{
                      bg: "lightgreen",
                      color: "dark green",
                    }}
                    _hover={{
                      bg: "grey",
                    }}
                    data-assetcategoryindex={i}
                    onClick={handleChangeAssetClass}
                    className="list-item"
                  >
                    {assetCategory.name}
                  </Link>
                ))}
              </ul>
            </Stack>

            <Link href="https://tawk.to/chat/5b87b97cf31d0f771d8448e4/default">
              <a target="_blank" rel="noopener noreferrer">
                <button className=" w-3/4 absolute bottom-10 ml-8 py-4 px-6 text-darkgreen  rounded-md border-solid border-2 border-darkgreen hover:bg-lightgreen hover:shadow-md">
                  Help & Support
                </button>
              </a>
            </Link>
          </nav>

          <Link href="/dashboard/home">
            <Image src={Logo} alt="Meristem logo" />
          </Link>
        </div>
        <Menu>
          <MenuButton as={Button} cursor={"pointer"} minW={0}>
            <div className=" user-box flex font-bold">
              <Image
                src={User}
                width="40px"
                height={"40px"}
                className="rounded-full  border-solid border-6 border-darkgreen bg-lightgreen"
                alt={`{userDetails.othernames} {userDetails.surname[0]}`}
              />
              <Text>
                {userDetails.othernames} {userDetails.surname[0]}.
              </Text>
            </div>
          </MenuButton>
          <MenuList>
            <MenuItem>
              <Link href="https://tawk.to/chat/5b87b97cf31d0f771d8448e4/default">
                <a target="_blank" rel="noopener noreferrer">
                  <button className=" w-full   py-4 px-6  text-darkgreen text-center  rounded-md border-solid border-2 md:border-0 border-darkgreen hover:bg-lightgreen hover:shadow-md">
                    <p className="help-text md:hidden">Help & Support</p>
                    <RiQuestionMark
                      className="help-icon hidden md:block"
                      fontSize={"2.4rem"}
                    />
                  </button>
                </a>
              </Link>
            </MenuItem>
            <MenuItem>
              <button
                className=" w-full   py-4 px-6  text-[red] text-center  rounded-md border-solid border-2 md:border-0 border-[red] hover:bg-[red] hover:text-[white] hover:shadow-md"
                onClick={() => dispatch(logout())}
              >
                <p className="help-text md:hidden"> logout</p>
                <BiLogOut
                  className="help-icon hidden md:block"
                  fontSize={"2.4rem"}
                />
              </button>
            </MenuItem>
          </MenuList>
        </Menu>
      </HeaderWrapper>
    )
  );
};
export default AddAssetHeader;
