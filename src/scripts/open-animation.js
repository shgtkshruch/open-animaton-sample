(() => {
  'use strict';

  const $svg = $('#svg');
  const $body = $('body');
  const $btn = $('.js-btn');
  const $close = $('.js-close');

  const svg = Snap('#svg');
  const circle = svg.circle('50%', '50%', 0);

  let $content = '';

  // console.log(anime.easings);

  $btn.click(function (e) {
    // console.log(e);

    $content = $($(this).parents('.section').find('.content'));

    e.preventDefault();

    // スクロールを無効にする
    $body.css({ overflow: 'hidden' });

    $svg.show();

    // 円の位置をクリックした場所に合わせる
    circle.attr({
      cx: e.clientX,
      cy: e.clientY,
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

    // 円の位置をクリックした場所に合わせる
    circle.attr({
      cx: e.clientX,
      cy: e.clientY,
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
        // スクロールを有効にする
        $body.css({ overflow: 'auto' });
      }
    });

    $content.fadeOut(200, () => {
      shrinkAnime.play();

      setTimeout(() => {
        $svg.fadeOut();
      }, 1100);
    });
  });

})();
