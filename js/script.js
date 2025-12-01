
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

  function scrollCarruselCompartimientoDigital(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-digitales');
    const cardWidth = carrusel.querySelector('.card-digital').offsetWidth + 20;
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

  function scrollCarruselDocumentos(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-documentos');
    const cardWidth = carrusel.querySelector('.card-info').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  function scrollCarruselSEMSCifras(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-SEMS');
    const cardWidth = carrusel.querySelector('.card-cifras').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  function scrollCarruselRed(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-red');
    const cardWidth = carrusel.querySelector('.imgCarrusel-red').offsetWidth + 20;
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

 document.addEventListener("DOMContentLoaded", function () {
  const intervalTime = 3000; 
  const carrusel = document.getElementById('carrusel-horizontal');
  const cards = carrusel.querySelectorAll('.card-noticia');
  const cardWidth = cards[0].offsetWidth + 20; 
  let index = 0;

  function autoScrollCarrusel() {
    index++;

    if (index >= cards.length) {
      index = 0;
      carrusel.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carrusel.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
    }
  }

  setInterval(autoScrollCarrusel, intervalTime);
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

function scrollCarruselBachilleratoTecnologico(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-bachillerato-tecnologico');
    const cardWidth = carrusel.querySelector('.imgCarrusel-bachillerato').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  function scrollCarruselBachilleratoGral(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-bachillerato-gral');
    const cardWidth = carrusel.querySelector('.imgCarrusel-bachillerato').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  function scrollCarruselBachiller(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-bachiller');
    const cardWidth = carrusel.querySelector('.card-bachiller').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }
  function verificaYReiniciaCarruselBachiller() {
  const carrusel = document.getElementById('carrusel-horizontal-bachiller');
  const maxScrollLeft = carrusel.scrollWidth - carrusel.clientWidth;
  if (carrusel.scrollLeft >= maxScrollLeft) {
    carrusel.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  }
}
  function carruselAutomaticoBachiller() {
    const direccion = 1;
    setInterval(function() {
      scrollCarruselBachiller(direccion);
      verificaYReiniciaCarruselBachiller();
    }, 3000);
  }
  document.addEventListener('DOMContentLoaded', carruselAutomaticoBachiller);

  function scrollCarruselBachillerNNA(direction) {
  const carrusel = document.getElementById('carrusel-horizontal');
    const cardWidth = carrusel.querySelector('.card-carrusel').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  function scrollCarruselBachillerNumeros(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-bachiller-n');
    const cardWidth = carrusel.querySelector('.card-bachiller-n').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
    setTimeout(() => {
        const scrollLeft = carrusel.scrollLeft;
        const currentIndex = Math.round(scrollLeft / cardWidth);

        const indicators = document.querySelectorAll('.carousel-indicators-bachiller li');
        indicators.forEach((li, index) => {
            li.classList.toggle('active', index === currentIndex);
        });
    }, 400);
  }

  document.querySelectorAll('.carousel-indicators-bachiller li').forEach((li, index) => {
    li.addEventListener('click', () => {
        const carrusel = document.getElementById('carrusel-horizontal-bachiller-n');
        const cardWidth = carrusel.querySelector('.card-bachiller-n').offsetWidth + 20;

        carrusel.scrollTo({
            left: index * cardWidth,
            behavior: 'smooth'
        });

        const indicators = document.querySelectorAll('.carousel-indicators-bachiller li');
        indicators.forEach((el, i) => {
            el.classList.toggle('active', i === index);
        });
    });
});



function initDotsCarruselDigital() {
  const carrusel = document.getElementById('carrusel-horizontal-digitales');
  const dotsContainer = document.getElementById('carousel-dots-digitales');
  const cards = carrusel.querySelectorAll('.card-digital');

  // Limpiar dots previos si los hubiera
  dotsContainer.innerHTML = '';

  // Crear un dot por cada card
  cards.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active'); // primer dot activo

    dot.addEventListener('click', () => {
      const cardWidth = cards[0].offsetWidth + 20;
      carrusel.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    });

    dotsContainer.appendChild(dot);
  });

  // Escuchar el scroll para actualizar dots activos
  carrusel.addEventListener('scroll', () => {
    const cardWidth = cards[0].offsetWidth + 20;
    const index = Math.round(carrusel.scrollLeft / cardWidth);

    dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });
  });
}

document.addEventListener('DOMContentLoaded', initDotsCarruselDigital);
//Galería te extrañamos en el salón campaña 2
function scrollCarruselGaleria(direction) {
  const carrusel = document.getElementById('carrusel-horizontal');
    const cardWidth = carrusel.querySelector('.card-img-g').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

function scrollCarruselGaleriaVirtual(direction) {
  const carrusel = document.getElementById('carrusel-horizontal');
    const cardWidth = carrusel.querySelector('card-img-virtual').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }


/*AVANCE AUTOMATICO CARRUSEL BACHILLER EN MOVIL */
  document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card-bachiller');
  const indicators = document.querySelectorAll('.carousel-indicators-bachiller-home li');
  let currentIndex = 0;
  let intervalId;

  function activateCard(index) {
    cards.forEach((card, i) => {
      card.classList.toggle('active', i === index);
    });

    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === index);
    });

    currentIndex = index;
  }

  function startAutoSlide() {
    intervalId = setInterval(() => {
      const nextIndex = (currentIndex + 1) % cards.length;
      activateCard(nextIndex);
    }, 5000); 
  }

  function resetAutoSlide() {
    clearInterval(intervalId);
    startAutoSlide();
  }

  indicators.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      activateCard(index);
      resetAutoSlide(); 
    });
  });

  activateCard(0);  
  startAutoSlide(); 
});
//Videoteca te extrañamos en el salón campaña 2
function scrollCarruselVideos(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-videos');
    const cardWidth = carrusel.querySelector('.card-img').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

//modal-fdc-virtual
function scrollCarruselModalVirtual(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-fdcVirtual');
    const cardWidth = carrusel.querySelector('.card-img-fcd').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  function openModal(index =0) {
    const modal = document.getElementById("modalVirtual");
    const carrusel = document.getElementById('carrusel-horizontal-fdcVirtual');
    modal.style.display = "block";
    setTimeout(() => {
      const card = carrusel.querySelector('.card-img-fcd');
      if (card) {
        const cardWidth = card.offsetWidth + 20;
        carrusel.scrollTo({
          left: index * cardWidth,
          behavior: 'smooth'
        });
      }
    }, 200);
  }
  function closeModal() {
    document.getElementById("modalVirtual").style.display = "none";
  }
  window.onclick = function(event) {
    const modal = document.getElementById("modalVirtual");
    if (event.target === modal) {
      closeModal();
    }
  }

//modal galería - te extrañamos en el salón campaña 2 
  function scrollCarruselModal(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-teExtrañamos-modal');
    const cardWidth = carrusel.querySelector('.card-img-te').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  function openModal(index) {
    //console.log("Abriendo modal en índice:", index);
    const modal = document.getElementById("modalTeExtranamos");
    const carrusel = document.getElementById('carrusel-horizontal-teExtrañamos-modal');
    modal.style.display = "block";
    setTimeout(() => {
      const card = carrusel.querySelector('.card-img-te');
      if (card) {
        const cardWidth = card.offsetWidth + 20;
        carrusel.scrollTo({
          left: index * cardWidth,
          behavior: 'smooth'
        });
      }
    }, 200);
  }
  function closeModal() {
    document.getElementById("modalTeExtranamos").style.display = "none";
  }
  window.onclick = function(event) {
    const modal = document.getElementById("modalTeExtranamos");
    if (event.target === modal) {
      closeModal();
    }
  }
  //Galería te extrañamos en el salón campaña 1
  function scrollCarrusel(direction) {
  const carrusel = document.getElementById('carrusel-horizontal');
    const cardWidth = carrusel.querySelector('.card-img').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  function openModalCurriculum(index) {
  const modal = document.getElementById("modalCurriculum");
  const carrusel = document.getElementById("carrusel-horizontal-curriculum");
  const cards = carrusel.querySelectorAll('.card-curriculum');

  // Detener todos los videos
  cards.forEach(card => {
    const iframe = card.querySelector("iframe");
    if (iframe) {
      iframe.src = "";
    }
  });

  // Reproducir solo el iframe de la tarjeta seleccionada
  const targetCard = cards[index];
  const iframe = targetCard.querySelector("iframe");
  if (iframe) {
    const baseSrc = iframe.getAttribute("data-src");
    let cleanSrc = baseSrc.replace(/(\?|&)autoplay=1/, "").replace(/(\?|&)mute=1/, "");
    const separator = cleanSrc.includes('?') ? '&' : '?';
    iframe.src = cleanSrc + separator + 'autoplay=1&mute=1';
  }

  // Mostrar el modal
  modal.classList.add("active");

  // Hacer scroll hacia la tarjeta correspondiente
  setTimeout(() => {
    const cardWidth = cards[0].offsetWidth + 20;
    carrusel.scrollTo({
      left: index * cardWidth,
      behavior: "smooth"
    });
  }, 200);
}

function closeModalCurriculum() {
  const modal = document.getElementById("modalCurriculum");
  const iframes = modal.querySelectorAll("iframe");

  // Pausar todos los videos
  iframes.forEach(iframe => {
    iframe.src = "";
  });

  modal.classList.remove("active");
}

// Cierre del modal si se hace clic fuera del contenido
window.onclick = function(event) {
  const modal = document.getElementById("modalCurriculum");
  if (event.target === modal) {
    closeModalCurriculum();
  }
};

// Carrusel manual por flechas
function scrollCarruselModalCurriculum(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-curriculum');
  const cardWidth = carrusel.querySelector('.card-curriculum').offsetWidth + 20;
  carrusel.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth'
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Verifica que IntersectionObserver exista (por compatibilidad)
  if (!("IntersectionObserver" in window)) {
    console.warn("IntersectionObserver no es compatible con este navegador.");
    return;
  }

  const carrusel = document.getElementById('carrusel-horizontal-curriculum');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const iframe = entry.target.querySelector("iframe");
      const baseSrc = iframe?.getAttribute("data-src");

      if (!iframe || !baseSrc) return;

      if (entry.isIntersecting) {
        if (!iframe.src.includes("autoplay=1")) {
          iframe.src = baseSrc + "&autoplay=1";
        }
      } else {
        iframe.src = ""; // Detiene el video si ya no está visible
      }
    });
  }, {
    root: carrusel,
    threshold: 0.9 // Se reproduce solo si el card está casi completamente visible
  });

  // Observar cada tarjeta del carrusel
  document.querySelectorAll('.card-curriculum').forEach(card => {
    observer.observe(card);
  });
});

