const form = document.querySelector('#pay_form');
const successfulPayment = document.querySelector('.successful_payment');
const close = document.querySelector('#close');

close.addEventListener('click', function(event) {
  event.preventDefault();
  successfulPayment.classList.toggle('hidden');
});

form.addEventListener('submit', function(event) {
  event.preventDefault();
  submitForm();
});

function submitForm() {
  const formData = new FormData(form);

  fetch('https://httpbin.org/post', {
    method: 'POST',
    body: formData
  })
    .then(function(response) {
      if (response.ok) {
        console.log('Form submitted successfully!');
        console.log(response);
        form.reset();
        successfulPayment.classList.toggle('hidden');
        // successfulPayment.toggle('.hidden');
      } else {
        console.log('Error submitting form');
      }
    })
    .catch(function(error) {
      console.log('Error submitting form');
    });
}