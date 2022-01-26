import { useState } from "react";
import Head from "next/head";
import styled from "styled-components";
import Header from "../Header";
import TopHeader from "../TopHeader";
import { useBasics } from "../../lib/hooks/useBasics";

interface Props {
  children?: any;
  title?: string;
  isLogin?: boolean;
}

const Layout: React.FunctionComponent<Props> = ({
  children,
  title,
  isLogin,
}) => {
  const { expand, size } = useBasics();
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <meta charSet="utf-8" />
        <meta name="description" content="EDITORS" />
        <meta property="og:site_name" content="Editors" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,400;1,500&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link href="/fonts/style.css" rel="stylesheet" />
        <title>{title}</title>
      </Head>
      <Space expand={expand}>
        <TopHeader />
        <Header />
        {children}
      </Space>
    </div>
  );
};

export default Layout;

export const Space = styled.div`
  display: grid;
  grid-template-columns: ${(props) => (props.expand ? "16vw 1fr" : "5vw 1fr")};
  grid-template-rows: 10vh 1fr;
  height: 100vh;
  grid-template-areas:
    "side header"
    "side content";
`;
