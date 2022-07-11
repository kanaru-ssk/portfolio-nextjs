import Image from "next/image";

import Text from "components/common/Text";

type Props = {
  profileImg: string;
  name: string;
  nameKana: string;
  job: string;
  profileText: string;
};

const Profile = ({ profileImg, name, nameKana, job, profileText }: Props) => {
  return (
    <>
      <div className="flex items-center gap-8 py-4">
        <Image
          className="rounded-full"
          src={profileImg}
          width="128"
          height="128"
          alt="profile"
        />
        <div>
          <div>{job}</div>
          <div className="text-xl">{name}</div>
          <div>{nameKana}</div>
        </div>
      </div>
      <p className="py-4">
        <Text text={profileText} />
      </p>
    </>
  );
};

export default Profile;
