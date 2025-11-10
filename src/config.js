// To use your Cloudflare Worker, set VITE_PROXY_URL to your worker endpoint, e.g.:
const VITE_PROXY_URL="https://silent-king-a875.m22386.workers.dev/?url="
export const PROXY_URL = VITE_PROXY_URL || 'https://api.allorigins.win/raw?url='
