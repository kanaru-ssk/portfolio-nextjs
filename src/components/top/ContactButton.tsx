import { useRouter } from "next/router";

type Props = {
  setIsShowContact: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContactButton = ({ setIsShowContact }: Props) => {
  const router = useRouter();
  return (
    <div className="p-4 text-center">
      <button
        onClick={() => {
          setIsShowContact(true);
          router.push("/contact", "/contact", { shallow: true });
        }}
        className="w-full rounded-full bg-gray px-4 py-1 sm:hover:bg-light-gray sm:hover:text-dark-gray"
      >
        contact
      </button>
    </div>
  );
};

export default ContactButton;
