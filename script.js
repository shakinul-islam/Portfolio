// ====== Navigation Menu (Mobile) ======
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});


// ====== Project Separate Screens Logic ======

// Function to open a specific project screen
function openProject(screenId) {
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.add('active');
        document.body.style.overflow = 'hidden'; 
    }
}

// Function to close a specific project screen and go back
function closeProject(screenId) {
    const screen = document.getElementById(screenId);
    if (screen) {
        screen.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// ====== Slider Left / Right Control Logic ======

function slidePrev(btn) {
    const slider = btn.nextElementSibling; // finds the .project-slider div
    const imageWidth = slider.clientWidth; // gets width of 1 image view
    slider.scrollBy({ left: -imageWidth, behavior: 'smooth' });
}

function slideNext(btn) {
    const slider = btn.previousElementSibling; // finds the .project-slider div
    const imageWidth = slider.clientWidth; // gets width of 1 image view
    slider.scrollBy({ left: imageWidth, behavior: 'smooth' });
}