import cookie from 'cookie';

import type { NextApiRequest, NextApiResponse } from 'next';
import { API_URL } from '../../../../config';
import { Like } from '../../../../models/Post';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'GET') {
		if (!req.headers.cookie) {
			res.status(403).json({
				message: 'Not authorized!',
			});
			return;
		}

		const { token } = cookie.parse(req.headers.cookie);

		const { authorId } = req.query;

		const strapiRes = await fetch(`${API_URL}/likes/received?post.author=${authorId}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		const likes: Like[] = await strapiRes.json();

		if (strapiRes.ok) {
			res.status(200).json({ likes });
		} else {
			res.status(500).json({
				message: 'Something went wrong!',
			});
		}
	} else {
		res.setHeader('Allow', ['GET']);
		res.status(405).json({ message: `Method ${req.method} not allowed` });
	}
};
