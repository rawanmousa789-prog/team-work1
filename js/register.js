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
