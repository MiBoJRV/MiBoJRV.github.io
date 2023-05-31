const arrow = document.querySelector('.arrow_mini');
const alternativeMethods = document.querySelector('.alternative_methods');

alternativeMethods.addEventListener('click', function () {
  buttonGroup.classList.toggle('hidden');
  arrow.classList.toggle('rotate');
});