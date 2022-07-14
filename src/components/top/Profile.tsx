import Image from "next/image";

type Props = {
  profileImg: string;
  name: string;
  nameKana: string;
  job: string;
  bio: string;
};

const Profile = ({ bio, profileImg, name, nameKana, job }: Props) => {
  return (
    <div className="py-4 px-4">
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
      <div className="whitespace-pre-wrap tracking-wide">{bio}</div>
    </div>
  );
};

export default Profile;
