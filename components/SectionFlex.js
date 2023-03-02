import { Flex } from "@chakra-ui/react";

const SectionFlex = ({ children, height, sidePadding, bgColor }) => (
  <Flex
    h={["auto", height]}
    bg={bgColor}
    paddingLeft={sidePadding}
    paddingRight={sidePadding}
    fontFamily="Poppins"
    direction={["column", "row"]}
    alignItems="center"
    justifyContent={["space-around", "space-between"]}
  >
    {children}
  </Flex>
);
export default SectionFlex;