function openModalCurriculumAm(index) {
  const modal = document.getElementById("modalCurriculumAm");
  const carrusel = document.getElementById("carrusel-horizontal-curriculum-am");
  const cards = carrusel.querySelectorAll('.card-curriculum-am');

  // Detener todos los videos
  cards.forEach(card => {
    const iframe = card.querySelector("iframe");
    if (iframe) {
      iframe.src = "";
    }
  });

  // Reproducir solo el iframe de la tarjeta seleccionada
  const targetCard = cards[index];
  const iframe = targetCard.querySelector("iframe");
  if (iframe) {
    const baseSrc = iframe.getAttribute("data-src");
    let cleanSrc = baseSrc.replace(/(\?|&)autoplay=1/, "").replace(/(\?|&)mute=1/, "");
    const separator = cleanSrc.includes('?') ? '&' : '?';
    iframe.src = cleanSrc + separator + 'autoplay=1&mute=1';
  }

  // Mostrar el modal
  modal.classList.add("active");

  // Hacer scroll hacia la tarjeta correspondiente
  setTimeout(() => {
    const cardWidth = cards[0].offsetWidth + 20;
    carrusel.scrollTo({
      left: index * cardWidth,
      behavior: "smooth"
    });
  }, 200);
}

function closeModalCurriculumAm() {
  const modal = document.getElementById("modalCurriculumAm");
  const iframes = modal.querySelectorAll("iframe");

  // Pausar todos los videos
  iframes.forEach(iframe => {
    iframe.src = "";
  });

  modal.classList.remove("active");
}

