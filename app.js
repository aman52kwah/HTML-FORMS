//DOM ELEMENT

const form = document.getElementById('form');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const submitBtn = document.getElementById('submitBtn');
const submitBtnText = document.getElementById('submitBtnText');
const submitBtnLoader = document.getElementById('submitBtnLoader');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const passwordRequirements = document.getElementById('passwordRequirements');
const passwordMatchError = document.getElementById('passwordMatchError');
const acceptTermsCheckbox = document.getElementById('acceptTerms');


//formData
const formData ={
    firstName:'',
    lastName: '',
    email:'',
    password:'',
    confirmPassword:''

};

//validate password
const passwordValidation ={
    minLength:false,
    hasUpperCase:false,
    hasLowerCase:false,
    hasNumbers:false,
    isValid:false,
};

//Show Error message function
function showError(message) {
    
    errorText.textContent= message;
    errorMessage.classList.remove('hidden');
    setTimeout(()=>{
        errorMessage.classList.add('hidden');
    },5000);
}

function hideError() {
    errorMessage.classList.add('hidden');
}
function validatePassword(password){
    passwordValidation.minLength = password.length >= 8;
    passwordValidation.hasUpperCase = /[A-Z]/.test(password);
     passwordValidation.hasLowerCase = /[a-z]/.test(password);
      passwordValidation.hasNumbers= /\d/.test(password);
      passwordValidation.isValid =
      passwordValidation.minLength &&
      passwordValidation.hasUpperCase &&
      passwordValidation.hasLowerCase &&
      passwordValidation.hasNumbers;
}