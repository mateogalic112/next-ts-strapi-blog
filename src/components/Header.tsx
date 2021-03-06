import React, { useContext, useEffect } from 'react';
import Link from 'next/link';

import AuthContext, { ContextProps } from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

import AnimatedDrawer from '../widgets/AnimatedDrawer';
import SearchBar from '../widgets/SearchBar';
import NavigationList from './NavigationList';
import UserPopover from './UserPopover';
import ModalComponent from '../components/ModalComponent';

import theme from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, IconButton, Button, Container, TextField, Hidden, Box, Badge } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	drawerDiv: {
		[theme.breakpoints.up('md')]: {
			display: 'none',
		},
	},
	title: {
		flexGrow: 1,
		fontSize: '1.5rem',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
	},
	field: {
		margin: theme.spacing(1),
		width: 300,
	},
	loginButton: {
		margin: theme.spacing(1),
	},
	white: {
		color: 'white',
	},
});

const Header: React.FC = () => {
	const classes = useStyles();

	const { user, login, error } = useContext<ContextProps>(AuthContext);

	const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
	const [showModal, setShowModal] = React.useState<boolean>(false);
	const [loginData, setLoginData] = React.useState({
		email: '',
		password: '',
	});

	useEffect(() => {
		if (error) {
			toast.error(error);
		}
	}, [login]);

	const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	const handleLoginDataSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login(loginData.email, loginData.password);
		setShowModal(false);
	};

	const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
		if (
			event &&
			event.type === 'keydown' &&
			((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
		) {
			return;
		}

		setIsDrawerOpen(open);
	};

	const openModal = () => setShowModal(true);

	return (
		<header>
			<AppBar position="static">
				<ToastContainer autoClose={3000} />
				<Container>
					<Toolbar disableGutters>
						<div className={classes.drawerDiv}>
							<IconButton
								onClick={toggleDrawer(true)}
								edge="start"
								className={classes.menuButton}
								color="inherit"
								aria-label="menu"
							>
								<MenuIcon />
							</IconButton>
							<AnimatedDrawer isDrawerOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
						</div>
						<Link href="/">
							<a className={classes.title}>Matco</a>
						</Link>
						<Hidden smDown>
							<NavigationList />
							<SearchBar />
						</Hidden>
						{user && (
							<Box display="flex" alignItems="center">
								<UserPopover username={user.username} />
								<IconButton aria-label="inbox">
									<Badge badgeContent={4} color="secondary" invisible={false}>
										<MailIcon />
									</Badge>
								</IconButton>
								<IconButton aria-label="inbox">
									<Badge badgeContent={4} color="secondary" invisible={false}>
										<NotificationsIcon />
									</Badge>
								</IconButton>
							</Box>
						)}
						{!user && (
							<Button onClick={openModal} color="inherit">
								Login
							</Button>
						)}
					</Toolbar>
				</Container>
			</AppBar>
			<ModalComponent
				open={showModal}
				handleClose={() => setShowModal(false)}
				title="Login"
				description="Login to see featured stuff"
			>
				<form onSubmit={handleLoginDataSubmit} className={classes.form} noValidate autoComplete="off">
					<TextField
						type="email"
						className={classes.field}
						id="outlined-basic"
						label="Email"
						variant="outlined"
						name="email"
						onChange={handleLoginFormChange}
					/>
					<TextField
						type="password"
						className={classes.field}
						id="outlined-basic"
						label="Password"
						variant="outlined"
						name="password"
						onChange={handleLoginFormChange}
					/>
					<Button
						type="submit"
						variant="contained"
						color="secondary"
						className={classes.loginButton}
						endIcon={<ExitToAppIcon />}
					>
						Login
					</Button>
				</form>
			</ModalComponent>
		</header>
	);
};

export default Header;
