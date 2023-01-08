import { Button, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

export const NewUser = ({ text, svg }) => {
  return (
    <VStack spacing="2rem" className="font-Poppins" justifyContent="center">
      <Image src={svg} alt="No asset" />
      <Text fontSize="2.8rem" className="text-darkgreen font-bold">
        You haven’t added any {text} yet
      </Text>
      <Text fontSize="1.6rem">
        Your {text} will show up here once you’ve added them.
      </Text>
    </VStack>
  );
};
