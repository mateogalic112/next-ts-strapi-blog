import React from 'react';
import Link from 'next/link';

import theme from '../utils/theme';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Button } from '@material-ui/core';

import Layout from '../src/components/Layout';
import VerticalSpacer from '../src/widgets/VerticalSpacer';

const useStyles = makeStyles({
	container: {
		minHeight: '80vh',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

const NotFoundPage: React.FC = () => {
	const classes = useStyles();

	return (
		<Layout>
			<Container className={classes.container}>
				<Typography variant="h1">404</Typography>
				<Typography gutterBottom variant="h3">
					Page not found
				</Typography>
				<Link href="/" passHref>
					<Button color="primary">
						<a>Back to home</a>
					</Button>
				</Link>
			</Container>
			<VerticalSpacer />
		</Layout>
	);
};

export default NotFoundPage;
