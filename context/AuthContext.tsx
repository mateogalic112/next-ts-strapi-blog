import React, { createContext, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import { NEXT_URL } from '../config';

import { User } from '../models/User';

export type ContextProps = {
	user: User | null;
	error: String | null;
	login: LoginUser;
	logout: () => void;
};

const AuthContext = createContext<ContextProps>({
	user: null,
	error: null,
	login: () => {},
	logout: () => {},
});

type LoginUser = (email: string, password: string) => void;

export const AuthProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<String | null>(null);

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

	const logout = async () => {};

	return <AuthContext.Provider value={{ user, error, login, logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
