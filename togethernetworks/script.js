document.addEventListener('DOMContentLoaded', () => {

  //Login
  let logInButton = document.querySelector('.login-btn');
  let formFields = document.querySelector('.form-fields');

  logInButton.addEventListener('click', function (event) {
    event.preventDefault();
    formFields.classList.toggle('hide');
  });


//Select
  let select = function () {
    let selectHeader = document.querySelectorAll('.select-header');
    let selectItem = document.querySelectorAll('.select-item');
    let select = document.querySelector('.select');

    selectHeader.forEach(item => {
      item.addEventListener('click', selectToggle);

    });

    selectItem.forEach(item => {
      item.addEventListener('click', selectChoose)
    });

    function selectToggle() {
      this.parentElement.classList.toggle('is-active');
    }

    function selectChoose() {
      let text = this.innerText,
        select = this.closest('.select'),
        currentText = select.querySelector('.select-current');
      currentText.innerText = text;
      select.classList.remove('is-active');
    }

    document.addEventListener('click', function (event) {
      let activeSelect = document.querySelector('.select.is-active');
      if (activeSelect !== null && event.target.closest('.select') === null) {
        activeSelect.classList.remove('is-active');
      }
    });
  };
  select();


  //Slider
  const prevButton = document.querySelector('.prev-button');
  const nextButton = document.querySelector('.next-button');
  const steps = document.querySelectorAll('.step');
  const dotsContainer = document.querySelector('.dots');
  let activeIndex = 0;

  for (let i = 0; i < steps.length; i++) {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === activeIndex) {
      dot.classList.add('active');
    }
    dotsContainer.appendChild(dot);
  }

  const dots = document.querySelectorAll('.dot');

  function setActiveStep() {
    steps.forEach(step => {
      step.classList.remove('active');
    });
    dots.forEach(dot => {
      dot.classList.remove('active');
    });

    steps[activeIndex].classList.add('active');
    dots[activeIndex].classList.add('active');
  }

  setActiveStep();

  prevButton.addEventListener('click', () => {
    if (activeIndex > 0) {
      steps[activeIndex].classList.remove('active');
      activeIndex--;
      steps[activeIndex].classList.add('active');
      nextButton.classList.remove('last-step');
      nextButton.textContent = 'Next step';
      nextButton.innerHTML = `
    Next step
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17">
      <g>
        <g>
          <path fill="#fff" d="M1.42-.012l7.08 7.08.08-.08 1.432 1.432-.08.08.08.08-1.432 1.432-.08-.08-7.08 7.08-1.433-1.432 7.08-7.08-7.08-7.08z"/>
        </g>
      </g>
    </svg>
  `;
    }
    setActiveStep();
  });

  nextButton.addEventListener('click', () => {

    if (activeIndex < steps.length - 1) {
      steps[activeIndex].classList.remove('active');
      activeIndex++;
      steps[activeIndex].classList.add('active');
      if (activeIndex === steps.length - 1) {
        nextButton.textContent = 'Start now';
        nextButton.classList.add('last-step');
        const submitForm = document.querySelector('.last-step');
        validateForm(submitForm);
        nextButton.innerHTML = `
      Start now
      <svg xmlns="http://www.w3.org/2000/svg" width="16.97" height="11.314" viewBox="0 0 16.97 11.314">
        <path d="M1263.515,522.414l1.415-1.414,5.656,5.657,8.485-8.486,1.414,1.415L1272,528.071l-1.414,1.414Z" transform="translate(-1263.515 -518.171)" fill="#fff"/>
      </svg>
    `;
      } else {
        nextButton.textContent = 'Next step';
        nextButton.classList.remove('last-step');
        nextButton.innerHTML = `
      Next step
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="17" viewBox="0 0 10 17">
        <g>
          <g>
            <path fill="#fff" d="M1.42-.012l7.08 7.08.08-.08 1.432 1.432-.08.08.08.08-1.432 1.432-.08-.08-7.08 7.08-1.433-1.432 7.08-7.08-7.08-7.08z"/>
          </g>
        </g>
      </svg>
    `;
      }
      setActiveStep();
    }
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      activeIndex = index;
      setActiveStep();
    });
  });

  function validateForm(submitForm) {
    // const submitForm = document.querySelector('.last-step');
    const form = document.querySelector('.slider');
    submitForm.addEventListener('click', (event) => {
      event.preventDefault();

      const stepper = document.querySelector('.stepper');
      const selectCurrent = stepper.querySelectorAll('.select-current');
      const locationInput = stepper.querySelector('#location');
      const emailInput = stepper.querySelector('#email');
      const passwordInput = stepper.querySelector('#stepper_password');

      const data = {
        whoAreYou: selectCurrent[0].textContent,
        age: selectCurrent[1].textContent,
        location: locationInput.value,
        email: emailInput.value,
        password: passwordInput.value,
      };

      console.log(data);
      const url = 'http://www.mocky.io/v2/5dfcef48310000ee0ed2c281';
      fetch(url, {
        method: 'POST',
        body: data
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });

    })
  }


  //END
});

