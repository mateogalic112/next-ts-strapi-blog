import { Post } from './Post';

export interface User {
	id: number;
	username: string;
	email: string;
	provider: string;
	confirmed: boolean;
	blocked: boolean;
	role: Role;
	created_at: Date;
	updated_at: Date;
	posts: Post[];
	avatar: Avatar;
}

export interface Avatar {
	id: number;
	name: string;
	alternativeText: null | string;
	caption: null | string;
	width: number;
	height: number;
	formats: Formats;
	hash: string;
	ext: EXT;
	mime: MIME;
	size: number;
	url: string;
	previewUrl: null;
	provider: string;
	provider_metadata: ProviderMetadata;
	created_at: Date;
	updated_at: Date;
}

export enum EXT {
	Jpg = '.jpg',
	PNG = '.png',
}

export interface Formats {
	thumbnail: Large;
	large?: Large;
	medium: Large;
	small: Large;
}

export interface Large {
	name: string;
	hash: string;
	ext: EXT;
	mime: MIME;
	width: number;
	height: number;
	size: number;
	path: null;
	url: string;
	provider_metadata: ProviderMetadata;
}

export enum MIME {
	ImageJPEG = 'image/jpeg',
	ImagePNG = 'image/png',
}

export interface ProviderMetadata {
	public_id: string;
	resource_type: ResourceType;
}

export enum ResourceType {
	Image = 'image',
}

export interface Role {
	id: number;
	name: string;
	description: string;
	type: string;
}
