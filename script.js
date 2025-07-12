// script.js

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.addEventListener('scroll', function () {
    const scrollButton = document.getElementById('scroll-up-button');
    if (window.scrollY > 300) {  // Replace window.pageYOffset with window.scrollY
        scrollButton.style.display = 'block';
    } else {
        scrollButton.style.display = 'none';
    }
});

function toggleDetails(element) {
    element.classList.toggle('active');
}
