import { GetServerSideProps } from 'next';
import Link from 'next/link';

import parseCookie from '../helpers/cookie';

import { Post } from '../models/Post';
import { API_URL } from '../config';

import { Container, Grid, Button } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Layout from '../src/components/Layout';
import Showcase from '../src/components/Showcase';
import VerticalSpacer from '../src/widgets/VerticalSpacer';
import PostCard from '../src/components/PostCard';

interface HomePageProps {
	token: String | undefined;
	posts: Post[];
}

const HomePage: React.FC<HomePageProps> = ({ token, posts, children }) => {
	return (
		<Layout>
			<Showcase />
			<Container>
				<div>{children}</div>
			</Container>
			<VerticalSpacer />
			<Container>
				<h2>Latest Posts</h2>
				<Grid container spacing={5}>
					{posts.map((post) => (
						<PostCard key={post.slug} post={post} token={token} />
					))}
				</Grid>
				<VerticalSpacer />
				<Link href="/posts">
					<Button variant="contained" color="primary" endIcon={<ArrowForwardIosIcon />}>
						View All
					</Button>
				</Link>
			</Container>
			<VerticalSpacer />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const res = await fetch(`${API_URL}/posts?_sort=published_at:ASC&_limit=3`);
	let cookieToken;
	if (parseCookie(req)?.token) {
		cookieToken = parseCookie(req).token;
	} else {
		cookieToken = '';
	}

	const posts = await res.json();

	return {
		props: {
			posts,
			token: cookieToken,
		},
	};
};

export default HomePage;
