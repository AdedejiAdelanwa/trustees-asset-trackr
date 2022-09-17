import {
    Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Image,
  Input,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import styled from "styled-components";
import DashBoardContainer from "../../components/DashboardLayout";
import MainHeader from "../../components/MainHeader";
import SideNav from "../../components/SideNavigation";
import Lego from "../../public/assets/user-icon.png";

const FormWrapper = styled.form`
  label {
    display: block;
    cursor: pointer;
  }
  label.upload-label {
    color: green;
    font-weight: bold;
  }
  label:hover {
    color: black;
  }
  #upload-photo {
    opacity: 0;
    position: absolute;
    z-index: -1;
  }
`;

export default function Settings() {
  return (
    <section className="main-content text-black bg-white w-[80%] sm:w-[100%!important] md:w-[88%]   h-[90vh] p-[3rem] sm:px-[1.5rem] right-0 absolute overflow-auto">
      <h2 className="text-[2.8rem] font-bold">Settings</h2>
      <Tabs mt={"3rem"} fontSize="1.6rem">
        <TabList borderBottomColor={"grey"}>
          <Tab
            _selected={{ color: "green", borderBottomColor: "green" }}
            fontSize="1.6rem"
          >
            Profile
          </Tab>
          <Tab
            _selected={{ color: "green", borderBottomColor: "green" }}
            fontSize="1.6rem"
          >
            Security
          </Tab>
          <Tab
            _selected={{ color: "green", borderBottomColor: "green" }}
            fontSize="1.6rem"
          >
            Verify Identity
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <HStack mt="2rem">
              <Image
                borderRadius={"full"}
                boxSize={{ base: "8rem", lg: "15rem" }}
                src="https://bit.ly/dan-abramov"
                alt="user"
                mr="1rem"
              />
              <Stack>
                <FormWrapper>
                  <label htmlFor="upload-photo" className="upload-label">
                    Change Image
                    <input
                      type={"file"}
                      name="user-photo"
                      accept={[".png,.jpg,.jpeg"]}
                      id="upload-photo"
                    />
                  </label>
                  <Button variant={"unstyled"} color="red" fontSize={"1.5rem"}>
                    Delete Image
                  </Button>
                </FormWrapper>
              </Stack>
            </HStack>
            <Box>
                <Text>First Name</Text>
                
            </Box>
          </TabPanel>
          <TabPanel>
            <p>He</p>
          </TabPanel>
          <TabPanel>
            <p>He</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </section>
  );
}
Settings.getLayout = function getLayout(page) {
  return (
    <DashBoardContainer>
      <MainHeader />
      <SideNav />
      {page}
    </DashBoardContainer>
  );
};
