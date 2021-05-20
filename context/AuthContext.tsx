import React, { createContext, useState, useEffect } from 'react';

import { NEXT_URL } from '../config';

import { User } from '../models/User';

export type ContextProps = {
	user: User | null;
	error: String | null;
	login: LoginUser;
	userInfo: (id: number | undefined) => void;
	logout: () => void;
};

const AuthContext = createContext<ContextProps>({
	user: null,
	error: null,
	login: () => {},
	userInfo: (id: number | undefined) => {},
	logout: () => {},
});

type LoginUser = (email: string, password: string) => void;

export const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<String | null>(null);

	useEffect(() => {
		userInfo(user?.id);
	}, []);

	const login: LoginUser = async (identifier, password) => {
		const res = await fetch(`${NEXT_URL}/api/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				identifier,
				password,
			}),
		});

		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
		} else {
			setError(data.message);
			setError(null);
		}
	};

	const userInfo = async (id: number | undefined) => {
		if (!id) {
			setUser(null);
			return;
		}
		const res = await fetch(`${NEXT_URL}/api/user/${id}`);

		const data = await res.json();

		if (res.ok) {
			setUser(data.user);
		} else {
			setUser(null);
		}
	};

	const logout = async () => {
		const res = await fetch(`${NEXT_URL}/api/logout`, {
			method: 'POST',
		});

		if (res.ok) {
			setUser(null);
		}
	};

	return <AuthContext.Provider value={{ user, error, login, logout, userInfo }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
