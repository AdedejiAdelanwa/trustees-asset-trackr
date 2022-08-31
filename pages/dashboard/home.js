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
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import DashBoardContainer from "../../components/DashboardLayout";
import MainHeader from "../../components/MainHeader";
import { Listbox, Transition } from "@headlessui/react";
import { AiOutlineBank, AiOutlineCar, AiOutlineStock } from "react-icons/ai";
import { BsCheck2, BsHouse } from "react-icons/bs";
import { BiBitcoin } from "react-icons/bi";
import { HiOutlineSelector } from "react-icons/hi";
import SideNav from "../../components/SideNavigation";
import Link from "next/link";

const assetTypes = [{ name: "₦ Naira Assets" }, { name: "$ Dollar Assets" }];

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
      position: 'top',
    },
    title: {
      display: false,
      text: 'Asset Performace',
    },
  },
};

const labels = ['January', 'March', 'May', 'June'];

const data = {
  labels,
  datasets: [
    {
      fill: true,
       label: '',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 100 })),
      borderColor: '#345C45',
      backgroundColor: 'rgba(187, 241, 209, .6)',
    },
  ],
};


export default function Index() {
  const [isVisible, setIsVisible] = useState(false);
  const [selected, setSelected] = useState(assetTypes[0]);
  return (
    <section className="main-content text-black bg-white w-[80%] h-[90vh] p-[3rem] right-0 absolute overflow-auto">
      <h2 className="text-[2.8rem] font-bold">Hi Labake 👋🏼 </h2>
      <div className="asset-figures flex justify-between items-center mt-[3.5rem]">
        <div>
          <h3 className="font-semibold text-[1.8rem]">Total Value</h3>
          <div className="flex items-center">
            <p className="text-[3rem] mr-2 font-normal">
              &#8358;{isVisible ? "40203930.00" : "XXXXX.XX"}{" "}
            </p>
            <small
              className="text-[2.5rem] cursor-pointer"
              onClick={() => setIsVisible(!isVisible)}
            >
              {!isVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </small>
          </div>
        </div>
        <div className="w-72 text-[1.5rem] sm:mt-[1rem]">
          <Listbox value={selected} onChange={setSelected}>
            <div className="relative mt-1">
              <Listbox.Button className="relative w-full cursor-default  rounded-md border-2 border-black bg-white py-4 pl-3 text-left">
                <span className="block truncate">{selected.name}</span>
                <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                  <HiOutlineSelector
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-[1.5rem]">
                  {assetTypes.map((assetType, assetTypeIdx) => (
                    <Listbox.Option
                      key={assetTypeIdx}
                      className={({ active }) =>
                        `relative cursor-default select-none py-2 pl-10 pr-4 ${
                          active
                            ? "bg-amber-100 text-amber-900"
                            : "text-gray-900"
                        }`
                      }
                      value={assetType}
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={`block truncate ${
                              selected ? "font-medium" : "font-normal"
                            }`}
                          >
                            {assetType.name}
                          </span>
                          {selected ? (
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                              <BsCheck2
                                className="h-5 w-5"
                                aria-hidden="true"
                              />
                            </span>
                          ) : null}
                        </>
                      )}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        </div>
      </div>
      <div className="flex sm:flex-col justify-between">
        <div className="w-[44rem] sm:w-[100%]">
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
        <div className="w-[55rem] sm:w-[100%]">
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
