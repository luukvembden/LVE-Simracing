
const menu = document.querySelector('.menu');
const links = document.querySelector('.nav-links');
if(menu) menu.addEventListener('click',()=>links.classList.toggle('open'));

document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click',()=>links?.classList.remove('open'));
});

const year = document.querySelectorAll('[data-year]');
year.forEach(x=>x.textContent = new Date().getFullYear());

document.querySelectorAll('[data-formsubmit-endpoint]').forEach(form=>{
  const status = form.querySelector('.form-status');
  const submit = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async event=>{
    event.preventDefault();
    status.textContent = 'Sending...';
    status.className = 'form-status is-sending';
    submit.disabled = true;

    try{
      const response = await fetch(form.dataset.formsubmitEndpoint, {
        method: 'POST',
        headers: {Accept: 'application/json'},
        body: new FormData(form)
      });
      if(!response.ok) throw new Error('Request failed');
      form.reset();
      status.textContent = 'Thanks, your message has been sent.';
      status.className = 'form-status is-success';
    }catch(error){
      status.textContent = 'Something went wrong. Please try again or email LVE directly.';
      status.className = 'form-status is-error';
    }finally{
      submit.disabled = false;
    }
  });
});

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

const productPhotos = document.querySelectorAll('.product-slideshow .slide img');
if(productPhotos.length){
  const lightbox = document.createElement('div');
  lightbox.className = 'photo-lightbox';
  lightbox.setAttribute('role','dialog');
  lightbox.setAttribute('aria-modal','true');
  lightbox.setAttribute('aria-label','Product photo');
  lightbox.innerHTML = '<button class="photo-lightbox-close" type="button" aria-label="Close product photo">&times;</button><img alt="">';
  document.body.append(lightbox);

  const lightboxImage = lightbox.querySelector('img');
  const closeButton = lightbox.querySelector('.photo-lightbox-close');
  const closeLightbox = ()=>lightbox.classList.remove('open');

  productPhotos.forEach(photo=>photo.addEventListener('click',()=>{
    lightboxImage.src = photo.src;
    lightboxImage.alt = photo.alt;
    lightbox.classList.add('open');
  }));
  closeButton.addEventListener('click',closeLightbox);
  lightbox.addEventListener('click',event=>{
    if(event.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown',event=>{
    if(event.key === 'Escape') closeLightbox();
  });
}
