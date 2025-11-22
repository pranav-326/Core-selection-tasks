// Small spinner helper to show/hide spinner nodes.
export function showSpinner(id = 'spinner') {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('hidden');
  el.setAttribute('aria-hidden', 'false');
}

export function hideSpinner(id = 'spinner') {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('hidden');
  el.setAttribute('aria-hidden', 'true');
}
