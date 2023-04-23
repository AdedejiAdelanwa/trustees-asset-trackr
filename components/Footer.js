import { Text } from "@chakra-ui/react";
import React from "react";

export default function Footer() {
  return (
    <footer className="flex w-full bg-[#F3F3F3] text-center text-black  h-[6vh] sm:px-[1.5rem] px-[15.2rem] items-center justify-center ">
      <Text fontFamily="Poppins" fontSize="1.2rem">
        © {new Date().getFullYear()} Copyright: Meristem
      </Text>
    </footer>
  );
}
