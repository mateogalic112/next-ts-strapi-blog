import React from 'react';

import theme from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Container, Typography } from '@material-ui/core';
import SocialIcons from '../widgets/SocialIcons';

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
				<div>
					<Typography variant="body2">Matco Corp &copy;</Typography>
					<Typography variant="subtitle2">All rights reserved {new Date().getFullYear()}.</Typography>
				</div>
				<SocialIcons />
			</Container>
		</Box>
	);
};

export default Footer;
