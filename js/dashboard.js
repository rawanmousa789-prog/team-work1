document.addEventListener("DOMContentLoaded", function () {
    checkUserAuthentication();
    initOrderTabsFilter();
    initWalletTabsFilter();
});

function checkUserAuthentication() {
    const token = localStorage.getItem("userToken");
    if (!token) {

    }
}

function navigateDashboard(targetPanelId) {
    const panels = document.querySelectorAll('.dashboard-view-panel');
    panels.forEach(panel => { panel.classList.remove('active'); });

    const targetPanel = document.getElementById(targetPanelId);
    if (targetPanel) { targetPanel.classList.add('active'); }

    updateActiveSidebarLink(targetPanelId);

    const leftSidebar = document.getElementById('left-profile-sidebar');
    const mainContent = document.querySelector('.main-dashboard-content').parentElement;

    if (leftSidebar && mainContent) {
        if (targetPanelId === 'panel-overview') {
            leftSidebar.style.display = 'block'; 
            mainContent.className = 'col-lg-7 col-md-6 col-sm-12'; 
        } else {
            leftSidebar.style.display = 'none'; 
            mainContent.className = 'col-lg-10 col-md-9 col-sm-12'; 
        }
    }
}

function updateActiveSidebarLink(panelId) {
    const sidebarLinks = document.querySelectorAll('.menu-nav-link');
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        const clickAttribute = link.getAttribute('onclick');
        if (clickAttribute && clickAttribute.includes(panelId)) {
            link.classList.add('active');
        }
    });
}

function initOrderTabsFilter() {
    document.addEventListener("click", function (event) {
        const clickedTab = event.target.closest('.order-tab-btn');
        if (clickedTab) {
            event.preventDefault();

            const allTabs = document.querySelectorAll('.order-tab-btn');
            allTabs.forEach(tab => tab.classList.remove('active'));
            clickedTab.classList.add('active');

            const status = clickedTab.getAttribute('data-status');
            const descElement = document.getElementById('order-empty-desc');
            
            if (descElement) {
                const currentLang = document.documentElement.lang || 'ar';
                if (currentLang === 'en') {
                    if (status === 'all') descElement.innerHTML = 'There are no orders with status "All Orders".';
                    if (status === 'waiting') descElement.innerHTML = 'There are no orders with status "Pending".';
                    if (status === 'processing') descElement.innerHTML = 'There are no orders with status "Processing".';
                    if (status === 'client-approval') descElement.innerHTML = 'There are no orders with status "Awaiting Client Approval".';
                    if (status === 'completed') descElement.innerHTML = 'There are no orders with status "Completed".';
                    if (status === 'cancellation-waiting') descElement.innerHTML = 'There are no orders with status "Awaiting Cancellation".';
                    if (status === 'cancelled') descElement.innerHTML = 'There are no orders with status "Cancelled".';
                } else {
                    if (status === 'all') descElement.innerHTML = 'لا توجد طلبات بالحالة "كل الطلبات".';
                    if (status === 'waiting') descElement.innerHTML = 'لا توجد طلبات بالحالة "في الانتظار".';
                    if (status === 'processing') descElement.innerHTML = 'لا توجد طلبات بالحالة "قيد التنفيذ".';
                    if (status === 'client-approval') descElement.innerHTML = 'لا توجد طلبات بالحالة "بانتظار موافقة العميل".';
                    if (status === 'completed') descElement.innerHTML = 'لا توجد طلبات بالحالة "مكتمل".';
                    if (status === 'cancellation-waiting') descElement.innerHTML = 'لا توجد طلبات بالحالة "بانتظار الإلغاء".';
                    if (status === 'cancelled') descElement.innerHTML = 'لا توجد طلبات بالحالة "ملغي".';
                }
            }
        }
    });
}

function initWalletTabsFilter() {
    document.addEventListener("click", function (event) {
        const clickedTab = event.target.closest('.wallet-tab-btn');
        
        if (clickedTab) {
            event.preventDefault();
            const allWalletTabs = document.querySelectorAll('.wallet-tab-btn');
            allWalletTabs.forEach(tab => tab.classList.remove('active'));
            clickedTab.classList.add('active');
            const targetViewId = clickedTab.getAttribute('data-target-tab');

            const allViews = document.querySelectorAll('.wallet-tab-content-panel');
            allViews.forEach(view => {
                view.style.display = 'none';
                view.classList.remove('active');
            });

            const targetView = document.getElementById(targetViewId);
            if (targetView) {
                targetView.style.display = 'block';
                targetView.classList.add('active');
            }
        }
    });
}

