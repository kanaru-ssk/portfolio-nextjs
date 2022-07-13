import Image from "next/image";
import Link from "next/link";

const Sns = () => {
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
      snsName: "Facebook",
      snsIcon:
        "https://res.cloudinary.com/dyrvpjmrd/image/upload/v1653659341/facebook_f90d55fb71.svg",
    },
  ];

  return (
    <ul className="flex list-none items-center justify-center p-4">
      {snsLinks.map((value) => {
        return (
          <li key={value.snsName} className="p-2 text-base">
            <Link href={value.url}>
              <a
                title={
                  "佐々木哉瑠の" + value.snsName + "プロフィールへのリンク"
                }
              >
                <Image
                  src={value.snsIcon}
                  width="32"
                  height="20"
                  alt="sns-link"
                />
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Sns;
