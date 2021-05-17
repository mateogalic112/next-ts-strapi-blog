import { Post } from './Post';
import { User } from './User';

export interface Like {
	id: Number;
	user: User;
	post: Post;
	published_at: Date;
	created_at: Date;
	updated_at: Date;
}
