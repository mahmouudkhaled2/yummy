import {Start} from "./start.module.js"
import {Form} from "./form.module.js"
const start = new Start()
const form = new Form()


$('.open-nav').click(function () {
    $(this).addClass('d-none')
    $('.close-nav').removeClass('d-none')
    $('.side-navbar').animate({'left': '0'}, 500)
    $('.menu ul').animate({
        'left': '0px',
        'top': '0px',
    }, 700)
})

$('.close-nav').click(function () {
    $(this).addClass('d-none')
    $('.open-nav').removeClass('d-none')
    $('.side-navbar').animate({'left': '-285px'}, 500)
    $('.menu ul').animate({
        'left': '-80px',
        'top': '200px',
    }, 700)
})

$('.nav-link').click(function() {
    $(`${$(this).attr('data-section')}`).siblings('section').addClass('d-none')
    $(`${$(this).attr('data-section')}`).removeClass('d-none')
    $('.side-navbar').animate({'left': '-285px'}, 500)
    $('.close-nav').addClass('d-none')
    $('.open-nav').removeClass('d-none')
})

/* Check if form data is valid */
document.addEventListener('DOMContentLoaded', () => {
    const formInputs = {
        name: document.getElementById('name'),
        email: document.getElementById('email'),
        phone: document.getElementById('phone'),
        age: document.getElementById('age'),
        password: document.getElementById('password'),
        repassword: document.getElementById('repassword')
    };

    const submitBtn = document.querySelector('button[type="submit"]');

    const validateForm = () => {
        const isValidForm = 
            Form.isValidName(formInputs.name.value) &&
            Form.isValidEmail(formInputs.email.value) &&
            Form.isValidPhone(formInputs.phone.value) &&
            Form.isValidAge(formInputs.age.value) &&
            Form.isValidPassword(formInputs.password.value) &&
            (formInputs.password.value === formInputs.repassword.value);

        if(isValidForm) {
            submitBtn.classList.add('btn-hover');
            submitBtn.classList.add('opacity-100');
        } else {
            submitBtn.classList.remove('btn-hover');
            submitBtn.classList.remove('opacity-100');
        }
    };

    Object.values(formInputs).forEach(input => {
        input.addEventListener('input', validateForm);
    });

    // Initial check
    validateForm();
});
