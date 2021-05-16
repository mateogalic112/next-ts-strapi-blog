import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';

import { API_URL } from '../../config';

import { Post } from '../../models/Post';

import Layout from '../../src/components/Layout';
import PostCard from '../../src/components/PostCard';
import VerticalSpacer from '../../src/widgets/VerticalSpacer';

import { Container, Grid } from '@material-ui/core';
import Pagination from '@material-ui/lab/Pagination';
import FeaturedPost from '../../src/components/FeaturedPost';
import parseCookie from '../../helpers/cookie';

const PER_PAGE = 4;
interface PostsProps {
	token: String;
	posts: Post[];
	total: number;
	page: number;
}

const PostsPage: React.FC<PostsProps> = ({ token, posts, total, page }) => {
	const router = useRouter();

	const lastPage = Math.ceil(total / PER_PAGE);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		router.push(`/posts?page=${value}`);
	};

	return (
		<Layout>
			<FeaturedPost post={posts.shift()} />
			<VerticalSpacer />
			<Container>
				<Grid container spacing={5}>
					{posts.map((post) => (
						<PostCard key={post.slug} post={post} token={token} />
					))}
				</Grid>
				<VerticalSpacer />
				<Pagination count={lastPage} page={page} onChange={handlePageChange} />
			</Container>
			<VerticalSpacer />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
	const { page = 1 } = query;
	const { token } = parseCookie(req);

	const start = Number(page) === 1 ? 0 : (Number(page) - 1) * PER_PAGE;

	const fetchData = async () => {
		try {
			const [total, posts] = await Promise.all([
				await fetch(`${API_URL}/posts/count`).then((r) => r.json()),
				await fetch(`${API_URL}/posts?_sort=published_at:ASC&_limit=${PER_PAGE}&_start=${start}`).then((r) =>
					r.json()
				),
			]);
			return {
				total,
				posts,
			};
		} catch (err) {
			throw new Error('Failed to fetch data');
		}
	};

	const { total, posts } = await fetchData();

	return {
		props: {
			posts,
			page: Number(page),
			total,
			token,
		},
	};
};

export default PostsPage;
