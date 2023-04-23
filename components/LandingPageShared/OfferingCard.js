import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";

const CardWrapper = ({ icon, heading, textBody, hexCode }) => (
  <VStack
    w={["100%", "41.3rem"]}
    h={["auto", "27.4rem"]}
    bg={hexCode}
    justifyContent="space-around"
    alignItems="flex-start"
    rounded="1rem"
    padding="1.5rem"
    transitionDuration="300ms"
    _hover={{
      border: "1px solid #008145",
      boxShadow: "0 3.25px 2.4rem 0px rgba(151, 169, 46, 0.3)",
    }}
  >
    <Box boxSize="7rem">
      <Image src={icon.src} alt="trackAssetImage" />
    </Box>
    <Heading fontFamily="Poppins" fontSize={["1.6rem", "2rem"]}>
      {heading}
    </Heading>
    <Text fontSize={["1.4rem", "1.6rem"]} color="#323232">
      {textBody}
    </Text>
  </VStack>
);

export default CardWrapper;
