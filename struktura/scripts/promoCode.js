const couponLink = document.querySelector('.coupon_link');
const promoCode = document.querySelector('.promo_code');

couponLink.addEventListener('click', function (event) {
  event.preventDefault();
  promoCode.classList.toggle('hidden');
});