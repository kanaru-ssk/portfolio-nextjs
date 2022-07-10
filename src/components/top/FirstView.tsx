import Text from "components/common/Text";
import Profile from "components/top/Profile";
import ContactButton from "components/common/ContactButton";

type Props = {
  profileImg: string;
  name: string;
  nameKana: string;
  job: string;
  catchCopy: string;
};

const FirstView = ({ catchCopy, profileImg, name, nameKana, job }: Props) => {
  return (
    <div className="py-12">
      <Profile
        profileImg={profileImg}
        name={name}
        nameKana={nameKana}
        job={job}
      />
      <Text text={catchCopy} />

      <ContactButton />
    </div>
  );
};

export default FirstView;
