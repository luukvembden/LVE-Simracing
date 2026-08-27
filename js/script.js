
const menu = document.querySelector('.menu');
const links = document.querySelector('.nav-links');
if(menu) menu.addEventListener('click',()=>links.classList.toggle('open'));

document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click',()=>links?.classList.remove('open'));
});

const year = document.querySelectorAll('[data-year]');
year.forEach(x=>x.textContent = new Date().getFullYear());

document.querySelectorAll('.product-slideshow').forEach(slideshow=>{
  const slides = [...slideshow.querySelectorAll('.slide')];
  const dots = [...slideshow.querySelectorAll('.slide-dots button')];
  const previous = slideshow.querySelector('.previous');
  const next = slideshow.querySelector('.next');
  let current = 0;

  const showSlide = index=>{
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex)=>slide.classList.toggle('active', slideIndex === current));
    dots.forEach((dot, dotIndex)=>dot.classList.toggle('active', dotIndex === current));
  };

  previous?.addEventListener('click',()=>showSlide(current - 1));
  next?.addEventListener('click',()=>showSlide(current + 1));
  dots.forEach((dot, dotIndex)=>dot.addEventListener('click',()=>showSlide(dotIndex)));
});
