const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');


// Mobile Menu Toggle
burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


// Close Mobile Menu After Clicking
document.querySelectorAll('.nav-links a').forEach(link => {

    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });

});