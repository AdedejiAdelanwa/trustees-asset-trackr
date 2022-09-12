import { Fragment, useState } from "react";
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
import Image from "next/image";
import Writer from "../../public/assets/will-writer.png";
import { Select } from "@chakra-ui/react";

export const assetTypes = [{ name: "₦ Naira Assets" }, { name: "$ Dollar Assets" }];

const topAssets = [
  {
    name: "Bitcoin",
    value: "190020",
    symbol: (
      <BiBitcoin
        fontSize="2.5rem"
        className="bg-lightgreen p-1 rounded text-darkgreen"
      />
    ),
  },
  {
    name: "Real estate",
    value: "1900",
    symbol: (
      <BsHouse
        fontSize="2.5rem"
        className="bg-lightgreen p-1 rounded text-darkgreen"
      />
    ),
  },
  {
    name: "Bank Accounts",
    value: "100000",
    symbol: (
      <AiOutlineBank
        fontSize="2.5rem"
        className="bg-lightgreen p-1 rounded text-darkgreen"
      />
    ),
  },
  {
    name: "Stocks",
    value: "500000",
    symbol: (
      <AiOutlineStock
        fontSize="2.5rem"
        className="bg-lightgreen p-1 rounded text-darkgreen"
      />
    ),
  },
  {
    name: "Cars",
    value: "100000",
    symbol: (
      <AiOutlineCar
        fontSize="2.5rem"
        className="bg-lightgreen p-1 rounded text-darkgreen"
      />
    ),
  },
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

const horizontalBarData = [
  { value: 35, name: "Crypto", description: "35%", color: "#345C45" },
  { value: 25, name: "Bank Accounts", description: "25%", color: "#F9B353" },
  { value: 20, name: "Real Estate", description: "20%", color: "#97A92E" },
  { value: 15, name: "Stocks", description: "15%", color: "#9452A1" },
  { value: 5, name: "Others", description: "5%", color: "#BBF1D1" },
];
export default function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(assetTypes[0]);
  return (
    <section className="main-content text-black bg-white w-[80%] sm:w-[100%!important] md:w-[88%]   h-[90vh] p-[3rem] sm:px-[1.5rem] right-0 absolute overflow-auto">
      <h2 className="text-[2.8rem] font-bold">Hi Labake 👋🏼 </h2>
      <div className="asset-figures flex justify-between sm:flex-col sm:mt-[1.8rem] items-center mt-[3.5rem]">
        <div>
          <h3 className="font-semibold text-[1.8rem]">Total Value</h3>
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
        </div>
        <div className=" text-[1.5rem] sm:mt-[1rem]">
        <Select>
          {assetTypes.map((assetType, index) =>(
            <option key={index} value={assetType.name}>{assetType.name}</option>
          ))}
        </Select>
        </div>
      </div>
      <div className="flex md:flex-col sm:flex-col justify-between">
        <div className="w-[44rem] md:w-[100%]">
          <div className="flex justify-between sm:mt-[2rem]">
            <h2 className="font-bold text-[2rem]">Top Assets</h2>
            <Link href="/">
              <span className=" text-[1.8rem] text-darkgreen font-semibold cursor-pointer">
                + Add Asset
              </span>
            </Link>
          </div>
          <table className="table-auto w-[100%]  mt-[1rem]">
            <tbody className="text-[1.6rem]">
              {topAssets.map(({ name, value, symbol }) => (
                <tr
                  key={name}
                  className="h-[5rem] w-[100%] flex items-center border-b-2 border-lightgrey"
                >
                  <td className="w-[80%] sm:w-[60%] flex items-center">
                    {symbol}
                    {name}
                  </td>
                  <td className="w-[20%] sm:w-[40%] text-right font-semibold">
                    &#8358;{value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
            <h2 className="text-[1.6rem] font-semibold">Net worth History</h2>
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
        <h3 className="font-semibold text-[1.8rem]">Asset Distribution</h3>
        <HSBar
          showTextDown
          showValueDown
          height="7rem"
          id="hsbar"
          data={horizontalBarData}
        />
      </div>
      <div className="mt-[4.4rem] sm:mt-[5rem]">
        <h3 className="font-semibold text-[2.8rem]">Recomended Estate Plans</h3>
        <div className="relative flex items-center overflow-x-auto space-x-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
            <div
              key={num}
              className=" w-[30rem] sm:w-[40rem] md:w-[60rem] h-[30.5rem] m-[1rem] bg-white flex-grow flex-shrink-0 flex-[25rem] rounded-[5px] shadow-lg transition-all duration-200 ease-in-out hover:shadow-md hover:translate-y-[-1px] overflow-hidden"
            >
              <Image src={Writer} alt="describe" />
              <div className="p-[1.8rem]">
                <h5 className="text-[2.4rem]">Simple Will</h5>
                <p className="text-[1.4rem] font-normal">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
                  vulputate libero et velit interdum, ac aliquet odio mattis.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

Index.getLayout = function getLayout(page) {
  return (
    <DashBoardContainer>
      <MainHeader />
      <SideNav />
      {page}
    </DashBoardContainer>
  );
};
