let currentLang = localStorage.getItem('lang') || 'ar';
async function loadTranslations(lang) {
    try {
        document.documentElement.classList.add('is-translating');

        const response = await fetch(`locales/${lang}.json`);
        if (!response.ok) throw new Error(`Could not load ${lang}.json`);
        
        const translations = await response.json();

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

function applyTranslations(translations , lang){
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if(translations[key]){
            el.textContent = translations[key];
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if(translations[key]){
            el.setAttribute('placeholder', translations[key]);
        }
    });

    if(lang === 'ar'){
        document.documentElement.setAttribute('dir' , 'rtl');
        document.documentElement.setAttribute('lang' , 'ar');
    } else {
        document.documentElement.setAttribute('dir' , 'ltr');
        document.documentElement.setAttribute('lang' , 'en');
    }

    const langSwitcher = document.getElementById('lang-switcher');
    if (langSwitcher) {
        langSwitcher.textContent = lang === 'ar' ? 'EN' : 'AR';
    }
    const hamburger = document.getElementById('hamburger');
    if (hamburger) {
        if (lang === 'ar') {
            hamburger.style.left = '15px';
            hamburger.style.right = 'auto';
        } else {
            hamburger.style.right = '15px';
            hamburger.style.left = 'auto';
        }
    }
}
const langSwitcherBtn = document.getElementById('lang-switcher');
if (langSwitcherBtn) {
    langSwitcherBtn.addEventListener('click', function(){
        const newLang = currentLang === 'ar' ? 'en' : 'ar';
        loadTranslations(newLang);
    });
}
loadTranslations(currentLang);