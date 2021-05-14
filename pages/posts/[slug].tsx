import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';

import { API_URL } from '../../config';

import { Post } from '../../models/Post';
import Layout from '../../src/components/Layout';
import Breadcrumb from '../../src/components/Breadcrumb';
import VerticalSpacer from '../../src/widgets/VerticalSpacer';

import theme from '../../utils/theme';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { makeStyles } from '@material-ui/core/styles';
import { Container, Typography, Box } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';

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
		backgroundColor: fade(theme.palette.text.primary, 0.5),
		color: theme.palette.background.default,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
	},
	container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
});

interface SinglePostProps {
	post: Post;
}

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
	const classes = useStyles();

	const dateOptions: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	return (
		<Layout>
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
					</Box>
				</Box>
			</Container>
			<VerticalSpacer />
			<Container maxWidth="sm" className={classes.container} id="single-wrapper">
				<ReactMarkdown>{post.content}</ReactMarkdown>
			</Container>
		</Layout>
	);
};

export const getStaticPaths: GetStaticPaths = async () => {
	const res = await fetch(`${API_URL}/posts`);
	const posts: Post[] = await res.json();

	const paths = posts.map((post) => ({
		params: { slug: post.slug },
	}));
	return {
		paths,
		fallback: false,
	};
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
	const res = await fetch(`${API_URL}/posts?slug=${params?.slug}`);
	const post: Post[] = await res.json();

	return {
		props: {
			post: post[0],
		},
	};
};

export default SinglePost;
