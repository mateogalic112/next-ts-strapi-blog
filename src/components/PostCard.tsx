import React from 'react';
import Link from 'next/link';

import { Post } from '../../models/Post';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';

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
}

const PostCard: React.FC<SinglePostProps> = ({ post }) => {
	const classes = useStyles();
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
				<CardActions>
					<Button size="small" color="primary">
						Share
					</Button>
					<Link href={`/posts/${post.slug}`}>
						<a>Read more</a>
					</Link>
				</CardActions>
			</Card>
		</Grid>
	);
};

export default PostCard;
