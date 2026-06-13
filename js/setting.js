function switchSettingsTab(tabName) {
    const allTabs = document.querySelectorAll('.settings-tab');
    allTabs.forEach(tab => {
        tab.style.color = '#64748b';
        tab.style.borderBottomColor = 'transparent';
        tab.style.fontWeight = '500';
    });
    const allPanels = document.querySelectorAll('.tab-content-panel');
    allPanels.forEach(panel => {
        panel.style.display = 'none';
    });
    const currentActiveTab = document.getElementById(`tab-${tabName}`);
    if (currentActiveTab) {
        currentActiveTab.style.color = '#8205f7';
        currentActiveTab.style.borderBottomColor = '#8205f7';
        currentActiveTab.style.fontWeight = 'bold';
    }
    const currentActivePanel = document.getElementById(`content-${tabName}`);
    if (currentActivePanel) {
        currentActivePanel.style.display = 'block';
    }
}

function initSettingsPage() {
    const currentName = localStorage.getItem('user_full_name') || 'rawan mousa';
    const currentBio = localStorage.getItem('user_bio') || 'Turning designs into reality with code ,, Currently mastering Frontend technologies , Open to collaboration on interesting web projects.';
    const currentEmail = localStorage.getItem('user_email') || 'user52260@gmail.com';
    const currentStatus = localStorage.getItem('user_account_status') || 'active';

    if (document.getElementById('settings-input-name')) {
        document.getElementById('settings-input-name').value = currentName;
        document.getElementById('settings-textarea-bio').value = currentBio;
        document.getElementById('settings-account-status').value = currentStatus;
        document.getElementById('profile-display-name').innerText = currentName;
        document.getElementById('profile-display-email').innerText = currentEmail;
    }
}

function saveProfileData() {
    const inputName = document.getElementById('settings-input-name').value.trim();
    const textareaBio = document.getElementById('settings-textarea-bio').value.trim();

    if (inputName === "") {
        alert("حقل الاسم الكامل إلزامي!");
        return;
    }

    localStorage.setItem('user_full_name', inputName);
    localStorage.setItem('user_bio', textareaBio);
    
    document.getElementById('profile-display-name').innerText = inputName;

    const sidebarName = document.querySelector('.user-footer-info h6');
    if (sidebarName) sidebarName.innerText = inputName;

    alert("تم حفظ التعديلات بنجاح!");
}

function saveAccountStatus() {
    const selectedStatus = document.getElementById('settings-account-status').value;
    localStorage.setItem('user_account_status', selectedStatus);
    alert("تم تحديث حالة الحساب بنجاح!");
}

function handleDisableAccount() {
    if (confirm("هل أنتِ متأكدة من رغبتكِ في تعطيل الحساب؟")) {
        localStorage.setItem('user_account_active_status', 'disabled');
        alert("تم تعطيل الحساب بنجاح.");
    }
}

document.addEventListener("DOMContentLoaded", initSettingsPage);

function toggleAllNotifications(status) {
    const allSwitches = document.querySelectorAll('.notify-switch');
    allSwitches.forEach(checkbox => {
        checkbox.checked = status;
        const slider = checkbox.nextElementSibling;
        if (slider) {
            if (status) {
                slider.style.backgroundColor = '#8205f7';
            } else {
                slider.style.backgroundColor = '#cbd5e1';
            }
        }
    });
}

document.querySelectorAll('.notify-switch').forEach(item => {
    item.addEventListener('change', function() {
        const slider = this.nextElementSibling;
        if (slider) {
            if (this.checked) {
                slider.style.backgroundColor = '#8205f7';
            } else {
                slider.style.backgroundColor = '#cbd5e1';
            }
        }
    });
});

function toggleSectionNotifications(sectionClass, status) {
    const sectionSwitches = document.querySelectorAll('.notify-' + sectionClass);
    sectionSwitches.forEach(checkbox => {
        checkbox.checked = status;
        const slider = checkbox.nextElementSibling;
        if (slider) {
            slider.style.backgroundColor = status ? '#8205f7' : '#cbd5e1';
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.querySelectorAll('.notify-switch').forEach(item => {
        item.addEventListener('change', function() {
            const slider = this.nextElementSibling;
            if (slider) {
                slider.style.backgroundColor = this.checked ? '#8205f7' : '#cbd5e1';
            }
        });
        if(item.checked) {
            const slider = item.nextElementSibling;
            if(slider) slider.style.backgroundColor = '#8205f7';
        }
    });
});