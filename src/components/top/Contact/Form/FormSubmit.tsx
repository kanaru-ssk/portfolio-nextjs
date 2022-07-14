type InputStatus = "Entering" | "Ready" | "Sending";

type Props = {
  inputStatus: InputStatus;
};

const FormSubmit = ({ inputStatus }: Props) => {
  return (
    <div className="py-4 text-center">
      {inputStatus === "Entering" && (
        <button
          className="h-12 rounded-full border border-gray px-16 text-dark-gray"
          type="submit"
        >
          送信
        </button>
      )}

      {inputStatus === "Ready" && (
        <button
          className="h-12 rounded-full border px-16 sm:hover:bg-black sm:hover:text-white"
          type="submit"
        >
          送信
        </button>
      )}

      {inputStatus === "Sending" && (
        <button className="h-12 rounded-full border px-16" type="submit">
          <svg width="24" height="24" viewBox="0 0 38 38" stroke="#232C93">
            <g fill="none" fillRule="evenodd">
              <g transform="translate(1 1)" strokeWidth="2">
                <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                <path d="M36 18c0-9.94-8.06-18-18-18">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 18 18"
                    to="360 18 18"
                    dur="1s"
                    repeatCount="indefinite"
                  />
                </path>
              </g>
            </g>
          </svg>
        </button>
      )}
    </div>
  );
};

export default FormSubmit;