// Cierre del modal si se hace clic fuera del contenido
window.onclick = function(event) {
  const modal = document.getElementById("modalCurriculumAm");
  if (event.target === modal) {
    closeModalCurriculumAm();
  }
};

// Carrusel manual por flechas
function scrollCarruselModalCurriculumAm(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-curriculum-am');
  const cardWidth = carrusel.querySelector('.card-curriculum-am').offsetWidth + 20;
  carrusel.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth'
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Verifica que IntersectionObserver exista (por compatibilidad)
  if (!("IntersectionObserver" in window)) {
    console.warn("IntersectionObserver no es compatible con este navegador.");
    return;
  }

  const carrusel = document.getElementById('carrusel-horizontal-curriculum-am');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const iframe = entry.target.querySelector("iframe");
      const baseSrc = iframe?.getAttribute("data-src");

      if (!iframe || !baseSrc) return;

      if (entry.isIntersecting) {
        if (!iframe.src.includes("autoplay=1")) {
          iframe.src = baseSrc + "&autoplay=1";
        }
      } else {
        iframe.src = ""; // Detiene el video si ya no está visible
      }
    });
  }, {
    root: carrusel,
    threshold: 0.9 // Se reproduce solo si el card está casi completamente visible
  });

  // Observar cada tarjeta del carrusel
  document.querySelectorAll('.card-curriculum-am').forEach(card => {
    observer.observe(card);
  });
});


