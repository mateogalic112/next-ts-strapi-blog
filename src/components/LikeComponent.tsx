import React, { useContext, useState, useEffect } from 'react';
import LikesContext from '../../context/LikeContext';

import { ToastContainer, toast } from 'react-toastify';

import { Paper, Fade, Popper, Button, Typography } from '@material-ui/core';

import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import { Post } from '../../models/Post';

import { API_URL } from '../../config';

interface LikeComponentProps {
	post: Post;
	token: String;
	userId: Number | undefined;
}

const LikeComponent: React.FC<LikeComponentProps> = ({ post, userId, token }) => {
	const { loadLikesGiven, likesGiven, getLikesByPost } = useContext(LikesContext);

	const [likesCount, setLikesCount] = useState(0);

	const setLikeFunc = async () => {
		return await getLikesByPost(post.id).then((result) => result.length);
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
			<PopupState variant="popper" popupId="demo-popup-popper">
				{(popupState) => (
					<div>
						<Button size="small" variant="outlined" color="primary" {...bindToggle(popupState)}>
							Likes: {likesCount}
						</Button>
						<Popper {...bindPopper(popupState)} transition>
							{({ TransitionProps }) => (
								<Fade {...TransitionProps} timeout={350}>
									<Paper>
										<Typography variant="subtitle1">The content of the Popper.</Typography>
									</Paper>
								</Fade>
							)}
						</Popper>
					</div>
				)}
			</PopupState>
		</>
	);
};

export default LikeComponent;
