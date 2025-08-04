function animarContadoresEn(seccion) {
  const counters = seccion.querySelectorAll('.contador');

  counters.forEach(counter => {
    const valorFinal = +counter.getAttribute('data-contar');
  
    if (counter.getAttribute('data-animado') === 'true') return;

    let valorActual = 0;
    counter.innerText = 0;

    const actualizar = () => {
      const incremento = Math.ceil(valorFinal / 200);

      if (valorActual < valorFinal) {
        valorActual += incremento;
        counter.innerText = valorActual;
        setTimeout(actualizar, 20);
      } else {
        counter.innerText = valorFinal;
        counter.setAttribute('data-animado', 'true'); 
      }
    };

    actualizar();
  });
}

const cooldowns = new WeakMap();

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const seccion = entry.target;

    if (entry.isIntersecting && !cooldowns.get(seccion)) {
      animarContadoresEn(seccion);
      cooldowns.set(seccion, true);
      setTimeout(() => cooldowns.set(seccion, false), 2000); 
    }
  });
}, { threshold: 0.4 });


document.querySelectorAll('.seccion-contadores').forEach(seccion => {
  observer.observe(seccion);
});


// CARRUSEL
const carrusel = document.getElementById('carrusel');
function scrollCarrusel(direction) {
    const cardWidth = carrusel.querySelector('.card-noticia').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }
  
    let isDown = false;
    let startX;
    let scrollLeft;

    carrusel.addEventListener('mousedown', (e) => {
      isDown = true;
      carrusel.classList.add('dragging');
      startX = e.pageX - carrusel.offsetLeft;
      scrollLeft = carrusel.scrollLeft;
    });

    carrusel.addEventListener('mouseleave', () => {
      isDown = false;
      carrusel.classList.remove('dragging');
    });

    carrusel.addEventListener('mouseup', () => {
      isDown = false;
      carrusel.classList.remove('dragging');
    });

    carrusel.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - carrusel.offsetLeft;
      const walk = (x - startX) * 1.2;
      carrusel.scrollLeft = scrollLeft - walk;
    });

    // Soporte táctil
    carrusel.addEventListener('touchstart', (e) => {
      isDown = true;
      startX = e.touches[0].pageX - carrusel.offsetLeft;
      scrollLeft = carrusel.scrollLeft;
    });

    carrusel.addEventListener('touchend', () => {
      isDown = false;
    });

    carrusel.addEventListener('touchmove', (e) => {
      if (!isDown) return;
      const x = e.touches[0].pageX - carrusel.offsetLeft;
      const walk = (x - startX) * 1.2;
      carrusel.scrollLeft = scrollLeft - walk;
    });