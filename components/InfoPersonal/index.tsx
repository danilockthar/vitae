import { useState } from "react";
import styled from "styled-components";
import { useInfoPersonal } from "../../lib/hooks/useInfoPersonal";
import { GridElements, InputElement } from "../../styles/elements";

const InfoPersonalFragment = () => {
  const { setPersonalInfo, personalInfo } = useInfoPersonal();
  const handleChange = (event) => {
    setPersonalInfo(event.target.name, event.target.value);
  };
  return (
    <Wrapper>
      <h2>Completa tu información personal</h2>
      <GridElements>
        <InputElement>
          <span> Primer nombre </span>
          <input
            value={personalInfo.firstName}
            onChange={handleChange}
            name="firstName"
            type="text"
            placeholder="Daniel"
          />
        </InputElement>
        <InputElement>
          <span> Apellido </span>
          <input
            value={personalInfo.lastName}
            onChange={handleChange}
            name="lastName"
            type="text"
            placeholder="Arroyo"
          />
        </InputElement>
      </GridElements>
      <InputElement>
        <span> Nombre del puesto </span>
        <input
          value={personalInfo.jobPosition}
          onChange={handleChange}
          name="jobPosition"
          type="text"
          placeholder="Diseñador gráfico"
        />
      </InputElement>
      <GridElements>
        <InputElement>
          <span> Email </span>
          <input
            value={personalInfo.email}
            onChange={handleChange}
            name="email"
            type="text"
            placeholder="danielsan19@gmail.com"
          />
        </InputElement>
        <InputElement>
          <span> N° telefónico </span>
          <input
            value={personalInfo.phone}
            onChange={handleChange}
            name="phone"
            type="text"
            placeholder="1112242424"
          />
        </InputElement>
      </GridElements>
      <InputElement>
        <span> Dirección</span>
        <input
          value={personalInfo.address}
          onChange={handleChange}
          name="address"
          type="text"
          placeholder="Av. Siempre Viva"
        />
      </InputElement>
    </Wrapper>
  );
};

export default InfoPersonalFragment;

export const Wrapper = styled.div`
  overflow-y: scroll;
  /* height: -webkit-fit-content; */
  height: -moz-fit-content;
  height: fit-content;
  padding: 3vw 2vw;
  display: grid;
  grid-auto-rows: min-content;
  width: 100%;
  height: 100%;
  background: white;
  grid-row-gap: 2vh;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #f5f5f5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #9f8bf2;
  }
`;