function scrollCarruselFdc(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-fdc');
    const cardWidth = carrusel.querySelector('.card-fcd').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

function scrollCarruselBachillerConsulta(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-bachiller-consulta');
    const cardWidth = carrusel.querySelector('.card-consulta').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  function scrollCarruselLVD(direction) {
  const carrusel = document.getElementById('carrusel-horizontal');
    const cardWidth = carrusel.querySelector('.card-img-lvd').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  //modal galería - te extrañamos en el salón campaña 2 
  function scrollCarruselModalLVD(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-lvd-modal');
    const cardWidth = carrusel.querySelector('.card-img-modal-lvd').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  function openModalLVD(index) {
    console.log("Abriendo modal en índice:", index);
    const modal = document.getElementById("modalLasViolenciasDigitales");
    const carrusel = document.getElementById('carrusel-horizontal-lvd-modal');
    modal.style.display = "block";
    setTimeout(() => {
      const card = carrusel.querySelector('.card-img-modal-lvd');
      if (card) {
        const cardWidth = card.offsetWidth + 20;
        carrusel.scrollTo({
          left: index * cardWidth,
          behavior: 'smooth'
        });
      }
    }, 200);
  }
  function closeModalLVD() {
    document.getElementById("modalLasViolenciasDigitales").style.display = "none";
  }
  window.onclick = function(event) {
    const modal = document.getElementById("modalLasViolenciasDigitales");
    if (event.target === modal) {
      closeModalLVD();
    }
  }

  function scrollCarruselRed2(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-red-2');
    const cardWidth = carrusel.querySelector('.pdf-red').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  function openModal16diasAct(index) {
  const modal = document.getElementById("modal16diasAct");
  const carrusel = document.getElementById("carrusel-horizontal-16diasAct");
  const cards = carrusel.querySelectorAll('.card-16-da');

  // Mostrar el modal
  modal.classList.add("active");

  // Hacer scroll hacia la tarjeta correspondiente
  setTimeout(() => {
    const cardWidth = cards[0].offsetWidth + 20;
    carrusel.scrollTo({
      left: index * cardWidth,
      behavior: "smooth"
    });
  }, 200);
}

function closeModal16diasAct() {
  const modal = document.getElementById("modal16diasAct");
  const iframes = modal.querySelectorAll("iframe");

  // Pausar todos los videos
  iframes.forEach(iframe => {
    iframe.src = "";
  });

  modal.classList.remove("active");
}

// Cierre del modal si se hace clic fuera del contenido
window.onclick = function(event) {
  const modal = document.getElementById("modal16diasAct");
  if (event.target === modal) {
    closeModal16diasAct();
  }
};

// Carrusel manual por flechas
function scrollCarruselModal16diasAct(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-16diasAct');
  const cardWidth = carrusel.querySelector('.card-16-da').offsetWidth + 20;
  carrusel.scrollBy({
    left: direction * cardWidth,
    behavior: 'smooth'
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // Verifica que IntersectionObserver exista (por compatibilidad)
  if (!("IntersectionObserver" in window)) {
    console.warn("IntersectionObserver no es compatible con este navegador.");
    return;
  }

  const carrusel = document.getElementById('carrusel-horizontal-16diasAct');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const iframe = entry.target.querySelector("iframe");
      const baseSrc = iframe?.getAttribute("data-src");

      if (!iframe || !baseSrc) return;

      if (entry.isIntersecting) {
        if (!iframe.src.includes("autoplay=1")) {
          iframe.src = baseSrc + "&autoplay=1";
        }
      } else {
        iframe.src = ""; // Detiene el video si ya no está visible
      }
    });
  }, {
    root: carrusel,
    threshold: 0.9 // Se reproduce solo si el card está casi completamente visible
  });

  // Observar cada tarjeta del carrusel
  document.querySelectorAll('.card-16-da').forEach(card => {
    observer.observe(card);
  });
});

function scrollCarruselIAl(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-IAl');
  const cardWidth = carrusel.querySelector('.img-IAl').offsetWidth + 20;

  const totalSteps = Math.floor(carrusel.scrollWidth / cardWidth);
  const maxStepScroll = (totalSteps - Math.floor(carrusel.clientWidth / cardWidth)) * cardWidth;

  // Regresa solo cuando la última imagen ya se vio completa
  if (carrusel.scrollLeft >= maxStepScroll) {
    carrusel.scrollTo({
      left: 0,
      behavior: 'smooth'
    });
  } else {
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth',
      inline: 'start'
    });
  }
}
setInterval(() => {
  scrollCarruselIAl(1);
}, 6000);

