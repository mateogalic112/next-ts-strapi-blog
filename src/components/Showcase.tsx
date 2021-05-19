import React from 'react';
import Image from 'next/image';

import theme from '../../utils/theme';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Button, Container, Grid, Box, TextField } from '@material-ui/core';

import VpnLockIcon from '@material-ui/icons/VpnLock';
import SendIcon from '@material-ui/icons/Send';

import ModalComponent from './ModalComponent';

const useStyles = makeStyles({
	wrapperDiv: {
		paddingTop: '2rem',
		paddingBottom: '2rem',
		backgroundColor: `${theme.palette.neutral.main}`,
	},
	bold: {
		fontWeight: 600,
	},
	marginRight: {
		marginRight: theme.spacing(1),
	},
	title: {
		fontWeight: 600,
		marginBottom: theme.spacing(2),
	},
	subtitle: {
		width: '45ch',
		marginBottom: theme.spacing(5),
		fontWeight: 500,
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		minWidth: '20rem',
	},
	field: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
	},
});

const Showcase = () => {
	const classes = useStyles();

	const [showModal, setShowModal] = React.useState<boolean>(false);
	const openModal = () => setShowModal(true);

	const [emailData, setEmailData] = React.useState({
		from: '',
		subject: '',
		message: '',
	});

	const handleEmailFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmailData({ ...emailData, [e.target.name]: e.target.value });
	};

	const handleEmailDataSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		login(...emailData);
		setShowModal(false);
	};

	return (
		<div className={classes.wrapperDiv}>
			<Container>
				<Grid container spacing={5} alignItems="center">
					<Grid item xs={12} md={6}>
						<Box display="flex" alignItems="center" mb={1}>
							<VpnLockIcon color="primary" className={classes.marginRight} />
							<Typography variant="body1" color="primary" className={classes.bold}>
								100% Trusted platform
							</Typography>
						</Box>
						<Typography gutterBottom className={classes.title} variant="h2" color="secondary">
							Latest Tech Skillset
						</Typography>
						<Typography gutterBottom className={classes.subtitle} variant="subtitle1">
							We work to understand your needs and are driven to ask better questions in the pursuit of
							making work.
						</Typography>
						<Button onClick={openModal} size="large" variant="contained" color="secondary">
							Let's talk
						</Button>
					</Grid>
					<Grid item xs={12} md={6}>
						<Image src="/showcase.svg" quality={100} alt="City, showcase" width={500} height={300} />
					</Grid>
				</Grid>
			</Container>
			<ModalComponent
				open={showModal}
				handleClose={() => setShowModal(false)}
				title="Interested?"
				description="Let's us know!"
			>
				<form onSubmit={handleEmailDataSubmit} className={classes.form} noValidate autoComplete="off">
					<TextField
						type="email"
						id="outlined-basic"
						label="Email"
						variant="outlined"
						name="email"
						onChange={handleEmailFormChange}
					/>
					<TextField
						type="text"
						className={classes.field}
						id="outlined-basic"
						label="Subject"
						variant="outlined"
						name="subject"
						onChange={handleEmailFormChange}
					/>
					<TextField id="outlined-multiline-static" label="Message" multiline rows={4} variant="outlined" />
					<Button
						type="submit"
						variant="contained"
						color="secondary"
						className={classes.field}
						endIcon={<SendIcon />}
					>
						Send
					</Button>
				</form>
			</ModalComponent>
		</div>
	);
};

export default Showcase;
