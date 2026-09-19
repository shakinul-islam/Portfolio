// ======================================================
// SHAKINUL PORTFOLIO - MAIN JAVASCRIPT
// ======================================================


// ======================================================
// 1. MOBILE NAVIGATION MENU
// ======================================================

const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

if (burger && navLinks) {
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}


document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {

        if (navLinks) {
            navLinks.classList.remove('active');
        }

    });
});


// ======================================================
// 2. PROJECT SCREEN - OPEN
// ======================================================

function openProject(screenId) {

    const screen = document.getElementById(screenId);

    if (screen) {

        screen.classList.add('active');

        document.body.style.overflow = 'hidden';

        const slider = screen.querySelector('.project-slider');

        if (slider) {
            slider.scrollTo({
                left: 0,
                behavior: 'instant'
            });
        }

        history.pushState(
            { project: screenId },
            '',
            '#' + screenId
        );
    }
}


// ======================================================
// 3. PROJECT SCREEN - CLOSE
// ======================================================

function closeProject(screenId) {

    const screen = document.getElementById(screenId);

    if (screen) {

        screen.classList.remove('active');

        document.body.style.overflow = 'auto';

        if (window.location.hash === '#' + screenId) {

            history.pushState(
                '',
                document.title,
                window.location.pathname + window.location.search
            );

        }

    }
}


// ======================================================
// 4. CLOSE PROJECT WITH ESC KEY
// ======================================================

document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {

        const activeScreen =
            document.querySelector('.project-screen.active');

        if (activeScreen) {

            activeScreen.classList.remove('active');

            document.body.style.overflow = 'auto';

            if (window.location.hash) {

                history.pushState(
                    '',
                    document.title,
                    window.location.pathname + window.location.search
                );

            }

        }

    }

});


// ======================================================
// 5. PROJECT SLIDER - PREVIOUS
// ======================================================

function slidePrev(btn) {

    if (!btn) return;

    const slider = btn.nextElementSibling;

    if (!slider) return;

    const imageWidth = slider.clientWidth;

    slider.scrollBy({
        left: -imageWidth,
        behavior: 'smooth'
    });

}


// ======================================================
// 6. PROJECT SLIDER - NEXT
// ======================================================

function slideNext(btn) {

    if (!btn) return;

    const slider = btn.previousElementSibling;

    if (!slider) return;

    const imageWidth = slider.clientWidth;

    slider.scrollBy({
        left: imageWidth,
        behavior: 'smooth'
    });

}


// ======================================================
// 7. PROJECT SLIDER DOTS
// ======================================================

function createSliderDots() {

    const sliders =
        document.querySelectorAll('.project-slider');

    sliders.forEach((slider) => {

        const images =
            slider.querySelectorAll('img');

        if (images.length <= 1) {
            return;
        }

        const wrapper =
            slider.parentElement;

        if (!wrapper) return;

        if (wrapper.querySelector('.slider-dots')) {
            return;
        }

        const dotsContainer =
            document.createElement('div');

        dotsContainer.className =
            'slider-dots';

        images.forEach((image, index) => {

            const dot =
                document.createElement('button');

            dot.className =
                'slider-dot';

            if (index === 0) {
                dot.classList.add('active');
            }

            dot.setAttribute(
                'aria-label',
                'Go to image ' + (index + 1)
            );

            dot.addEventListener('click', () => {

                slider.scrollTo({

                    left:
                        slider.clientWidth * index,

                    behavior: 'smooth'

                });

            });

            dotsContainer.appendChild(dot);

        });

        wrapper.appendChild(dotsContainer);

    });

}


// ======================================================
// 8. UPDATE SLIDER DOT
// ======================================================

function updateSliderDots() {

    const sliders =
        document.querySelectorAll('.project-slider');

    sliders.forEach((slider) => {

        const dotsContainer =
            slider.parentElement?.querySelector('.slider-dots');

        if (!dotsContainer) return;

        const dots =
            dotsContainer.querySelectorAll('.slider-dot');

        if (!dots.length) return;

        const currentIndex =
            Math.round(
                slider.scrollLeft /
                slider.clientWidth
            );

        dots.forEach((dot, index) => {

            dot.classList.toggle(
                'active',
                index === currentIndex
            );

        });

    });

}


document.querySelectorAll('.project-slider').forEach((slider) => {

    slider.addEventListener(
        'scroll',
        updateSliderDots,
        { passive: true }
    );

});


document.addEventListener('DOMContentLoaded', () => {

    createSliderDots();

    updateSliderDots();

});


// ======================================================
// 9. PROJECT FILTER
// ======================================================

const filterButtons =
    document.querySelectorAll('.filter-btn');

const projectCards =
    document.querySelectorAll('.project-card');

if (
    filterButtons.length > 0 &&
    projectCards.length > 0
) {

    filterButtons.forEach(button => {

        button.addEventListener('click', () => {

            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });

            button.classList.add('active');

            const filter =
                button.getAttribute('data-filter');

            projectCards.forEach(card => {

                const categories =
                    card.getAttribute('data-category') || '';

                if (
                    filter === 'all' ||
                    categories
                        .toLowerCase()
                        .includes(filter.toLowerCase())
                ) {

                    card.style.display = 'flex';

                } else {

                    card.style.display = 'none';

                }

            });

        });

    });

}


// ======================================================
// 10. SCROLL REVEAL ANIMATION
// ======================================================

const revealElements =
    document.querySelectorAll(
        '.section-title, .about, .skill-card, .project-card, .contact-container'
    );

if (revealElements.length > 0) {

    const revealObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            'reveal-visible'
                        );

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

    revealElements.forEach(element => {

        element.classList.add(
            'reveal-element'
        );

        revealObserver.observe(element);

    });

}


