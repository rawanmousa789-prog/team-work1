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
