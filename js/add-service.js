function triggerFileInput(inputId) {
    document.getElementById(inputId).click();
}

function handleFileSelect(input, previewId) {
    if (input.files && input.files[0]) {
        displayPreview(input.files[0], previewId);
    }
}

function handleFileDrop(event, inputId, previewId) {
    event.preventDefault();
    const zone = document.getElementById(inputId).parentElement;
    zone.classList.remove('dragover');
    
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
        document.getElementById(inputId).files = event.dataTransfer.files;
        displayPreview(event.dataTransfer.files[0], previewId);
    }
}

function displayPreview(file, previewId) {
    const reader = new FileReader();
    const previewContainer = document.getElementById(previewId);
    const inputId = previewId.replace('preview', 'file-input');
    
    reader.onload = function(e) {
        previewContainer.innerHTML = '';
        
        // إنشاء حاوية نسبية للمرفق وزر الحذف
        const wrapper = document.createElement('div');
        wrapper.className = 'preview-wrapper';
        
        // إنشاء زر الحذف
        const deleteBtn = document.createElement('button');
        deleteBtn.type = 'button';
        deleteBtn.className = 'delete-preview-btn';
        deleteBtn.innerHTML = '<i class="fa fa-trash"></i>';
        
        // منع فتح نافذة الرفع عند الضغط على زر الحذف
        deleteBtn.onclick = function(event) {
            event.stopPropagation();
            removeUploadedFile(inputId, previewId);
        };
        
        if (file.type.startsWith('image/')) {
            const img = document.createElement('img');
            img.src = e.target.result;
            img.className = 'preview-element';
            wrapper.appendChild(img);
        } else if (file.type.startsWith('video/')) {
            const video = document.createElement('video');
            video.src = e.target.result;
            video.className = 'preview-element';
            video.controls = true;
            wrapper.appendChild(video);
        }
        
        wrapper.appendChild(deleteBtn);
        previewContainer.appendChild(wrapper);
    }
    reader.readAsDataURL(file);
}

function removeUploadedFile(inputId, previewId) {
    const inputElement = document.getElementById(inputId);
    inputElement.value = ''; 
    
    const previewContainer = document.getElementById(previewId);
    previewContainer.innerHTML = `
        <i class="fa fa-upload"></i>
        <p class="upload-text">
            <span data-i18n="drag-text">اسحب صورة أو فيديو هنا</span> <br> 
            <span class="browse-link" data-i18n="browse-text">تصفح</span>
        </p>
    `;
    if (typeof updatePageLanguages === 'function') {
        updatePageLanguages();
    }
}

function navigateToStep(stepNumber) {
    document.querySelectorAll('.step-content').forEach(panel => {
        panel.classList.remove('active-panel');
    });
    
    document.getElementById(`step-content-${stepNumber}`).classList.add('active-panel');

    const steps = [1, 2, 3, 4, 5];
    steps.forEach(num => {
        const tab = document.getElementById(`step-tab-${num}`);
        const icon = document.getElementById(`step-icon-${num}`);
        if (!tab || !icon) return;

        if (num < stepNumber) {
            tab.classList.remove('active');
            tab.classList.add('completed');
            icon.innerHTML = '<i class="fa fa-check"></i>';
        } else if (num === stepNumber) {
            tab.classList.remove('completed');
            tab.classList.add('active');
            icon.innerHTML = '<i class="fa fa-pencil"></i>';
        } else {
            tab.classList.remove('active', 'completed');
            icon.innerHTML = num;
        }
    });
}

function handleFinalSubmit() {
    const title = document.querySelector('#step-content-1 textarea').value || "عنوان خدمة افتراضي";
    const price = document.querySelector('#step-content-2 input[type="number"]').value || "5";
    const deliveryTime = document.querySelector('#step-content-2 input[placeholder="مثال: 3"]').value || "7";
    const revisions = document.querySelector('#step-content-2 select').value || "3";
    const serviceType = document.getElementById('service-type-storage').value;
    const activeFeaturesCount = document.querySelectorAll('#step-content-2 .features-checkbox-list input:checked').length || 0;

    let serviceImage = 'images/worker.avif';
    const uploadedImg = document.querySelector('#preview-1 img');
    if (uploadedImg) {
        serviceImage = uploadedImg.src;
    }

    const newService = {
        id: Date.now(),
        title: title,
        price: price,
        days: deliveryTime,
        revisions: revisions,
        features: activeFeaturesCount,
        image: serviceImage,
        type: serviceType
    };

    let servicesList = JSON.parse(localStorage.getItem('my_services')) || [];
    servicesList.push(newService);
    localStorage.setItem('my_services', JSON.stringify(servicesList));
    
    const targetTabKey = serviceType === 'part-time' ? 'parttime' : 'onetime';
    localStorage.setItem('active_service_tab', targetTabKey);
    localStorage.setItem('dashboard_active_tab', 'profile');

    window.location.href = 'dashboard.html'; 
}