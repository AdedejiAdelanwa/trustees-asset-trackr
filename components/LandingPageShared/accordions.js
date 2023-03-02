import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from "@chakra-ui/react";

const Allaccordion = () => (
  <Accordion allowToggle w="100%">
    <AccordionItem padding={["1.0rem", "1.5rem 0"]}>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Heading fontSize={["1.4rem", "1.6rem"]} fontFamily="Poppins">
            I have a living trust already; do i also need a will?
          </Heading>
        </Box>

        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel fontSize={["1.3rem", "1.6rem"]} pb={4}>
        This is largely dependent on your estate planning objective and the kind
        of assets owned, some assets may be suitably planned by writing a will.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem padding={["1.0rem", "1.5rem 0"]}>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Heading fontSize={["1.4rem", "1.6rem"]} fontFamily="Poppins">
            When should i establish a trust?
          </Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel fontSize={["1.3rem", "1.6rem"]} pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdu, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem padding={["1.0rem", "1.5rem 0"]}>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Heading fontSize={["1.4rem", "1.6rem"]} fontFamily="Poppins">
            Who owns the property in a Trust.?
          </Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel fontSize={["1.3rem", "1.6rem"]} pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdu, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem padding={["1.0rem", "1.5rem 0"]}>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Heading fontSize={["1.4rem", "1.6rem"]} fontFamily="Poppins">
            What kind of assets are important to establish a trust?
          </Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel fontSize={["1.3rem", "1.6rem"]} pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdu, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </AccordionPanel>
    </AccordionItem>

    <AccordionItem padding={["1.0rem", "1.5rem 0"]}>
      <AccordionButton>
        <Box flex="1" textAlign="left">
          <Heading fontSize={["1.4rem", "1.6rem"]} fontFamily="Poppins">
            Can a beneficiary withdraw money from a trust?
          </Heading>
        </Box>
        <AccordionIcon />
      </AccordionButton>

      <AccordionPanel fontSize={["1.3rem", "1.6rem"]} pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc vulputate
        libero et velit interdu, ac aliquet odio mattis. Class aptent taciti
        sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
      </AccordionPanel>
    </AccordionItem>
  </Accordion>
);

export default Allaccordion;
