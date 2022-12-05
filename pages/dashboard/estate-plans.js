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
import { useEffect, useState } from "react";
import BeneficiaryDetailsModal from "../../components/BeneficiaryDetailsModal";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

export const estateplanList = [
  { name: "simple will", status: "processing" },
  { name: "comprehensive will", status: "active" },

  { name: "mkat", status: "processing" },
  { name: "mfat", status: "active" },
];
export const beneficiaries = [
  {
    name: "Peterson Omoboriowo",
    relationship: "son",
    age: "19",
    account: "12345367",
  },
  {
    name: "Paula Omoboriowo",
    relationship: "daughter",
    age: "19",
    account: "12345367",
  },
  {
    name: "Wale Scott",
    relationship: "nephew",
    age: "19",
    account: "12345367",
  },
  {
    name: "Dammy  Walker",
    relationship: "cousin",
    age: "19",
    account: "12345367",
  },
];
export default function EstatePlans() {
  const estatePlanModal = useDisclosure();
  const beneficiaryModal = useDisclosure();
  const [estateItem, setEstateItem] = useState({ name: "", status: "" });
  const [beneficiaryItem, setBeneficiaryItem] = useState({
    name: "",
    relationship: "",
    age: "",
    account: "",
  });

  const handleSetItemToShow = (i) => {
    setEstateItem(estateplanList[i]);
    estatePlanModal.onOpen();
  };
  const handleSetBeneficiaryToShow = (i) => {
    setBeneficiaryItem(beneficiaries[i]);
    beneficiaryModal.onOpen();
  };

  const { userDetails } = useSelector((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (!userDetails) {
      router.push("/login");
    }
  }, [router, userDetails]);
  return (
    <section className="main-content">
      <div className="flex items-center justify-between">
        <h2 className="text-[2.8rem] font-bold">My Estate Plans </h2>
        <BiSearchAlt2 fontSize={"2rem"} className="cursor-pointer" />
      </div>
      <Tabs mt={"3rem"} fontSize="1.6rem">
        <TabList borderBottomColor={"grey"}>
          <Tab
            _selected={{ color: "green", borderBottomColor: "green" }}
            fontSize="1.6rem"
          >
            My Estate Plans
          </Tab>
          <Tab
            _selected={{ color: "green", borderBottomColor: "green" }}
            fontSize="1.6rem"
          >
            Beneficiaries
          </Tab>
          <Tab
            _selected={{ color: "green", borderBottomColor: "green" }}
            fontSize="1.6rem"
          >
            Add Estate Plan
          </Tab>
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
                <EstatePlanItem
                  key={i}
                  onOpen={() => handleSetBeneficiaryToShow(i)}
                >
                  <BsPersonCircle fontSize={"4rem"} color="darkgreen" />

                  <Stack spacing={"0"}>
                    <Heading fontFamily={"Poppins"}>{ben.name}</Heading>
                    <Text color={"gray"}>{ben.relationship}</Text>
                  </Stack>
                </EstatePlanItem>
              ))}
              <BeneficiaryDetailsModal
                isOpen={beneficiaryModal.isOpen}
                onClose={beneficiaryModal.onClose}
                beneficiaryItem={beneficiaryItem}
              />
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
