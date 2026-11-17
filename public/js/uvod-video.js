// Video na pozadí úvodu: spustí sa len na väčších obrazovkách a ak návštevník
// nemá v zariadení vypnuté animácie. Inak zostane statický úvodný obrázok.
(function () {
  var video = document.querySelector('.hero-video');
  var tlacidlo = document.querySelector('.video-toggle');
  if (!video || !video.dataset.src) return;

  var maloMiesta = window.matchMedia('(max-width: 640px)').matches;
  var bezAnimacii = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (maloMiesta || bezAnimacii) return;

  video.src = video.dataset.src;
  var spustenie = video.play();
  if (spustenie && spustenie.catch) spustenie.catch(function () {});

  if (!tlacidlo) return;
  var popis = tlacidlo.querySelector('.sr');
  tlacidlo.hidden = false;
  tlacidlo.addEventListener('click', function () {
    var zastavene = !video.paused;
    if (zastavene) { video.pause(); } else { video.play(); }
    tlacidlo.classList.toggle('je-zastavene', zastavene);
    if (popis) popis.textContent = zastavene ? 'Spustiť video' : 'Zastaviť video';
  });
})();
