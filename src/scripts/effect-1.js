(() => {
  'use strict';

  const $svg = $('#svg');
  const $body = $('body');
  const $btn = $('.js-btn');
  const $content = $('.js-content');
  const $close = $('.js-close');

  const svg = Snap('#svg');
  const circle = svg.circle('50%', '50%', 0);

  console.log(anime.easings);

  $btn.click((e) => {
    e.preventDefault();

    $svg.show();

    circle.attr({
      cx: e.pageX,
      cy: e.pageY,
      fill: '#fff',
      opacity: 0,
    });

    const bounceAnime =  anime({
      targets: '#svg circle',
      r: 25,
      opacity: 1,
      duration: 1500,
      elasticity: 1000,
      easing: 'easeOutBounce',
      autoplay: false
    });

    const scaleAnime = anime({
      targets: '#svg circle',
      r: [25, 1500],
      duration: 1000,
      easing: 'easeInOutExpo',
      autoplay: false,
      begin() {
        $body.css({ overflow: 'hidden' });
        setTimeout(() => {
          $content.fadeIn();
        }, 600);
      }
    });

    bounceAnime.play();

    setTimeout(() => {
      bounceAnime.pause();
      scaleAnime.play();
    }, 1200);

  });

  $close.click(function (e) {

    $body.css({ overflow: 'auto' });

    circle.attr({
      cx: e.pageX,
      cy: e.pageY,
      r: 2200,
      opacity: 1
    });

    const shrinkAnime = anime({
      targets: '#svg circle',
      r: 0,
      duration: 1500,
      easing: 'easeOutBounce',
      autoplay: false,
      complete() {
        $svg.hide();
        circle.attr({
          opacity: 1
        });
      }
    });

    $(this).parent().fadeOut(200, () => {
      shrinkAnime.play();

      setTimeout(() => {
        $svg.fadeOut();
      }, 1100);
    });
  });

})();
