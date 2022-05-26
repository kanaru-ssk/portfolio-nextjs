/* eslint-disable @typescript-eslint/ban-ts-comment */
import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
// @ts-ignore
import outputcss from '!raw-loader!../styles/output.css';

// import components
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

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
				<Head>
					<link rel="icon" href="/favicon.svg" />
				</Head>
				<body>
					<Header />
					<Main />
					<Footer />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
