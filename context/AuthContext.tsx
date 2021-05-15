import React, { createContext, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { NEXT_URL } from '../config';

import { User } from '../models/User';

export type ContextProps = {
	user: User | null;
	error: String | null;
	login: LoginUser;
	userInfo: () => void;
	logout: () => void;
};

const AuthContext = createContext<ContextProps>({
	user: null,
	error: null,
	login: () => {},
	userInfo: () => {},
	logout: () => {},
});

type LoginUser = (email: string, password: string) => void;

export const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<String | null>(null);

	useEffect(() => {
		userInfo();
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

	const userInfo = async () => {
		const res = await fetch(`${NEXT_URL}/api/user`);

		const data = await res.json();

		if (res.ok) {
			setError(data.user);
		} else {
			setUser(null);
		}
	};

	const logout = async () => {};

	return <AuthContext.Provider value={{ user, error, login, logout, userInfo }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
