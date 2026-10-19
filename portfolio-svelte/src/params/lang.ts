import type { ParamMatcher } from '@sveltejs/kit';

// Only English has a path prefix; Swedish is served at the root paths
export const match: ParamMatcher = (param) => param === 'en';
