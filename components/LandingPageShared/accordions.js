import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Heading,
} from "@chakra-ui/react";

const faqs = [
  {
    faq: "When should I establish a trust?",
    answer:
      "when you have amassed wealth to an extent, with an intent to transfer it to your beneficiaries",
  },
  {
    faq: "Who owns the property in a Trust?",
    answer:
      "By law the assets in a trust are owned by the trustee, however such ownership is restricted by the terms of the trust and legal constraints.",
  },
  {
    faq: "What kind of assets are important to establish a trust?",
    answer: "Everything of value can be put in a trust.",
  },
  {
    faq: "Can a beneficiary withdraw money from a trust?",
    answer:
      "A beneficiary can only access the trust fund in accordance with the provision of the trust deed.",
  },
  {
    faq: "Will I have control over a trust i set up?",
    answer:
      "Yes, however the extent of control is as provided by applicable law and the trust deed.",
  },
  {
    faq: "I have a living trust already; do i also need a will?",
    answer:
      "This is largely dependent on your estate planning objective and the kind of assets owned, some assets may be suitably planned by writing a will.",
  },
  {
    faq: "Are the Trustee Subject to Any Rules or Regulations?",
    answer:
      "Yes, The Trustee is subject to statutes, common law and judicial pronouncements on the subject of trust",
  },
  // {
  //   faq: "Can I have multiple trusts?",
  //   answer:
  //     "Yes, as long as those trust do not touch on the same subject matter.",
  // },
  // {
  //   faq: "What is the process of transferring assets to beneficiaries?",
  //   answer: "Through a Will, a deed of gift or a Trust.",
  // },
  // {
  //   faq: "What kind of assets are important to track?",
  //   answer: "Everything of value can be put in a trust",
  // },
  // {
  //   faq: "Why should I set up an asset tracking account when I already have an Estate Plan?",
  //   answer:
  //     "Our asset tracking service gives you the opportunity to view all your assets, no matter the type and wherever they are. It also gives your beneficiary an idea of what your assets are, and where they may be found. This is relevant for the purpose of processing Letters of Administration for example.",
  // },
  // {
  //   faq: "What are Real Estate properties",
  //   answer:
  //     "Real estate properties include lands and things permanently attached to it, such as houses.",
  // },
  // {
  //   faq: "What are Stocks?",
  //   answer:
  //     "Stocks are a type of security that gives stockholders a share of ownership in a company. Stocks also are called “equities or shares.”",
  // },
];

const Allaccordion = () => (
  <Accordion allowToggle w="100%">
    {faqs.map(({ faq, answer }, i) => (
      <AccordionItem key={i} padding={["1.0rem", "1.5rem 0"]}>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Heading fontSize={["1.4rem", "1.6rem"]} fontFamily="Poppins">
              {faq}
            </Heading>
          </Box>
          <AccordionIcon />
        </AccordionButton>

        <AccordionPanel fontSize={["1.3rem", "1.6rem"]} pb={4}>
          {answer}
        </AccordionPanel>
      </AccordionItem>
    ))}
  </Accordion>
);

export default Allaccordion;
