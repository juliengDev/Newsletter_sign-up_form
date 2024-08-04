// Defining types for DOM elements
type HTMLElementOrNull = HTMLElement | null;
type HTMLInputElementOrNull = HTMLInputElement | null;
type HTMLFormElementOrNull = HTMLFormElement | null;

// Interface for DOM elements
interface DOMElements {
  signup: HTMLElementOrNull;
  modal: HTMLElementOrNull;
  form: HTMLFormElementOrNull;
  emailInput: HTMLInputElementOrNull;
  error: HTMLElementOrNull;
  userEmail: HTMLElementOrNull;
  dismissBtn: HTMLElementOrNull;
}

// Function for etting DOM elements
function getDOMElements(): DOMElements {
  return {
    signup: document.querySelector<HTMLDivElement>(".signup"),
    modal: document.querySelector<HTMLDivElement>("#modal"),
    form: document.querySelector<HTMLFormElement>("#form"),
    emailInput: document.querySelector<HTMLInputElement>("#email"),
    error: document.querySelector<HTMLSpanElement>("#error"),
    userEmail: document.querySelector<HTMLSpanElement>("#userEmail"),
    dismissBtn: document.querySelector<HTMLButtonElement>("#dismiss"),
  };
}

// Regex for email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Function to validate the email
function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

// Function for managing form submission
function handleSubmit(e: Event, elements: DOMElements): void {
  e.preventDefault();
  const { emailInput, error, signup, modal, userEmail } = elements;

  if (emailInput) {
    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, error);
    } else {
      hideError(emailInput, error);
      toggleVisibility(signup, modal);
      updateUserEmail(userEmail, emailInput);
    }
  }
}

// Function to manage message rejection
function handleDismiss(e: Event, elements: DOMElements): void {
  e.preventDefault();
  const { signup, modal, emailInput } = elements;
  toggleVisibility(signup, modal);
  if (emailInput) emailInput.value = "";
}

// Utility functions
function showError(
  input: HTMLInputElementOrNull,
  errorElement: HTMLElementOrNull
): void {
  if (input) {
    input.classList.add("signup__body__form__email__input-error");
    if (errorElement) {
      errorElement.classList.remove("hidden");
      errorElement.textContent = "Valid email required";
    }
  }
}

function hideError(
  input: HTMLInputElementOrNull,
  errorElement: HTMLElementOrNull
): void {
  if (input) {
    input.classList.remove("signup__body__form__email__input-error");
    if (errorElement) errorElement.classList.add("hidden");
  }
}

function toggleVisibility(...elements: HTMLElementOrNull[]): void {
  elements.forEach((el) => el?.classList.toggle("hidden"));
}

function updateUserEmail(
  userEmailElement: HTMLElementOrNull,
  inputElement: HTMLInputElementOrNull
): void {
  if (userEmailElement && inputElement) {
    userEmailElement.textContent = inputElement.value;
  }
}

// Initialisation
function init(): void {
  const elements = getDOMElements();

  if (elements.form) {
    elements.form.addEventListener("submit", (e) => handleSubmit(e, elements));
  }

  if (elements.dismissBtn) {
    elements.dismissBtn.addEventListener("click", (e) =>
      handleDismiss(e, elements)
    );
  }
}

// Start initialisation
init();
