import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';

import Link from 'next/link';

import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import { Popover, Button, List, ListItem, ListItemText } from '@material-ui/core';
import { ListItemProps } from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		typography: {
			padding: theme.spacing(1),
			fontSize: theme.typography.pxToRem(16),
		},
		white: {
			color: 'white',
		},
		listEl: {
			listStyle: 'none',
		},
	})
);

interface UserPopoverProps {
	username?: String;
}

const UserPopover: React.FC<UserPopoverProps> = ({ username }) => {
	const classes = useStyles();
	const { logout } = useContext(AuthContext);

	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
		return <ListItem button component="a" {...props} />;
	}

	return (
		<div>
			<Button aria-describedby={id} onClick={handleClick} className={classes.white}>
				{username}
			</Button>
			<Popover
				id={id}
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center',
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center',
				}}
			>
				<List component="nav" aria-label="user options">
					<ListItem>
						<Link href="/profile" passHref>
							<a className={classes.typography}>Profile</a>
						</Link>
					</ListItem>
					<ListItemLink onClick={logout}>
						<ListItemText primary="Logout" className={classes.typography} />
					</ListItemLink>
				</List>
			</Popover>
		</div>
	);
};

export default UserPopover;
