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
        counter.innerText = valorActual.toLocaleString('es-MX');
        setTimeout(actualizar, 20);
      } else {
        counter.innerText = valorFinal.toLocaleString('es-MX');
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

function scrollCarrusel(direction) {
  const carrusel = document.getElementById('carrusel-horizontal');
    const cardWidth = carrusel.querySelector('.card-noticia').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

function scrollCarruselCompartimiento1(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-compartimiento1');
    const cardWidth = carrusel.querySelector('.card-noticia').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  function scrollCarruselCompartimiento2(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-compartimiento2');
    const cardWidth = carrusel.querySelector('.card-noticia').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }


  function scrollCarruselBachilleratoGeneral(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-bachillerato-general');
    const cardWidth = carrusel.querySelector('.contenedor-imgCarrusel').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

    function scrollCarruselBachilleratoTecnico(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-bachillerato-tecnico');
    const cardWidth = carrusel.querySelector('.contenedor-imgCarrusel').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  
  document.querySelectorAll('.carrusel-scroll').forEach(carrusel => {
    let isDown = false;
    let start, scrollStart;
    let isVertical = carrusel.classList.contains('vertical');

    // PC: mouse
    carrusel.addEventListener('mousedown', e => {
      isDown = true;
      carrusel.classList.add('dragging');
      start = isVertical ? e.pageY : e.pageX;
      scrollStart = isVertical ? carrusel.scrollTop : carrusel.scrollLeft;
    });

    ['mouseup', 'mouseleave'].forEach(event => {
      carrusel.addEventListener(event, () => {
        isDown = false;
        carrusel.classList.remove('dragging');
      });
    });

    carrusel.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const current = isVertical ? e.pageY : e.pageX;
      const walk = (current - start) * 1.2;
      if (isVertical) {
        carrusel.scrollTop = scrollStart - walk;
      } else {
        carrusel.scrollLeft = scrollStart - walk;
      }
    });

    // Móviles: touch
    carrusel.addEventListener('touchstart', e => {
      isDown = true;
      start = isVertical ? e.touches[0].pageY : e.touches[0].pageX;
      scrollStart = isVertical ? carrusel.scrollTop : carrusel.scrollLeft;
    });

    carrusel.addEventListener('touchend', () => {
      isDown = false;
    });

    carrusel.addEventListener('touchmove', e => {
      if (!isDown) return;
      const current = isVertical ? e.touches[0].pageY : e.touches[0].pageX;
      const walk = (current - start) * 1.2;
      if (isVertical) {
        carrusel.scrollTop = scrollStart - walk;
      } else {
        carrusel.scrollLeft = scrollStart - walk;
      }
    });
  });


  // SCRIPT FILTRO BOLETINES
document.addEventListener("DOMContentLoaded", function () {
  const filtroAnio = document.getElementById("filtro-anio");
  const seccion = document.querySelector("section");
  const todasColumnas = Array.from(seccion.querySelectorAll(".col-md-4"));

  filtroAnio.addEventListener("change", function () {
    const anioSeleccionado = filtroAnio.value;

    seccion.innerHTML = "";

    const visibles = todasColumnas.filter((col) => {
      const fechaTexto = col.querySelector("strong").textContent.trim();
      const anioEnCard = fechaTexto.match(/\b\d{4}\b/);
      return (
        anioSeleccionado === "" ||
        (anioEnCard && anioEnCard[0] === anioSeleccionado)
      );
    });

    if (visibles.length > 0) {
      let fila = document.createElement("div");
      fila.classList.add("row");

      visibles.forEach((col, index) => {
        col.style.display = "";
        col.classList.remove("col-md-4", "col-md-12");

        if (visibles.length === 1) {
          col.classList.add("col-md-12");
        } else {
          col.classList.add("col-md-4");
        }

        fila.appendChild(col);

        if ((index + 1) % 3 === 0 && visibles.length > 1) {
          seccion.appendChild(fila);
          fila = document.createElement("div");
          fila.classList.add("row");
        }
      });

      if (fila.children.length > 0) {
        seccion.appendChild(fila);
      }

      ajustarAlturaTarjetas();
    } else {
      const mensaje = document.createElement("p");
      mensaje.textContent = "No hay boletines para este año.";
      seccion.appendChild(mensaje);
    }
  });

  function ajustarAlturaTarjetas() {
    const tarjetas = document.querySelectorAll(".card-boletin");
    let maxAltura = 0;

    
    tarjetas.forEach(t => t.style.height = "auto");

    
    tarjetas.forEach(t => {
      if (t.offsetHeight > maxAltura) {
        maxAltura = t.offsetHeight;
      }
    });

    
    tarjetas.forEach(t => t.style.height = maxAltura + "px");
  }

  
  ajustarAlturaTarjetas();
  window.addEventListener("resize", ajustarAlturaTarjetas);
});