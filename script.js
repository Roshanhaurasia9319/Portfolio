
// Scroll Animation for Sections
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < windowHeight - 100) {
            section.classList.add('show');
        }
    });
});
