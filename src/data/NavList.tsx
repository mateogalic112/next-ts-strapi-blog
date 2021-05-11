import { SvgIconProps } from '@material-ui/core/SvgIcon';

import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import BookOutlinedIcon from '@material-ui/icons/BookOutlined';
import StoreOutlinedIcon from '@material-ui/icons/StoreOutlined';
import React from 'react';

export type NavListType = {
	name: string;
	icon: React.ReactElement<SvgIconProps>;
	url: string;
};

const NavList: NavListType[] = [
	{
		name: 'Home',
		icon: <HomeOutlinedIcon />,
		url: '/',
	},
	{
		name: 'About',
		icon: <InfoOutlinedIcon />,
		url: '/about',
	},
	{
		name: 'Blog',
		icon: <BookOutlinedIcon />,
		url: '/posts',
	},
	{
		name: 'Store',
		icon: <StoreOutlinedIcon />,
		url: '/store',
	},
];

export default NavList;
