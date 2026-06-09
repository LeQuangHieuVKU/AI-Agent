import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";

// Handle all HTTP methods for the Kinde auth proxy
export const GET = handleAuth();
export const POST = handleAuth();
export const PUT = handleAuth();
export const PATCH = handleAuth();
export const DELETE = handleAuth();
export const OPTIONS = handleAuth();
