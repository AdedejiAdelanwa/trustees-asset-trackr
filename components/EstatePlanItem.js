import { Flex } from "@chakra-ui/react";
import React from "react";

export default function EstatePlanItem({ children, onOpen, width="50rem"}) {
  return (
    <Flex
      bg="white"
      p="1.5rem"
      alignItems={"center"}
      w={{ base: "30rem", lg: width }}
      borderRadius="2px"
      boxShadow={"lg"}
      textTransform="capitalize"
      onClick={onOpen}
      cursor="pointer"
    >
      {children}
    </Flex>
  );
}
