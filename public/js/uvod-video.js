// Videá v úvode (pozadie a ukážka systému): spustia sa len na väčších obrazovkách
// a ak návštevník nemá v zariadení vypnuté animácie. Inak zostanú statické obrázky.
(function () {
  var videa = Array.prototype.filter.call(
    document.querySelectorAll('.hero-video, .zariadenia-video'),
    function (v) { return v.dataset.src; }
  );
  var tlacidlo = document.querySelector('.video-toggle');
  if (!videa.length) return;

  var maloMiesta = window.matchMedia('(max-width: 640px)').matches;
  var bezAnimacii = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (maloMiesta || bezAnimacii) return;

  videa.forEach(function (video) {
    video.src = video.dataset.src;
    var spustenie = video.play();
    if (spustenie && spustenie.catch) spustenie.catch(function () {});
  });

  if (!tlacidlo) return;
  var popis = tlacidlo.querySelector('.sr');
  tlacidlo.hidden = false;
  tlacidlo.addEventListener('click', function () {
    var zastavene = !tlacidlo.classList.contains('je-zastavene');
    videa.forEach(function (video) {
      if (zastavene) { video.pause(); } else { video.play(); }
    });
    tlacidlo.classList.toggle('je-zastavene', zastavene);
    if (popis) popis.textContent = zastavene ? 'Spustiť videá' : 'Zastaviť videá';
  });
})();
