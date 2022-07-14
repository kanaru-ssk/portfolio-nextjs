import { useRouter } from "next/router";

type Props = {
  setIsContact: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContactButton = ({ setIsContact }: Props) => {
  const router = useRouter();
  return (
    <div className="p-4 text-center">
      <button
        onClick={() => {
          setIsContact(true);
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
