import Loading from "components/common/Loading";

type InputStatus = "Entering" | "Ready" | "Sending";

type Props = {
  inputStatus: InputStatus;
};

const FormSubmit = ({ inputStatus }: Props) => {
  return (
    <div className="py-4 text-center">
      <button
        type="submit"
        className={
          `${
            inputStatus === "Ready"
              ? "bg-gray text-black sm:hover:bg-light-gray sm:hover:text-dark-gray sm:focus:bg-dark-gray sm:focus:text-white "
              : "border border-gray bg-white text-dark-gray "
          }` + "h-12 rounded-full px-16 "
        }
      >
        {inputStatus !== "Sending" && "送信"}
        {inputStatus === "Sending" && <Loading />}
      </button>
    </div>
  );
};

export default FormSubmit;
