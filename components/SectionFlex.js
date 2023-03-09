import { Flex } from "@chakra-ui/react";

const SectionFlex = ({
  children,
  height,
  sidePadding,
  bgColor,
  flexDir,
  bgImage,
}) => (
  <Flex
    h={["auto", height]}
    bg={bgColor}
    backgroundImage={`url(${bgImage})`}
    paddingLeft={sidePadding}
    paddingRight={sidePadding}
    fontFamily="Poppins"
    direction={[flexDir, "row"]}
    alignItems="center"
    justifyContent={["space-around", "space-between"]}
  >
    {children}
  </Flex>
);
export default SectionFlex;
