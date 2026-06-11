document.addEventListener('DOMContentLoaded', () => {
    const bioTextarea = document.getElementById('userBio');
    const charCountDisplay = document.getElementById('charCount');
    const completeProfileForm = document.getElementById('completeProfileForm');

    if (bioTextarea && charCountDisplay) {
        bioTextarea.addEventListener('input', () => {
            const currentLength = bioTextarea.value.length;
            charCountDisplay.textContent = currentLength;

            if (currentLength >= 1800) {
                charCountDisplay.style.color = '#ea580c';
            } else {
                charCountDisplay.style.color = '#718096';
            }
        });
    }
    if (completeProfileForm) {
        completeProfileForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const finalData = {
                accountType: document.getElementById('accountType').value,
                mainCategory: document.getElementById('mainCategory').value,
                bio: bioTextarea ? bioTextarea.value : ''
            };

            console.log("تم حفظ جميع البيانات بنجاح", finalData);
            alert("تم إكمال ملفك الشخصي بنجاح!");
            window.location.href = "dashboard.html"; 
        });
    }
});