import cookie from 'cookie';
import { IncomingMessage } from 'http';
import { NextApiRequestCookies } from 'next/dist/next-server/server/api-utils';

export default function parseCookie(
	req: IncomingMessage & {
		cookies: NextApiRequestCookies;
	}
) {
	return cookie.parse(req ? req.headers.cookie || '' : '');
}
