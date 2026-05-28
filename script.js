// --- 1. INITIALIZE & OBSERVER ---
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide Icons
    lucide.createIcons();

    // Scroll reveal
    const revealElements = document.querySelectorAll('.reveal-up');
    revealElements.forEach(el => observer.observe(el));

});


// --- 2. IMAGE GALLERIES ---
// Uses local images folder

const projectGalleries = {

    // WORK SECTION
    work1: [
        'POD1.png',
        'POD2.png',
        'POD-comment.png',
        'POD-action.png',
        'POD-compliance.png',
        'POD-pivot.png',
        'POD-pivotdetail.png'
    ],

    work2: [
        'auto-emailtool.png'
    ],

    work3: [
        'Inventory-site.png',
        'MPOP-Guide.png',
        'wl-template.png',
        'LWI.png'
    ],

    // AWARDS SECTION
    award1: [
        'client-com.png'
    ],

    award2: [
        'SAP-SD.jpg'
    ],

    award3: [
        'FY25.png',
        'FY26.png',
    ]
};


// --- 3. MODAL ELEMENTS ---
const modal = document.getElementById('image-modal');
const modalImage = document.getElementById('modal-image');

const closeModal = document.querySelector('.close-modal');
const modalBackdrop = document.querySelector('.modal-backdrop');

const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const currentIndexText =
    document.getElementById('current-img-index');

const totalCountText =
    document.getElementById('total-img-count');

let currentGallery = [];
let currentImageIndex = 0;


// --- 4. OPEN MODAL ---
document.querySelectorAll('.clickable-image')
    .forEach(img => {

    img.addEventListener('click', e => {

        const projectId =
            e.target.getAttribute('data-project');

        if (!projectGalleries[projectId]) return;

        currentGallery = projectGalleries[projectId];
        currentImageIndex = 0;

        updateModalContent();

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');

        document.body.style.overflow = 'hidden';

        const singleImage =
            currentGallery.length <= 1;

        prevBtn.style.display =
            singleImage ? 'none' : 'flex';

        nextBtn.style.display =
            singleImage ? 'none' : 'flex';

    });

});


// --- 5. UPDATE MODAL IMAGE ---
function updateModalContent() {

    modalImage.style.opacity = 0;

    const tempImg = new Image();

    tempImg.src =
        currentGallery[currentImageIndex];

    tempImg.onload = () => {

        modalImage.src = tempImg.src;

        currentIndexText.innerText =
            currentImageIndex + 1;

        totalCountText.innerText =
            currentGallery.length;

        modalImage.style.opacity = 1;

    };

}


// --- 6. NEXT IMAGE ---
nextBtn.addEventListener('click', () => {

    currentImageIndex =
        (currentImageIndex ===
            currentGallery.length - 1)
        ? 0
        : currentImageIndex + 1;

    updateModalContent();

});


// --- 7. PREVIOUS IMAGE ---
prevBtn.addEventListener('click', () => {

    currentImageIndex =
        (currentImageIndex === 0)
        ? currentGallery.length - 1
        : currentImageIndex - 1;

    updateModalContent();

});


// --- 8. CLOSE MODAL ---
function closeAction() {

    modal.classList.remove('active');

    modal.setAttribute(
        'aria-hidden',
        'true'
    );

    document.body.style.overflow = '';

}

closeModal.addEventListener(
    'click',
    closeAction
);

modalBackdrop.addEventListener(
    'click',
    closeAction
);


// --- 9. KEYBOARD SUPPORT ---
document.addEventListener('keydown', e => {

    if (!modal.classList.contains('active'))
        return;

    if (e.key === 'Escape')
        closeAction();

    if (
        e.key === 'ArrowRight' &&
        currentGallery.length > 1
    ) {
        nextBtn.click();
    }

    if (
        e.key === 'ArrowLeft' &&
        currentGallery.length > 1
    ) {
        prevBtn.click();
    }

});