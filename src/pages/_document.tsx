/* eslint-disable @typescript-eslint/ban-ts-comment */
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
// @ts-ignore
import outputcss from '!raw-loader!../styles/output.css';

class MyDocument extends Document {
	static async getInitialProps(ctx: any) {
		const initialProps: any = await Document.getInitialProps(ctx);
		return {
			...initialProps,
			styles: (
				<>
					{initialProps.styles}
					<style
						dangerouslySetInnerHTML={{
							__html: outputcss,
						}}
					/>
				</>
			),
		};
	}

	render() {
		return (
			<Html>
				<Head />
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;

// @ts-ignore
// import outputcss from '!raw-loader!../styles/output.css';
// import Document, { Html, Head, Main, NextScript } from 'next/document';

// export default class MyDocument extends Document {
// 	static async getInitialProps(ctx: any) {
// 		const page = ctx.renderPage((App: any) => (props: any) => <App {...props} />);
// 		const initialProps: any = await Document.getInitialProps(ctx);
// 		return {
// 			...page,
// 			styles: [
// 				...initialProps.styles,
// 				<style
// 					key="custom"
// 					dangerouslySetInnerHTML={{
// 						__html: outputcss,
// 					}}
// 				/>,
// 			],
// 		};
// 	}

// 	render() {
// 		return (
// 			<Html>
// 				<Head></Head>
// 				<body>
// 					<Main />
// 					<NextScript />
// 				</body>
// 			</Html>
// 		);
// 	}
// }
