import { GetStaticProps } from 'next';
import { Post } from '../models/Post';

import { API_URL } from '../config';

import { Container } from '@material-ui/core';

import Layout from '../src/components/Layout';
import Showcase from '../src/components/Showcase';
import VerticalSpacer from '../src/widgets/VerticalSpacer';

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
			<h2>Latest Posts</h2>
			<>
				{posts.map((post) => (
					<h1 key={post.title}>{post.title}</h1>
				))}
			</>
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
