import { useEffect } from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../utils/theme';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
	useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side');
		if (jssStyles) {
			jssStyles?.parentElement?.removeChild(jssStyles);
		}
	}, []);

	return (
		<>
			<Head>
				<title>Playground - App</title>
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
};

export default MyApp;
