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

window.addEventListener('DOMContentLoaded', () => {
    const savedTab = localStorage.getItem('active_service_tab') || 'once';
    switchServiceTab(savedTab);
    renderUserServices();
});

function switchServiceTab(tabType) {
    localStorage.setItem('active_service_tab', tabType);
    
    const btnOnce = document.getElementById('btn-tab-once');
    const btnPart = document.getElementById('btn-tab-parttime');

    if (tabType === 'once') {
        if(btnOnce) btnOnce.classList.add('active-tab-style');
        if(btnPart) btnPart.classList.remove('active-tab-style');
    } else {
        if(btnPart) btnPart.classList.add('active-tab-style');
        if(btnOnce) btnOnce.classList.remove('active-tab-style');
    }
    
    renderUserServices();
}

function renderUserServices() {
    const currentTab = localStorage.getItem('active_service_tab') || 'once';
    const container = document.getElementById('services-grid-container');
    if (!container) return;

    const servicesList = JSON.parse(localStorage.getItem('my_services')) || [];
    const filteredServices = servicesList.filter(item => item.type === currentTab);

    if (filteredServices.length === 0) {
        container.innerHTML = `
            <div class="no-services-trigger text-center my-4">
                <p class="text-muted">لا توجد خدمات متاحـة مضافة</p>
                <a href="add-request.html?type=${currentTab}" class="btn-link-purple">إضافة خدمة</a>
            </div>
        `;
        return;
    }

    container.innerHTML = filteredServices.map(service => `
        <div class="service-card-item">
            <div class="card-img-wrapper">
                <img src="${service.image}" alt="Service Image" class="card-top-image">
                <button class="edit-card-icon-btn"><i class="fas fa-edit"></i></button>
            </div>
            <div class="card-content-body">
                <h4 class="service-card-title">${service.title}</h4>
                
                <div class="card-meta-rating">
                    <span class="rating-stars"><i class="fas fa-star text-warning"></i> 0.0</span>
                    <span class="rating-count">(0)</span>
                </div>
                
                <div class="card-price-bottom">
                    <span class="price-prefix">ابتداءً من</span>
                    <span class="price-amount">$${service.price}</span>
                </div>
                
                <div class="card-badges-footer">
                    <div class="badge-pill-info"><span>${service.days} الأيام</span></div>
                    <div class="badge-pill-info"><span>${service.revisions} المراجعات</span></div>
                    <div class="badge-pill-info"><span>${service.features} الميزات</span></div>
                </div>
                
                <button class="delete-service-card" onclick="deleteServiceFromProfile(${service.id})">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        </div>
    `).join('');
}

function deleteServiceFromProfile(id) {
    if (confirm('هل أنت متأكد من حذف هذه الخدمة؟')) {
        let servicesList = JSON.parse(localStorage.getItem('my_services')) || [];
        servicesList = servicesList.filter(item => item.id !== id);
        localStorage.setItem('my_services', JSON.stringify(servicesList));
        renderUserServices();
    }
}