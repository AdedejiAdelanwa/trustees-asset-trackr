import { Fragment, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import DashBoardContainer from "../../components/DashboardLayout";
import MainHeader from "../../components/MainHeader";

import { Listbox, Transition } from "@headlessui/react";
import { BsCheck2 } from "react-icons/bs";
import { HiOutlineSelector } from "react-icons/hi";
import SideNav from "../../components/SideNavigation";

const assetTypes = [{ name: "₦ Naira Assets" }, { name: "$ Dollar Assets" }];

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
        <div className="w-72 text-[1.5rem]">
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
