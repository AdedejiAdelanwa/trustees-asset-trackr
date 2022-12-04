import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import Head from "next/head";
import Container from "../components/LandingPageShared/container";
import heroImage from "../public/assets/Hero-Image.png";
import keep_track from "../public/assets/keepTrack.png";
import Cards from "../components/LandingPageShared/cards";
import peaceIcon from "../public/assets/peaceIcon.png";
import securityIcon from "../public/assets/securityIcon.png";
import builtInIcon from "../public/assets/builtInIcon.png";
import faqImage from "../public/assets/faqImage.png";
import trackAssetImage from "../public/assets/trackAssetImage.png";
import designate from "../public/assets/designateImage.png";
import plan from "../public/assets/planImage.png";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useEffect } from "react";

export default function Home() {
  const datas = [
    {
      picture: peaceIcon,
      word: "Peace of mind",
      instruction:
        "Set your affairs in order and you can sit back, assured that things are taken care of.",
    },
    {
      picture: securityIcon,
      word: "Security and Privacy",
      instruction:
        "All your data will be secured by powerful encryptions to ensure they stay private and secure.",
    },
    {
      picture: builtInIcon,
      word: "Built for you",
      instruction:
        "The app is flexible and allows you to track differentassets easily as well as suggesting tailored plans for you.",
    },
  ];

  useEffect(() => {
    localStorage.removeItem("userDetails");
  }, []);

  return (
    <div>
      <Head>
        <title>Asset Tracker | Meristem Trustees</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <main className="flex w-[100%] flex-col  font-Poppins">
          <div className=" w-full h-[100vh] sm:h-fit md:h-[50vh] px-[15.2rem]  md:px-[2rem] sm:bg-lightgreen flex items-center justify-between  sm:px-[1.5rem] bg-[url('/assets/fullVector.svg')] bg-no-repeat bg-cover md:bg-contain ">
            <div className="w-1/2 sm:w-full mt-[11rem] md:mt-[2rem] md:ml-[3rem] sm:ml-[0rem] sm:mt-[3rem]  ">
              <h1 className="w-[46rem] md:w-[37rem] sm:w-[35rem] text-[4.8rem] md:text-[3rem] sm:text-[3.5rem] text-darkgreen">
                Let’s help you <br /> track and organise your wealth
              </h1>
              <p className="w-[37rem] sm:w-[30rem]  text-black text-[1.5rem] ">
                Easily keep track of your assets, designate beneficiaries and
                receive estate planning products tailored to your assets.
              </p>
              <Link href="/signup">
                <div className="text-white text-[1.6rem] md:text-[1.1rem] sm:text-[1.6rem] w-[17rem] md:w-[14rem] sm:w-[17rem] rounded-[0.4rem] bg-darkgreen items-center py-[1rem] px-[3.7rem] my-[3rem] cursor-pointer">
                  Get Started
                </div>
              </Link>
            </div>
            <div className="w-1/2 md:w-[30rem] sm:hidden ml-[15.5rem] md:ml-[1rem] mt-[6rem] md:mt-[-1rem] ">
              <Image src={heroImage} alt="heroImage" />
            </div>
          </div>

          <div className="flex sm:flex-col mt-[10rem] h-[51rem] md:h-[40rem] sm:h-[68rem] px-[15.2rem] md:px-[2rem] sm:px-[1.5rem] justify-between bg-[url('/assets/firstBlob.svg')] bg-no-repeat [background-position-y:8.4rem] md:[background-position-y:1rem] md:[background-position-x:-23rem] sm:[background-position-y:7rem] sm:[background-position-x:-11rem]  sm:bg-contain  sm:w-[29rem] ">
            <div className="ml-[3rem] md:w-[37rem] sm:w-[36.5rem] md:ml-[0rem] sm:ml-[0rem]">
              <Image src={keep_track} alt="keep_track" />
            </div>
            <div className="flex flex-col w-[50.4rem] md:w-[34.8rem] sm:w-[33rem] h-[37vh] md:h-fit sm:h-[37vh]  my-[8rem] md:my-[6rem] sm:my-[0rem] space-y-5">
              <h2 className="font-semibold text-[2.8rem] md:text-[2rem] sm:text-[2.8rem] text-darkgreen ">
                Keep track of your assets
              </h2>
              <p className="text-[1.6rem] md:text-[1.1rem] sm:text-[1.6rem]">
                Automatically track your assets by connecting them with our
                asset tracker, and we’ll help you keep track of their details
                and how they’re growing.
              </p>
              <p className="text-[1.6rem]  md:text-[1.1rem] sm:text-[1.6rem]">
                Upload any other assets that cannot be tracked automatically
                such as Real Estate and you can easy organise and track your
                wealth in one place.
              </p>
              <Link href="/signup">
                <div className="sm:hidden text-white text-[1.6rem] md:text-[1.1rem] sm:text-[1.6rem] w-[17rem] md:w-[14rem] sm:w-[17rem] rounded-[0.4rem] bg-darkgreen items-center py-[1rem] px-[3.7rem] my-[6rem] cursor-pointer">
                  Get Started
                </div>
              </Link>
            </div>
          </div>

          <div className="flex sm:flex-col-reverse mt-[10rem] md:mt-[5rem] sm:mt-[3rem] h-[51rem] md:h-[40rem] sm:h-[68rem] px-[15.2rem] md:px-[2rem] sm:px-[1.5rem] justify-between bg-[url('/assets/secondBlob.svg')] bg-right sm:bg-right bg-no-repeat [background-position-y:1rem] md:[background-position-y:-6rem] md:[background-position-x:69rem] sm:[background-position-y:-2rem] sm:[background-position-x:30rem]  ">
            <div className="flex flex-col w-[50.4rem] md:w-[36rem] sm:w-[33rem] h-[37vh] md:h-fit sm:h-[37vh] my-[15rem] md:my-[7rem] sm:my-[0rem] space-y-5 ">
              <h3 className="font-semibold text-[2.8rem] md:text-[2rem] sm:text-[2.8rem] text-darkgreen sm:mt-[5rem] md:mt-[7rem] ">
                Designate beneficiaries
              </h3>
              <p className="text-[1.6rem] md:text-[1.1rem] sm:text-[1.6rem]">
                Designate beneficiaries to receive your assets in the event of
                demise. Different assets can be assigned to different
                beneficiaries.
              </p>
              <p className="text-[1.6rem] md:text-[1.1rem] sm:text-[1.6rem]">
                Allocate your wealth to appropriate benefriciaries and rest
                assured that things will be taken care off when you’re gone.
              </p>
              <Link href="/signup">
                <div className="sm:hidden text-white  text-[1.6rem] md:text-[1.1rem] sm:text-[1.6rem] w-[17rem] md:w-[14rem] sm:w-[17rem] rounded-[0.4rem] bg-darkgreen items-center py-[1rem] px-[3.7rem] my-[6rem] cursor-pointer">
                  Get Started
                </div>
              </Link>
            </div>
            <div className="md:w-[37rem] sm:w-[36.5rem] mt-[7.3rem]">
              <Image src={designate} alt="designate" />
            </div>
          </div>

          <div className="flex sm:flex-col mt-[10rem] sm:mt-[15rem] h-[51rem] md:h-[35rem] sm:h-[68rem] px-[15.2rem] md:px-[2rem]  sm:px-[1.5rem] justify-between bg-[url('/assets/thirdBlob.svg')] bg-no-repeat [background-position-y:3rem] md:[background-position-y:7rem] md:[background-position-x:-19rem] md:w-[78rem] sm:[background-position-y:5rem] sm:[background-position-x:-9rem]  sm:bg-contain  sm:w-[25rem] ">
            <div className="ml-[3rem] md:w-[37rem] sm:w-[36.5rem] md:ml-[0rem] sm:ml-[0rem]">
              <Image src={plan} alt="plan" />
            </div>
            <div className="flex flex-col w-[50.4rem] md:w-[34.8rem] sm:w-[33rem] h-[37vh] md:h-fit sm:h-[37vh]  my-[8rem] md:my-[6rem] sm:my-[0rem] space-y-5">
              <h4 className="font-semibold text-[2.8rem] md:text-[2rem] sm:text-[2.8rem] text-darkgreen ">
                Plan for when you’re gone
              </h4>
              <p className="text-[1.6rem] md:text-[1.1rem] sm:text-[1.6rem]  ">
                Who will get your wealth when you are gone? Who gets to cater
                for your loved ones when you are gone? These questions are best
                answered when you’re here.
              </p>
              <p className="text-[1.6rem] md:text-[1.1rem] sm:text-[1.6rem] ">
                We can help you by referring you to estate planning products
                tailored to you based on the assets we’re helping you track.
              </p>
              <Link href="/signup">
                <div className="sm:self-center  text-white text-[1.6rem] md:text-[1.1rem] sm:text-[1.6rem] w-[17rem] md:w-[14rem] sm:w-[17rem] rounded-[0.4rem] bg-darkgreen items-center py-[1rem] px-[3.7rem] my-[6rem] cursor-pointer  ">
                  Get Started
                </div>
              </Link>
            </div>
          </div>

          <div className="flex flex-col w-full sm:items-center bg-lightgreen mt-[10rem] sm:mt-[15rem] ">
            <div className="flex sm:flex-col md:mx-[1rem] justify-center gap-x-[8rem] md:gap-x-[2.5rem] ">
              {datas.map((data, i) => (
                <Cards
                  key={i}
                  picture={data.picture}
                  word={data.word}
                  instruction={data.instruction}
                />
              ))}
            </div>
            <Link href="/signup">
              <div className="text-white  text-[1.6rem] md:text-[1.1rem] sm:text-[1.6rem] w-[17rem] md:w-[14rem] sm:w-[17rem] rounded-[0.4rem] bg-darkgreen items-center py-[1rem] px-[3.7rem] mx-auto my-[4rem] cursor-pointer">
                Get Started
              </div>
            </Link>
          </div>

          <div className="flex sm:flex-col sm:items-center bg-white w-full justify-between px-[15.2rem] md:px-[2rem] my-[7rem] ">
            <div className="w-[78rem] md:w-[39rem] sm:w-[36rem] h-[73vh] md:h-[64vh] sm:h-[85vh] flex flex-col relative">
              <div className="flex">
                <div className="sm:hidden">
                  <Image src={faqImage} alt="faqImage" />
                </div>
                <p className="text-black font-semibold text-[2.8rem] md:text-[2rem] sm:text-[2.8rem] ml-[1rem] sm:ml-[0rem]  ">
                  Frequently Asked Questions
                </p>
              </div>

              <Accordion
                className="mt-[3.5rem] md:mt-[7.5rem] sm:mt-[1rem] border-y-1 border-y-[#D0CDCD]"
                allowToggle
              >
                {[...Array(5)].map((num) => (
                  <AccordionItem key={`accord-${num}`} py="1rem">
                    {({ isExpanded }) => (
                      <>
                        <h2>
                          <AccordionButton>
                            <Box
                              flex="1"
                              textAlign="left"
                              className="font-semibold text-[2rem] md:text-[1.1rem] sm:text-[1.6rem]"
                            >
                              What is the process for transfering assets to
                              beneficiaries?
                            </Box>
                            {isExpanded ? (
                              <FiMinus fontSize="1.4rem" />
                            ) : (
                              <FiPlus fontSize="1.4rem" />
                            )}
                          </AccordionButton>
                        </h2>
                        <AccordionPanel
                          pb={4}
                          className="w-[70rem] md:w-[39rem] sm:w-[33rem] text-[1.6rem] md:text-[1rem] sm:text-[1rem]"
                        >
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Nunc vulputate libero et velit interdu, ac
                          aliquet odio mattis. Class aptent taciti sociosqu ad
                          litora torquent per conubia nostra, per inceptos
                          himenaeos.
                        </AccordionPanel>
                      </>
                    )}
                  </AccordionItem>
                ))}
              </Accordion>

              <Link href="/faqs">
                <div className="text-darkgreen text-[1.6rem] md:text-[1.1rem] sm:text-[1.6rem] w-[17rem] md:w-[14rem] sm:w-[17rem] rounded-[0.4rem] border-2 border-darkgreen py-[1rem] px-[3.7rem] absolute bottom-0 left-0 text-darkgreen text-[1.6rem] cursor-pointer">
                  Open FAQ
                </div>
              </Link>
            </div>
            <div className="flex flex-col w-[37rem] md:w-[31rem] sm:w-[35rem] sm:mt-[8rem] h-[62vh] md:h-[55vh] sm:h-[62vh] p-[2rem] bg-lightgreen rounded-[1rem] border-1 border-darkgreen shadow-lg">
              <Image
                src={trackAssetImage}
                alt="trackAssetImage"
                className="rounded-[1em] "
              />

              <h2 className="w-[32rem] md:w-[27rem] sm:w-[29rem] my-8 text-black text-[2.8rem] md:text-[2.3rem] sm:text-[2.8rem] ">
                Start tracking your assets and securing the future today.
              </h2>
              <Link href="/assets">
                <div className="text-white text-[1.6rem] md:text-[1.1rem] sm:text-[1.6rem] w-[17rem] md:w-[14rem] sm:w-[17rem] rounded-[0.4rem] bg-darkgreen items-center py-[1rem] px-[3.7rem] cursor-pointer mb-5">
                  Get Started
                </div>
              </Link>
            </div>
          </div>
        </main>
      </Container>
    </div>
  );
}
