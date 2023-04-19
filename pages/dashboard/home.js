import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/user/userSlice";
// import { useRouter } from "next/router";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Doughnut, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import DashBoardContainer from "../../components/DashboardLayout";
import MainHeader from "../../components/MainHeader";
import {
  AiOutlineBank, AiOutlinePartition, AiOutlineWallet, AiOutlineStock, AiOutlineBarcode,
  AiOutlineAreaChart,
  AiOutlineBulb,
  AiOutlineApartment,
  AiOutlineApi,
  AiOutlineAudit,
  AiOutlineGift,
  AiOutlineUser
} from "react-icons/ai";
import { BsWindowDash, BsHouse } from "react-icons/bs";
import SideNav from "../../components/SideNavigation";
import Link from "next/link";
import {
  Button,
  Select,
  Table,
  TableContainer,
  Tbody,
  Td,
  Tr,
  VStack,
} from "@chakra-ui/react";
import SimpleWillCard from "../../components/SimpleWillCard";
import AuthWrapper from "../../components/AuthWrapper";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import {
  fetchAssetCategories,
  fetchUserAssets,
} from "../../redux/asset/assetActions";
//import Image from "next/image";
import NoAssetSvg from "../../public/assets/no-asset.svg";
import { NewUser } from "../../components/NewUser";
import { estatePlans } from "../../util";

const assetTypes = [
  { name: "₦ Naira Assets", value: "Naira" },
  { name: "$ Dollar Assets", value: "Dollar" },
  { name: "€ Euro Assets", value: "Euro" },
];

ChartJS.register(
  ArcElement,
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
  maintainAspectRatio: false,
};

const labels = ["January", "March", "May", "June"];

const data = {
  labels,
  datasets: [
    {
      fill: true,
      label: "",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: "#008145",
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
  const donutDataLabels = filteredFlatArray.map((item) => item.asset_name);
  const donutData = filteredFlatArray.map((item) => {
    const value =
      (Number(item.amount) /
        filteredFlatArray.reduce(
          (accum, { amount }) => accum + Number(amount),
          0
        )) *
      100;
    return value.toFixed(2);
  });
  const donutColors = filteredFlatArray.map((item) => {
    let n = (Math.random() * 0xfffff * 1000000).toString(16);
    return "#" + n.slice(0, 6);
  });

  const fetchAssets = useCallback(() => {
    dispatch(fetchUserAssets(userToken));
  }, [dispatch, userToken]);

  const getAssetCategories = useCallback(async () => {
    let token;
    if (userToken) {
      token = jwt_decode(userToken);
      if (Date.now() >= token.exp * 1000) {
        dispatch(logout());
      } else {
        dispatch(fetchAssetCategories(userToken));
      }
    }
  }, [dispatch, userToken]);

  useEffect(() => {
    if (!userToken) {
      router.push("/login");
    }
    fetchAssets();
    getAssetCategories();
  }, [fetchAssets, getAssetCategories, router, userToken]);
  return (
    userDetails && (
      <section className="main-content text-black">
        <h2 className="text-[2.8rem] font-bold">
          Hi {userDetails.othernames || ''} {userDetails.surname[0] || ''}. 👋🏼
        </h2>
        {userAssets && userAssets.length > 0 ? (
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
                                {asset_name === "Cash" && (
                                  <AiOutlineBarcode
                                    fontSize="2.5rem"
                                    className="bg-lightgreen p-1 rounded text-darkgreen"
                                  />
                                )}
                                 {asset_name === "Equities" && (
                                  <AiOutlinePartition
                                    fontSize="2.5rem"
                                    className="bg-lightgreen p-1 rounded text-darkgreen"
                                  />
                                )}

                                {asset_name === "Fintech Wallets" && (
                                  <BsWindowDash
                                    fontSize="2.5rem"
                                    className="bg-lightgreen p-1 rounded text-darkgreen"
                                  />
                                )}

                                {asset_name === "Fixed Income/Money Market" && (
                                  <AiOutlineAreaChart
                                    fontSize="2.5rem"
                                    className="bg-lightgreen p-1 rounded text-darkgreen"
                                  />
                                )}
                                {asset_name === "Intellectual Property" && (
                                  <AiOutlineBulb
                                    fontSize="2.5rem"
                                    className="bg-lightgreen p-1 rounded text-darkgreen"
                                  />
                                )}
                                {asset_name === "Alternate Assets(Cryptocurrency and NFTs)" && (
                                  <AiOutlineApartment
                                    fontSize="2.5rem"
                                    className="bg-lightgreen p-1 rounded text-darkgreen"
                                  />
                                )}
                                {asset_name === "Alternate Assets(Digital Platform)" && (
                                  <AiOutlineApi
                                    fontSize="2.5rem"
                                    className="bg-lightgreen p-1 rounded text-darkgreen"
                                  />
                                )}
                                {asset_name === "Personal Assets" && (
                                  <AiOutlineAudit
                                    fontSize="2.5rem"
                                    className="bg-lightgreen p-1 rounded text-darkgreen"
                                  />
                                )}
                                {asset_name === "Pension" && (
                                  <AiOutlineGift
                                    fontSize="2.5rem"
                                    className="bg-lightgreen p-1 rounded text-darkgreen"
                                  />
                                )}
                                {asset_name === "Life Insurance" && (
                                  <AiOutlineUser
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
                <div className="flex justify-end pt-[1rem]">
                  <Link href="/dashboard/assets">
                    <span className=" text-[1.6rem] text-darkgreen cursor-pointer">
                      See all
                    </span>
                  </Link>
                </div>
              </div>
              <div className="w-[55rem] md:w-[100%] h-[35rem] md:h-[auto]">
                <Doughnut
                  options={{
                    cutout: "60%",
                    maintainAspectRatio: false,
                  }}
                  data={{
                    labels: donutDataLabels,
                    datasets: [
                      {
                        label: "My First Dataset",
                        data: donutData,
                        backgroundColor: donutColors,
                        hoverOffset: 4,
                      },
                    ],
                  }}
                />
              </div>
            </div>
            <div className="w-[100%]  h-[40rem] md:h-[auto]">
              <div className="flex justify-between sm:flex-col sm:mt-[2rem]">
                <h2 className="text-[1.6rem] font-semibold">
                  Net worth History
                </h2>
                
              </div>
              <Line options={options} data={data} />
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
        {/* 
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
            </div> */}

        <div className="mt-[4.4rem] sm:mt-[5rem]">
          <h3 className="font-semibold text-[2.8rem]">
           PROTECT YOUR LOVED ONES
          </h3>
          <div className="relative flex items-center overflow-x-auto space-x-8">
            {estatePlans.map((estatePlan, i) => (
              <SimpleWillCard key={estatePlan.sn} estatePlan={estatePlan} />
            ))}
          </div>

          <div>
          <h3 className="mt-[4.4rem] sm:mt-[5rem] text-[1.5rem] text-center">
            Need Help Selecting An Estate Plan, Click 
            <Link href="https://form.typeform.com/to/D0xUBFsk"> here </Link> to take an Assessment
              <br />You can also call – 07025640071  Or Send an email to mapp@meristemng.com
            </h3>
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
