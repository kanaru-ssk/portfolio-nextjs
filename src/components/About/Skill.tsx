import { Skills } from "types/aboutPage";

type Props = {
  skills: Skills;
};

const Skill = ({ skills }: Props) => {
  const langs = skills.data.filter((value) => {
    return value.attributes.category === "lang";
  });
  const tools = skills.data.filter((value) => {
    return value.attributes.category === "tool";
  });
  return (
    <div>
      <h3>言語 / フレームワーク</h3>
      <ul>
        {langs.map((value) => {
          return (
            <li className="inline-block pl-5" key={value.id}>
              {value.attributes.name}
            </li>
          );
        })}
      </ul>

      <h3>ツールなど</h3>
      <ul>
        {tools.map((value) => {
          return (
            <li className="inline-block pl-5" key={value.id}>
              {value.attributes.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Skill;