// wallet page code
let currentModalType = 'bank';
function openVerificationModal(type) {
    currentModalType = type;
    const modal = document.getElementById('bank-verification-modal');
    if (!modal) return;
    modal.style.display = 'flex';
    
    document.getElementById('modal-step-1-vodafone').style.display = 'none';
    document.getElementById('modal-step-1-paypal').style.display = 'none';
    document.getElementById('modal-step-1-bank').style.display = 'none';
    document.getElementById('modal-step-bank').style.display = 'none';
    document.getElementById('modal-step-paypal').style.display = 'none';
    document.getElementById('modal-step-vodafone').style.display = 'none';

    document.getElementById('agree-payout-checkbox-vodafone').checked = false;
    document.getElementById('agree-payout-checkbox-paypal').checked = false;
    document.getElementById('agree-payout-checkbox-bank').checked = false;
    
    toggleVerifyButton();

    if (type === 'vodafone') {
        document.getElementById('modal-step-1-vodafone').style.display = 'block';
    } else if (type === 'paypal') {
        document.getElementById('modal-step-1-paypal').style.display = 'block';
    } else {
        document.getElementById('modal-step-1-bank').style.display = 'block';
    }

    if (typeof updateContent === "function") {
        updateContent();
    }
}

function goToFieldsView() {
    document.getElementById('modal-step-1-vodafone').style.display = 'none';
    document.getElementById('modal-step-1-paypal').style.display = 'none';
    document.getElementById('modal-step-1-bank').style.display = 'none';
    
    if (currentModalType === 'vodafone') {
        document.getElementById('modal-step-vodafone').style.display = 'block';
    } else if (currentModalType === 'paypal') {
        document.getElementById('modal-step-paypal').style.display = 'block';
    } else {
        document.getElementById('modal-step-bank').style.display = 'block';
    }

    if (typeof updateContent === "function") {
        updateContent();
    }
}

function closeBankModal() {
    const modal = document.getElementById('bank-verification-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function toggleVerifyButton() {
    const chkKey = `agree-payout-checkbox-${currentModalType}`;
    const btnKey = `btn-modal-confirm-${currentModalType}`;
    
    const checkbox = document.getElementById(chkKey);
    const confirmBtn = document.getElementById(btnKey);

    if (checkbox && confirmBtn) {
        if (checkbox.checked) {
            confirmBtn.disabled = false;
            confirmBtn.style.backgroundColor = '#8205f7';
            confirmBtn.style.cursor = 'pointer';
        } else {
            confirmBtn.disabled = true;
            confirmBtn.style.backgroundColor = '#a78bfa';
            confirmBtn.style.cursor = 'not-allowed';
        }
    }
}
function handleFormSubmit(typeName) {
    alert(`تم حفظ بيانات حساب ${typeName} بنجاح!`);
    closeBankModal();
}

function openPayoutModal() {
    const modal = document.getElementById('payout-request-modal');
    if (!modal) return;
    modal.style.display = 'flex';

    document.getElementById('payout-amount').value = '';
    document.getElementById('payout-notes').value = '';
    if (typeof updateContent === "function") {
        updateContent();
    }
}

function closePayoutModal() {
    const modal = document.getElementById('payout-request-modal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function handlePayoutSubmit() {
    const amount = document.getElementById('payout-amount').value;
    alert(`تم إرسال طلب الدفع بمبلغ ${amount} بنجاح! `);
    closePayoutModal();
}


// validation page code
function handleKycFileSelect(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        displaySelectedFile(input.files[0]);
    }
}

function handleKycFileDrop(event) {
    event.preventDefault();
    const dropzone = document.getElementById('kyc-dropzone');
    dropzone.style.backgroundColor = '#fff';

    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const fileInput = document.getElementById('kyc-file-input');
        fileInput.files = files; 
        displaySelectedFile(files[0]);
    }
}

