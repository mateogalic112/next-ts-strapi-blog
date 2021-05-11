import React from 'react';
import Link from 'next/link';

import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import NavList from '../data/NavList';
import { NavListType } from '../data/NavList';
import { MailOutline } from '@material-ui/icons';

const useStyles = makeStyles({
	list: {
		width: 250,
	},
});

type DrawerListProps = {
	toggleDrawer: (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => void;
};

const DrawerList: React.FC<DrawerListProps> = ({ toggleDrawer }) => {
	const classes = useStyles();

	return (
		<div className={classes.list} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
			<List>
				{NavList.map((item: NavListType) => {
					console.log(<MailOutline />);

					return (
						<Link href={item.url} key={item.name}>
							<ListItem button>
								<ListItemIcon>{item.icon}</ListItemIcon>
								<ListItemText primary={item.name} />
							</ListItem>
						</Link>
					);
				})}
			</List>
		</div>
	);
};

export default DrawerList;
