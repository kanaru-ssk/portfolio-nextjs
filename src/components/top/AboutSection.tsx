import MoreButton from "components/common/MoreButton";
import Profile from "components/common/Profile";

type Props = {
  profileImg: string;
  name: string;
  nameKana: string;
  job: string;
  profileText: string;
};

const AboutSection = ({
  profileImg,
  name,
  nameKana,
  job,
  profileText,
}: Props) => {
  return (
    <div className="py-16">
      <h2 className="py-4">about</h2>
      <Profile
        profileImg={profileImg}
        name={name}
        nameKana={nameKana}
        job={job}
        profileText={profileText}
      />
      <MoreButton url="/about" />
    </div>
  );
};

export default AboutSection;
