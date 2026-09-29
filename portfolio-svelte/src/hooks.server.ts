import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	// The old CV exposed a street address; send old links to the current CV.
	if (event.url.pathname === '/cv/magnus_lixenstrand_cv.pdf') {
		return new Response(null, { status: 301, headers: { location: '/cv/magnus_lixenstrand_cv_2026.pdf?v=2' } });
	}

	const response = await resolve(event);

	// Security headers
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

	// Content Security Policy
	const csp = [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline'", // unsafe-inline needed for SvelteKit
		"style-src 'self' 'unsafe-inline'",
		"font-src 'self'",
		"img-src 'self' data:",
		"connect-src 'self'",
		"frame-ancestors 'none'",
		"base-uri 'self'",
		"form-action 'self'"
	].join('; ');

	response.headers.set('Content-Security-Policy', csp);

	// HSTS - only if using HTTPS
	if (event.url.protocol === 'https:') {
		response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
	}

	return response;
};
