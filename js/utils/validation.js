// Simple validation helpers for demo forms.

export function required(value) {
  return value !== null && value !== undefined && String(value).trim().length > 0;
}

export function minLength(value, len) {
  return String(value || '').trim().length >= len;
}

export function validatePost({ title, body }) {
  const errors = {};
  if (!required(title)) errors.title = 'Title is required';
  else if (!minLength(title, 3)) errors.title = 'Title must be 3+ characters';
  if (!required(body)) errors.body = 'Body is required';
  else if (!minLength(body, 5)) errors.body = 'Body must be 5+ characters';
  return errors;
}
