// Плавный скролл к секциям
jQuery("body").on('click', '[href*="#"]', function(e){
  var fixed_offset = 0;
  jQuery('html,body').stop().animate({ scrollTop: jQuery(this.hash).offset().top - fixed_offset }, 1000);
  e.preventDefault();
});

// Для анимации при скролле
new WOW().init();

// Яндекс карты
ymaps.ready(function () {
  var myMap = new ymaps.Map('map', {
    center: [55.750788, 37.559200],
    zoom: 16,
    // Обратите внимание, что в API 2.1 по умолчанию карта создается с элементами управления.
    // Если вам не нужно их добавлять на карту, в ее параметрах передайте пустой массив в поле controls.
    controls: []
  });

  var myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
    balloonContentBody: [
      '<address>',
      '<strong>ЮК ЗЕВС</strong>',
      '<br/>',
      'Адрес: Москва, Кутузовский проспект, д.12, стр. 1',
      '<br/>',
      'Въезд со стороны набережной им. «Тараса Шевченко»',
      '</address>'
    ].join('')
  }, {
    preset: 'islands#redDotIcon'
  });

  myMap.geoObjects.add(myPlacemark);
});


