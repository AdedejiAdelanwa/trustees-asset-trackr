import { useCallback, useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/router";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../../util";
import {
  Text,
  Flex,
  Tooltip,
  VStack,
  Stack,
  Link,
  Heading,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Select,
  Spinner,
} from "@chakra-ui/react";
import MainHeader from "../../../components/MainHeader";
import { logout } from "../../../redux/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import AuthWrapper from "../../../components/AuthWrapper";

const AddAsset = () => {
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const token = jwt_decode(userToken);
  const router = useRouter();
  const dispatch = useDispatch();
  const { assetCategories, loading } = useSelector((state) => state.assets);
  const [isAddingAsset, setIsAddingAsset] = useState(false);
  const [assetCategoryIndex, setAssetCategoryIndex] = useState(0);
  const tableFields = assetCategories[assetCategoryIndex].table_fields;
  let newAssetFields = Object.entries(tableFields).map((field) => {
    return { [field[0]]: "" };
  });
  const [assetCurrencies, setAssetCurrencies] = useState([]);
  const [currency, setCurrency] = useState("");
  const [newAsset, setNewAsset] = useState(newAssetFields);

  const handleChangeAssetClass = (e) => {
    setAssetCategoryIndex(e.target.dataset.assetcategoryindex);
  };

  const handleInputChange = (e) => {
    setNewAsset({ ...newAsset, [e.target.name]: e.target.value });
  };

  const handleCreateAsset = async (e) => {
    e.preventDefault();
    const newAssetClone = (({ amount, ...o }) => o)(newAsset);

    if (Date.now() >= token.exp * 1000) {
      dispatch(logout());
    } else {
      setIsAddingAsset(true);
      try {
        const {
          data: { message },
        } = await axios({
          method: "post",
          url: `${baseUrl}/assets/add`,
          headers: { Authorization: "Bearer " + userToken },
          data: {
            asset_category_id: assetCategories[assetCategoryIndex]._id,
            asset_name: assetCategories[assetCategoryIndex].name,
            amount: newAsset.amount,
            currency,
            others: {
              ...newAssetClone,
            },
          },
        });
        setIsAddingAsset(false);
        setNewAsset(newAssetFields);
        setCurrency("");
        toast.success(message, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        setIsAddingAsset(false);
        toast.error(error.response.message),
          {
            position: toast.POSITION.TOP_RIGHT,
          };
      }
    }
  };
  const getCurrencies = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`${baseUrl}/assets/currency`);
      setAssetCurrencies(data);
    } catch (error) {
      toast.error(error.response.message),
        {
          position: toast.POSITION.TOP_RIGHT,
        };
    }
  };
  useEffect(() => {
    if (!userToken) {
      router.push("/login");
    }
    getCurrencies();
  }, [router, userToken]);
  console.log(assetCategories);
  return (
    userToken && (
      <AuthWrapper>
        <Box fontFamily={"Poppins"} bg="white">
          <MainHeader />
          <Flex fontSize={"1.4rem"} h="90vh">
            <VStack
              w={{ base: "100%", lg: "20%" }}
              pl="2rem"
              pt="2rem"
              bg="lightgrey"
              textAlign="left"
              alignItems={"flex-start"}
            >
              <Heading
                fontSize={"2.8rem"}
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
              <Stack pl={"2rem"} fontWeight="bold" spacing="1.5rem">
                {assetCategories.map((assetCategory, i) => (
                  <Link
                    key={assetCategory.sn}
                    px="1rem"
                    py="1rem"
                    borderRadius={"4px"}
                    _activeLink={{
                      bg: "lightgreen",
                      color: "darkgreen",
                    }}
                    _hover={{
                      bg: "grey",
                    }}
                    data-assetCategoryIndex={i}
                    onClick={handleChangeAssetClass}
                  >
                    {assetCategory.name}
                  </Link>
                ))}
              </Stack>
            </VStack>
            <Stack
              w={{ base: "0", lg: "80%" }}
              display={{ base: "none", lg: "initial" }}
              pl="2rem"
              pt="2rem"
            >
              <Link href="/dashboard/assets">Back</Link>
              <Stack pr="2rem" fontFamily={"Poppins"}>
                <Stack spacing={"1rem"} mb="3rem">
                  <Flex alignItems={"center"} mb="rem">
                    <Heading mr={"1rem"} fontFamily={"Poppins"} fontSize="2rem">
                      {assetCategories[assetCategoryIndex].name}
                    </Heading>
                    <Tooltip
                      hasArrow
                      label={assetCategories[assetCategoryIndex].description}
                      bg="gray.300"
                      color="black"
                    >
                      <span>
                        <AiOutlineQuestionCircle
                          fontSize="1.4rem"
                          color="grey"
                        />
                      </span>
                    </Tooltip>
                  </Flex>
                  <Text> {assetCategories[assetCategoryIndex].details}</Text>
                </Stack>

                <Flex justifyContent="space-around">
                  <form
                    className="w-full text-[1.4rem] "
                    onSubmit={handleCreateAsset}
                  >
                    <div className="grid grid-cols-2 gap-[2rem]">
                      {Object.entries(tableFields).map((field) => {
                        return (
                          <FormControl
                            mb="1rem"
                            key={field[1].label}
                            w={["100%", , "100%"]}
                            className="grid flex-col"
                          >
                            <FormLabel fontSize="1.4rem">
                              {field[1].label}
                            </FormLabel>
                            {field[1].datatype !== "select" ? (
                              <input
                                type={field[1].datatype}
                                name={field[0]}
                                value={newAsset[field[1]]}
                                onChange={handleInputChange}
                                className={`${
                                  field[1].datatype === "checkbox"
                                    ? ""
                                    : "w-[100%]"
                                } border-solid border-[1px] py-[0.5rem] justify-self-start  rounded`}
                              />
                            ) : (
                              <Select
                                name={field[0]}
                                value={newAsset[field[0]]}
                                onChange={handleInputChange}
                                size="lg"
                              >
                                {field[1].options.map((option) => (
                                  <option
                                    className="w-[100%] border-solid border-[1px]   rounded"
                                    key={option}
                                    value={option}
                                  >
                                    {option}
                                  </option>
                                ))}
                              </Select>
                            )}
                          </FormControl>
                        );
                      })}
                      <FormControl mb="1rem" w={["100%", , "100%"]}>
                        <FormLabel fontSize="1.4rem">Currency</FormLabel>
                        <Select
                          name="assetcurrency"
                          value={currency}
                          onChange={(e) => setCurrency(e.target.value)}
                          size="lg"
                        >
                          <option
                            value=""
                            className="w-[100%] border-solid border-[1px]   rounded"
                          >
                            Choose currency
                          </option>
                          {assetCurrencies.map(({ currency, sn }) => (
                            <option
                              className="w-[100%] border-solid border-[1px]   rounded"
                              key={sn}
                              value={currency}
                            >
                              {currency}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </div>
                    <button
                      disabled={!currency && newAsset}
                      onClick={handleCreateAsset}
                      className=" w-[100%] md:w-[100%] mt-[1rem] py-[0.6rem] px-[1.5rem] text-white bg-darkgreen text-center  rounded-md border-solid border-2 border-darkgreen  hover:shadow-md"
                    >
                      {isAddingAsset ? <Spinner /> : "Add Asset"}
                    </button>
                  </form>
                </Flex>
              </Stack>
            </Stack>
          </Flex>
          <ToastContainer />
        </Box>
      </AuthWrapper>
    )
  );
};

export default AddAsset;
