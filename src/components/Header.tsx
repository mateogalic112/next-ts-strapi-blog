import React from 'react';
import Link from 'next/link';

import AnimatedDrawer from '../widgets/AnimatedDrawer';
import SearchBar from '../widgets/SearchBar';

import ModalComponent from '../components/ModalComponent';

import theme from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, IconButton, Button, Container, TextField } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
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
});

const Header: React.FC = () => {
	const classes = useStyles();

	const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);
	const [showModal, setShowModal] = React.useState<boolean>(false);

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
		<header className={classes.root}>
			<AppBar position="static">
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
						<SearchBar />
						<Button onClick={openModal} color="inherit">
							Login
						</Button>
					</Toolbar>
				</Container>
			</AppBar>
			<ModalComponent
				open={showModal}
				handleClose={() => setShowModal(false)}
				title="Login"
				description="Login to see featured stuff"
			>
				<form className={classes.form} noValidate autoComplete="off">
					<TextField
						type="text"
						className={classes.field}
						id="outlined-basic"
						label="Username"
						variant="outlined"
					/>
					<TextField
						type="password"
						className={classes.field}
						id="outlined-basic"
						label="Password"
						variant="outlined"
					/>
					<Button
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
