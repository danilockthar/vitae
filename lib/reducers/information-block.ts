export interface InformationDto {
  firstName: string;
  lastName: string;
  jobPosition: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  github: string;
  birthday: string;
  photo: string;
  birthplace: string;
  civilStatus: string;
  nacionality: string;
  skype: string;
  behance: string;
  facebook: string;
  instagram: string;
  linkedin: string;
  twitter: string;
  youtube: string;
}
const infoPersonal = {
  firstName: "",
  lastName: "",
  jobPosition: "",
  email: "",
  phone: "",
  address: "",
  website: "",
  github: "",
  birthday: "",
  photo: "",
  birthplace: "",
  civilStatus: "",
  nacionality: "",
  skype: "",
  behance: "",
  facebook: "",
  instagram: "",
  linkedin: "",
  twitter: "",
  youtube: "",
};

export const initialState = {
  template: "",
  personalInfo: infoPersonal,
};

const informationReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TEMPLATE":
      return {
        ...state,
        template: action.template,
      };
    case "SET_PERSONAL_INFO":
      const { field, value } = action.payload;
      return {
        ...state,
        personalInfo: { ...state.personalInfo, [field]: value },
      };
    default:
      return state;
  }
};

export default informationReducer;
