// Centralized API utilities: fetch wrapper + XHR fallback.
// Responsible for:
//  - Attaching Authorization header from localStorage
//  - Parsing JSON and throwing on non-2xx responses
//  - Exposing XHR fallback for older environments (educational)

import { API_BASE } from '../config.js';

/**
 * Attach auth token from localStorage to headers object.
 * @param {HeadersInit} headers
 * @returns {HeadersInit}
 */
export function attachAuthToken(headers = {}) {
  const token = localStorage.getItem('auth_token');
  if (token) {
    headers = { ...headers, Authorization: 'Bearer ' + token };
  }
  return headers;
}

/**
 * A small wrapper around fetch that throws on non-2xx and returns JSON.
 * @param {string} path
 * @param {object} options
 */
export async function apiFetch(path, options = {}) {
  const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? path : '/' + path}`;
  const headers = attachAuthToken(options.headers || {});
  const opts = { ...options, headers };

  // Ensure JSON content-type when body present and not a FormData
  if (opts.body && !(opts.body instanceof FormData)) {
    opts.headers = { 'Content-Type': 'application/json', ...opts.headers };
    if (typeof opts.body !== 'string') opts.body = JSON.stringify(opts.body);
  }

  const res = await fetch(url, opts);
  // Throw on non-2xx
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    const err = new Error(`HTTP ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.body = text;
    throw err;
  }
  // If no content
  if (res.status === 204) return null;
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  } else {
    return res.text();
  }
}

/**
 * XHR fallback for learning/demo purposes.
 * @param {string} path
 * @param {function} callback
 */
export function apiXHR(path, callback) {
  try {
    const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? path : '/' + path}`;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    const token = localStorage.getItem('auth_token');
    if (token) xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        callback(null, JSON.parse(xhr.responseText));
      } else {
        callback(new Error('XHR error: ' + xhr.status));
      }
    };
    xhr.onerror = () => callback(new Error('Network error'));
    xhr.send();
  } catch (err) {
    callback(err);
  }
}
