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
  useDisclosure,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Select,
  Spinner,
  VStack,
  Box,
  Link,
} from "@chakra-ui/react";
import DashBoardContainer from "../../components/DashboardLayout";
import MainHeader from "../../components/MainHeader";
import SideNav from "../../components/SideNavigation";
import { RiFileList3Line } from "react-icons/ri";
import EstatePlanItem from "../../components/EstatePlanItem";
import { BsPersonCircle } from "react-icons/bs";
import EstatePlanDetailsModal from "../../components/EstatePlanDetailsModal";
import { useCallback, useEffect, useState } from "react";
import BeneficiaryDetailsModal from "../../components/BeneficiaryDetailsModal";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../util";
import Head from "next/head";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { fetchBeneficiaries } from "../../redux/beneficiaries/beneficiariesActions";
import { fetchEstatePlans } from "../../redux/estateplans/estatePlansActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AuthWrapper from "../../components/AuthWrapper";
import { logout } from "../../redux/user/userSlice";
import { NewUser } from "../../components/NewUser";
import NoBenefSvg from "../../public/assets/no-beneficiary.svg";
import NoAssetSvg from "../../public/assets/no-asset.svg";
import Image from "next/image";
import { estatePlanSugestions } from "../../util";
import SimpleWillCard from "../../components/SimpleWillCard";

export const estateplanList = [
  { name: "simple will", status: "processing" },
  { name: "comprehensive will", status: "active" },

  { name: "mkat", status: "processing" },
  { name: "mfat", status: "active" },
];
const estatePlanNames = [
  "simple will",
  "comprehensive will",
  "education trust",
];

