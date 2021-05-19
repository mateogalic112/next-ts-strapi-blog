import React from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Divider, Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		userInfo: {
			marginRight: theme.spacing(2),
			marginLeft: theme.spacing(2),
		},
		mainText: {
			fontWeight: theme.typography.fontWeightBold,
			textAlign: 'center',
		},
	})
);

interface UserInfoColProps {
	title?: String;
	desc?: String;
}

const UserInfoCol: React.FC<UserInfoColProps> = ({ title, desc }) => {
	const classes = useStyles();

	return (
		<Box display="flex" flexDirection="column" className={classes.userInfo}>
			<Typography gutterBottom variant="body1" className={classes.mainText}>
				{title}
			</Typography>
			<Divider light />
			<Typography gutterBottom variant="body2">
				{desc}
			</Typography>
		</Box>
	);
};

export default UserInfoCol;
