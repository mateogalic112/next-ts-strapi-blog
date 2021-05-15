import { GetStaticProps } from 'next';
import Link from 'next/link';
import { Post } from '../models/Post';

import { API_URL } from '../config';

import { Container, Grid, Button } from '@material-ui/core';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Layout from '../src/components/Layout';
import Showcase from '../src/components/Showcase';
import VerticalSpacer from '../src/widgets/VerticalSpacer';
import PostCard from '../src/components/PostCard';

interface HomePageProps {
	posts: Post[];
}

const HomePage: React.FC<HomePageProps> = ({ posts, children }) => {
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
						<PostCard key={post.slug} post={post} />
					))}
				</Grid>
				<VerticalSpacer />
				<Link href="/posts" passHref>
					<Button variant="contained" color="primary" endIcon={<ArrowForwardIosIcon />}>
						<a>View All</a>
					</Button>
				</Link>
			</Container>
			<VerticalSpacer />
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const res = await fetch(`${API_URL}/posts?_sort=published_at:ASC&_limit=3`);

	const posts = await res.json();

	return {
		props: {
			posts,
		},
	};
};

export default HomePage;
