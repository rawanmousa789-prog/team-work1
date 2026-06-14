const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('passwordInput');

if(togglePassword && passwordInput){
    togglePassword.addEventListener('click' , ()=>{
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' :'password';
        passwordInput.setAttribute('type' , type);

        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
}
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');

if (toggleConfirmPassword && confirmPasswordInput) {
    toggleConfirmPassword.addEventListener('click', () =>{
        const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        confirmPasswordInput.setAttribute('type', type);

        const icon = toggleConfirmPassword.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
}

const registerForm = document.querySelector('form');

if (registerForm) {
    registerForm.addEventListener('submit', function (e) {
        e.preventDefault();
        console.log("جاري إرسال البيانات والتحويل لصفحة OTP...");
        window.location.href = "otp.html";
    });
}

document.getElementById('accountTypeSelect').addEventListener('change', function() {
    const freelancerSection = document.getElementById('freelancer-content');
    const clientSection = document.getElementById('client-content');
    
    const agencyName = document.getElementById('agencyNameInput');
    const employeesCount = document.getElementById('employeesCountInput');

    if (this.value === 'freelancer') {
        freelancerSection.style.display = 'block';
        clientSection.style.display = 'none';
        
        agencyName.removeAttribute('required');
        employeesCount.removeAttribute('required');
        agencyName.value = '';
        employeesCount.value = '';
    } else if (this.value === 'client') {
        clientSection.style.display = 'block';
        freelancerSection.style.display = 'none';
        
        agencyName.setAttribute('required', 'required');
        employeesCount.setAttribute('required', 'required');
        
        const skillsCheckboxes = freelancerSection.querySelectorAll('input[type="checkbox"]');
        skillsCheckboxes.forEach(cb => cb.checked = false);
    } else {
        freelancerSection.style.display = 'none';
        clientSection.style.display = 'none';
    }
});