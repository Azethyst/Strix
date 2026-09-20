document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector('form[action="/api/login"]');
  const submitButton = form?.querySelector('button[type="submit"]');

  form?.addEventListener("submit", () => {
    submitButton.disabled = true;
    submitButton.textContent = "Signing in...";
  });
});