// ======================================================
// 11. ACTIVE NAVIGATION LINK
// ======================================================

const sections =
    document.querySelectorAll('section[id]');

const navigationLinks =
    document.querySelectorAll('.nav-links a');

if (
    sections.length > 0 &&
    navigationLinks.length > 0
) {

    const sectionObserver =
        new IntersectionObserver(
            (entries) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        const currentId =
                            entry.target.getAttribute('id');

                        navigationLinks.forEach(link => {

                            link.classList.remove('active');

                            const linkTarget =
                                link.getAttribute('href');

                            if (
                                linkTarget ===
                                '#' + currentId
                            ) {

                                link.classList.add('active');

                            }

                        });

                    }

                });

            },
            {
                threshold: 0.35
            }
        );

    sections.forEach(section => {

        sectionObserver.observe(section);

    });

}


// ======================================================
// 12. BACK TO TOP BUTTON
// ======================================================

let backToTop =
    document.querySelector('.back-to-top');

if (!backToTop) {

    backToTop =
        document.createElement('button');

    backToTop.className =
        'back-to-top';

    backToTop.innerHTML =
        '<i class="fas fa-arrow-up"></i>';

    backToTop.setAttribute(
        'aria-label',
        'Back to top'
    );

    document.body.appendChild(backToTop);

}


window.addEventListener('scroll', () => {

    if (window.scrollY > 500) {

        backToTop.classList.add('show');

    } else {

        backToTop.classList.remove('show');

    }

});


backToTop.addEventListener('click', () => {

    window.scrollTo({

        top: 0,
        behavior: 'smooth'

    });

});


// ======================================================
// 13. CONTACT FORM
// ======================================================

const contactForm =
    document.querySelector('#contact-form');

if (contactForm) {

    contactForm.addEventListener('submit', (event) => {

        event.preventDefault();

        const nameInput =
            contactForm.querySelector(
                '[name="name"]'
            );

        const emailInput =
            contactForm.querySelector(
                '[name="email"]'
            );

        const messageInput =
            contactForm.querySelector(
                '[name="message"]'
            );


        const name =
            nameInput ?
            nameInput.value.trim() :
            '';

        const email =
            emailInput ?
            emailInput.value.trim() :
            '';

        const message =
            messageInput ?
            messageInput.value.trim() :
            '';


        if (!name || !email || !message) {

            showToast(
                'Please fill in all fields.',
                'error'
            );

            return;

        }


        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            showToast(
                'Please enter a valid email address.',
                'error'
            );

            return;

        }


        const subject =
            encodeURIComponent(
                'Portfolio Contact - ' + name
            );

        const body =
            encodeURIComponent(
                'Name: ' +
                name +
                '\n\nEmail: ' +
                email +
                '\n\nMessage:\n' +
                message
            );


        const mailtoLink =
            'mailto:shakinulislam017@gmail.com' +
            '?subject=' +
            subject +
            '&body=' +
            body;


        window.location.href =
            mailtoLink;


        showToast(
            'Opening your email application...',
            'success'
        );

    });

}


// ======================================================
// 14. TOAST MESSAGE
// ======================================================

function showToast(
    message,
    type = 'success'
) {

    let toast =
        document.querySelector(
            '.portfolio-toast'
        );


    if (!toast) {

        toast =
            document.createElement('div');

        toast.className =
            'portfolio-toast';

        document.body.appendChild(toast);

    }


    toast.textContent =
        message;

    toast.classList.remove(
        'success',
        'error',
        'show'
    );

    toast.classList.add(type);


    setTimeout(() => {

        toast.classList.add('show');

    }, 10);


    setTimeout(() => {

        toast.classList.remove('show');

    }, 3000);

}


// ======================================================
// 15. SMOOTH SCROLLING
// ======================================================

document.querySelectorAll(
    'a[href^="#"]'
).forEach(anchor => {

    anchor.addEventListener(
        'click',
        function(event) {

            const targetId =
                this.getAttribute('href');

            if (
                !targetId ||
                targetId === '#'
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({

                    behavior: 'smooth',
                    block: 'start'

                });

            }

        }
    );

});


// ======================================================
// 16. PROJECT SCREEN - HASH SUPPORT
// ======================================================

window.addEventListener('load', () => {

    const hash =
        window.location.hash.substring(1);

    if (!hash) return;

    const target =
        document.getElementById(hash);

    if (
        target &&
        target.classList.contains(
            'project-screen'
        )
    ) {

        target.classList.add('active');

        document.body.style.overflow =
            'hidden';

    }

});


// ======================================================
// 17. HANDLE BROWSER BACK BUTTON
// ======================================================

window.addEventListener(
    'popstate',
    () => {

        const activeScreen =
            document.querySelector(
                '.project-screen.active'
            );

        if (activeScreen) {

            activeScreen.classList.remove(
                'active'
            );

            document.body.style.overflow =
                'auto';

        }

    }
);


// ======================================================
// 18. IMAGE LAZY LOADING
// ======================================================

document.querySelectorAll(
    '.project-screen img, .project-card img'
).forEach(image => {

    if (!image.hasAttribute('loading')) {

        image.setAttribute(
            'loading',
            'lazy'
        );

    }

});


// ======================================================
// 19. PREVENT IMAGE DRAGGING
// ======================================================

document.querySelectorAll('img').forEach(image => {

    image.setAttribute(
        'draggable',
        'false'
    );

});


// ======================================================
// 20. CURRENT YEAR IN FOOTER
// ======================================================

const yearElements =
    document.querySelectorAll(
        '.current-year'
    );

yearElements.forEach(element => {

    element.textContent =
        new Date().getFullYear();

});


// ======================================================
// 21. PAGE LOADED
// ======================================================

window.addEventListener('load', () => {

    document.body.classList.add(
        'page-loaded'
    );

});