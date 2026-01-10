import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Security headers
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-XSS-Protection', '1; mode=block');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set(
		'Permissions-Policy',
		'camera=(), microphone=(), geolocation=(), interest-cohort=()'
	);

	// Content Security Policy
	const csp = [
		"default-src 'self'",
		"script-src 'self' 'unsafe-inline'", // unsafe-inline needed for SvelteKit
		"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com", // Google Fonts
		"font-src 'self' https://fonts.gstatic.com",
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
