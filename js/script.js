
const menu = document.querySelector('.menu');
const links = document.querySelector('.nav-links');
if(menu) menu.addEventListener('click',()=>links.classList.toggle('open'));

document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click',()=>links?.classList.remove('open'));
});

const year = document.querySelectorAll('[data-year]');
year.forEach(x=>x.textContent = new Date().getFullYear());
