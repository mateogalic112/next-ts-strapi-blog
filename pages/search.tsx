import Link from 'next/link';
import { useRouter } from 'next/router';

import { GetServerSideProps } from 'next';
import { Post } from '../models/Post';

import qs from 'qs';

import React from 'react';

import { API_URL } from '../config/index';

import Layout from '../src/components/Layout';
import FancyCard from '../src/components/FancyCard';
import VerticalSpacer from '../src/widgets/VerticalSpacer';
import { Container, Grid, Typography, Button } from '@material-ui/core';

interface SearchResults {
	posts: Post[];
}

const Search: React.FC<SearchResults> = ({ posts }) => {
	const router = useRouter();

	return (
		<Layout>
			<Container>
				<VerticalSpacer />
				<Button size="small" color="primary" onClick={() => router.back()}>
					Go back
				</Button>
				<Typography variant="h4">Search results for "{router.query.term}"</Typography>
				<VerticalSpacer />
				<Grid container spacing={5}>
					{posts.map((post) => (
						<Grid item key={post.id}>
							<FancyCard post={post} />
						</Grid>
					))}
				</Grid>
			</Container>
			<VerticalSpacer />
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const { term } = query;

	const keyword = qs.stringify({
		_where: {
			_or: [{ title_contains: term }, { 'author.username_contains': term }],
		},
	});

	const res = await fetch(`${API_URL}/posts?${keyword}`);
	const posts: Post[] = await res.json();

	return {
		props: { posts },
	};
};

export default Search;
