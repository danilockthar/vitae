import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";
import Layout from "../../../components/Layout";
import { useInfoPersonal } from "../../../lib/hooks/useInfoPersonal";
import { Template } from "../../../lib/interface";
import { useRouter } from "next/router";

const Plantillas = () => {
  const { setTemplate, template } = useInfoPersonal();
  const router = useRouter();

  const pickTemplate = (template: Template) => {
    setTemplate(template);
    router.push("/app/cv/content");
  };
  return (
    <Layout>
      <Content>
        <h2> Plantillas</h2>
        <TemplatePreview onClick={() => pickTemplate(Template.BASIC)}>
          basic
        </TemplatePreview>
      </Content>
    </Layout>
  );
};

export default Plantillas;

export const Content = styled.div`
  padding: 2vw;
  height: 100vh;
`;

export const TemplatePreview = styled.div`
  width: 4vw;
  height: 6vh;
  border: 1px solid dodgerblue;
`;
