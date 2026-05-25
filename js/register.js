function toggleRegPass(inputId, el) {

    var input = document.getElementById(inputId);
    var icon = el.querySelector('i');
    
    if (input.type === "password") {
        input.type = "text";
        icon.classList.replace("fa-eye", "fa-eye-slash");
    } else {
        input.type = "password";
        icon.classList.replace("fa-eye-slash", "fa-eye");
    }
}