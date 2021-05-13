import React from 'react';

import theme from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Container, Typography } from '@material-ui/core';

const useStyles = makeStyles({
	root: {
		backgroundColor: theme.palette.neutral.main,
	},
	container: {
		display: 'flex',
		justifyContent: 'space-between',
	},
});

const Footer = () => {
	const classes = useStyles();

	return (
		<Box component="div" py={4} className={classes.root}>
			<Container className={classes.container}>
				<Typography gutterBottom paragraph variant="subtitle1">
					Matco Corp &copy;
				</Typography>
				<Typography gutterBottom paragraph variant="body2">
					All rights reserved {new Date().getFullYear()}.
				</Typography>
			</Container>
		</Box>
	);
};

export default Footer;
