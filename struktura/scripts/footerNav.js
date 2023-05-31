let hiddenLists = document.querySelectorAll('.navigation ul');

hiddenLists.forEach(function (list) {
  list.previousElementSibling.addEventListener('click', function () {
    list.classList.toggle('not_visible');
  });
});