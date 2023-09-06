//drawer
jQuery(".drawer-icon").on("click", function () {
  //ドロワー開閉
  $(this).toggleClass("is-open");
  $(".drawer-bg").toggleClass("is-open");
  $(".drawer__nav").toggleClass("is-open");
});

jQuery(".drawer__nav-link").on("click", function () {
  //ドロワーのリンク　クリックで閉じる
  $(".drawer-icon").removeClass("is-open");
  $(".drawer-bg").removeClass("is-open");
  $(".drawer__nav").removeClass("is-open");
});

//  swiper スライダー
const swiper = new Swiper(".swiper", {
  //スライダーを包む要素のクラス名を入れてください
  loop: true, //繰り返しをする
  //loopedSlides: 2, //開始、終了時のスライド枚数　loopとslidePerViewを併用する時必要?
  slidesPerView: "auto",
  //centeredSlides: true, //アクティブなスライドを中央に表示
  spaceBetween: "40", //スライド間の距離
  speed: 3000, //スライドの推移時間を600msに
  //effect: "fade",
  spaceBetween: "20",
  breakpoints: {
    1200: {
      spaceBetween: "40",
    },
  },

  autoplay: {
    //自動再生
    delay: 3000, //スライドが切り替わるまでの時間
    disableOnInteraction: false, //ユーザーが操作しても自動再生を止めない
    waitForTransition: false, //最初のスライドの表示時間を揃える
  },

  pagination: {
    //ドット
    el: ".swiper-pagination", //ページ操作するのに必須
    type: "bullets", //スライドと同じドットの数
    clickable: true, //クリックでのスライド切り替えを可能にする
  },
});

//アコーディオン
//最初と２番目開いておく
jQuery(".js-accordion-list:first-of-type .qa__accordion-a").css(
  "display",
  "block"
);
jQuery(".js-accordion-list:first-of-type .qa__accordion-q").addClass("is-open");
jQuery(".js-accordion-list:nth-child(2) .qa__accordion-a").css(
  "display",
  "block"
);
jQuery(".js-accordion-list:nth-child(2) .qa__accordion-q").addClass("is-open");
//アコーディオンクリックイベント
jQuery(".js-accordion").on("click", function () {
  $(this).toggleClass("is-open");
  $(this).next().slideToggle();
  /*クリックしたjs-accordion-title以外のopenクラスを削除*/
  $(".js-accordion").not(this).removeClass("is-open");
  /*クリックしたjs-accordion-title以外の要素を閉じる*/
  $(".js-accordion").not(this).next().slideUp();
});

//form 全て入力でボタンのレイアウト変更
const $submitBtn = $("#js-submit");
$("#js-form input,#form textarea").on("change", function () {
  if (
    $('#js-form input[type="text"]').val() !== "" &&
    //$('#js-form input[type="email"]').val() !== "" &&　　//email必須の時
    $('#js-form input[type="checkbox"]').val() !== "" &&
    //$('#form textarea[type="text"]').val() !== "" &&　　//text必須の時
    $("#js-form .js-privacy-checked").prop("checked") === true
  ) {
    $submitBtn.addClass("is-enabled");
  } else {
    $submitBtn.removeClass("is-enabled");
  }
});

//スムーススクロール jQuery
// #から始まるURLがクリックされた時
jQuery('a[href^="#"]').click(function () {
  // .headerクラスがついた要素の高さを取得
  let header = jQuery(".header").innerHeight();
  // 移動速度を指定（ミリ秒）
  let speed = 300;
  // hrefで指定されたidを取得
  let id = jQuery(this).attr("href");
  //パターン①三項演算子を使用した例
  // idの値が#のみだったらターゲットをhtmlタグにしてトップへ戻るようにする
  let target = jQuery("#" == id ? "html" : id);
  // ページのトップを基準にターゲットの位置を取得
  let position = jQuery(target).offset().top - header;

  // ターゲットの位置までspeedの速度で移動
  jQuery("html, body").animate(
    {
      scrollTop: position,
    },
    speed
  );
  return false;
});

// ふわっと表示jq
jQuery(window).scroll(function () {
  //windowがスクロールされたら以下の処理を実行
  jQuery(".js-fadeIn").each(function () {
    //.each()で、「.item」が付いた要素1つずつに順番に処理を行う
    var position = jQuery(this).offset().top; //.offset().topで、ページの最上部から「.item」が付いた要素までの距離を取得して、変数positionに代入
    var scroll = jQuery(window).scrollTop(); //.scrollTop()で、スクロールした量を取得して、変数scrollに代入
    var windowHeight = jQuery(window).height(); //height()で、ウィンドウの高さを取得して、変数windowHeightに代入
    if (scroll > position - windowHeight + 100) {
      //スクロール量が、「ページ最上部から要素までの距離」-「ウィンドウの高さ」を超えた時、つまりスクロール量が要素の位置を過ぎた瞬間、「.item」が付いた要素にis-showクラスが付きます
      $(this).addClass("is-show");
    }
  });
});

//スクロールしたらトップへ戻るをふわっと表示 jQuery
jQuery(window).on("scroll", function () {
  // トップから100px以上スクロールしたら
  if (100 < jQuery(this).scrollTop()) {
    // is-showクラスをつける
    jQuery(".to-top").addClass("is-show");
  } else {
    // 100pxを下回ったらis-showクラスを削除
    jQuery(".to-top").removeClass("is-show");
  }
});

//header スクロール量に合わせて動かす
//ブレイクポイント！リサイズにも対応したい場合はこの書き方だめ✖️
if (window.matchMedia("(min-width: 768px)").matches) {
  //画面横幅が768px以上のときの処理

  let pos = 0;
  $(window).on("scroll", function () {
    const $header = $("header");
    const $jsHeader = $(".js-header");
    const headerHeight = $header.outerHeight();
    const currentPos = $(this).scrollTop(); // スクロール量

    // スクロール量がヘッダーの高さより大きい場合
    if (currentPos > headerHeight) {
      // headerを固定
      $header.addClass("is-fixed");
      //$jsHeader.css("margin-top", headerHeight);
    } else {
      // それ以外は固定を解除
      $header.removeClass("is-fixed");
      //$jsHeader.css("margin-top", 0);
    }

    // 上スクロール時
    if (currentPos < pos) {
      // header引っ込める
      $header.css("top", 0);
    } else {
      //下スクロール時はheader出す
      $header.css("top", -headerHeight);
    }
    pos = currentPos;

    // スクロール量がトップから200px以下の時
    if (200 > jQuery(this).scrollTop()) {
      // headerを固定
      $header.addClass("is-fixed");
      // $jsHeader.css("margin-top", headerHeight);
    }
  });
}
