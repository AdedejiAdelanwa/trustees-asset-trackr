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
  VStack,
  Text,
  Box,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useMemo } from "react";
import { useEffect, useState } from "react";
import {
  AiOutlineBank,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineStock,
} from "react-icons/ai";
import { BsArrowDown, BsArrowUp, BsHouse } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import AuthWrapper from "../../../components/AuthWrapper";
import jwt_decode from "jwt-decode";
import DashBoardContainer from "../../../components/DashboardLayout";
import MainHeader from "../../../components/MainHeader";
import SideNav from "../../../components/SideNavigation";
import {
  fetchAssetCategories,
  fetchUserAssets,
} from "../../../redux/asset/assetActions";
import Image from "next/image";
import NoAssetSvg from "../../../public/assets/no-asset.svg";
import { NewUser } from "../../../components/NewUser";

const assetTypes = [
  { name: "₦ Naira Assets", value: "Naira" },
  { name: "$ Dollar Assets", value: "Dollar" },
  { name: "€ Euro Assets", value: "Euro" },
];

export default function Assets() {
  const [isVisible, setIsVisible] = useState(false);
  const userToken = JSON.parse(localStorage.getItem("userToken"));
  const { userDetails } = useSelector((state) => state.user);
  const { userAssets, userStatistics } = useSelector((state) => state.assets);
  const [assetCurrencyFilter, setAssetCurrencyFilter] = useState("Naira");
  let filteredAssets = userAssets.filter((asset) => {
    if (assetCurrencyFilter === "Naira") {
      return asset.currency === "Naira";
    } else if (assetCurrencyFilter === "Dollar") {
      return asset.currency === "Dollar";
    } else if (assetCurrencyFilter === "Euro") {
      return asset.currency === "Euro";
    } else {
      return asset;
    }
  });
  const router = useRouter();

  const handleChangeFilterParam = (e) => {
    setAssetCurrencyFilter(e.target.value);
  };
  const totalAssetsValueArray = Object.entries(userStatistics).map((entry) => {
    return entry;
  });
  const currentTotalAssetValue = totalAssetsValueArray.map((aV) => {
    if (aV[0].includes(assetCurrencyFilter)) {
      return aV[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  });

  useEffect(() => {
    if (!userToken) {
      router.push("/login");
    }
  }, [router, userToken]);

  return (
    userDetails && (
      <>
        {userAssets && userAssets.length > 0 ? (
          <section className="main-content">
            <Flex alignItems={"center"} justifyContent="space-between">
              <Heading fontFamily={"Poppins"} fontSize="2.8rem">
                Assets
              </Heading>
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
                <Select
                  width={"15rem"}
                  fontSize="1.4rem"
                  value={assetCurrencyFilter}
                  onChange={handleChangeFilterParam}
                >
                  {assetTypes.map(({ name, value }) => (
                    <option key={value} value={value}>
                      {name}
                    </option>
                  ))}
                </Select>
              </HStack>
            </Flex>
            <Flex alignItems={"center"} mt="1.5rem">
              <div className="flex items-center">
                <p className="text-[3rem] mr-2 font-normal">
                  {assetCurrencyFilter === "Naira" && "₦"}
                  {assetCurrencyFilter === "Dollar" && "$"}
                  {assetCurrencyFilter === "Euro" && "€"}
                  {isVisible ? currentTotalAssetValue : "XXXXX.XX"}
                </p>
                <small
                  className="text-[2.5rem] cursor-pointer"
                  onClick={() => setIsVisible(!isVisible)}
                >
                  {!isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                </small>
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
                    <Th fontSize="1.4rem">Asset</Th>
                    <Th fontSize="1.4rem">Value</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredAssets.map(
                    ({ asset_name, amount, sn, currency }) => (
                      <Tr
                        key={sn}
                        borderBottomColor="#F3F3F3"
                        borderBottomWidth={"1.5px"}
                      >
                        <Td py="1.5rem" display="flex" border="none">
                          {asset_name === "Stocks" && (
                            <AiOutlineStock
                              fontSize="2.5rem"
                              className="bg-lightgreen p-1 rounded text-darkgreen"
                            />
                          )}
                          {asset_name === "Real Estate" && (
                            <BsHouse
                              fontSize="2.5rem"
                              className="bg-lightgreen p-1 rounded text-darkgreen"
                            />
                          )}
                          {asset_name === "Bank Accounts" && (
                            <AiOutlineBank
                              fontSize="2.5rem"
                              className="bg-lightgreen p-1 rounded text-darkgreen"
                            />
                          )}
                          {asset_name}
                        </Td>

                        <Td py="1.5rem">
                          {currency === "Naira" && "₦"}
                          {currency === "Dollar" && "$"}
                          {currency === "Euro" && "€"}
                          {isVisible ? amount : "XXXXX.XX"}
                        </Td>
                      </Tr>
                    )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </section>
        ) : (
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            h="90vh"
            gap="2rem"
          >
            <NewUser text="asset" svg={NoAssetSvg} />

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
        )}
      </>
    )
  );
}
Assets.getLayout = function getLayout(page) {
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
