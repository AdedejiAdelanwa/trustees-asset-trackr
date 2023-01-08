import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// import { useRouter } from "next/router";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import HSBar from "react-horizontal-stacked-bar-chart";
import { faker } from "@faker-js/faker";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import DashBoardContainer from "../../components/DashboardLayout";
import MainHeader from "../../components/MainHeader";
import { AiOutlineBank, AiOutlineCar, AiOutlineStock } from "react-icons/ai";
import { BsCheck2, BsHouse } from "react-icons/bs";
import { BiBitcoin } from "react-icons/bi";
import { HiOutlineSelector } from "react-icons/hi";
import SideNav from "../../components/SideNavigation";
import Link from "next/link";
import {
  Button,
  Heading,
  Select,
  Spinner,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  VStack,
} from "@chakra-ui/react";
import SimpleWillCard from "../../components/SimpleWillCard";
import AuthWrapper from "../../components/AuthWrapper";
import { useRouter } from "next/router";
import { fetchUserAssets } from "../../redux/asset/assetActions";
import Image from "next/image";
import NoAssetSvg from "../../public/assets/no-asset.svg";
import { NewUser } from "../../components/NewUser";

const assetTypes = [
  { name: "₦ Naira Assets", value: "Naira" },
  { name: "$ Dollar Assets", value: "Dollar" },
  { name: "€ Euro Assets", value: "Euro" },
];

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Asset Performace",
    },
  },
};

const labels = ["January", "March", "May", "June"];

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: "#345C45",
      backgroundColor: "rgba(187, 241, 209, .6)",
    },
  ],
};

export default function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(assetTypes[0]);
  const { userDetails } = useSelector((state) => state.user);
  const { userAssets, userStatistics, assetDetails, loading } = useSelector(
    (state) => state.assets
  );
  const dispatch = useDispatch();
  const router = useRouter();
  const userToken = JSON.parse(localStorage.getItem("userToken"));
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

  const handleChangeFilterParam = (e) => {
    setAssetCurrencyFilter(e.target.value);
  };

  const totalAssetsValueArray = Object.entries(userStatistics).map((entry) => {
    return entry;
  });
  const currentTotalAssetValue = totalAssetsValueArray.map((aV) => {
    if (aV[0].includes(assetCurrencyFilter)) {
      //add comma after thousand
      return aV[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  });

  const newAssetDetailsArray = Object.entries(assetDetails)
    .map((entry) => {
      return entry[1];
    })
    .flat();

  const filteredFlatArray = newAssetDetailsArray.filter(
    (element) => element.currency === assetCurrencyFilter
  );
  const horizontalBarData = filteredFlatArray.map((en) => {
    const value =
      (Number(en.amount) /
        filteredFlatArray.reduce(
          (accum, { amount }) => accum + Number(amount),
          0
        )) *
      100;

    return {
      value,
      name: en.asset_name,
      description: `${value.toFixed(3)}%`,
      color:
        en.asset_name === "Bank Accounts"
          ? "#F9B353"
          : en.asset_name === "Real Estate"
          ? "#97A92E"
          : en.asset_name === "Stocks"
          ? "#9452A1"
          : "#BBF1D1",
    };
  });
  const fetchAssets = useCallback(() => {
    dispatch(fetchUserAssets(userToken));
  }, [dispatch, userToken]);

  useEffect(() => {
    if (!userToken) {
      router.push("/login");
    }
    fetchAssets();
  }, [fetchAssets, router, userToken]);

  return (
    userDetails && (
      <section className="main-content text-black">
        <h2 className="text-[2.8rem] font-bold">
          Hi {userDetails.othernames} {userDetails.surname[0]}. 👋🏼
        </h2>
        {userAssets.length > 0 ? (
          <>
            <div className="asset-figures flex justify-between sm:flex-col sm:mt-[1.8rem] items-center mt-[3.5rem]">
              <div>
                <h3 className="font-semibold text-[1.8rem]">Total Value</h3>
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
              </div>
              <div className=" text-[1.5rem] sm:mt-[1rem]">
                <Select
                  width={"7rem"}
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
              </div>
            </div>
            <div className="flex md:flex-col sm:flex-col justify-between">
              <div className="w-[44rem] md:w-[100%]">
                <div className="flex justify-between sm:mt-[2rem]">
                  <h2 className="font-bold text-[2rem]">Top Assets</h2>
                </div>
                <TableContainer mt={"1rem"}>
                  <Table
                    variant={"simple"}
                    textTransform="capitalize"
                    fontSize="1.5rem"
                    fontFamily={"Poppins"}
                  >
                    <Tbody>
                      {userAssets &&
                        filteredAssets.map(
                          ({ asset_name, amount, sn, currency }) => (
                            <Tr key={sn}>
                              <Td
                                py="1.5rem"
                                display="flex"
                                alignItems="center"
                              >
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
                                {amount}
                              </Td>
                            </Tr>
                          )
                        )}
                    </Tbody>
                  </Table>
                </TableContainer>
                <div className="flex justify-end pt-[1rem]">
                  <Link href="/dashboard/assets">
                    <span className=" text-[1.6rem] text-darkgreen cursor-pointer">
                      See all
                    </span>
                  </Link>
                </div>
              </div>
              <div className="w-[55rem] md:w-[100%]">
                <div className="flex justify-between sm:flex-col sm:mt-[2rem]">
                  <h2 className="text-[1.6rem] font-semibold">
                    Net worth History
                  </h2>
                  <p className="font-semibold text-[1.6rem]">
                    Value Change:
                    <span className=" text-green font-semibold ml-4">
                      200% &#8593;
                    </span>
                  </p>
                </div>
                <Line options={options} data={data} />
              </div>
            </div>
            <div className="mt-[4.4rem] sm:mt-[5rem]">
              <h3 className="font-semibold text-[1.8rem]">
                Asset Distribution
              </h3>
              <HSBar
                showTextIn
                showValueIn
                showTextWithValue
                height="5rem"
                id="hsbar"
                data={horizontalBarData}
              />
            </div>
          </>
        ) : (
          <VStack>
            <NewUser dev="dev" text="asset" svg={NoAssetSvg} />

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
          </VStack>
        )}

        <div className="mt-[4.4rem] sm:mt-[5rem]">
          <h3 className="font-semibold text-[2.8rem]">
            Recomended Estate Plans
          </h3>
          <div className="relative flex items-center overflow-x-auto space-x-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <SimpleWillCard key={num} />
            ))}
          </div>
        </div>
      </section>
    )
  );
}

Index.getLayout = function getLayout(page) {
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
