import React, { createContext, useState, useEffect, useContext } from 'react';
import { NEXT_URL } from '../config';
import { Like } from '../models/Like';

import AuthContext from './AuthContext';

type LikesContextProps = {
	error: String | null;
	likesGiven: Like[];
	likesReceived: Like[];
	getLikesByPost: (postId: Number) => Promise<Like[]>;
	loadLikesGiven: (userId: Number | undefined) => void;
};

const LikesContext = createContext<LikesContextProps>({
	error: null,
	likesGiven: [],
	likesReceived: [],
	getLikesByPost: async (postId) => [],
	loadLikesGiven: (userId) => {},
});

export const LikesProvider: React.FC = ({ children }) => {
	const { user } = useContext(AuthContext);

	const [likesGiven, setLikesGiven] = useState<Like[]>([]);
	const [likesReceived, setLikesReceived] = useState<Like[]>([]);
	const [error, setError] = useState<String | null>(null);

	const getLikesByPost = async (postId: Number): Promise<Like[]> => {
		const res = await fetch(`${NEXT_URL}/api/likes/${postId}`);

		const data = await res.json();

		if (res.ok) {
			return data.likes;
		} else {
			setError(data.message);
			setError(null);
			return [];
		}
	};

	const loadLikesGiven = async (userId: Number | undefined) => {
		const res = await fetch(`${NEXT_URL}/api/likes/given/${userId}`);

		const data = await res.json();

		if (res.ok) {
			setLikesGiven(data.likes);
		} else {
			setError(data.message);
			setError(null);
		}
	};

	const loadLikesReceived = async () => {
		const res = await fetch(`${NEXT_URL}/api/likes/received/${user?.id}`);

		const data = await res.json();

		if (res.ok) {
			setLikesReceived(data.likes);
		} else {
			setError(data.message);
			setError(null);
		}
	};

	useEffect(() => {
		if (user) {
			loadLikesGiven(user?.id);
			loadLikesReceived();
		}
	}, [user]);

	return (
		<LikesContext.Provider value={{ error, likesGiven, likesReceived, loadLikesGiven, getLikesByPost }}>
			{children}
		</LikesContext.Provider>
	);
};

export default LikesContext;