export default function EstatePlans() {
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const dispatch = useDispatch();
  const addBeneficiary = useDisclosure();
  const addEstatePlan = useDisclosure();
  //const estatePlanItem = useDisclosure();
  const { userDetails } = useSelector((state) => state.user);
  const { loading, userBeneficiaries, error } = useSelector(
    (state) => state.userBeneficiaries
  );
  const { estatePlans } = useSelector((state) => state.estatePlans);
  const router = useRouter();
  const estatePlanModal = useDisclosure();
  const beneficiaryModal = useDisclosure();
  //const [estateplans, setEstatePlans] = useState([]);
  const [estateItem, setEstateItem] = useState({
    name: "",
    details: "",
    status: "",
  });

  const [beneficiaryItem, setBeneficiaryItem] = useState({
    name: "",
    relationship: "",
    age: "",
    account: "",
    dob: "",
  });

  const [isAddingBeneficiary, setIsAddingBeneficiary] = useState(false);
  const [isAddingEstatePlan, setIsAddingEstatePlan] = useState(false);
  const [isFetchingEstatePlans, setIsFetchingEstatePlans] = useState(false);
  const [newBeneficiary, setNewBeneficiary] = useState({
    firstname: "",
    surname: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    beneficiary_relationship: "",
    gender: "",
    marital_status: "",
  });

  const handleFetchBeneficiaries = useCallback(() => {
    let token;
    if (userToken) {
      token = jwt_decode(userToken);
      if (Date.now() >= token.exp * 1000) {
        dispatch(logout());
      } else {
        dispatch(fetchBeneficiaries(userToken));
      }
    }
  }, [dispatch, userToken]);
  const handleFetchEstatePlans = useCallback(() => {
    let token;
    if (userToken) {
      token = jwt_decode(userToken);
      if (Date.now() >= token.exp * 1000) {
        dispatch(logout());
      } else {
        dispatch(fetchEstatePlans(userToken));
      }
    }
  }, [dispatch, userToken]);
  const handleChange = (e) => {
    setNewBeneficiary({
      ...newBeneficiary,
      [e.target.name]: e.target.value,
    });
  };
  const handleCreateEstatePlan = async (e) => {
    e.preventDefault();
    setIsAddingEstatePlan(true);
    try {
      const {
        data: { message },
      } = await axios({
        method: "post",
        url: `${baseUrl}/estate-plan`,
        headers: { Authorization: "Bearer " + userToken },
        data: estateItem,
      });
      setIsAddingEstatePlan(false);
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });

      setEstateItem({
        name: "",
        details: "",
        status: "",
      });
    } catch (error) {
      setIsAddingEstatePlan(false);
      toast.error(error, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const handleCreateNewbeneficiary = async (e) => {
    e.preventDefault();

    if (Date.now() >= token.exp * 1000) {
      dispatch(logout());
    } else {
      setIsAddingBeneficiary(true);
      let formatedDate = newBeneficiary.dob.split("-").reverse().join("/");
      const formatedBen = {
        ...newBeneficiary,
        dob: formatedDate,
      };
      try {
        const {
          data: { message },
        } = await axios({
          method: "post",
          url: `${baseUrl}/beneficiary/add`,
          data: formatedBen,
          headers: { Authorization: "Bearer " + userToken },
        });
        setNewBeneficiary({
          firstname: "",
          surname: "",
          email: "",
          phone: "",
          dob: "",
          address: "",
          beneficiary_relationship: "",
          gender: "",
          marital_status: "",
        });
        setIsAddingBeneficiary(false);

        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        setIsAddingBeneficiary(false);
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        } else {
          toast.error(error.response.message),
            {
              position: toast.POSITION.TOP_RIGHT,
            };
        }
      }
    }
  };
  const handleEstatePlanChange = (e) => {
    setEstateItem({
      ...estateItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleSetItemToShow = (i) => {
    setEstateItem(estatePlans[i]);
    estatePlanModal.onOpen();
  };
  const handleSetBeneficiaryShow = (i) => {
    setBeneficiaryItem(userBeneficiaries[i]);
    beneficiaryModal.onOpen();
  };

  useEffect(() => {
    if (!userToken) {
      router.push("/login");
    }
    handleFetchBeneficiaries();
    handleFetchEstatePlans();
  }, [handleFetchBeneficiaries, handleFetchEstatePlans, router, userToken]);

  return (
    userDetails && (
      <div>
        <Head>
          <title>Asset Tracker | Meristem Trustees</title>
          <meta name="description" content="Generated by create next app" />
          <meta
            name="viewport"
            content="width=device-width, height=device-height,  initial-scale=1.0, user-scalable=no,user-scalable=0"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className="main-content">
          <div className="flex items-center justify-between">
            <h2 className="text-[2.8rem] font-bold">My Estate Plans </h2>
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
                {/* <br />
                <Button
                  bg={"darkgreen"}
                  colorScheme={"darkgreen"}
                  className="py-[1rem] px-[2rem]"
                  size="lg"
                  onClick={addEstatePlan.onOpen}
                >
                  Add Estate Plan
                </Button> */}

                {estatePlans.length > 0 ? (
                  <Flex
                    flexWrap="wrap"
                    justifyContent={{
                      base: "space-around",
                      lg: "space-between",
                    }}
                    gap="2rem"
                    mt={"5rem"}
                  >
                    {isFetchingEstatePlans && <Spinner />}
                    {estatePlans.map((item, i) => (
                      <>
                        <EstatePlanItem
                          key={item.id}
                          onOpen={() => handleSetItemToShow(i)}
                        >
                          <RiFileList3Line
                            fontSize={"2.5rem"}
                            color="darkgreen"
                          />

                          <Stack spacing={"0"}>
                            <Heading fontFamily={"Poppins"}>
                              {item.estate_plan}
                            </Heading>
                            <Text color={"gray"}>{item.status}</Text>
                          </Stack>
                        </EstatePlanItem>
                        <EstatePlanDetailsModal
                          estateItem={item}
                          isOpen={estatePlanModal.isOpen}
                          onClose={estatePlanModal.onClose}
                        />
                      </>
                    ))}
                  </Flex>
                ) : (
                  <Flex
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    h="90vh"
                    gap="2rem"
                  >
                    <NewUser text="estate plan" svg={NoAssetSvg} />
                  </Flex>
                )}
              </TabPanel>
              <TabPanel>
                <br />
                <Button
                  bg={"darkgreen"}
                  colorScheme={"darkgreen"}
                  className="py-[1rem] px-[2rem]"
                  size="lg"
                  onClick={addBeneficiary.onOpen}
                >
                  Add Beneficiary
                </Button>
                <Flex
                  flexWrap="wrap"
                  justifyContent={{ base: "space-around", lg: "space-between" }}
                  gap="2rem"
                  mt={"5rem"}
                >
                  {loading && <Spinner />}

                  {userBeneficiaries.length > 0 ? (
                    <>
                      {userBeneficiaries.map((beneficiary, i) => (
                        <>
                          <EstatePlanItem
                            key={beneficiary.sn}
                            onOpen={() => handleSetBeneficiaryShow(i)}
                          >
                            <BsPersonCircle
                              fontSize={"4rem"}
                              color="darkgreen"
                            />

                            <Stack spacing={"0"}>
                              <Heading fontFamily={"Poppins"}>
                                {beneficiary.firstname} {beneficiary.surname}
                              </Heading>
                              <Text color={"gray"}>
                                {beneficiary.beneficiary_relationship}
                              </Text>
                            </Stack>
                          </EstatePlanItem>
                        </>
                      ))}
                      <BeneficiaryDetailsModal
                        isOpen={beneficiaryModal.isOpen}
                        onClose={beneficiaryModal.onClose}
                        beneficiaryItem={beneficiaryItem}
                      />
                    </>
                  ) : (
                    <NewUser text="beneficiary" svg={NoBenefSvg} />
                  )}
                </Flex>
              </TabPanel>
              <TabPanel>
                <div className="mt-[4.4rem] sm:mt-[5rem]">
                  <h3 className="font-semibold text-[2.8rem]">
                    PROTECT YOUR LOVED ONES
                  </h3>
                  <br />
                  <div className="relative flex items-center overflow-x-auto space-x-8">
                    {estatePlanSugestions.map((estatePlan, i) => (
                      <SimpleWillCard
                        key={estatePlan.sn}
                        estatePlan={estatePlan}
                      />
                    ))}
                  </div>
                  <div>
                    <h3 className="mt-[4.4rem] sm:mt-[5rem] text-[1.5rem] text-center">
                      Not sure which Estate Plan, click
                      <Link href="https://forms.meristemng.com/trustquestionnaire/">
                        {" "}
                        here{" "}
                      </Link>{" "}
                      to take an Assessment
                      <br />
                      You can also call – 090XXXXXXXXXXXX Or Send an email to
                      trustees@meristemng.com
                    </h3>
                  </div>
                </div>
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/* <Modal
            isOpen={addEstatePlan.isOpen}
            size={"5xl"}
            onClose={addEstatePlan.onClose}
            isCentered
          >
            <ModalOverlay bg={`rgba(0,0,0,0.4)`} />
            <ModalContent
              fontSize="1.6rem"
              fontFamily={"Poppins"}
              h="85%"
              overflowY="scroll"
            >
              <ModalHeader fontSize="1.8rem" textTransform={"capitalize"}>
                add estate plan
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form
                  className="text-[1.6rem] w-[100%] overflow-y-auto"
                  onSubmit={handleCreateEstatePlan}
                >
                  <FormControl w="100%">
                    <FormLabel fontSize="1.6rem">Name</FormLabel>
                    <Select
                      placeholder="Select plan"
                      value={estateItem.name}
                      name="name"
                      onChange={handleEstatePlanChange}
                    >
                      {estatePlanNames.map((name) => (
                        <option value={name} key={name}>
                          {name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl w="100%">
                    <FormLabel fontSize="1.6rem">Details</FormLabel>
                    <input
                      type="text"
                      name="details"
                      onChange={handleEstatePlanChange}
                      value={estateItem.details}
                      placeholder="Describe the estate"
                      className="w-full py-[0.5rem] border-solid border-[1px]  rounded"
                    />

                    <FormErrorMessage>
                      Enter min. of 3 characters
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl w="100%">
                    <FormLabel fontSize="1.6rem">Status</FormLabel>
                    <Select
                      placeholder="Select status"
                      value={estateItem.status}
                      name="status"
                      onChange={handleEstatePlanChange}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </Select>
                  </FormControl>
                  <button
                    onClick={handleCreateEstatePlan}
                    className=" w-[100%] mt-[1rem] py-[0.6rem] px-[1.5rem] text-white bg-darkgreen text-center  rounded-md border-solid border-2 border-darkgreen  hover:shadow-md"
                  >
                    {isAddingEstatePlan ? <Spinner /> : "Add Estate Plan"}
                  </button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal> */}
          <Modal
            isOpen={addBeneficiary.isOpen}
            size={"5xl"}
            onClose={addBeneficiary.onClose}
            isCentered
          >
            <ModalOverlay bg={`rgba(0,0,0,0.4)`} />
            <ModalContent
              fontSize="1.6rem"
              fontFamily={"Poppins"}
              h="85%"
              overflowY="scroll"
            >
              <ModalHeader fontSize="1.8rem" textTransform={"capitalize"}>
                add beneficiary
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <form
                  className="text-[1.6rem] w-[100%] overflow-y-auto"
                  onSubmit={handleCreateNewbeneficiary}
                >
                  <FormControl w="100%">
                    <FormLabel fontSize="1.6rem">Surname</FormLabel>
                    <input
                      type="text"
                      name="surname"
                      onChange={handleChange}
                      value={newBeneficiary.surname}
                      className="w-full py-[0.5rem] border-solid border-[1px]  rounded"
                    />

                    <FormErrorMessage>
                      Enter min. of 3 characters
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl w="100%">
                    <FormLabel fontSize="1.6rem">Other names</FormLabel>
                    <input
                      type="text"
                      name="firstname"
                      onChange={handleChange}
                      value={newBeneficiary.firstname}
                      className="w-full py-[0.5rem] border-solid border-[1px]  rounded"
                    />

                    <FormErrorMessage>
                      Enter min. of 3 characters
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl w="100%">
                    <FormLabel fontSize="1.6rem">Email</FormLabel>
                    <input
                      type="email"
                      name="email"
                      value={newBeneficiary.email}
                      onChange={handleChange}
                      className="w-full py-[0.5rem] border-solid border-[1px]  rounded"
                    />

                    <FormErrorMessage>Enter a valid email</FormErrorMessage>
                  </FormControl>
                  <FormControl w="100%">
                    <FormLabel fontSize="1.6rem">Phone number</FormLabel>
                    <input
                      type="tel"
                      name="phone"
                      value={newBeneficiary.phone}
                      onChange={handleChange}
                      className="w-full py-[0.5rem] border-solid border-[1px]  rounded"
                    />

                    <FormErrorMessage>
                      Enter a valid phone number
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl w="100%">
                    <FormLabel fontSize="1.6rem">Date of birth</FormLabel>
                    <input
                      type="date"
                      name="dob"
                      value={newBeneficiary.dob}
                      onChange={handleChange}
                      className="w-full py-[0.5rem] border-solid border-[1px]  rounded"
                    />

                    <FormErrorMessage>
                      Enter a valid phone number
                    </FormErrorMessage>
                  </FormControl>
                  <FormControl w="100%">
                    <FormLabel fontSize="1.6rem">Address</FormLabel>
                    <input
                      type="text"
                      name="address"
                      value={newBeneficiary.address}
                      onChange={handleChange}
                      className="w-full py-[0.5rem] border-solid border-[1px]  rounded"
                    />

                    <FormErrorMessage>Enter a valid address</FormErrorMessage>
                  </FormControl>
                  <FormControl w="100%">
                    <FormLabel fontSize="1.6rem">
                      Beneficiary Relationship
                    </FormLabel>
                    <Select
                      placeholder="Select option"
                      name="beneficiary_relationship"
                      value={newBeneficiary.beneficiary_relationship}
                      onChange={handleChange}
                    >
                      <option value="child">child</option>
                      <option value="spouse">Spouse</option>
                      <option value="parent">Parent</option>
                      <option value="sibling">Sibling</option>
                      <option value="nephew">Nephew</option>
                      <option value="niece">Niece</option>
                      <option value="cousin">Cousin</option>
                      <option value="other">Other</option>
                    </Select>
                    <FormErrorMessage>Enter a valid address</FormErrorMessage>
                  </FormControl>
                  <FormControl w="100%">
                    <FormLabel fontSize="1.6rem">Gender</FormLabel>
                    <Select
                      placeholder="Select a gender"
                      value={newBeneficiary.gender}
                      name="gender"
                      onChange={handleChange}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Select>
                    <FormErrorMessage>Enter a valid address</FormErrorMessage>
                  </FormControl>
                  <button
                    onClick={handleCreateNewbeneficiary}
                    className=" w-[100%] mt-[1rem] py-[0.6rem] px-[1.5rem] text-white bg-darkgreen text-center  rounded-md border-solid border-2 border-darkgreen  hover:shadow-md"
                  >
                    {isAddingBeneficiary ? <Spinner /> : "Add Beneficiary"}
                  </button>
                </form>
              </ModalBody>
            </ModalContent>
          </Modal>
        </section>
        <ToastContainer />
      </div>
    )
  );
}
EstatePlans.getLayout = function getLayout(page) {
  return (
    <AuthWrapper>
      <DashBoardContainer>
        <MainHeader />
        <SideNav />
        {page}
      </DashBoardContainer>
    </AuthWrapper>
  );
};
