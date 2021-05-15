import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import theme from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';

import { Breadcrumbs, Typography } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

const useStyles = makeStyles({
	link: {
		fontSize: '1rem',
		color: 'white',
	},
	white: {
		color: theme.palette.common.white,
	},
});

const Breadcrumb: React.FC = () => {
	const classes = useStyles();

	const router = useRouter();
	const urls = router.asPath.toUpperCase().split('/');

	if (urls.some((item) => item.includes('?PAGE')) || urls.length < 3) return <div></div>;

	return (
		<Breadcrumbs
			separator={<NavigateNextIcon fontSize="small" className={classes.white} />}
			aria-label="breadcrumb"
		>
			{urls.length > 0 &&
				urls.slice(1, urls.length - 1).map((url) => (
					<Link href={`/${url.toLowerCase()}`} key={url}>
						<a className={classes.link}>{url}</a>
					</Link>
				))}
			{urls[urls.length - 1] && (
				<Typography className={classes.link} color="textPrimary">
					{urls[urls.length - 1].split('-').join(' ')}
				</Typography>
			)}
		</Breadcrumbs>
	);
};

export default Breadcrumb;
