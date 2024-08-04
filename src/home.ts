const formEl = document.querySelector<HTMLFormElement>("#form");
const emailInputEl = document.querySelector<HTMLInputElement>("#email");
const errorEl = document.querySelector<HTMLSpanElement>("#error");
// const suscribeBtnEl = document.querySelector<HTMLButtonElement>("#subscribe");
// const dismissBtnEl = document.querySelector<HTMLButtonElement>("dismiss");

const emailRegex = new RegExp(
  "^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|" +
    '"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|\\\\' +
    '[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z' +
    "0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-" +
    "9])|1[0-9][0-9]|[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-" +
    "9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1" +
    "f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])$"
);

function submitForm(e: Event): void {
  e.preventDefault();
  if (emailInputEl && !emailRegex.test(emailInputEl.value)) {
    if (errorEl) {
      console.log("invalid email");
      emailInputEl.classList.add("signup__body__form__email__input-error");
      errorEl.classList.remove("hidden");
      errorEl.textContent = "Valid email required";
    }
  } else {
    if (emailInputEl && errorEl) {
      console.log("Valid email:", emailInputEl.value);
      errorEl.classList.add("hidden");
      emailInputEl.classList.remove("signup__body__form__email__input-error");
    }
  }
}

if (formEl) formEl.addEventListener("submit", submitForm);
