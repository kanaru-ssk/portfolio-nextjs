import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';
// @ts-ignore
import outputcss from '!raw-loader!../styles/output.css';

// import components
import Header from 'components/common/Header';
import Footer from 'components/common/Footer';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="ja">
				<Head>
					<style
						dangerouslySetInnerHTML={{
							__html: outputcss,
						}}
					/>
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
