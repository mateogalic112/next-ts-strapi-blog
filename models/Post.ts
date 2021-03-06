import { Avatar } from './User';

export interface Post {
	id: number;
	title: string;
	slug: string;
	content: string;
	excerpt: string;
	author: Author;
	is_featured: boolean;
	published_at: Date;
	created_at: Date;
	updated_at: Date;
	featured_image: FeaturedImage;
	likes: Like[];
}

export interface Author {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	role: number;
	created_at: Date;
	updated_at: Date;
	avatar: Avatar;
}

export interface FeaturedImage {
	id: number;
	name: string;
	alternativeText: string;
	caption: string;
	width: number;
	height: number;
	formats: Formats;
	hash: string;
	ext: string;
	mime: string;
	size: number;
	url: string;
	previewUrl: null;
	provider: string;
	provider_metadata: ProviderMetadata;
	created_at: Date;
	updated_at: Date;
}

export interface Formats {
	thumbnail: Medium;
	medium: Medium;
	small: Medium;
}

export interface Medium {
	name: string;
	hash: string;
	ext: string;
	mime: string;
	width: number;
	height: number;
	size: number;
	path: null;
	url: string;
	provider_metadata: ProviderMetadata;
}

export interface ProviderMetadata {
	public_id: string;
	resource_type: string;
}

export interface Like {
	id: number;
	user: number;
	post: number;
	published_at: Date;
	created_at: Date;
	updated_at: Date;
}
