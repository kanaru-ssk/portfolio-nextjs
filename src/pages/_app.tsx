import Head from 'next/head';
import type { AppProps } from 'next/app';
import 'styles/output.css';

import Header from 'components/common/Header';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<meta name="viewport" content="initial-scale=1.0, width=device-width, maximum-scale=1.0" />
				<meta name="theme-color" content="#232C93" />
			</Head>

			<Header />

			<Component {...pageProps} />
		</>
	);
};

export default MyApp;
