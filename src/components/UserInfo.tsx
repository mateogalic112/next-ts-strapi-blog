import React from 'react';

import { User } from '../../models/User';
import { getDaysDiff } from '../../helpers/date';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Avatar, Divider, Box } from '@material-ui/core';
import VerticalSpacer from '../widgets/VerticalSpacer';

interface UserInfo {
	user: User | null;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		large: {
			width: theme.spacing(7),
			height: theme.spacing(7),
		},
		userInfo: {
			marginRight: theme.spacing(2),
			marginLeft: theme.spacing(2),
		},
	})
);

const UserInfo: React.FC<UserInfo> = ({ user }) => {
	const classes = useStyles();
	return (
		<>
			<Box display="flex">
				{user?.avatar ? (
					<Avatar
						className={classes.large}
						alt={`User ${user?.username} image`}
						src={user.avatar.formats.thumbnail.url}
					/>
				) : (
					<Avatar>{user?.username.charAt(0).toUpperCase()}</Avatar>
				)}
				<Box display="flex" flexDirection="column" className={classes.userInfo}>
					<Typography gutterBottom variant="body1">
						{user?.username}
					</Typography>
					<Divider light />
					<Typography gutterBottom variant="body2">
						{user?.role?.name}
					</Typography>
				</Box>
			</Box>
			<VerticalSpacer marginBottom="1rem" marginTop="1rem" />
			<Typography gutterBottom variant="subtitle1">
				Membership lasts: {getDaysDiff(user?.created_at)} days
			</Typography>
		</>
	);
};

export default UserInfo;
