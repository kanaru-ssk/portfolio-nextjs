import { useRouter } from "next/router";

const ContactButton = () => {
  const router = useRouter();
  return (
    <div className="pt-4 text-center">
      <button
        onClick={() => {
          router.push("/contact", "/contact", { shallow: true });
        }}
        className="w-full rounded-full bg-gray px-4 py-1 sm:hover:bg-light-gray sm:hover:text-dark-gray sm:focus:bg-dark-gray sm:focus:text-white"
      >
        contact
      </button>
    </div>
  );
};

export default ContactButton;
