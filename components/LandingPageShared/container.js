import { Box } from "@chakra-ui/react";
import Image from "next/dist/client/image";
import Link from "next/dist/client/link";
import Meristem_logo from "../../public/assets/Meristemlogo.png";
import ExternalHeader from "../ExternalHeader";
import Footer from "../Footer";

const Container = ({ children }) => {
  return (
    <Box pos="relative">
      <ExternalHeader />
      {children}
      <Footer />
    </Box>
  );
};
export default Container;
