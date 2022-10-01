let buttonOpenModal = document.querySelector('.open_form');
let modalOverlay = document.querySelector('.modal_overlay');
let buttonCloseModal = document.querySelector('.modal_form .close');
let submitButton = document.querySelector('#submit');
let form = document.querySelector('.modal_form-content');
let notification = document.querySelector('.notification');
let modalForm = document.querySelector('.modal_form-content');
let formInputs = document.querySelectorAll('input');
let formLabels = document.querySelectorAll('.error_label');

function openCloseModal() {
    modalOverlay.classList.toggle('show');
}

buttonOpenModal.addEventListener("click", openCloseModal);
buttonCloseModal.addEventListener("click", openCloseModal);

submitButton.addEventListener("click", function (event) {
    for (let i = 0; i < formInputs.length; ++i) {
        if (formInputs[i].value.length < 2) {
            event.preventDefault();
            for (let j = 0; j < formLabels.length; ++j) {
                formLabels[i].classList.add('error');
            }
        } else {
            formLabels[i].classList.remove('error');
        }
    }
});

form.addEventListener("submit", function (event) {
    event.preventDefault();
    notification.classList.add('success');
    modalForm.classList.add('hide');
});



