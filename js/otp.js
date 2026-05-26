const inputs = document.querySelectorAll('.otp-field');

inputs.forEach((input, index) => {
    input.addEventListener('input', (e) => {
        if (e.target.value.length > 0 && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }
    });

    input.addEventListener('keydown', (e) => {
        if (e.key === 'Backspace' && e.target.value.length === 0 && index > 0) {
            inputs[index - 1].focus();
        }
    });
});

document.getElementById('confirmBtn').addEventListener('click', () => {
    alert("تم تأكيد الحساب بنجاح!");
    window.location.href = "";
});

let durationInSeconds = (1 * 60) + 59; 
const timerDisplay = document.getElementById('timer');
const timerContainer = document.getElementById('timerContainer');
const resendBtn = document.getElementById('resendBtn');

function startOTPTimer() {
    const countdown = setInterval(() => {
        let minutes = Math.floor(durationInSeconds / 60);
        let seconds = durationInSeconds % 60;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        if (timerDisplay) {
            timerDisplay.textContent = `${minutes}:${seconds}`;
        }
        durationInSeconds--;
        if (durationInSeconds < 0) {
            clearInterval(countdown);
            if (timerContainer) timerContainer.style.display = 'none'; 
            if (resendBtn) {
                resendBtn.style.display = 'inline-block';
                resendBtn.style.pointerEvents = 'auto';
                resendBtn.style.color = '#ffffff'; 
                resendBtn.style.fontWeight = 'bold';
                resendBtn.classList.remove('disabled');
            }
        }
    }, 1000);
}
window.onload = startOTPTimer;

if (resendBtn) {
    resendBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        alert("تم إعادة إرسال رمز جديد بنجاح!");
        durationInSeconds = 2 * 60; 
        resendBtn.style.display = 'none';
        resendBtn.style.pointerEvents = 'none';
        resendBtn.classList.add('disabled');
        if (timerContainer) timerContainer.style.display = 'block';
        startOTPTimer();
    });
}