import { GetStaticProps, GetStaticPaths } from 'next';
import Image from 'next/image';

import ReactMarkdown from 'react-markdown';

import { API_URL } from '../../config';

import { Post } from '../../models/Post';
import Layout from '../../src/components/Layout';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
	heroWrapper: { position: 'relative', width: '100%', height: 500, paddingBottom: '20%' },
});

interface SinglePostProps {
	post: Post;
}

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
	const classes = useStyles();
	return (
		<Layout>
			<div className={classes.heroWrapper}>
				<Image src={post.featured_image.formats.medium.url} layout="fill" objectFit="cover" />
			</div>
			<Container maxWidth="md">
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
