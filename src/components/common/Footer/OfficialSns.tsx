import SnsLink from "./SnsLink";

const OfficialSns = () => {
  const snsLinks = [
    {
      url: "https://twitter.com/kanaru_dev",
      snsName: "Twitter",
      snsIcon:
        "https://res.cloudinary.com/dyrvpjmrd/image/upload/v1653659268/twitter_201c122333.svg",
    },
    {
      url: "https://github.com/kanaru-ssk",
      snsName: "GitHub",
      snsIcon:
        "https://res.cloudinary.com/dyrvpjmrd/image/upload/v1653659293/github_5d135ca0c7.svg",
    },
    {
      url: "https://instagram.com/kanaru_ssk",
      snsName: "Instagram",
      snsIcon:
        "https://res.cloudinary.com/dyrvpjmrd/image/upload/v1653659365/instagram_b428eaf3b7.svg",
    },
    {
      url: "https://www.facebook.com/profile.php?id=100074385632441",
      snsName: "Instagram",
      snsIcon:
        "https://res.cloudinary.com/dyrvpjmrd/image/upload/v1653659341/facebook_f90d55fb71.svg",
    },
  ];

  return (
    <ul className="flex list-none items-center justify-center p-4">
      {snsLinks.map((value) => {
        return (
          <SnsLink
            key={value.snsName}
            snsName={value.snsName}
            iconUrl={value.snsIcon}
            profileUrl={value.url}
          />
        );
      })}
    </ul>
  );
};

export default OfficialSns;