function displaySelectedFile(file) {
    const uploadText = document.getElementById('kyc-upload-text');
    const fileNameDiv = document.getElementById('kyc-file-name');
    uploadText.innerText = "تم اختيار الملف بنجاح ✅";
    
    fileNameDiv.innerHTML = `
        <span>الملف الحالي: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)} MB)</span>
        <button type="button" class="btn btn-danger btn-xs" style="padding: 2px 8px; font-size: 11px; margin-right: 5px;" onclick="event.stopPropagation(); removeKycFile();">
            <i class="fa fa-trash"></i> حذف
        </button>
    `;
}

function removeKycFile() {
    const fileInput = document.getElementById('kyc-file-input');
    const uploadText = document.getElementById('kyc-upload-text');
    const fileNameDiv = document.getElementById('kyc-file-name');
    fileInput.value = ""; 
    
    uploadText.innerText = "انقر للتحميل أو اسحب الملف هنا";
    fileNameDiv.innerHTML = ""; 
    console.log("تم حذف الملف وتصفير الحقل بنجاح.");
}

function handleKycNextStep() {
    const fileInput = document.getElementById('kyc-file-input');

    if (!fileInput.files || fileInput.files.length === 0) {
        alert("يرجى تحميل وثيقة الهوية أولاً للاستمرار.");
        return;
    }

    const uploadedFile = fileInput.files[0];
    console.log("جاهز للرفع والتنقل الحقيقي للملف:", uploadedFile.name);
}

// profile page code

const DEFAULT_AVATAR_PATH = "images/worker.avif";

document.addEventListener("DOMContentLoaded", function () {
    initializeProfileDashboard();
});

function initializeProfileDashboard() {
    const userEmail = localStorage.getItem('userEmail') || "aya052260@gmail.com";
    document.getElementById('display-profile-email').innerText = userEmail;

    let extractedName = userEmail.split('@')[0];
    extractedName = extractedName.charAt(0).toUpperCase() + extractedName.slice(1);
    if(userEmail.includes("aya052260")) { extractedName = "Rawan mousa"; }
    document.getElementById('display-profile-name').innerText = extractedName;

    const savedAvatar = localStorage.getItem('userAvatarData');
    if (savedAvatar) {
        document.getElementById('profile-avatar-img').src = savedAvatar;
        document.getElementById('delete-avatar-btn').style.display = 'flex';
    } else {
        document.getElementById('profile-avatar-img').src = DEFAULT_AVATAR_PATH;
        document.getElementById('delete-avatar-btn').style.display = 'none';
    }
    const savedBio = localStorage.getItem('userProfileBio');
    if (savedBio) {
        document.getElementById('display-profile-bio').innerText = savedBio;
    } else {
        document.getElementById('display-profile-bio').innerText = "اضغط على زر التعديل لكتابة نبذة تعريفية عنك وعن مهاراتك البرمجية.";
    }
    const savedSkills = localStorage.getItem('userProfileSkills');
    const skillsContainer = document.getElementById('display-profile-skills');
    
    if (skillsContainer) {
        skillsContainer.innerHTML = "";
        if (savedSkills && savedSkills.trim() !== "") {
            savedSkills.split(',').forEach(skill => {
                if (skill.trim() !== "") {
                    const span = document.createElement('span');
                    span.style.cssText = "background-color: #f1f5f9; color: #475569; font-size: 12px; padding: 4px 12px; border-radius: 20px; font-weight: 500; display: inline-block;";
                    span.innerText = skill.trim();
                    skillsContainer.appendChild(span);
                }
            });
        }
    }

    // تشغيل التبويب الافتراضي للخدمات
    const defaultTab = document.getElementById('default-service-tab');
    if(defaultTab) { 
        switchServiceTab('onetime', defaultTab); 

    }
}

function handleAvatarChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (!file.type.startsWith('images/')) {
            alert('يرجى اختيار ملف صورة صالحة فقط (PNG, JPG, JPEG).');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('profile-avatar-img').src = e.target.result;
            document.getElementById('delete-avatar-btn').style.display = 'flex';
            localStorage.setItem('userAvatarData', e.target.result);
            console.log("تم تحديث صورة الملف الشخصي وحفظها محلياً.");
        };
        reader.readAsDataURL(file);
    }
}

function deleteAvatar() {
    if (confirm("هل أنتِ متأكدة من رغبتك في حذف صورة البروفايل الحالية؟")) {
        document.getElementById('profile-avatar-img').src = DEFAULT_AVATAR_PATH;
        document.getElementById('delete-avatar-btn').style.display = 'none';
        localStorage.removeItem('userAvatarData');
        document.getElementById('avatar-file-input').value = "";
        
        console.log("تم حذف الصورة المخصصة بنجاح وعودة الوضع الافتراضي.");
    }
}

