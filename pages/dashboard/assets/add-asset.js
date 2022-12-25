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
} from "@chakra-ui/react";
// import axios from "axios";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import MainHeader from "../../../components/MainHeader";
import { fetchAssetCategories } from "../../../redux/asset/assetActions";

const AddAsset = () => {
  const { userDetails } = useSelector((state) => state.user);
  const userToken = JSON.parse(localStorage.getItem("userToken"));

  const router = useRouter();
  const dispatch = useDispatch();
  const { assetCategories, loading } = useSelector((state) => state.assets);
  const [assetCategoryIndex, setAssetCategoryIndex] = useState(0);
  const tableFields = assetCategories[assetCategoryIndex].table_fields;
  let newAssetFields = Object.entries(tableFields).map((field) => {
    return { [field[0]]: "" };
  });
  const [newAsset, setNewAsset] = useState(newAssetFields);
  const getAssetCategories = useCallback(async () => {
    const token = jwt_decode(userToken);
    if (Date.now() >= token.exp * 1000) {
      dispatch(logout());
    } else {
      dispatch(fetchAssetCategories(userToken));
    }
  }, [dispatch, userToken]);

  const handleChangeAssetClass = (e) => {
    setAssetCategoryIndex(e.target.dataset.assetcategoryindex);
  };

  const handleInputChange = (e) => {
    setNewAsset({ ...newAsset, [e.target.name]: e.target.value.trim() });
  };

  const handleCreateAsset = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (!userToken) {
      router.push("/login");
    }
    getAssetCategories();
  }, [getAssetCategories, router, userToken]);

  return (
    userDetails && (
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
                    label="about categories"
                    bg="gray.300"
                    color="black"
                  >
                    <span>
                      <AiOutlineQuestionCircle fontSize="1.4rem" color="grey" />
                    </span>
                  </Tooltip>
                </Flex>
                <Text> {assetCategories[assetCategoryIndex].details}</Text>
              </Stack>

              <Flex justifyContent="space-around">
                <form
                  className="w-full text-[1.4rem]"
                  onSubmit={handleCreateAsset}
                >
                  {Object.entries(tableFields).map((field) => {
                    return (
                      <FormControl
                        mb="1rem"
                        key={field[1].label}
                        w={["100%", , "50%"]}
                      >
                        <FormLabel fontSize="1.4rem">
                          {field[1].label}
                        </FormLabel>
                        {field[1].datatype !== "select" ? (
                          <input
                            type={field[1].datatype}
                            name={field[0]}
                            value={newAsset[field[0]]}
                            onChange={handleInputChange}
                            className="w-[100%] border-solid border-[1px] py-[0.5rem]  rounded"
                          />
                        ) : (
                          <Select
                            name={field[0]}
                            value={newAsset[field[0]]}
                            onChange={handleInputChange}
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
                  <button
                    onClick={handleCreateAsset}
                    className=" w-[50%] md:w-[100%] mt-[1rem] py-[0.6rem] px-[1.5rem] text-white bg-darkgreen text-center  rounded-md border-solid border-2 border-darkgreen  hover:shadow-md"
                  >
                    Add Asset
                  </button>
                </form>
              </Flex>
            </Stack>
          </Stack>
        </Flex>
      </Box>
    )
  );
};

export default AddAsset;
