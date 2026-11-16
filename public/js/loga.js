// Pásy log partnerov a klientov: tlačidlo zastaví alebo znova spustí posúvanie.
// Bez JavaScriptu sa logá posúvajú tiež a zastavia sa pri prejdení myšou.
(function () {
  var bezAnimacii = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (bezAnimacii) return;
  var tlacidla = document.querySelectorAll('.marquee-stop');
  Array.prototype.forEach.call(tlacidla, function (tlacidlo) {
    var pas = tlacidlo.previousElementSibling;
    if (!pas || !pas.classList.contains('marquee')) return;
    tlacidlo.hidden = false;
    tlacidlo.addEventListener('click', function () {
      var zastavene = pas.classList.toggle('je-zastavene');
      tlacidlo.textContent = zastavene ? 'Spustiť posúvanie' : 'Zastaviť posúvanie';
      tlacidlo.setAttribute('aria-pressed', zastavene ? 'true' : 'false');
    });
  });
})();