function switchServiceTab(type, buttonElement) {
    const allTabs = document.querySelectorAll('.service-tab-btn');
    allTabs.forEach(tab => {
        tab.style.backgroundColor = '#f1f5f9';
        tab.style.color = '#475569';
    });
    buttonElement.style.backgroundColor = '#8205f7';
    buttonElement.style.color = '#fff';

    const contentDiv = document.getElementById('services-dynamic-content');
    if (type === 'onetime') {
        contentDiv.innerHTML = `<span data-i18n="profile-empty-services">لا توجد خدمات لمرة واحدة متاحة</span>`;
    } else if (type === 'parttime') {
        contentDiv.innerHTML = `<span data-i18n="profile-empty-services-parttime">لا توجد وظائف بدوام جزئي متاحة حالياً</span>`;
    }
    if (typeof translatePage === 'function') { translatePage(); }
}

function openAddModal(section) {
    document.getElementById('modal-generic-add').style.display = 'flex';
    document.getElementById('generic-target-section').value = section;
    document.getElementById('input-generic-text').value = "";
}

function closeAddModal() {
    document.getElementById('modal-generic-add').style.display = 'none';
}

function saveAboutData() {
    const newBio = document.getElementById('input-profile-bio').value.trim();
    const skillsText = document.getElementById('input-profile-skills').value.trim();
    if (newBio === "") {
        document.getElementById('display-profile-bio').innerText = "اضغط على زر التعديل لكتابة نبذة تعريفية عنك وعن مهاراتك البرمجية.";
        localStorage.removeItem('userProfileBio');
    } else {
        document.getElementById('display-profile-bio').innerText = newBio;
        localStorage.setItem('userProfileBio', newBio);
    }
    const skillsContainer = document.getElementById('display-profile-skills');
    if (skillsText === "") {
        skillsContainer.innerHTML = ""; 
        localStorage.removeItem('userProfileSkills');
    } else {
        skillsContainer.innerHTML = ""; 
        localStorage.setItem('userProfileSkills', skillsText);
        skillsText.split(',').forEach(skill => {
            if (skill.trim() !== "") {
                const span = document.createElement('span');
                span.style.cssText = "background-color: #f1f5f9; color: #475569; font-size: 12px; padding: 4px 12px; border-radius: 20px; font-weight: 500; display: inline-block;";
                span.innerText = skill.trim();
                skillsContainer.appendChild(span);
            }
        });
    }
    
    closeAboutModal();
}

const sectionTitles = {
    'experience': 'إضافة خبرة جديدة',
    'works': 'إضافة عمل سابق',
    'education': 'إضافة سجل تعليمي',
    'certificates': 'إضافة شهادة جديدة'
};

function openAddModal(section) {
    if (section === 'works') {
        document.getElementById('modal-works-add').style.display = 'flex';
        document.getElementById('input-work-title').value = "";
        document.getElementById('work-upload-status').innerText = "انقر أو اسحب الملفات وأفلتها هنا";
        document.getElementById('work-files-input').value = "";
    } 
    else if (section === 'education') {
        document.getElementById('modal-education-add').style.display = 'flex';
        document.getElementById('input-education-university').value = "";
        document.getElementById('input-education-desc').value = "";
        document.getElementById('input-education-specialty').value = "";
        document.getElementById('input-education-degree').value = "";
        document.getElementById('input-education-year').value = "";
        
        if(document.getElementById('education-logo-preview')) {
            document.getElementById('education-logo-preview').style.display = 'none';
            document.getElementById('education-logo-preview').src = '';
            document.getElementById('education-logo-placeholder').style.display = 'flex';
            document.getElementById('education-logo-input').value = '';
        }
    } 
    else if (section === 'certificates') {
        document.getElementById('modal-certificates-add').style.display = 'flex';
        document.getElementById('input-certificate-name-select').value = "";
        document.getElementById('input-certificate-title').value = "";
        document.getElementById('input-certificate-year').value = "";

        if(document.getElementById('certificate-logo-preview')) {
            document.getElementById('certificate-logo-preview').style.display = 'none';
            document.getElementById('certificate-logo-preview').src = '';
            document.getElementById('certificate-logo-placeholder').style.display = 'flex';
            document.getElementById('certificate-logo-input').value = '';
        }
    }
    else {
        document.getElementById('modal-generic-add').style.display = 'flex';
        document.getElementById('generic-target-section').value = section;
        document.getElementById('input-generic-text').value = "";

        if (document.getElementById('experience-logo-preview')) {
            document.getElementById('experience-logo-preview').style.display = 'none';
            document.getElementById('experience-logo-preview').src = '';
            document.getElementById('experience-logo-placeholder').style.display = 'flex';
            document.getElementById('experience-logo-input').value = '';
        }
    }
}

