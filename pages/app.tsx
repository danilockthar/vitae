import { useRef, useState } from "react";
import styled from "styled-components";
import Layout from "../components/Layout";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useSession } from "next-auth/client";
import { useRouter } from "next/router";
import PreviewPage from "../components/Preview";

export default function AppHome() {
  const [session, loading] = useSession();

  const [isTinyMounted, setIsTinyMounted] = useState(false);
  const [name, setName] = useState("");
  const router = useRouter();
  const editorRef = useRef(null);
  const [isLoadingEditor, setIsLoadingEditor] = useState(false);

  const blobToSaveAs = (fileName: string, blob: Blob) => {
    try {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        link.setAttribute("href", url);
        link.setAttribute("download", fileName);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (e) {
      console.error("BlobToSaveAs error", e);
    }
  };
  const getpdf = () => {
    axios({
      method: "post",
      url: "/api/hello",
      data: {
        name: "Daniel Arroyo",
      },
    })
      .then(function (response) {
        var bytes = new Uint8Array(response.data.pdf.data);
        const blob = new Blob([bytes], {
          type: "application/pdf",
        });
        blobToSaveAs("ttest", blob);

        console.log(response);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  if (loading) {
    return (
      <Layout>
        <Content>
          <h1> LOADING..111. </h1>
        </Content>
      </Layout>
    );
  }
  if (!session) {
    router.push("/");
    return (
      <Layout>
        <Content>
          <h1> LOADING... </h1>
        </Content>
      </Layout>
    );
  }
  return (
    <Layout>
      <Content>
        <div></div>
      </Content>
    </Layout>
  );
}

export const Content = styled.div`
  height: 200vh;
  position: relative;
  padding: 2vh 2vw;
  width: 100%;
  overflow-y: scroll;
`;
export const Paper = styled.div`
  // width: ${210 / 2.25}mm;
  // height: ${297 / 2.25}mm;
  width: ${210}mm;
  height: ${297}mm;
  background: #eaeaea;
  padding: 2vw;
  position: relative;
  -ms-zoom: 0.4;
  -moz-transform: scale(0.4);
  -moz-transform-origin: 0 0;
  -o-transform: scale(0.4);
  -o-transform-origin: 0 0;
  -webkit-transform: scale(0.4);
  -webkit-transform-origin: 0 0;
`;
export const EditorWrapper = styled.div``;
