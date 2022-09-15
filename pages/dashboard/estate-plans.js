import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Stack,
  Heading,
  Text,
  VStack,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import DashBoardContainer from "../../components/DashboardLayout";
import MainHeader from "../../components/MainHeader";
import SideNav from "../../components/SideNavigation";
import { BiSearchAlt2 } from "react-icons/bi";
import { RiFileList3Line } from "react-icons/ri";
import EstatePlanItem from "../../components/EstatePlanItem";
import { BsPersonCircle } from "react-icons/bs";
import SimpleWillCard from "../../components/SimpleWillCard";
import EstatePlanDetailsModal from "../../components/EstatePlanDetailsModal";
import { useState } from "react";

const estateplanList = [
  { name: "simple will", status: "processing" },
  { name: "comprehensive will", status: "active" },

  { name: "mkat", status: "processing" },
  { name: "mfat", status: "active" },
];
export const beneficiaries = [
  { name: "Peterson Omoboriowo", relationship: "son" },
  { name: "Paula Omoboriowo", relationship: "daughter" },
  { name: "Wale Scott", relationship: "nephew" },
  { name: "Dammy  Walker", relationship: "cousin" },
];
export default function EstatePlans() {
  const estatePlanModal = useDisclosure();
  const [estateItem, setEstateItem] = useState({ name: "", status: "" });

  const handleSetItemToShow = (i) => {
    setEstateItem(estateplanList[i]);
    estatePlanModal.onOpen();
  };
  return (
    <section className="main-content text-black bg-white w-[80%] sm:w-[100%!important] md:w-[88%]   h-[90vh] p-[3rem] sm:px-[1.5rem] right-0 absolute overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-[2.8rem] font-bold">My Estate Plans </h2>
        <BiSearchAlt2 fontSize={"2rem"} className="cursor-pointer" />
      </div>
      <Tabs mt={"3rem"} fontSize="1.6rem">
        <TabList borderBottomColor={"grey"}>
          <Tab fontSize="1.6rem">My Estate Plans</Tab>
          <Tab fontSize="1.6rem">Beneficiaries</Tab>
          <Tab fontSize="1.6rem">Add Estate Plan</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Flex
              flexWrap="wrap"
              justifyContent={{ base: "space-around", lg: "space-between" }}
              gap="2rem"
              mt={"5rem"}
            >
              {estateplanList.map((item, i) => (
                <EstatePlanItem key={i} onOpen={() => handleSetItemToShow(i)}>
                  <RiFileList3Line fontSize={"2.5rem"} color="darkgreen" />

                  <Stack spacing={"0"}>
                    <Heading fontFamily={"Poppins"}>{item.name}</Heading>
                    <Text color={"gray"}>{item.status}</Text>
                  </Stack>
                </EstatePlanItem>
              ))}
              <EstatePlanDetailsModal
                estateItem={estateItem}
                isOpen={estatePlanModal.isOpen}
                onClose={estatePlanModal.onClose}
              />
            </Flex>
          </TabPanel>
          <TabPanel>
            <Flex
              flexWrap="wrap"
              justifyContent={{ base: "space-around", lg: "space-between" }}
              gap="2rem"
              mt={"5rem"}
            >
              {beneficiaries.map((ben, i) => (
                <EstatePlanItem key={i}>
                  <BsPersonCircle fontSize={"4rem"} color="darkgreen" />

                  <Stack spacing={"0"}>
                    <Heading fontFamily={"Poppins"}>{ben.name}</Heading>
                    <Text color={"gray"}>{ben.relationship}</Text>
                  </Stack>
                </EstatePlanItem>
              ))}
            </Flex>
          </TabPanel>
          <TabPanel>
            <Heading>Recommended</Heading>
            <Flex
              flexWrap="wrap"
              justifyContent={{ base: "space-around", lg: "space-between" }}
              gap="2rem"
              mt={"3rem"}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                <SimpleWillCard key={i} />
              ))}
            </Flex>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  );
}
EstatePlans.getLayout = function getLayout(page) {
  return (
    <DashBoardContainer>
      <MainHeader />
      <SideNav />
      {page}
    </DashBoardContainer>
  );
};
