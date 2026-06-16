document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.getElementById('togglePassword');
    const passwordInput = document.getElementById('passwordInput');
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            togglePassword.querySelector('i').classList.toggle('fa-eye');
            togglePassword.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    const confirmPasswordInput = document.getElementById('confirmPasswordInput');
    if (toggleConfirmPassword && confirmPasswordInput) {
        toggleConfirmPassword.addEventListener('click', () => {
            const type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            confirmPasswordInput.setAttribute('type', type);
            toggleConfirmPassword.querySelector('i').classList.toggle('fa-eye');
            toggleConfirmPassword.querySelector('i').classList.toggle('fa-eye-slash');
        });
    }

    const accountTypeSelect = document.getElementById('accountTypeSelect');
    if (accountTypeSelect) {
        accountTypeSelect.addEventListener('change', function () {
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
                freelancerSection.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
            } else {
                freelancerSection.style.display = 'none';
                clientSection.style.display = 'none';
            }
        });
    }

    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const password = document.getElementById('passwordInput').value;
            const confirmPassword = document.getElementById('confirmPasswordInput').value;
            if (password !== confirmPassword) {
                alert('كلمة المرور وتأكيدها غير متطابقتين!');
                return;
            }
            if (password.length < 8) {
                alert('كلمة المرور يجب أن تكون 8 أحرف على الأقل!');
                return;
            }
            // TODO: أرسل البيانات للـ API هنا
            window.location.href = "otp.html";
        });
    }
});