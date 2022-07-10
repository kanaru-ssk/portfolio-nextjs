import Link from "next/link";

const ContactButton = () => {
  return (
    <div className="py-2 text-center">
      <Link href="/contact">
        <a>
          <div className="rounded-full bg-gray px-4 py-1 hover:bg-light-gray hover:text-dark-gray">
            contact
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ContactButton;
