class Captcha {
  constructor() {
    this.onDOMLoaded = this.onDOMLoaded.bind(this);
    this.bindValidation = this.bindValidation.bind(this);
    this.validateCaptchaBeforeSubmit =
      this.validateCaptchaBeforeSubmit.bind(this);
  }

  validateCaptchaBeforeSubmit(e) {
    const target = e.target;
    const captchaField = target.querySelector('.recaptcha-field');

    if (captchaField) {
      const captchaId = captchaField.dataset.recaptchaId;
      const captchaResponse = window.grecaptcha.getResponse(captchaId);

      // If valid captcha is not present, prevent form submission
      if (!captchaResponse) {
        e.preventDefault();
        alert('Please verify that you are human first');
        return false;
      }

      target.querySelector('.recaptcha-response').value = captchaResponse;
    }

    target.closest('.popup').classList.add('hidden');
    return true;
  }

  bindValidation() {
    const forms = document.querySelectorAll('[captcha-form]');

    forms.forEach((form) => {
      form.addEventListener('submit', this.validateCaptchaBeforeSubmit);
    });
  }

  onDOMLoaded() {
    this.bindValidation();
  }

  init() {
    window.addEventListener('DOMContentLoaded', this.onDOMLoaded);
  }
}

const captcha = new Captcha();
captcha.init();
