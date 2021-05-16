import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { Post } from '../../models/Post';
import Breadcrumb from '../../src/components/Breadcrumb';

import theme from '../../utils/theme';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Box, Button } from '@material-ui/core';

import CreateIcon from '@material-ui/icons/Create';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles({
	heroWrapper: { position: 'relative', width: '100%', minHeight: '50vh', paddingBottom: '20%' },
	heroContent: {
		position: 'absolute',
		height: '100%',
		width: '100%',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		padding: theme.spacing(5),
		backgroundColor: fade(theme.palette.text.primary, 0.675),
		color: theme.palette.background.default,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
});

interface FeaturedPostProps {
	post: Post | undefined;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
	const classes = useStyles();

	const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

	const router = useRouter();

	if (!post) return null;

	return (
		<Container className={classes.heroWrapper}>
			<Image src={post.featured_image.formats.medium.url} layout="fill" objectFit="cover" />
			<Box component="div" className={classes.heroContent}>
				<Breadcrumb />
				<Typography variant="h3">{post.title}</Typography>
				<Box>
					<Typography gutterBottom variant="subtitle1">
						<CreateIcon color="primary" />
						{post.author.username}
					</Typography>
					<Typography gutterBottom variant="body2">
						{new Date(post.published_at).toLocaleString('en-US', dateOptions)}
					</Typography>
					{!router.pathname.includes('/posts/') && (
						<Link href={`/posts/${post.slug}`}>
							<Button size="small" color="secondary" endIcon={<ArrowForwardIcon />}>
								Read More
							</Button>
						</Link>
					)}
				</Box>
			</Box>
		</Container>
	);
};

export default FeaturedPost;
