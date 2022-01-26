import { Expertise } from "../lib/reducers/skills-block";

export const getSkillSetter = (expertise: Expertise) => {
  let skills = ``;
  switch (expertise) {
    case Expertise.NOVICE:
      skills = `<div class="skill-circle marked-skill"> </div>
            <div class="skill-circle"></div>
            <div class="skill-circle"></div>
            <div class="skill-circle"></div>
            <div class="skill-circle"></div>
            `;
      break;
    case Expertise.BEGINNER:
      skills = `<div class="skill-circle marked-skill"></div>
            <div class="skill-circle marked-skill"></div>
            <div class="skill-circle"></div>
            <div class="skill-circle"></div>
            <div class="skill-circle"></div>
            `;
      break;
    case Expertise.SKILLFUL:
      skills = `<div class="skill-circle marked-skill"></div>
            <div class="skill-circle marked-skill"></div>
            <div class="skill-circle marked-skill"></div>
            <div class="skill-circle"></div>
            <div class="skill-circle"></div>
            `;
      break;
    case Expertise.EXPERIENCED:
      skills = `<div class="skill-circle marked-skill"></div>
            <div class="skill-circle marked-skill"></div>
            <div class="skill-circle marked-skill"></div>
            <div class="skill-circle marked-skill"></div>
            <div class="skill-circle"></div>
            `;
      break;
    default:
      skills = `<div class="skill-circle marked-skill"></div>
                <div class="skill-circle marked-skill"></div>
                <div class="skill-circle marked-skill"></div>
                <div class="skill-circle marked-skill"></div>
                <div class="skill-circle marked-skill"></div>
                `;
      break;
  }

  return skills;
};
