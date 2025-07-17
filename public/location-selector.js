function initThemeToggle() {
  const toggle = document.getElementById('themeToggle');
  if (!toggle) return;

  const applyTheme = (theme) => {
    document.body.classList.toggle('dark', theme === 'dark');
    document.body.setAttribute('data-theme', theme);
    toggle.setAttribute('aria-checked', theme === 'dark');
  };

  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);

  toggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  });
}


let currentIndex = 1; // start at first real slide (not the cloned one)
const track = document.getElementById("carouselTrack");
const slides = track.children;
const totalSlides = slides.length;


// Set initial position
track.style.transform = `translateX(-${currentIndex * 100}%)`;


function updateSlide(instant = false) {
 if (instant) {
   track.style.transition = 'none';
 } else {
   track.style.transition = 'transform 0.5s ease-in-out';
 }
 track.style.transform = `translateX(-${currentIndex * 100}%)`;
}


function nextSlide() {
 if (currentIndex >= totalSlides - 1) return;


 currentIndex++;
 updateSlide();


 // Jump back to real first slide if we hit the cloned one
 setTimeout(() => {
   if (currentIndex === totalSlides - 1) {
     currentIndex = 1;
     updateSlide(true);
   }
 }, 500);
}


function prevSlide() {
 if (currentIndex <= 0) return;


 currentIndex--;
 updateSlide();


 // Jump to real last slide if we hit the cloned one
 setTimeout(() => {
   if (currentIndex === 0) {
     currentIndex = totalSlides - 2;
     updateSlide(true);
   }
 }, 500);
}






function goToSlide(index) {
 currentIndex = index;
 updateSlide();
 updateDots();
}


function updateDots() {
 const dots = document.querySelectorAll('.carousel-dots .dot');
 dots.forEach((dot, i) => {
   dot.classList.toggle('active', i === currentIndex - 1);
 });
}


// Modify existing updateSlide to also call updateDots
function updateSlide(instant = false) {
 if (instant) {
   track.style.transition = 'none';
 } else {
   track.style.transition = 'transform 0.5s ease-in-out';
 }
 track.style.transform = `translateX(-${currentIndex * 100}%)`;
 updateDots();
}





window.nextSlide = nextSlide;
window.prevSlide = prevSlide;


document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  loadDevices();
});