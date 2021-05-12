import { GetStaticProps } from 'next';
import { Post } from '../models/Post';

import { API_URL } from '../config';

import { Container, Grid } from '@material-ui/core';

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
			</Container>
		</Layout>
	);
};

export const getStaticProps: GetStaticProps = async () => {
	const res = await fetch(`${API_URL}/posts?_limit=2`);

	const posts = await res.json();

	return {
		props: {
			posts,
		},
	};
};

export default HomePage;
