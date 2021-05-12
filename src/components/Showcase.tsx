import Image from 'next/image';

import theme from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';

import { Typography, Button, Container, Grid } from '@material-ui/core';

import VpnLockIcon from '@material-ui/icons/VpnLock';

const useStyles = makeStyles({
	wrapperDiv: {
		paddingTop: '2rem',
		paddingBottom: '2rem',
		backgroundColor: `${theme.palette.neutral.main}`,
	},
	bold: {
		fontWeight: 600,
	},
	flex: {
		display: 'flex',
		alignItems: 'center',
	},
	marginRight: {
		marginRight: theme.spacing(1),
	},
	title: {
		fontWeight: 500,
		marginBottom: theme.spacing(3),
		marginTop: theme.spacing(1),
	},
	marginBottomLg: {
		marginBottom: theme.spacing(5),
	},
});

const Showcase = () => {
	const classes = useStyles();

	return (
		<div className={classes.wrapperDiv}>
			<Container className={classes.flex}>
				<Grid container spacing={5} alignItems="center">
					<Grid item xs={12} md={6}>
						<div className={classes.flex}>
							<VpnLockIcon color="primary" className={classes.marginRight} />
							<Typography variant="caption" color="primary" className={classes.bold}>
								100% Trusted platform
							</Typography>
						</div>
						<Typography gutterBottom className={classes.title} variant="h3" color="secondary">
							Latest Tech Skillset
						</Typography>
						<Typography gutterBottom variant="subtitle2" className={classes.marginBottomLg}>
							We work to understand your needs and are driven to ask better questions in the pursuit of
							making work
						</Typography>
						<Button size="large" variant="contained" color="secondary">
							Let's talk
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						<Image src="/showcase.svg" quality={100} alt="City, showcase" width={500} height={300} />
					</Grid>
				</Grid>
			</Container>
		</div>
	);
};

export default Showcase;
