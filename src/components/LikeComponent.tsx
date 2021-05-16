import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import AuthContext from '../../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';

import { Paper, Fade, Popper, Button, Typography } from '@material-ui/core';

import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import { Like } from '../../models/Post';
import { API_URL } from '../../config';

interface LikeComponentProps {
	postName: String;
	likes: Like[];
	token: String;
	postId: Number;
}

const LikeComponent: React.FC<LikeComponentProps> = ({ postId, postName, likes, token }) => {
	const { user } = useContext(AuthContext);
	const router = useRouter();

	const liked = likes.find((item) => item.user === user?.id);

	const like = async () => {
		const res = await fetch(`${API_URL}/likes`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				post: Number(postId),
				user: Number(user?.id),
			}),
		});

		if (!res.ok) {
			if (res.status === 403 || res.status === 401) {
				toast.error('No token included');
				return;
			}
			toast.error('Something Went Wrong');
		} else {
			router.reload();
			toast.success(`Post "${postName}" liked`);
		}
	};

	return (
		<>
			<ToastContainer />
			{user && (
				<Button onClick={like} size="small" color={liked ? 'primary' : 'secondary'}>
					{liked ? 'Dislike' : 'Like'}
				</Button>
			)}
			<PopupState variant="popper" popupId="demo-popup-popper">
				{(popupState) => (
					<div>
						<Button size="small" variant="outlined" color="primary" {...bindToggle(popupState)}>
							Likes: {likes.length}
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
