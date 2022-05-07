function template(msg) {
  return `<div class="invalid-feedback">${msg}</div>`;
}

export function showMessage(el) {
  el.classList.add("is-invalid");
  const parent = el.parentElement;
  const msg = el.dataset.invalidMessage || "input invalid";
  parent.insertAdjacentHTML("beforeend", template(msg));
}

export function removeInputErrors(el) {
  const parent = el.parentElement;
  const errorMsg = parent.querySelector(".invalid-feedback");
  if (!errorMsg) return;
  errorMsg.remove();
  el.classList.remove("is-invalid");
}
