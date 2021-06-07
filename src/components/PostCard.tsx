import React, { useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import Link from 'next/link';

import { FacebookShareButton } from 'react-share';
import { Post } from '../../models/Post';

import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	Box,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	IconButton,
	Typography,
	Tooltip,
} from '@material-ui/core';
import ShareIcon from '@material-ui/icons/Share';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import LikeComponent from './LikeComponent';

const useStyles = makeStyles({
	root: {
		maxWidth: 345,
	},
	media: {
		height: 140,
	},
});

interface SinglePostProps {
	post: Post;
	token: String | undefined;
}

const PostCard: React.FC<SinglePostProps> = ({ post, token }) => {
	const classes = useStyles();

	const { user } = useContext(AuthContext);

	return (
		<Grid item xs={12} sm={6} lg={4}>
			<Card className={classes.root}>
				<CardActionArea>
					<Link href={`/posts/${post.slug}`}>
						<a>
							<CardMedia
								className={classes.media}
								image={post.featured_image.formats.medium.url}
								title={post.slug}
							/>
						</a>
					</Link>
					<CardContent>
						<Typography gutterBottom variant="h5" component="h2">
							{post.title}
						</Typography>
						<Typography variant="body2" color="textSecondary" component="p">
							{post.excerpt}
						</Typography>
					</CardContent>
				</CardActionArea>
				<Box display="flex" alignItems="center" mb={1} ml={2}>
					{user && user.username !== post.author?.username && (
						<Tooltip title={`Follow ${post.author?.username}`}>
							<IconButton size="small" color="primary" aria-label="follow user" component="span">
								<AddCircleIcon />
							</IconButton>
						</Tooltip>
					)}
					{user?.username !== post.author?.username && (
						<Typography variant="body2">{post.author?.username}</Typography>
					)}
				</Box>
				<CardActions style={{ display: 'flex', alignItems: 'center' }}>
					<FacebookShareButton style={{ margin: '0 .5rem', fontSize: '1rem' }} url="https://www.google.com">
						<ShareIcon />
					</FacebookShareButton>
					<Link href={`/posts/${post.slug}`}>
						<a>Read more</a>
					</Link>
					<LikeComponent post={post} userId={user?.id} token={token} />
				</CardActions>
			</Card>
		</Grid>
	);
};

export default PostCard;
