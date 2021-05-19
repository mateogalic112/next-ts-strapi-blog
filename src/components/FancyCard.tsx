import React from 'react';
import Link from 'next/link';
import { FacebookShareButton, FacebookIcon } from 'react-share';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';

import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
	Typography,
	Card,
	CardHeader,
	CardMedia,
	CardContent,
	CardActions,
	Avatar,
	IconButton,
} from '@material-ui/core';

import { Post } from '../../models/Post';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			maxWidth: 345,
		},
		media: {
			height: 0,
			paddingTop: '56.25%', // 16:9
		},
		avatar: {
			backgroundColor: red[500],
		},
	})
);

type FancyCardProps = {
	post: Post;
};

const FancyCard: React.FC<FancyCardProps> = ({ post }) => {
	const classes = useStyles();

	return (
		<Card className={classes.root}>
			<CardHeader
				avatar={
					<Avatar aria-label="recipe" className={classes.avatar}>
						{post.author.username.charAt(0).toUpperCase()}
					</Avatar>
				}
				action={
					<IconButton aria-label="settings">
						<MoreVertIcon />
					</IconButton>
				}
				title={post.title}
				subheader={new Date(post.created_at).toLocaleString('en-US', {
					weekday: 'short',
					day: 'numeric',
					year: 'numeric',
					month: 'long',
				})}
			/>
			<Link href={`/posts/${post.slug}`}>
				<a>
					<CardMedia
						className={classes.media}
						image={post.featured_image.formats.small.url}
						title={post.slug}
					/>
				</a>
			</Link>
			<CardContent>
				<Typography variant="body2" color="textSecondary" component="p">
					{post.excerpt}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton aria-label="share">
					<FacebookShareButton url="https://www.typescriptlang.org/docs/handbook/2/everyday-types.html">
						<FacebookIcon size="25" round />
					</FacebookShareButton>
				</IconButton>
			</CardActions>
		</Card>
	);
};

export default FancyCard;
