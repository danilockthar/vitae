import { getSession, signIn } from "next-auth/client";
import Layout from "../components/Layout";
import styled from "styled-components";
import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();

  return (
    <Layout isLogin>
      <LoginBox>
        <h1 className={"label-text"}>
          Log in to Dashboard Creator Hello Next.js
        </h1>
        <p>A simple example repo</p>
        <div className="google-btn" onClick={() => signIn("google")}>
          <div className="google-icon-wrapper">
            <img
              className="google-icon"
              src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            />
          </div>
          <p className="btn-text">
            <b>Continue with Google</b>
          </p>
        </div>
      </LoginBox>
    </Layout>
  );
};

export default Index;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (session && session.token) {
    context.res.setHeader("Location", `${process.env.NEXTAUTH_URL}/app`);
    context.res.statusCode = 302;
  }

  return {
    props: {
      session,
      data: "",
    },
  };
}

export const LoginBox = styled.div`
  height: 80%;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-items: center;
  align-content: center;
  align-items: center;
  .label-text {
    font-family: "Inter", sans-serif;
    color: #333;
  }
  .google-btn {
    cursor: pointer;
    display: grid;
    grid-column-gap: 1vw;
    justify-self: center;
    grid-auto-flow: column;
    padding: 1vh 0 1vh 0;
    border-radius: 5px;
    width: 340px;
    height: fit-content;
    background-color: #4285f4;
    transition: 0.3s;
    box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.25);
    .google-icon-wrapper {
      width: 40px;
      height: 40px;
      border-radius: 2px;
      justify-self: right;
      background-color: #fff;
    }
    .google-icon {
      position: absolute;
      margin-top: 11px;
      margin-left: 11px;
      width: 18px;
      height: 18px;
    }
    .btn-text {
      float: right;
      margin: 11px 11px 0 0;
      color: #fff;
      font-size: 14px;
      letter-spacing: 0.2px;
      font-family: "Roboto";
    }
    &:hover {
      background: rgb(66 133 244 / 78%);
    }
    &:active {
      background: #1669f2;
    }
  }
`;