function scrollCarruselGaleria16dda(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-galeria-16dda');
    const cardWidth = carrusel.querySelector('.img-g-16dda').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  //Galeria 16 dias de activismo 
  function scrollCarruselModalGaleria16dda(direction) {
  const carrusel = document.getElementById('carrusel-horizontal-galeria-16dda-modal');
    const cardWidth = carrusel.querySelector('.card-galeria-16dda').offsetWidth + 20;
    carrusel.scrollBy({
      left: direction * cardWidth,
      behavior: 'smooth'
    });
  }

  function openModalGaleria16dda(index) {
    //console.log("Abriendo modal en índice:", index);
    const modal = document.getElementById("modalGaleria16dda");
    const carrusel = document.getElementById('carrusel-horizontal-galeria-16dda-modal');
    modal.style.display = "block";
    setTimeout(() => {
      const card = carrusel.querySelector('.card-galeria-16dda');
      if (card) {
        const cardWidth = card.offsetWidth + 20;
        carrusel.scrollTo({
          left: index * cardWidth,
          behavior: 'smooth'
        });
      }
    }, 200);
  }
  function closeModalGaleria16dda() {
    document.getElementById("modalGaleria16dda").style.display = "none";
  }
  window.onclick = function(event) {
    const modal = document.getElementById("modalGaleria16dda");
    if (event.target === modal) {
      closeModalGaleria16dda();
    }
  }
