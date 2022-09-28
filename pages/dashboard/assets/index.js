import {
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Flex,
  Button,
  HStack,
  Select,
} from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BsArrowDown, BsArrowUp } from "react-icons/bs";

import DashBoardContainer from "../../../components/DashboardLayout";
import MainHeader from "../../../components/MainHeader";
import SideNav from "../../../components/SideNavigation";
import { assetTypes } from "../home";
const assetClassList = [
  "All",
  "Crypto",
  "Real Estate",
  "Bank Accounts",
  "Stock",
  "NFT",
  "Arts",
];
const assets = [
  { name: "Gtb a/c (Omoboriowo Johnson)", valueIncrese: 200, value: 190000 },
  { name: "luna", valueIncrese: -20, value: 7000 },
  { name: "tether", valueIncrese: 0, value: 12000 },
];
export default function Assets() {
  const [isVisible, setIsVisible] = useState(false);
 
  return (
    <section className="main-content">
      <Flex alignItems={"center"} justifyContent="space-between">
        <Heading fontFamily={"Poppins"} fontSize="2.8rem">Assets</Heading>
        <Link href={"/dashboard/assets/add-asset"}>
        <Button
          bg={"darkgreen"}
          colorScheme={"darkgreen"}
          className="py-[1rem] px-[2rem]"
          size="lg"
        
        >
          Add Asset
        </Button>
        </Link>
        
       
      </Flex>

      <Flex fontSize={"1.4rem"} mt="3.5rem">
        <HStack w={"85%"}>
          {/* <HStack overflowX={"clip"} spacing="1.5rem">
            {assetClassList.map((assetClass, index) => (
              <Button
                key={index}
                borderRadius="full"
                py={"6px"}
                px={"1.8rem"}
                bg="grey"
                value={assetClass}
                // onClick={(e)=> console.log(e.target.value)}
              >
                {assetClass}
              </Button>
            ))}
          </HStack> */}

          <Select width={"7rem"} fontSize="1.4rem">
            {assetClassList.map((assetClass, index) => (
              <option key={index}>{assetClass}</option>
            ))}
          </Select>
        </HStack>
      </Flex>
      <Flex alignItems={"center"} mt="1.5rem">
        <div className="flex items-center">
          <p className="text-[3rem] mr-2 font-normal">
            &#8358;{isVisible ? "40203930.00" : "XXXXX.XX"}
          </p>
          <small
            className="text-[2.5rem] cursor-pointer"
            onClick={() => setIsVisible(!isVisible)}
          >
            {!isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
          </small>
        </div>
        <div className=" sm:mt-[1rem]">
          <Select
            fontSize={"1.5rem"}
            py="1.5rem"
            color="darkgreen"
            borderColor={"darkgreen"}
          >
            {assetTypes.map((assetType, index) => (
              <option key={index} value={assetType.name}>
                {assetType.name}
              </option>
            ))}
          </Select>
        </div>
      </Flex>

      <TableContainer mt={"2.5rem"}>
        <Table
          variant={"simple"}
          textTransform="capitalize"
          fontSize="1.5rem"
          fontFamily={"Poppins"}
        >
          <Thead bg={"darkgreen"} color="white" fontSize="1.5rem">
            <Tr py="2rem">
              <Th>Asset</Th>
              <Th>
                <Select variant={"unstyled"}>
                  {["Last 7 days", "3 months", "6 months", "1 year"].map(
                    (item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  )}
                </Select>
              </Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {assets.map(({ name, valueIncrese, value }) => (
              <Tr
                key={name}
                borderBottomColor="#F3F3F3"
                borderBottomWidth={"1.5px"}
              >
                <Td py="1.5rem">{name}</Td>
                <Td
                  py="1.5rem"
                  display={"flex"}
                  borderBottom={"none"}
                  color={
                    valueIncrese < 0
                      ? "red"
                      : valueIncrese > 0
                      ? "green"
                      : "#828282"
                  }
                >
                  {valueIncrese}%
                  {valueIncrese < 0 ? (
                    <BsArrowDown />
                  ) : valueIncrese > 0 ? (
                    <BsArrowUp />
                  ) : (
                    ""
                  )}
                </Td>
                <Td py="1.5rem">₦{value}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </section>
  );
}
Assets.getLayout = function getLayout(page) {
  return (
    <DashBoardContainer>
      <MainHeader />
      <SideNav />
      {page}
    </DashBoardContainer>
  );
};
