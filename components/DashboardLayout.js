import Head from "next/head";
import styled from "styled-components";

const LayoutWrapper = styled.div`
  position: relative;

  .main-content {
    position: absolute;
    right: 0;
    overflow: auto;
    color: "#323232";
    background-color: #ffffff;
    width: 80%;
    height: 90vh;
    padding: 3rem;
  }

  .side-nav {
    font-family: inherit;
    font-size: 1.6rem;
    .side-nav-item {
      height: 6rem;
      display: flex;
      align-items: center;
      padding-left: 2rem;
      cursor: pointer;
    }
  }
  svg {
    margin-right: 1.5rem;
  }

  #hsbar {
    margin-bottom: 1rem;
  }

  @media screen and (max-width: 800px) {
    .main-content {
      width: 88%;
    }
    .side-nav-item a {
      display: none;
    }
  }
  @media screen and (max-width: 414px) {
    .main-content {
      width: 100%;
      padding: 1.5rem;
      .asset-figures {
        align-items: flex-start;
      }
    }
  }
`;
const DashBoardContainer = ({ children }) => (
  <>
    <Head>
      <title>Asset Tracker | Meristem Trustees</title>
      <meta
        name="Meristem Trustees Asset Tracker"
        content="Easily keep track of your assets, designate beneficiaries and receive estate planning products tailored to your assets."
      />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <LayoutWrapper className="font-Poppins">{children}</LayoutWrapper>
  </>
);
export default DashBoardContainer;
