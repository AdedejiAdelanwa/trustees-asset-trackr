import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

const TextBlock = ({ children, heading, text1, text2 }) => (
  <VStack
    bg="#ECEDE5"
    h="100%"
    alignItems="center"
    w={["100%", "50%"]}
    paddingLeft={["1.5rem", "2rem", "8rem"]}
    paddingRight={["1.5rem", "2rem", "8rem"]}
    paddingTop={["3rem", "0rem"]}
    paddingBottom={["3rem", "0rem"]}
    justifyContent="space-around"
  >
    <VStack spacing="2.5rem" alignItems="start">
      <Heading
        fontFamily="Poppins"
        fontSize={["2rem", "2.4rem", "4rem"]}
        textTransform="uppercase"
      >
        {heading}
      </Heading>
      <Text fontSize={["1.4rem", "1.r6em"]} color="rgba(50, 50, 50, 0.8)">
        {text1}
      </Text>
      <Text fontSize={["1.4rem", "1.6rem"]} color="rgba(50, 50, 50, 0.8)">
        {text2}
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
  </VStack>
);
export default TextBlock;
