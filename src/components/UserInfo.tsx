import React, { useContext } from 'react';
import LikeContext from '../../context/LikeContext';
import { User } from '../../models/User';
import { getDaysDiff } from '../../helpers/date';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Typography, Avatar, Divider, Box } from '@material-ui/core';
import VerticalSpacer from '../widgets/VerticalSpacer';
import UserInfoCol from './UserInfoCol';

interface UserInfo {
	user: User | null;
	postCount: Number;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		large: {
			width: theme.spacing(20),
			height: theme.spacing(20),
		},
		userInfo: {
			marginRight: theme.spacing(2),
			marginLeft: theme.spacing(2),
		},
		mainText: {
			fontWeight: theme.typography.fontWeightMedium,
		},
	})
);

const UserInfo: React.FC<UserInfo> = ({ user, postCount }) => {
	const classes = useStyles();

	const { likesGiven, likesReceived } = useContext(LikeContext);

	return (
		<>
			<Box display="flex" alignItems="center">
				{user?.avatar ? (
					<Avatar
						className={classes.large}
						alt={`User ${user?.username} image`}
						src={user.avatar.formats.thumbnail.url}
					/>
				) : (
					<Avatar>{user?.username.charAt(0).toUpperCase()}</Avatar>
				)}
				<Box display="flex" flexDirection="column" alignItems="center">
					<Box display="flex" flexWrap="wrap">
						<UserInfoCol title={user?.username} desc={user?.role?.name} />
						<UserInfoCol title={postCount.toString()} desc="Posts" />
						<UserInfoCol title="todo" desc="Followers" />
					</Box>
					<Box display="flex" flexWrap="wrap">
						<UserInfoCol title={likesGiven.length.toString()} desc="Likes Given" />
						<UserInfoCol title={likesReceived.length.toString()} desc="Likes Received" />
					</Box>
				</Box>
			</Box>
			<VerticalSpacer marginBottom="1rem" marginTop="1rem" />
			<Typography gutterBottom variant="subtitle1">
				Member for: {getDaysDiff(user?.created_at)} days
			</Typography>
		</>
	);
};

export default UserInfo;
