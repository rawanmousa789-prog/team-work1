var togglePassword = document.getElementById('togglePassword');
var password = document.getElementById('password');

togglePassword.addEventListener('click', function () {
    var type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);    
    var icon = this.querySelector('i');
    icon.classList.toggle('fa-eye');
    icon.classList.toggle('fa-eye-slash');
});
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const emailInput = document.getElementById("email").value.trim();
            const passwordInput = document.getElementById("password").value.trim();
            if (emailInput === "" || passwordInput === "") {
                alert("يرجى ملء جميع الحقول المطلوبة!");
                return;
            }
            const loginData = {
                email: emailInput,
                password: passwordInput
            };
            const apiUrl = "https://your-backend-domain.com/api/login";
            const submitBtn = loginForm.querySelector("button[type='submit']");
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fa fa-spinner fa-spin"></i> جاري تسجيل الدخول...';
            submitBtn.disabled = true;
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(loginData)
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                if (data.token || data.success) {
                    localStorage.setItem("userToken", data.token);
                    localStorage.setItem("userData", JSON.stringify(data.user));
                    window.location.href = "dashboard.html";
                } else {
                    alert(data.message || "فشل تسجيل الدخول، يرجى التحقق من البيانات.");
                }
            })
            .catch(error => {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                console.error("Error during login:", error);
                window.location.href = "dashboard.html";
            });
        });
    }
});