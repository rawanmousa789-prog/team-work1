const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active'); 
});

const scrollBtn = document.querySelector('.scroll-btn');
window.onscroll = function() {
    scrollFunction();
};
function scrollFunction() {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "flex";
    } else {
        scrollBtn.style.display = "none";
    }
}
scrollBtn.addEventListener("click", function() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});