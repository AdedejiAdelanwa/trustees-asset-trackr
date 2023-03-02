import { Box, Image, VStack } from "@chakra-ui/react";

const ImageBlock = ({
  floatingImage,
  rightPos,
  topPos,
  mainImage,
  alignPlacing,
}) => (
  <VStack
    bg="inherit"
    w={["100%", "50%"]}
    h="100%"
    paddingLeft={["1.5rem", "2rem", "8rem"]}
    paddingRight={["1.5rem", "2rem", "8rem"]}
    paddingTop={["3rem", "0rem"]}
    paddingBottom={["3rem", "0rem"]}
    alignItems={alignPlacing}
    justifyContent="space-around"
  >
    <VStack pos="relative">
      <Box
        pos="relative"
        h={["30rem", "35rem"]}
        w={["25rem", "30rem"]}
        bg="lemonchiffon"
        rounded="1rem"
        bgImage={`url(${mainImage})`}
        backgroundPosition="center"
        backgroundSize="cover"
        backgroundRepeat="no-repeat"
      >
        <Box w="60%" pos="absolute" right={rightPos} top={topPos}>
          <Image src={floatingImage.src} alt="valuation group" />
        </Box>
      </Box>
    </VStack>
  </VStack>
);
export default ImageBlock;
