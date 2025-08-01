function animarContadoresEn(seccion) {
  const counters = seccion.querySelectorAll('.contador');
  console.log(counters);
  
  counters.forEach(counter => {
    const valorFinal = +counter.getAttribute('data-contar');
    let valorActual = 0;

    counter.innerText = 0;

    const actualizar = () => {
      const incremento = Math.ceil(valorFinal / 400);

      if (valorActual < valorFinal) {
        valorActual += incremento;
        counter.innerText = valorActual;
        setTimeout(actualizar, 30);
      } else {
        counter.innerText = valorFinal;
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


document.querySelectorAll('#seccion-contadores').forEach(seccion => {
  observer.observe(seccion);
});


function scrollCarrusel(direction) {
    const carrusel = document.getElementById('carrusel');
    const cardWidth = carrusel.querySelector('.card-noticia').offsetWidth + 20; // incluye gap
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }