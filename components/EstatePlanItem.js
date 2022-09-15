import { Flex } from "@chakra-ui/react";
import React from "react";

export default function EstatePlanItem({ children }) {
  return (
    <Flex
      bg="white"
      p="1.5rem"
      alignItems={"center"}
      w={{ base: "30rem", lg: "50rem" }}
      borderRadius="2px"
      boxShadow={"lg"}
      textTransform="capitalize"
    >
      {children}
    </Flex>
  );
}
