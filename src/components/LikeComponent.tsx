import React, { useContext, useState, useEffect } from 'react';
import LikesContext from '../../context/LikeContext';

import { ToastContainer, toast } from 'react-toastify';

import { Button } from '@material-ui/core';

import { Post } from '../../models/Post';

import { API_URL } from '../../config';
import ModalComponent from './ModalComponent';
import { Like } from '../../models/Like';

interface LikeComponentProps {
	post: Post;
	token: String | undefined;
	userId: Number | undefined;
}

const LikeComponent: React.FC<LikeComponentProps> = ({ post, userId, token }) => {
	const { loadLikesGiven, likesGiven, getLikesByPost, loadLikesReceived } = useContext(LikesContext);

	const [showModal, setShowModal] = React.useState<boolean>(false);
	const openModal = () => setShowModal(true);

	const [likesCount, setLikesCount] = useState<Like[]>([]);

	const setLikeFunc = async () => {
		return await getLikesByPost(post.id);
	};

	const isLiked = !!likesGiven.find((like) => like.user.id === userId && like.post.id === post.id);

	useEffect(() => {
		setLikeFunc().then((r) => setLikesCount(r));
	}, [isLiked]);

	const like = async () => {
		const res = await fetch(`${API_URL}/likes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				post: Number(post.id),
				user: Number(userId),
			}),
		});

		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error('No token included');
				return;
			}
			toast.error('Something Went Wrong');
		} else {
			loadLikesGiven(userId);
			loadLikesReceived(userId);
			getLikesByPost(post.id);
			toast.success(`Post "${post.title}" liked`);
		}
	};

	const dislike = async () => {
		const res = await fetch(`${API_URL}/likes/${post.id}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error('No token included');
				return;
			}
			toast.error('Something Went Wrong');
		} else {
			loadLikesGiven(userId);
			loadLikesReceived(userId);
			getLikesByPost(post.id);
			toast.success(`Post "${post.title}" unliked`);
		}
	};

	return (
		<>
			<ToastContainer autoClose={3000} />
			{userId && (
				<Button onClick={isLiked ? dislike : like} size="small" color={isLiked ? 'primary' : 'secondary'}>
					{isLiked ? 'Dislike' : 'Like'}
				</Button>
			)}
			<Button
				disabled={likesCount.length === 0}
				onClick={openModal}
				size="small"
				variant="outlined"
				color="primary"
			>
				Likes: {likesCount.length}
			</Button>
			<ModalComponent
				open={showModal}
				handleClose={() => setShowModal(false)}
				title="Likes"
				description="People that liked this"
			>
				{likesCount.map((like) => (
					<p>{like.user.username}</p>
				))}
			</ModalComponent>
		</>
	);
};

export default LikeComponent;
