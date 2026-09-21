document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#loginForm");
  const emailInput = document.querySelector("#email");
  const passwordInput = document.querySelector("#password");
  const button = document.querySelector("#nextButton");
  const errorBox = document.querySelector("#loginError");

  let emailVerified = false;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    button.disabled = true;
    errorBox.textContent = "";

    try {
      if (!emailVerified) {
        button.textContent = "Checking...";

        const response = await fetch("/api/login/check-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Accept: "application/json",
          },
          body: new URLSearchParams({ email: emailInput.value }),
        });

        const data = await response.json();

        if (!data.exists) {
          emailInput.value = "";
          emailInput.focus();

          errorBox.textContent = "Invalid email. Please try again.";
          return;
        }

        errorBox.textContent = "";
        emailVerified = true;

        emailInput.hidden = true;
        passwordInput.hidden = false;

        document.querySelector("#loginTitle").textContent = "Password";

        button.textContent = "Sign in";
        passwordInput.focus();

        return;
      }

      button.textContent = "Logging in";

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams(new FormData(form)),
      });

      const data = await response.json();

      if (!response.ok) {
        passwordInput.value = "";
        passwordInput.focus();

        errorBox.textContent =
          data.message || "Invalid password. Please try again.";

        return;
      }

      window.location.assign(data.redirect);
    } catch {
      errorBox.textContent = "Something went wrong. Please try again.";
    } finally {
      button.disabled = false;

      if (!emailVerified) {
        button.textContent = "Next";
      } else {
        button.textContent = "Sign in";
      }
    }
  });
});
