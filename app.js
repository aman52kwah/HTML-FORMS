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


//validate password to meet requirements
function validatePassword(password) {
  passwordValidation.minLength = password.length >= 8;
  passwordValidation.hasUpperCase = /[A-Z]/.test(password);
  passwordValidation.hasLowerCase = /[a-z]/.test(password);
  passwordValidation.hasNumbers = /\d/.test(password);
  passwordValidation.isValid =
    passwordValidation.minLength &&
    passwordValidation.hasUpperCase &&
    passwordValidation.hasLowerCase &&
    passwordValidation.hasNumbers;

  updatePasswordRequirements();
}

function updatePasswordRequirements() {
  const requirements = document.querySelectorAll(".requirement");

  requirements.forEach((req) => {
    const rule = req.dataset.rule;
    if (passwordValidation[rule]) {
      req.classList.add("met");
    } else {
      req.classList.remove("met");
    }
  });
}

//form validation
function validateForm() {
  const isPasswordValid = passwordValidation.isValid;
  const doPasswordMatch =
    formData.password === formData.confirmPassword && formData.password !== "";

  const isTermsAccepted = acceptTermsCheckbox.checked;
  const areFieldsFilled =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password !== "" &&
    formData.confirmPassword !== "";

  //check if form is valid
  const isFormValid =
    isPasswordValid && doPasswordMatch && isTermsAccepted && areFieldsFilled;

  submitBtn.disabled = !isFormValid;
}

//validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

form.addEventListener("input", (e) => {
  const { name, value } = e.target;

  if (formData.hasOwnProperty(name)) {
    formData[name] = value;
  }

  if (name === "password") {
    validatePassword(value);

    if (value === "") {
      passwordRequirements.classList.add("hidden");
    } else {
      passwordRequirements.classList.remove("hidden");
    }

    if (formData.confirmPassword !== "") {
      if (value !== formData.confirmPassword) {
        passwordMatchError.classList.remove("hidden");
      } else {
        passwordMatchError.classList.add("hidden");
      }
    }
  }

  if (name === "confirmPassword") {
    if (value !== "" && value !== formData.password) {
      passwordMatchError.classList.remove("hidden");
    } else {
      passwordMatchError.classList.add("hidden");
    }
  }
  validateForm();
});

acceptTermsCheckbox.addEventListener('change',()=>{
    validateForm();
});

 const togglePasswordButtons = document.querySelectorAll('.toggle-password');
 togglePasswordButtons.forEach(button =>{
    button.addEventListener('click',()=>{
        const targetId = button.dataset.target;
        const targetInput = document.getElementById(targetId);
        const eyeIcon = button.querySelector('.eye-icon');

        if(targetInput.type ==='password'){
            targetInput.type ='text';
            eyeIcon.innerHTML=`<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                <line x1="1" y1="1" x2="23" y2="23"></line>`;
        } else{
            targetInput.type = 'password';
            eyeIcon.innerHTML =`
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
            `;
        }
    });
 });

 form.addEventListener('submit', async (e) =>{
    e.preventDefault();
    hideError();

    if(!formData.firstName.trim()){
        showError('Please enter your first name');
        return;
    }


    if(!formData.lastName.trim()){
        showError('please enter your first name');
        return;
    }

    if(!validateEmail(formData.email)){
        showError('Please enter a valid email address');
        return;
    }

    if(formData.password !== formData.confirmPassword){
        showError('passwords do not match');
        return;
    }


    if(!acceptTermsCheckbox.checked){
        showError('Please accept the Terms of Service and Privacy Policy');
        return ;
    }

    submitBtnText.classList.add('hidden');
    submitBtnLoader.classList.remove('hidden');
    submitBtn.disabled= true;

    const inputs = form.querySelectorAll('input');
    inputs.forEach(input =>input.disabled = true);


    try {
        await new Promise(resolve => setTimeout(resolve,2000));

        console.log('Form submitted:',{
            firstName:formData.firstName,
            lastName:formData.lastName,
            email:formData.email
        });

        alert ('Accounted created Successfully!');
        form.reset();
        formData.firstName = '';
        formData.lastName ='';
        formData.email = '';
        formData.password ='';
        formData.confirmPassword = '';
        passwordRequirements.classList.add('hidden');
    } catch (error) {
        showError('An error occured. Please try again.');
        console.error('Submission error:',error);
    } finally{
        submitBtnText.classList.remove('hidden');
        submitBtnLoader.classList.add('hidden');
        inputs.forEach(input => input.disabled = false);
        validateForm();
    }
 })