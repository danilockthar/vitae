import { monthToString } from "../components/UI-Components/DatePicker/months";
import { getSkillSetter } from "../templates/skill-setter";
import { Template } from "./interface";
import { EducationDto } from "./reducers/education-block";
import { ExperienceDto, Experiences } from "./reducers/experience-block";
import { InformationDto } from "./reducers/information-block";
import { Expertise, SkillDto } from "./reducers/skills-block";
import { svg } from "./svgvar";

export const htmlSetter = (
  template: Template,
  info: InformationDto,
  experiences: Array<ExperienceDto>,
  education: Array<EducationDto>,
  skills: Array<SkillDto>
) => {
  const html = ``;
  const head = `<!DOCTYPE html>
  <html>
  <head>
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
<!-- Load paper.css for happy printing -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/paper-css/0.4.1/paper.css" />
<link href="/fonts/style.css" rel="stylesheet" />

  <title>ResumeProject</title>
  <style>
  </style>
  </head>
  <body class="A4">
  <section class="sheet" id="pdf-wrapper-page">
  <div class="wrapper">`;

  const information_block = `<p class="job-position ${info.jobPosition.length === 0 && "hidden-job-position"
    }"> ${info.jobPosition.length > 0 ? info.jobPosition : "JOBPOSITION"} </p>
  <div class="delimiter"> </div>
  <h1 class="name-person"> ${info.firstName} ${info.lastName} </h1>
  <div class="info-group">
  ${Object.entries(info)
      .filter(
        (item) =>
          item[0] !== "firstName" &&
          item[0] !== "lastName" &&
          item[0] !== "jobPosition" &&
          item[1] !== ""
      )
      .map((iteminfo) => {
        return `<div class="info-group-item"> 
          <label class="info-group-label">${iteminfo[0] === 'phone' ? 'teléfono' : iteminfo[0] === 'email' ? 'email' : 'dirección'}</label>
          <p class="info-group-value"> ${iteminfo[1]} </p>
        </div>`;
      })
      .join("")}
  </div>`;

  const experience_block = `
  <div class="jobs-experiences">
  <h4 class="title-block"> <img class="icon-svg" src="${svg.experience
    }" data-size="14" /> EXPERIENCIA </h4>
  ${experiences
      .map((item) => {
        return `<div class="job-experience-single">
      <div class="job-left-mark-wrapper">
        <div class="line-time-point"> </div>
        <div class="line-time"> </div>
      </div>
      <div class="job-info-wrapper">
      <div class="job-info-left"> 
        <h3> ${item.jobName} ${item.company.length > 0 ? `en ${item.company}` : ""
          } ${item.city.length > 0 ? `, ${item.city}` : ""} </h3>
        ${item.jobDescription}
      </div>
        <div class="job-info-right"> 
          <p> ${monthToString(item.startMonth)} ${item.startYear} - ${item.stillHere
            ? "PRESENTE"
            : monthToString(item.endMonth) + " " + item.endYear
          } </p>
        </div>
      </div>
      
      </div>
      `;
      })
      .join("")}
</div>
  `;

  const education_block = `
  <div class="jobs-experiences">
  <h4 class="title-block"> <img class="icon-svg" src="${svg.education
    }"/> EDUCACIÓN </h4>
  ${education
      .map((item) => {
        return `<div class="job-experience-single">
      <div class="job-left-mark-wrapper">
        <div class="line-time-point"> </div>
        <div class="line-time"> </div>
      </div>
      <div class="job-info-wrapper">
      <div class="job-info-left"> 
        <h3>  ${item.institution}, ${item.city}</h3>
        <h4> ${item.grade}, ${item.studyArea} </h4>
        ${item.description}
      </div>
        <div class="job-info-right"> 
          <p>${monthToString(item.startMonth)} ${item.startYear} - ${item.stillHere
            ? "PRESENTE"
            : monthToString(item.endMonth) + " " + item.endYear
          } </p>
        </div>
      </div>
      
      </div>
      `;
      })
      .join("")}
</div>
  `;
  const skills_block = `
  <div class="skills-wrapper"> 
    <h4 class="title-block-skill"> <img class="icon-svg" data-size="14" src="${svg.skills
    }"/> HABILIDADES</h4>
    ${skills
      .map((item) => {
        return `<div class="skill-experience-single">
      <div class="job-left-mark-wrapper">
        <div class="line-time-point"> </div>
        <div class="line-time"> </div>
      </div>
      <div class="job-info-wrapper">
      <div class="skill-info-left"> 
        <h3>  ${item.name}</h3>
      </div>
        <div class="skills-info-right"> 
        <div class="skill-level">
        ${getSkillSetter(item.expertise)}
      </div>
        </div>
      </div>
      
      </div>
      `;
      })
      .join("")}
    
  </div>
  `;

  const body = ` 
  <p class="job-position"> ${info.jobPosition} </p>
  <span class="delimiter" />
  <h1 class="name-person"> ${info.firstName} ${info.lastName} </h1>
  <div class="info-group">
  <a> ${info.email} </a>
  </div>
 `; /* no se esta usando */

  const closing = ` 
  </div>
  </section>
 </body>`;

  const style = ` <style>
  @page:first {
    margin: 0 0 5mm 0;
  }
  @page { margin: 5mm 0 5mm 0; }
  body{
    color:#363d49;
    font-family:'Inter',sans-serif;
    margin:0;
    padding:0;
    word-wrap: break-word;
  word-break: break-all;
    box-sizing:border-box;
  }
  .wrapper{
    word-wrap: break-word;
  word-break: break-all;
    display:block;
    // page-break-inside: avoid;
  }
  .icon-svg{width:16px;}
  .icon-svg[data-size^="14"]{width: 12px;}
  .info-group{display:flex;margin: 1vh 0 0 0;}
  .info-group-item{display:grid;margin:0 4vw 0 0;justify-items:baseline;}
  .info-group-label{text-transform: uppercase;}
  .hidden-job-position{visibility: hidden;}
  .job-position{justify-self:right; text-transform: uppercase;margin: 0 0 5px 0;width:70%;text-align:right;}
  .title-block{color:#363d49;font-weight:500;margin: 0; letter-spacing:3px; font-family:'Inter',sans-serif;display:grid;grid-auto-flow:column;grid-auto-columns: max-content;grid-column-gap: 12px;align-items:center;}
  .line-time-point{height:6px;width:6px;background:dodgerblue;justify-self:center;}
  .line-time{height:100%;width:2px;background:dodgerblue;justify-self:center;}
  .job-left-mark-wrapper{ display: grid;grid-template-rows: 22px 1fr;align-items: center;justify-self:baseline;}
  .jobs-experiences{margin: 3vh 0 0 0;}
  .job-experience-single{margin:1vh 0 0 0;position:relative;display: grid;grid-template-columns: 14px 1fr;}
  .job-experience-single h4{text-transform: uppercase;font-size: .8em;font-weight:500;margin:0 0 1vh 0;padding: 1vh 0 0 0;}
  .job-experience-single p{font-size:.8em;font-family:'Inter',sans-serif; margin:0;line-height:1.3;}
  .job-info-wrapper{display:grid;grid-template-columns:1fr 20%;}
  .job-info-left{width:100%;}
  .job-info-left h3{font-family:'Inter',sans-serif;font-weight:800;color:#363d49;margin: 0;font-size: .9rem;}
  .job-info-right{display:grid;align-items:baseline;justify-items:end;}
  .job-info-right p{font-size: .7rem;font-weight: 500;}
  .title-block-skill{color:#363d49;font-weight:500;margin: 0 0 1vh 0; letter-spacing:3px; font-family:'Inter',sans-serif;display:grid;grid-auto-flow:column;grid-auto-columns: max-content;grid-column-gap: 12px;align-items:center;}
  .skill-info-left h3{font-family:'Inter',sans-serif;font-weight:600;color:#363d49;margin: 0;font-size: .8rem;}
  .skill-experience-single{margin:0 0 0 0;position:relative;display: grid;grid-template-columns: 14px 1fr;}
  .skills-info-right{display:grid;align-items:center;justify-items:end;}
  .skill-visor{display:grid;width:100px;grid-template-rows:4vh 4vh;padding:5px;}
  .skill-visor h4{text-transform: uppercase; font-weight:500;font-family:'Inter',sans-serif;}
  .skills-wrapper{margin: 3vh 0 0 0;}
  .skill-circle{width: 8px; height:8px; background:grey;border-radius:50%;}
  .skill-level{display:grid; grid-template-columns:repeat(5, 20px);align-items:center;}
  .marked-skill{background:dodgerblue !important;}
  .name-person{text-transform: uppercase;font-weight:600;}
  .delimiter{width:70%;height:2px; background:dodgerblue;border-radius:3px;margin:0 0 2vh 0;}
  section{
    padding: 5mm;
  }
  .sheet {
    // padding:2vw;
    overflow: visible;
    min-height:290mm;
    height: auto !important;
    page-break-inside: avoid;
  }
  h4{margin:0;}
  h1{
    margin:0;
    font-family:'Inter', sans-serif;
    font-size:3rem;
    word-wrap:break-word;
    page-break-inside: avoid;
    
  }
  p{word-wrap:break-word;page-break-inside: avoid;font-family:'Inter', sans-serif;margin:0;}
  a{word-wrap:break-word;page-break-inside: avoid;font-family:'Inter', sans-serif;}
  </style>
  <script>
    
  </script> 
  </html>`;

  return (
    head +
    information_block +
    experience_block +
    education_block +
    skills_block +
    closing +
    style
  );
};