function openAboutModal() {
    const modal = document.getElementById('modal-edit-about');
    if (!modal) return;
    modal.style.display = 'flex';
    const currentBioElem = document.getElementById('display-profile-bio');
    const inputBioElem = document.getElementById('input-profile-bio');
    
    if (currentBioElem && inputBioElem) {
        const currentBio = currentBioElem.innerText.trim();
        if (currentBio.includes("اضغط على زر التعديل")) {
            inputBioElem.value = "";
        } else {
            inputBioElem.value = currentBio;
        }
    }
    const inputSkillsElem = document.getElementById('input-profile-skills');
    if (inputSkillsElem) {
        inputSkillsElem.value = localStorage.getItem('userProfileSkills') || "";
    }
}

function closeAboutModal() {
    const modal = document.getElementById('modal-edit-about');
    if (modal) modal.style.display = 'none';
}

function saveAboutData() {
    const inputBio = document.getElementById('input-profile-bio').value.trim();
    const inputSkills = document.getElementById('input-profile-skills').value.trim();
    if (inputBio !== "") {
        document.getElementById('display-profile-bio').innerText = inputBio;
        localStorage.setItem('userProfileBio', inputBio);
    }
    localStorage.setItem('userProfileSkills', inputSkills);
    const skillsContainer = document.getElementById('display-profile-skills');
    if (skillsContainer) {
        skillsContainer.innerHTML = ""; 
        if (inputSkills !== "") {
            const skillsArray = inputSkills.split(/[،,]/); 
            
            skillsArray.forEach(skill => {
                const trimmedSkill = skill.trim();
                if (trimmedSkill !== "") {
                    const tag = document.createElement('span');
                    tag.style.cssText = "background: #f1f5f9; color: #475569; font-size: 12px; font-weight: 500; padding: 4px 12px; border-radius: 9999px; display: inline-block;";
                    tag.innerText = trimmedSkill;
                    skillsContainer.appendChild(tag);
                }
            });
        }
    }

    closeAboutModal();
}

function loadSavedAboutData() {
    const savedBio = localStorage.getItem('userProfileBio');
    if (savedBio && document.getElementById('display-profile-bio')) {
        document.getElementById('display-profile-bio').innerText = savedBio;
    }
    const savedSkills = localStorage.getItem('userProfileSkills');
    if (savedSkills) {
        const inputSkillsElem = document.getElementById('input-profile-skills');
        if (inputSkillsElem) inputSkillsElem.value = savedSkills;
        
        const skillsContainer = document.getElementById('display-profile-skills');
        if (skillsContainer) {
            skillsContainer.innerHTML = "";
            const skillsArray = savedSkills.split(/[،,]/);
            skillsArray.forEach(skill => {
                const trimmedSkill = skill.trim();
                if (trimmedSkill !== "") {
                    const tag = document.createElement('span');
                    tag.style.cssText = "background: #f1f5f9; color: #475569; font-size: 12px; font-weight: 500; padding: 4px 12px; border-radius: 9999px; display: inline-block;";
                    tag.innerText = trimmedSkill;
                    skillsContainer.appendChild(tag);
                }
            });
        }
    }
}

document.addEventListener("DOMContentLoaded", loadSavedAboutData);

function closeCertificatesModal() {
    document.getElementById('modal-certificates-add').style.display = 'none';
}

function handleCertificateLogoChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (!file.type.startsWith('image/')) {
            alert('يرجى اختيار ملف صورة صالحة فقط.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('certificate-logo-preview').src = e.target.result;
            document.getElementById('certificate-logo-preview').style.display = 'block';
            document.getElementById('certificate-logo-placeholder').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

function saveCertificateItem() {
    const certType = document.getElementById('input-certificate-name-select').value;
    const certTitle = document.getElementById('input-certificate-title').value.trim();
    const certYear = document.getElementById('input-certificate-year').value;

    if (!certType || certTitle === "" || !certYear) {
        alert("يرجى اختيار وتعبئة بيانات الشهادة أولاً!");
        return;
    }

    const container = document.getElementById('container-certificates');
    if (container.innerHTML.includes("data-i18n")) {
        container.innerHTML = `<ul id="list-certificates" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;"></ul>`;
    }

    const list = document.getElementById('list-certificates');
    const li = document.createElement('li');
    li.style.cssText = "background: #f8fafc; padding: 10px 12px; border-radius: 6px; border-right: 3px solid #8205f7; font-size: 13px; color: #334155; display: flex; justify-content: space-between; align-items: center;";
    
    li.innerHTML = `
        <div>
            <strong>${certType}</strong>: <span>${certTitle} (${certYear})</span>
        </div>
        <button onclick="this.parentElement.remove(); checkEmptySection('certificates');" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:12px;"><i class="fa fa-trash"></i></button>
    `;
    
    list.appendChild(li);
    closeCertificatesModal();
}

function closeEducationModal() {
    document.getElementById('modal-education-add').style.display = 'none';
}

function handleEducationLogoChange(event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (!file.type.startsWith('image/')) {
            alert('يرجى اختيار ملف صورة صالحة فقط.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('education-logo-preview').src = e.target.result;
            document.getElementById('education-logo-preview').style.display = 'block';
            document.getElementById('education-logo-placeholder').style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

function saveEducationItem() {
    const university = document.getElementById('input-education-university').value.trim();
    const specialty = document.getElementById('input-education-specialty').value.trim();
    const degree = document.getElementById('input-education-degree').value;
    const year = document.getElementById('input-education-year').value;

    if (university === "" || specialty === "" || !degree || !year) {
        alert("يرجى ملء جميع الحقول المطلوبة الكرت تمييزها بنجمة (*)!");
        return;
    }

    const container = document.getElementById('container-education');
    if (container.innerHTML.includes("data-i18n")) {
        container.innerHTML = `<ul id="list-education" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;"></ul>`;
    }

    const list = document.getElementById('list-education');
    const li = document.createElement('li');
    li.style.cssText = "background: #f8fafc; padding: 10px 12px; border-radius: 6px; border-right: 3px solid #8205f7; font-size: 13px; color: #334155; display: flex; justify-content: space-between; align-items: center;";
    li.innerHTML = `
        <div>
            <strong>${degree} في ${specialty}</strong> - <span>${university} (${year})</span>
        </div>
        <button onclick="this.parentElement.remove(); checkEmptySection('education');" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:12px;"><i class="fa fa-trash"></i></button>
    `;
    
    list.appendChild(li);
    closeEducationModal();
}

function closeWorksModal() {
    document.getElementById('modal-works-add').style.display = 'none';
}

function handleWorkFilesChange(event) {
    const input = event.target;
    if (input.files && input.files.length > 0) {
        document.getElementById('work-upload-status').innerText = `تم اختيار عدد (${input.files.length}) ملفات بنجاح.`;
    }
}

function saveWorkItem() {
    const titleValue = document.getElementById('input-work-title').value.trim();

    if (titleValue === "") {
        alert("يرجى كتابة اسم المشروع أولاً!");
        return;
    }

    const container = document.getElementById('container-works');
    
    // إزالة النص الافتراضي "لا توجد أعمال لعرضها" إن وُجد
    if (container.innerHTML.includes("data-i18n")) {
        container.innerHTML = `<ul id="list-works" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;"></ul>`;
    }

    const list = document.getElementById('list-works');
    const li = document.createElement('li');
    li.style.cssText = "background: #f8fafc; padding: 8px 12px; border-radius: 6px; border-right: 3px solid #8205f7; font-size: 13px; color: #334155; display: flex; justify-content: space-between; align-items: center;";
    li.innerHTML = `
        <span>${titleValue}</span>
        <button onclick="this.parentElement.remove(); checkEmptySection('works');" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:12px;"><i class="fa fa-trash"></i></button>
    `;
    
    list.appendChild(li);
    closeWorksModal();
}

function closeAddModal() {
    document.getElementById('modal-generic-add').style.display = 'none';
}

function saveGenericItem() {
    const section = document.getElementById('generic-target-section').value;
    const inputValue = document.getElementById('input-generic-text').value;
    if(inputValue.trim() === "") {
        alert("يرجى كتابة نص قبل الإضافة!");
        return;
    }
    const container = document.getElementById(`container-${section}`);
    if(container.innerHTML.includes("data-i18n")) {
        container.innerHTML = `<ul id="list-${section}" style="list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px;"></ul>`;
    }

    const list = document.getElementById(`list-${section}`);
    const li = document.createElement('li');
    li.style.cssText = "background: #f8fafc; padding: 8px 12px; border-radius: 6px; border-right: 3px solid #8205f7; font-size: 13px; color: #334155; display: flex; justify-content: space-between; align-items: center;";
    li.innerHTML = `
        <span>${inputValue}</span>
        <button onclick="this.parentElement.remove(); checkEmptySection('${section}');" style="background:none; border:none; color:#ef4444; cursor:pointer; font-size:12px;"><i class="fa fa-trash"></i></button>
    `;
    
    list.appendChild(li);
    closeAddModal();
}

function checkEmptySection(section) {
    const list = document.getElementById(`list-${section}`);
    if(!list || list.children.length === 0) {
        const container = document.getElementById(`container-${section}`);
        const defaultTexts = {
            'experience': 'لا توجد خبرات مسجلة',
            'works': 'لا توجد أعمال لعرضها',
            'education': 'لا توجد سجلات تعليمية.',
            'certificates': 'لم يتم إضافة أي شهادات بعد.'
        };
        container.innerHTML = `<div style="text-align: center; color: #94a3b8; font-size: 13px; padding: 20px 0;" data-i18n="profile-empty-${section}">${defaultTexts[section]}</div>`;
    }
}

function handleExperienceLogoChange(event) {
    const input = event.target;
    
    if (input.files && input.files[0]) {
        const file = input.files[0];
        if (!file.type.startsWith('image/')) {
            alert('يرجى اختيار ملف صورة صالحة فقط.');
            return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
            const previewImg = document.getElementById('experience-logo-preview');
            const placeholderDiv = document.getElementById('experience-logo-placeholder');

            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
            placeholderDiv.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
}

if(document.getElementById('experience-logo-preview')) {
    document.getElementById('experience-logo-preview').style.display = 'none';
    document.getElementById('experience-logo-preview').src = '';
    document.getElementById('experience-logo-placeholder').style.display = 'flex';
    document.getElementById('experience-logo-input').value = '';
}

function toggleUserMenu(event) {
    event.stopPropagation();
    const menu = document.getElementById('user-context-menu');
    
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
    } else {
        menu.style.display = 'none';
    }
}
document.addEventListener('click', function(event) {
    const menu = document.getElementById('user-context-menu');
    const container = document.querySelector('.right-sidebar-footer');
    
    if (menu && container && !container.contains(event.target)) {
        menu.style.display = 'none';
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const targetPage = urlParams.get('page');
    if (targetPage === 'panel-kyc' && typeof navigateDashboard === 'function') {
        setTimeout(() => {
            navigateDashboard('panel-kyc');
        }, 100);
    }
});

function handleLogout() {
    document.getElementById('logout-modal').style.display = 'flex';
}
function closeLogoutModal() {
    document.getElementById('logout-modal').style.display = 'none';
}
function confirmLogout() {
    window.location.href = 'login.html'; 
}
window.onclick = function(event) {
    const modal = document.getElementById('logout-modal');
    if (event.target === modal) {
        closeLogoutModal();
    }
}
//add services to profile panel
window.addEventListener('DOMContentLoaded', () => {
    const mainTab = localStorage.getItem('dashboard_active_tab');
    if (mainTab === 'profile') {
        if (typeof switchDashboardMainTab === 'function') {
            switchDashboardMainTab('profile-section');
        } else {
            document.querySelectorAll('.dashboard-view-panel').forEach(p => p.style.display = 'none');
            const profilePanel = document.getElementById('panel-profile');
            if (profilePanel) profilePanel.style.display = 'block';
        }
        localStorage.removeItem('dashboard_active_tab');
    }

    const savedServiceTab = localStorage.getItem('active_service_tab') || 'onetime';
    const targetButton = savedServiceTab === 'parttime' 
        ? document.querySelector("button[onclick*='parttime']") 
        : document.getElementById('default-service-tab');
        
    switchServiceTab(savedServiceTab, targetButton);
});

function switchServiceTab(tabType, element) {
    localStorage.setItem('active_service_tab', tabType);

    if (element && element.parentElement) {
        element.parentElement.querySelectorAll('.service-tab-btn').forEach(btn => {
            btn.style.backgroundColor = '#f1f5f9';
            btn.style.color = '#475569';
            btn.classList.remove('active-tab');
        });
        element.style.backgroundColor = '#8205f7';
        element.style.color = '#fff';
        element.classList.add('active-tab');
    }

    renderUserServices();
}

function renderUserServices() {
    const currentTab = localStorage.getItem('active_service_tab') || 'onetime';
    const container = document.getElementById('services-dynamic-content');
    if (!container) return;

    container.style.margin = '0';
    container.style.padding = '0';

    const servicesList = JSON.parse(localStorage.getItem('my_services')) || [];
    const filteredServices = servicesList.filter(item => {
        if (currentTab === 'onetime' && item.type === 'once') return true;
        if (currentTab === 'parttime' && item.type === 'part-time') return true;
        return item.type === currentTab;
    });

    if (filteredServices.length === 0) {
        container.style.margin = 'auto';
        container.style.padding = '35px 0';
        container.innerHTML = `
            <div class="no-services-trigger text-center">
                <p class="text-muted" data-i18n="profile-empty-services">لا توجد خدمات متاحة مضافة</p>
                <a href="add-request.html?type=${currentTab === 'parttime' ? 'part-time' : 'once'}" style="color: #8205f7; font-weight: bold; text-decoration: underline;">إضافة خدمة</a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 20px; width: 100%; text-align: right; margin-top: 15px;">
            ${filteredServices.map(service => `
                <div class="service-card-item" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; position: relative; box-shadow: 0 2px 8px rgba(0,0,0,0.03); transition: transform 0.2s;">
                    <div style="position: relative; height: 140px; background: #f8fafc;">
                        <img src="${service.image}" alt="Service" style="width: 100%; height: 100%; object-fit: cover;">
                        <button style="position: absolute; top: 10px; right: 10px; background: #ffffff; border: none; border-radius: 50%; width: 28px; height: 28px; color: #8205f7; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1);"><i class="fa fa-pencil"></i></button>
                    </div>
                    <div style="padding: 15px; position: relative;">
                        <h4 style="font-size: 13px; font-weight: bold; color: #1e293b; line-height: 1.5; margin-bottom: 8px; height: 38px; overflow: hidden;">${service.title}</h4>
                        
                        <div style="display: flex; gap: 5px; font-size: 11px; color: #64748b; margin-bottom: 10px;">
                            <i class="fa fa-star" style="color: #ffb547;"></i> <span>0.0 (0)</span>
                        </div>
                        
                        <div style="margin-bottom: 12px;">
                            <span style="font-size: 10px; color: #64748b; display: block;">ابتداءً من</span>
                            <span style="font-size: 16px; font-weight: 800; color: #0f172a;">$${service.price}</span>
                        </div>
                        
                        <div style="display: flex; gap: 6px;">
                            <div style="flex: 1; background: #f1f5f9; border-radius: 6px; padding: 5px 2px; font-size: 10px; color: #475569; text-align: center;"><span>${service.days} أيام</span></div>
                            <div style="flex: 1; background: #f1f5f9; border-radius: 6px; padding: 5px 2px; font-size: 10px; color: #475569; text-align: center;"><span>${service.revisions} تعديل</span></div>
                            <div style="flex: 1; background: #f1f5f9; border-radius: 6px; padding: 5px 2px; font-size: 10px; color: #475569; text-align: center;"><span>${service.features} ميزات</span></div>
                        </div>
                        
                        <button onclick="deleteServiceFromProfile(${service.id})" style="position: absolute; bottom: 52px; left: 15px; background: none; border: none; color: #ef4444; cursor: pointer; font-size: 14px;">
                            <i class="fa fa-trash"></i>
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function deleteServiceFromProfile(id) {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
        let servicesList = JSON.parse(localStorage.getItem('my_services')) || [];
        servicesList = servicesList.filter(item => item.id !== id);
        localStorage.setItem('my_services', JSON.stringify(servicesList));
        renderUserServices();
    }
}

