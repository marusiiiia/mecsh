import "bootstrap/dist/css/bootstrap.css";
import "../css/style.css";

import UI from "./config/ui.config.js";
import { validate } from "./helpers/validate.js";
import { showMessage, removeInputErrors } from "./views/message.js";

import { login } from "./services/auth.service";
import { getNews } from "./services/news.service";
import notify from "./views/notify";
const { emailInput, passwordInput, form } = UI;
const inputs = [emailInput, passwordInput];

form.addEventListener("submit", onSubmit);
inputs.forEach((input) => {
  input.addEventListener("focus", onFocus);
});

async function onSubmit(e) {
  e.preventDefault();
  const isValidForm = inputs.every((input) => {
    if (validate(input)) return true;
    showMessage(input);
    return false;
  });
  if (!isValidForm) return;

  try {
    await login(emailInput.value, passwordInput.value);
    await getNews();
    form.reset();
    notify({
      msg: "Ооочень все прекрасно",
      className: "alert-primary",
      timeout: 2000,
    });
  } catch (err) {
    notify({
      msg: "no no user",
      className: "alert-danger",
      timeout: 2000,
    });
  }
}
function onFocus(e) {
  inputs.forEach((input) => {
    removeInputErrors(input);
  });
}
