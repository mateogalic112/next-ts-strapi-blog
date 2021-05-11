import Link from 'next/link';

import theme from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';

import { AppBar, Toolbar, IconButton, Typography, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles({
	root: {
		flexGrow: 1,
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
});

const Header = () => {
	const classes = useStyles();

	return (
		<header className={classes.root}>
			<AppBar position="static">
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" className={classes.title}>
						Matco
					</Typography>
					<Button color="inherit">Login</Button>
				</Toolbar>
			</AppBar>
		</header>
	);
};

export default Header;
