(function(){var L=(window.CHANTIO_CONFIG||{}).LEGAL||{};
document.querySelectorAll('[data-l]').forEach(function(e){var k=e.getAttribute('data-l'),v=L[k];
if(!v){e.textContent='';return;}
e.textContent=(e.getAttribute('data-pre')||'')+v;
if(/^À compléter/.test(v))e.className='todo';});})();
