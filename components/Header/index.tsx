import { useCallback, useEffect, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/client";
import styled from "styled-components";
import axios from "axios";
import { Spin, Tooltip } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import {
	FaGraduationCap,
	FaInfoCircle,
	FaLanguage,
	FaCloudDownloadAlt,
} from "react-icons/fa";
import { BsCardList, BsTools } from "react-icons/bs";
import { useInfoPersonal } from "../../lib/hooks/useInfoPersonal";
import { useBasics } from "../../lib/hooks/useBasics";
import { StepsEnum } from "../../lib/interface";
import { useExperience } from "../../lib/hooks/useExperience";
import { useEducation } from "../../lib/hooks/useEducation";
import { useSkills } from "../../lib/hooks/useSkills";
import { basicsSlice } from "../../lib/reducers/utils-reducer";
import { RootStateOrAny, useSelector } from "react-redux";

const Header = () => {
	const [session, loading] = useSession();
	const [isLoading, setIsLoading] = useState(false);
	const [isMenuVisible, setIsMenuVisible] = useState(false);
	const { template, personalInfo } = useInfoPersonal();
	const { experiences } = useExperience();
	const { education } = useEducation();
	const { skills } = useSkills();
	const { step, expand } = useSelector(
		(state: RootStateOrAny) => state.basics
	);
	const ref = useRef(null);

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
	const downLoadPdf = () => {
		setIsLoading(true);
		axios({
			method: "post",
			url: "/api/hello",
			data: {
				template,
				personalInfo,
				experiences,
				education,
				skills,
			},
		})
			.then(function (response) {
				var bytes = new Uint8Array(response.data.pdf.data);
				const blob = new Blob([bytes], {
					type: "application/pdf",
				});
				blobToSaveAs("curriculum", blob);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	return (
		<Wrapper expand={expand}>
			{/* <button className="expand-button" onClick={expandSideMenu}>
        {" "}
        {expand ? `<<` : `>>`}
      </button> */}

			<LogoWrapper>
				<ImageLogo src="/astronauta.svg" expand={expand} />
				<TitleLogo
					className="title-logo"
					src="/titlelogo.svg"
					expand={expand}
				/>
			</LogoWrapper>
			<div className="menu-wrapper">
				{expand ? (
					<>
						<MenuTag
							expand={true}
							active={step === StepsEnum.INFORMATION}
							onClick={() => setStep(StepsEnum.INFORMATION)}
						>
							{" "}
							<FaInfoCircle size="22px" />
							Información personal
						</MenuTag>

						<MenuTag
							expand={true}
							active={step === StepsEnum.EXPERIENCE}
							onClick={() => setStep(StepsEnum.EXPERIENCE)}
						>
							{" "}
							<BsCardList size="22px" />
							Experiencia
						</MenuTag>
						<MenuTag
							expand={true}
							active={step === StepsEnum.EDUCATION}
							onClick={() => setStep(StepsEnum.EDUCATION)}
						>
							{" "}
							<FaGraduationCap size="22px" />
							Educación
						</MenuTag>
						<MenuTag
							expand={true}
							active={step === StepsEnum.SKILLS}
							onClick={() => setStep(StepsEnum.SKILLS)}
						>
							{" "}
							<BsTools size="18px" />
							Habilidades
						</MenuTag>
						<MenuTag
							expand={true}
							active={step === StepsEnum.LANGUAGES}
							onClick={() => setStep(StepsEnum.LANGUAGES)}
						>
							{" "}
							<FaLanguage size="24px" />
							Idiomas
						</MenuTag>
					</>
				) : (
					<>
						<Tooltip
							placement={"right"}
							title={"Información personal"}
							trigger={["hover"]}
						>
							<MenuTag
								active={step === StepsEnum.INFORMATION}
								onClick={() => setStep(StepsEnum.INFORMATION)}
							>
								{" "}
								<FaInfoCircle size="22px" />
								{expand && "Información personal"}
							</MenuTag>
						</Tooltip>
						<Tooltip
							placement={"right"}
							title={"Experiencia"}
							trigger={["hover"]}
						>
							<MenuTag
								active={step === StepsEnum.EXPERIENCE}
								onClick={() => setStep(StepsEnum.EXPERIENCE)}
							>
								{" "}
								<BsCardList size="22px" />
								{expand && "Experiencia"}
							</MenuTag>
						</Tooltip>
						<Tooltip
							placement={"right"}
							title={"Educación"}
							trigger={["hover"]}
						>
							<MenuTag
								active={step === StepsEnum.EDUCATION}
								onClick={() => setStep(StepsEnum.EDUCATION)}
							>
								{" "}
								<FaGraduationCap size="22px" />
								{expand && "Educación"}
							</MenuTag>
						</Tooltip>
						<Tooltip
							placement={"right"}
							title={"Habilidades"}
							trigger={["hover"]}
						>
							<MenuTag
								active={step === StepsEnum.SKILLS}
								onClick={() => setStep(StepsEnum.SKILLS)}
							>
								{" "}
								<BsTools size="18px" />
								{expand && "Habilidades"}
							</MenuTag>
						</Tooltip>
						<Tooltip placement={"right"} title={"Idiomas"}>
							<MenuTag
								active={step === StepsEnum.LANGUAGES}
								onClick={() => setStep(StepsEnum.LANGUAGES)}
							>
								{" "}
								<FaLanguage size="24px" />
								{expand && "Idiomas"}
							</MenuTag>
						</Tooltip>
					</>
				)}
			</div>
			<a className="download-icon" onClick={downLoadPdf}>
				<FaCloudDownloadAlt />
				{isLoading ? (
					<Spin
						indicator={
							<LoadingOutlined style={{ fontSize: 24 }} spin />
						}
					/>
				) : (
					""
				)}
			</a>
		</Wrapper>
	);
};

export default Header;

export const Wrapper = styled.div`
	display: grid;
	grid-template-rows: ${(props) =>
		props.expand ? "20vh 1fr 12vh" : "10vh 1fr 12vh"};
	width: 100%;
	transition: 0.3s;
	box-sizing: border-box;
	position: relative;
	height: 100vh;
	background: #201b35;
	button {
		cursor: pointer;
		align-self: center;
		justify-self: center;
		transition: 0.3s;
		border: none;
		width: 12vw;
		padding: 10px 20px;
		border-radius: 3px;
		background: #d8dadc;
		color: #341b35;
		font-weight: 600;
		&:hover {
			background: #d7d7d7;
		}
	}
	.menu-wrapper {
		display: grid;
		grid-row-gap: 2vh;
		padding: ${(props) => (props.expand ? "1vh 0 0 0" : "6vh 0 0 0")};
		grid-auto-rows: min-content;
	}
	.expand-button {
		position: absolute;
		top: 50%;
		right: -30px;
		transform: translate(-50%, -50%);
		background: #201b35;
		border: 1px solid transparent;
		z-index: 20;
		color: white;
		display: grid;
		padding: 2px 6px;
		border-radius: 50%;
		width: fit-content;
		&:hover {
			border: 1px solid white;
			background: #201b35;
		}
	}
	.download-icon {
		display: grid;
		justify-content: center;
		font-size: 30px;
		color: white;
	}
`;
export const MenuTag = styled.a`
	font-family: "Inter", sans-serif;
	display: grid;
	justify-items: center;
	justify-content: ${(props) => (props.expand ? "start" : "center")};
	grid-auto-flow: column;
	grid-column-gap: 1vw;
	grid-row-gap: 1vh;
	text-align: center;
	color: white;
	padding: 10px 10px;
	width: ${(props) => (props.expand ? "90%" : "75%")};
	justify-self: center;
	transition: 0.3s;
	font-size: 13px;
	font-weight: 600;
	border-radius: 3px;
	background: ${(props) => (props.active ? "#7057d9" : "none")};
	&:hover {
		background: ${(props) => (props.active ? "#7057d9" : "#7f80890d")};
		color: white;
	}
`;
export const Profile = styled.div`
	width: 5vw;
	height: 5vw;
	align-self: center;
	justify-self: center;
	border-radius: 50%;
	background-image: url("${(props) => props.bg}");
	background-position: center;
	background-size: cover;
	cursor: pointer;
`;
export const ImageLogo = styled.img`
	width: ${(props) => (props.expand ? "25%" : "65%")};
	justify-self: center;
	align-self: ${(props) => (props.expand ? "end" : "center")};
	cursor: pointer;
`;
export const LogoWrapper = styled.div`
	display: grid;
`;
export const TitleLogo = styled.img`
	width: 60%;
	justify-self: center;
	display: ${(props) => (props.expand ? "block" : "none")};
	padding: 1vh 0 0 0;
`;
export const Expander = styled.div`
	width: 6px;
	background: #7057d9;
	height: 100vh;
	position: absolute;
	right: -4px;
	z-index: 15;
	top: 0;
	cursor: col-resize;
`;
