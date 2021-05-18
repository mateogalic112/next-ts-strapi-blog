import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';

import { API_URL } from '../../config';

import { Post } from '../../models/Post';
import Layout from '../../src/components/Layout';
import VerticalSpacer from '../../src/widgets/VerticalSpacer';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import FeaturedPost from '../../src/components/FeaturedPost';

const useStyles = makeStyles({
	container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
});

interface SinglePostProps {
	post: Post;
}

const SinglePost: React.FC<SinglePostProps> = ({ post }) => {
	const classes = useStyles();

	return (
		<Layout title={post.title}>
			<FeaturedPost post={post} />
			<VerticalSpacer />
			<Container maxWidth="sm" className={classes.container} id="single-wrapper">
				<ReactMarkdown>{post.content}</ReactMarkdown>
			</Container>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	const res = await fetch(`${API_URL}/posts?slug=${params?.slug}`);
	const post: Post[] = await res.json();

	return {
		props: {
			post: post[0],
		},
	};
};

export default SinglePost;
