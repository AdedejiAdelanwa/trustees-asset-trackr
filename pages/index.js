import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import Head from "next/head";
import Container from "../components/LandingPageShared/container";
import HeroBg from "../public/assets/hero-bg.png";
import loveIcon from "../public/assets/love.svg";
import securityIcon from "../public/assets/shield.svg";
import helpingHand from "../public/assets/helping-hand.svg";
import ValuationGroup from "../public/assets/valuation-group.svg";
import StockGroup from "../public/assets/stockie.png";
import BeneficiariesGroup from "../public/assets/beneficiaries-group.png";
import EstateGroup from "../public/assets/estateplan-group.png";
import {
  Box,
  Card,
  CardBody,
  VStack,
  Heading,
  Text,
  Button,
  HStack,
  Flex,
} from "@chakra-ui/react";
import SectionFlex from "../components/SectionFlex";
import TextBlock from "../components/TextBlock";
import ImageBlock from "../components/ImageBlock";
import CardWrapper from "../components/LandingPageShared/OfferingCard";
import Allaccordion from "../components/LandingPageShared/accordions";
export default function Home() {
  const cardData = [
    {
      icon: loveIcon,
      heading: "Peace of mind",
      hexCode: "#E4E9DF",
      textBody:
        "Eliminate all the worries associated with what happens to your assets in your absence. Mapp will sort it out.",
    },
    {
      icon: securityIcon,
      heading: "Security and Privacy",
      hexCode: "#ECF2CB",
      textBody:
        "Your privacy is important to us. All your data is secured by encryption to ensure confidentiality.",
    },
    {
      icon: helpingHand,
      heading: "Built for you",
      hexCode: "#E1F9EB",
      textBody: `We understand that everyone has different assets and needs. "Mapp" enables you to track it all - cash, equities, real estate, digital assets, and more!`,
    },
  ];

  return (
    <div>
      <Head>
        <title>Mapp | Meristem Trustees</title>
        <meta
          name="description"
          content="Seamlessly track your assets, designate beneficiaries and access estate planning products tailored to your needs."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <SectionFlex
          flexDir="column"
          bgImage={HeroBg.src}
          height="100vh"
          sidePadding={["1.5rem", "2rem", "8rem"]}
        >
          <VStack
            color="#323232"
            alignItems="start"
            w={["100%", "50%"]}
            spacing="2.5rem"
            justifyContent="space-around"
            pt="2rem"
          >
            <Heading
              fontFamily="Poppins"
              fontSize={["4rem", "5rem", "6rem"]}
              textTransform="uppercase"
            >
              Track, Organise and Transfer your Wealth
            </Heading>
            <Text fontSize={["1.4rem", "1.8rem"]} color="rgba(50, 50, 50, 0.8)">
              Seamlessly track your assets, designate beneficiaries and access
              estate planning products tailored to your needs.
            </Text>
            <Link href="/signup">
              <Button
                py={"2rem"}
                px="2rem"
                bg={"darkgreen"}
                color="white"
                fontSize={["1.4rem", "1.6rem"]}
              >
                Get Started
              </Button>
            </Link>
          </VStack>
          <VStack w={["100%", "45%"]}>
            <HStack justifyContent="space-between" w="100%">
              <Box w="55%">
                <Image src={ValuationGroup} alt="valuation group" />
              </Box>
              <Box
                w="40%"
                h="13rem"
                rounded="1rem"
                bgImage={"url('/assets/woman-happy-park.png')"}
                backgroundPosition="top"
                backgroundRepeat="no-repeat"
              ></Box>
            </HStack>
            <HStack justifyContent="space-between" w="100%">
              <Box
                w="25%"
                h="13rem"
                rounded="1rem"
                bgImage={"url('/assets/coins-stack.png')"}
                backgroundPosition="center"
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
              />

              <Box
                w="25%"
                h="13rem"
                rounded="1rem"
                bgImage={"url('/assets/hand-holding-house.png')"}
                backgroundPosition="center"
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
              />
              <Box
                w="40%"
                h="13rem"
                rounded="1rem"
                bgImage={"url('/assets/happy-black-family.png')"}
                backgroundPosition="center"
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
              />
            </HStack>
            <HStack justifyContent="space-between" w="100%">
              <Box
                w="25%"
                h="13rem"
                rounded="1rem"
                bgImage={"url('/assets/happy-oldman.png')"}
                backgroundPosition="center"
                backgroundSize="contain"
                backgroundRepeat="no-repeat"
              />
              <HStack
                w="70%"
                h="13rem"
                rounded="1rem"
                backgroundColor="#E6EAE8"
                justifyContent="space-between"
                p="1.2rem"
              >
                <VStack
                  color="#323232"
                  alignItems="start"
                  w={["100%", "60%"]}
                  justifyContent="space-between"
                  spacing="1rem"
                >
                  <Heading
                    fontFamily="Poppins"
                    fontSize={["1.2rem", "1.4rem", "1.6rem"]}
                    textTransform="uppercase"
                  >
                    asset plan for you
                  </Heading>
                  <Text
                    fontSize={["0.8rem", "1rem", "1.2rem"]}
                    color="rgba(50, 50, 50, 0.8)"
                  >
                    Everything of value can be put in a trust
                  </Text>
                  <Link href="/signup">
                    <Button
                      py={"1.2rem"}
                      px="1.2rem"
                      bg={"darkgreen"}
                      color="white"
                      fontSize={["0.8rem", "1rem", "1.2rem"]}
                    >
                      Sign up
                    </Button>
                  </Link>
                </VStack>
                <Box
                  w="30%"
                  h="100%"
                  bgImage={"url('/assets/graph-green.png')"}
                  backgroundPosition="center"
                  backgroundSize="contain"
                  backgroundRepeat="no-repeat"
                />
              </HStack>
            </HStack>
          </VStack>
        </SectionFlex>
        <SectionFlex flexDir="column" height="65vh" bgColor="white">
          <ImageBlock
            alignPlacing="flex-start"
            mainImage="/assets/downloader.png"
            floatingImage={StockGroup}
            rightPos="-40%"
            topPos="10%"
          />
          <TextBlock
            heading=" Keep track of your assets"
            text1=" Track your assets and monitor their growth seamlessly."
            text2="  With 'Mapp' the total value of your cash, investments, real
        estate and digital assets are organised and consolidated."
          ></TextBlock>
        </SectionFlex>
        <SectionFlex flexDir="column-reverse" height="65vh" bgColor="white">
          <TextBlock
            heading="assign beneficiaries"
            text1="Wealth Transfer is an essential part of your wealth journey, Don’t leave the individuals who depend on you financially stranded."
            text2="Designate beneficiaries to receive your assets in your absence. Different assets can be allocated to specific beneficiaries."
          />
          <ImageBlock
            alignPlacing="flex-end"
            mainImage="/assets/planning-couple.png"
            floatingImage={BeneficiariesGroup}
            rightPos="80%"
            topPos="5%"
          />
        </SectionFlex>
        <SectionFlex flexDir="column" height="65vh" bgColor="white">
          <ImageBlock
            alignPlacing="flex-start"
            mainImage="/assets/planImage.png"
            floatingImage={EstateGroup}
            rightPos="-40%"
            topPos="10%"
          />
          <TextBlock
            heading="Plan for those you love"
            text1="Give what you want, to whom you want, in the way and manner you want it."
            text2="'Mapp' helps you protect the interests of your loved ones by creating by an estate plan tailored to your needs."
          />
        </SectionFlex>
        <SectionFlex
          flexDir="column"
          height="65vh"
          sidePadding={["1.5rem", "2rem", "8rem"]}
          bgColor="white"
        >
          <Flex
            direction={["column", "row"]}
            gap="2rem"
            paddingTop={["2.5rem", "0rem"]}
            paddingBottom={["2.5rem", "0rem"]}
          >
            {cardData.map(({ icon, heading, textBody, hexCode }) => (
              <CardWrapper
                key={heading}
                icon={icon}
                heading={heading}
                textBody={textBody}
                hexCode={hexCode}
              />
            ))}
          </Flex>
        </SectionFlex>
        <SectionFlex
          flexDir="column"
          height="65vh"
          bgColor="#FBFBFB"
          sidePadding={["1.5rem", "2rem", "8rem"]}
        >
          <VStack
            h="100%"
            alignItems="center"
            w={["auto", "50%"]}
            paddingLeft={["1.5rem", "2rem", "8rem"]}
            paddingRight={["1.5rem", "2rem", "8rem"]}
            paddingTop={["3rem", "0rem"]}
            paddingBottom={["3rem", "0rem"]}
            justifyContent="space-around"
          >
            <Heading
              textTransform="uppercase"
              fontFamily="Poppins"
              fontSize={["2rem", "3.2rem", "3.6rem"]}
            >
              Frequently Asked Questions
            </Heading>
          </VStack>
          <VStack
            h="100%"
            alignItems="flex-start"
            w={["auto", "50%"]}
            // paddingLeft={["1.5rem", "2rem", "8rem"]}
            // paddingRight={["1.5rem", "2rem", "8rem"]}
            // paddingTop={["3rem", "0rem"]}
            // paddingBottom={["3rem", "0rem"]}
            justifyContent="space-around"
          >
            <Allaccordion />
          </VStack>
        </SectionFlex>
      </Container>
    </div>
  );
}
