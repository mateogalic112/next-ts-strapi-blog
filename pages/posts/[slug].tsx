import { GetServerSideProps } from 'next';
import ReactMarkdown from 'react-markdown';

import { API_URL } from '../../config';

import { Post } from '../../models/Post';
import Layout from '../../src/components/Layout';
import VerticalSpacer from '../../src/widgets/VerticalSpacer';

import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import FeaturedPost from '../../src/components/FeaturedPost';
import parseCookie from '../../helpers/cookie';

const useStyles = makeStyles({
	container: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
});

interface SinglePostProps {
	post: Post;
	token: String;
}

const SinglePost: React.FC<SinglePostProps> = ({ post, token }) => {
	const classes = useStyles();

	return (
		<Layout title={post.title}>
			<FeaturedPost post={post} token={token} />
			<VerticalSpacer />
			<Container maxWidth="sm" className={classes.container} id="single-wrapper">
				<ReactMarkdown>{post.content}</ReactMarkdown>
			</Container>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
	const res = await fetch(`${API_URL}/posts?slug=${params?.slug}`);
	const post: Post[] = await res.json();

	let cookieToken;
	if (parseCookie(req)?.token) {
		cookieToken = parseCookie(req).token;
	} else {
		cookieToken = '';
	}

	return {
		props: {
			post: post[0],
			token: cookieToken,
		},
	};
};

export default SinglePost;
