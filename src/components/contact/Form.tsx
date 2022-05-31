type Props = {
	setIsSendSuccess: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const Form = ({ setIsSendSuccess }: Props) => {
	const onSubmitHundler = async (event: any) => {
		event.preventDefault();
		const res = await fetch('/api/sendgrid', {
			body: JSON.stringify({
				email: event.target.email.value,
				message: event.target.message.value,
			}),
			headers: {
				'Content-Type': 'application/json',
			},
			method: 'POST',
		});

		const result = await res.json();

		if (result.isSendSuccess) {
			setIsSendSuccess(true);
		} else {
			setIsSendSuccess(false);
		}
	};
	return (
		<form onSubmit={onSubmitHundler} className="py-4">
			<div className="py-2">
				<div className="py-2">メールアドレス</div>
				<input
					className="block border h-12 p-2 w-full"
					name="email"
					type="email"
					placeholder="name@example.com"
					required
				/>
			</div>

			<div className="py-2">
				<div className="py-2">お問い合わせ内容</div>
				<textarea
					className="block border h-24 p-2 w-full"
					name="message"
					placeholder="お問い合わせ内容を入力してください。"
					required
				></textarea>
			</div>

			<div className="py-4 text-center">
				<button className="border rounded-full h-12 px-16" type="submit">
					送信
				</button>
			</div>
		</form>
	);
};

export default Form;
