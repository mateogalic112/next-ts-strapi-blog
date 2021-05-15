import React from 'react';
import Link from 'next/link';

import NavList from '../data/NavList';

import theme from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';

import { Box, Button } from '@material-ui/core';

const useStyles = makeStyles({
	white: {
		color: 'white',
	},
});

const NavigationList = () => {
	const classes = useStyles();

	return (
		<Box component="div" p={1} display="flex">
			{NavList.map((item) => (
				<Link href={item.url} passHref>
					<Button className={classes.white}>
						<a>{item.name}</a>
					</Button>
				</Link>
			))}
		</Box>
	);
};

export default NavigationList;
