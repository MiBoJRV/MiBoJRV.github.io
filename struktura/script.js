const cardInput = document.querySelector('#card');
const expDateInput = document.querySelector('#date');
const cvvInput = document.querySelector('#cvv');
const emailInput = document.querySelector('#email');
const nameInput = document.querySelector('#name');
const requiredEmailElement = document.querySelector('.input_email .required');
const requiredCardElement = document.querySelector('.input_card .required');
const requiredNameElement = document.querySelector('.input_name .required');
const errorEmailElement = document.querySelector('.input_email .error_message');
const errorCardElement = document.querySelector('.input_card .error_message');

const buttonGroup = document.querySelector('.button_group');
const BORDER_COLOR_VALID = '#D3E2F9';
const BORDER_COLOR_INVALID = '#EB5757';
const MIN_CARD_LENGTH = 19;
const MIN_DATE_LENGTH = 7;
const MIN_CVV_LENGTH = 3;
const EMAIL_ERROR_MESSAGE = 'Your email is incomplete';
const CARD_NUMBER_ERROR_MESSAGE = 'Your card number is invalid';
const EXP_DATE_ERROR_MESSAGE = 'Your card\'s expiration date is incomplete';
const EXP_DATE_ERROR_PAST_MESSAGE = 'Your card\'s expiration year is in the past';
const submitButton = document.querySelector('.submit_order');


function formatCardNumber(value) {
  const num = value.replace(/\D/g, '');
  let newValue = '';
  for (let i = 0; i < num.length; i++) {
    if (i % 4 === 0 && i > 0) newValue += ' ';
    newValue += num[i];
  }
  return newValue;
}

function formatExpirationDate(value) {
  const num = value.replace(/\D/g, '');
  if (num.length > 2) {
    return num.substring(0, 2) + '/' + num.substring(2);
  }
  return num;
}
function validateInputLength(input, minLength) {
  const isValid = input.value.length >= minLength;
  input.style.borderColor = isValid ? BORDER_COLOR_VALID : BORDER_COLOR_INVALID;
  // requiredCardElement.style.display = isValid ? 'none' : 'block';
  if (input === cardInput) {
    errorCardElement.textContent = isValid ? '' : CARD_NUMBER_ERROR_MESSAGE;
    return true
  } else if (input === expDateInput) {
    errorCardElement.textContent = isValid ? '' : EXP_DATE_ERROR_MESSAGE;
    return true
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateName(name) {
  const nameRegex = /^[A-Za-z]+\s[A-Za-z]+$/;
  return nameRegex.test(name);
}

emailInput.addEventListener('input', function () {
  const isValid = validateEmail(emailInput.value);
  emailInput.style.borderColor = isValid ? BORDER_COLOR_VALID : BORDER_COLOR_INVALID;
  // requiredEmailElement.style.display = isValid ? 'none' : 'block';
  errorEmailElement.textContent = isValid ? '' : EMAIL_ERROR_MESSAGE;
  checkFormValidity();
});

cardInput.addEventListener('input', function () {
  cardInput.value = formatCardNumber(cardInput.value);
  validateInputLength(cardInput, MIN_CARD_LENGTH);
});

expDateInput.addEventListener('input', function () {
  expDateInput.value = formatExpirationDate(expDateInput.value);
  validateInputLength(expDateInput, MIN_DATE_LENGTH);
  // errorCardElement.textContent = isValid ? '' : EXP_DATE_ERROR_MESSAGE;
});

cvvInput.addEventListener('input', function () {
  cvvInput.value = cvvInput.value.replace(/\D/g, '');
  validateInputLength(cvvInput, MIN_CVV_LENGTH);
});

nameInput.addEventListener('input', function () {
  const isValid = validateName(nameInput.value);
  nameInput.style.borderColor = isValid ? BORDER_COLOR_VALID : BORDER_COLOR_INVALID;
  // requiredNameElement.style.display = isValid ? 'none' : 'block';
  checkFormValidity();
});

function checkFormValidity() {
  const isValid =
    validateEmail(emailInput.value)
    &&
    // validateCardInput(cardInput.value)
    // &&
    // validateExpDateInput(expDateInput.value)
    // &&
    // validateCvvInput(cvvInput.value)
    // &&
    validateName(nameInput.value);

  submitButton.disabled = !isValid;
}

form.addEventListener("change", (event) => {
  console.log('change')
  checkFormValidity();

});
