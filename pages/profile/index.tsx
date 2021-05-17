import React, { useContext } from 'react';
import { GetServerSideProps } from 'next';
import parseCookie from '../../helpers/cookie';
import { API_URL } from '../../config';
import AuthContext from '../../context/AuthContext';

import { Post } from '../../models/Post';
import Layout from '../../src/components/Layout';
import PostCard from '../../src/components/PostCard';
import VerticalSpacer from '../../src/widgets/VerticalSpacer';

import { Container, Grid, Typography } from '@material-ui/core';

interface ProfilePageProps {
	token: String;
	posts: Post[];
}

const ProfilePage: React.FC<ProfilePageProps> = ({ token, posts }) => {
	const { user } = useContext(AuthContext);
	return (
		<Layout title="My Profile">
			<Container>
				<VerticalSpacer />
				<Typography gutterBottom variant="h5">
					{user?.username}
				</Typography>
				<VerticalSpacer />
				<Typography gutterBottom variant="h6">
					My posts
				</Typography>
				<Grid container spacing={5}>
					{posts.map((post) => (
						<PostCard key={post.slug} post={post} token={token} />
					))}
				</Grid>
				<VerticalSpacer />
			</Container>
		</Layout>
	);
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const { token } = parseCookie(req);

	const res = await fetch(`${API_URL}/posts/me`, {
		method: 'GET',
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	const posts = await res.json();

	return {
		props: {
			token,
			posts,
		},
	};
};

export default ProfilePage;
