import React from 'react';
import Link from 'next/link';

import AnimatedDrawer from '../widgets/AnimatedDrawer';

import theme from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, IconButton, Typography, Button, Container } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

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
	},
});

const Header: React.FC = () => {
	const classes = useStyles();

	const [isDrawerOpen, setIsDrawerOpen] = React.useState<boolean>(false);

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
							<Typography variant="h6" className={classes.title}>
								Matco
							</Typography>
						</Link>
						<Button color="inherit">Login</Button>
					</Toolbar>
				</Container>
			</AppBar>
		</header>
	);
};

export default Header;
