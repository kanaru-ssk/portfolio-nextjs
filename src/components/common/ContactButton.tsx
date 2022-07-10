import Link from "next/link";

const ContactButton = () => {
  return (
    <div className="py-2 text-center">
      <Link href="/contact">
        <a>
          <div className="inline-block rounded-full border border-black px-4 py-1 hover:bg-black hover:text-white">
            お問い合わせ
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ContactButton;
