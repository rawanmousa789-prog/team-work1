// ==========================================
// i18n.js – نظام الترجمة لموقع Team Work
// ==========================================

// اللغة الافتراضية (نقرأها من localStorage إذا كان المستخدم اختار قبل)
let currentLang = localStorage.getItem('lang') || 'ar';

// تحميل ملف الترجمة وتطبيقه
async function loadTranslations(lang) {
    try {
        // إظهار مؤشر تحميل أو إخفاء الصفحة جزئياً لتجنب الوميض
        document.documentElement.classList.add('is-translating');

        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) throw new Error(`Could not load ${lang}.json`);
        
        const translations = await response.json();
        
        // استخدام RequestAnimationFrame لضمان سلاسة التحديث في المتصفح
        requestAnimationFrame(() => {
            applyTranslations(translations, lang);
            document.documentElement.classList.remove('is-translating');
        });

        currentLang = lang;
        localStorage.setItem('lang', lang);
    } catch (error) {
        console.error('i18n Error:', error);
    }
}

// تطبيق الترجمة على عناصر الصفحة
function applyTranslations(translations, lang) {
    // ترجمة النصوص العادية
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[key]) {
            el.textContent = translations[key];
        }
    });

    // ترجمة placeholder للـ input
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (translations[key]) {
            el.setAttribute('placeholder', translations[key]);
        }
    });

    // تغيير اتجاه الصفحة واللغة
    if (lang === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.setAttribute('lang', 'ar');
        document.getElementById('lang-switcher').textContent = 'EN';
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.setAttribute('lang', 'en');
        document.getElementById('lang-switcher').textContent = 'عربي';
    }
}

// عند الضغط على زر اللغة
document.getElementById('lang-switcher').addEventListener('click', () => {
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    loadTranslations(newLang);
});

// تحميل اللغة عند فتح الصفحة
loadTranslations(currentLang);