import { useRef, useState } from "react";
import { useSession, signOut } from "next-auth/client";
import styled from "styled-components";
import { useClickAway } from "@geist-ui/react";
import { useBasics } from "../../lib/hooks/useBasics";
const TopHeader = () => {
  const [session] = useSession();
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const ref = useRef(null);
  const { expand, expandSideMenu } = useBasics();

  useClickAway(ref, () => {
    if (isMenuVisible) {
      setIsMenuVisible(false);
    } else {
      return;
    }
  });
  return (
    <Wrapper>
      <ExpandIcon onClick={expandSideMenu}> {expand ? `<` : `>`} </ExpandIcon>
      <Profile
        bg={session?.user?.image ?? ""}
        onClick={() => setIsMenuVisible(true)}
      >
        {" "}
        {isMenuVisible && (
          <div ref={ref} className={"menumodal"}>
            <a> Dashboard</a>
            <a
              href={`/api/auth/signout`}
              className={"as"}
              onClick={(e) => {
                e.preventDefault();
                signOut({ callbackUrl: process.env.BASEURL });
              }}
            >
              Cerrar sesión
            </a>
          </div>
        )}
      </Profile>
    </Wrapper>
  );
};

export default TopHeader;

export const Wrapper = styled.div`
  height: 10vh;
  width: 100%;
  padding: 0 2vw 0 0;
  background: white;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  grid-area: header;
  box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 15%);
  -webkit-box-shadow: 0px 0px 5px 0px rgb(0 0 0 / 15%);
  z-index: 1;
  .menumodal {
    width: 15vw;
    display: flex;
    z-index: 100;
    flex-direction: column;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
    height: fit-content;
    background: white;
    top: 9vh;
    right: 2vw;
    position: absolute;
    a {
      font-family: "Inter", sans-serif;
      position: relative;
      text-decoration: none;
      color: #333;
      font-size: 13px;
      padding: 10px 22px;
      outline: none;
      user-select: none;
      border-bottom: 1px solid #eaeaea;
      &:hover {
        background: #efefefb3;
      }
    }
  }
`;
export const Profile = styled.div`
  width: 2vw;
  height: 2vw;
  align-self: center;
  justify-self: end;
  border-radius: 50%;
  background-image: url("${(props) => props.bg}");
  background-position: center;
  background-size: cover;
  cursor: pointer;
`;

export const ExpandIcon = styled.div`
  width: 14px;
  height: 100%;
  background-color: #603eec;
  border-top-right-radius: 110px;
  border-bottom-right-radius: 110px;
  border-bottom: 0;
  display: grid;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #603eec;
  }
`;
