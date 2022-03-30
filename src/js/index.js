import '../css/style.css';
import '../bower_components/swiper/dist/css/swiper.css';

import $ from 'jquery';
import Swiper from 'swiper';
import { dialog } from './common';

import { Projet_Global_Parameter } from './webmainAxios.min'

import './TweenMax.min';

$(() => {
    $(document).on('click', '#alertInfo .close,.pop-plan-nothing .btn_nothing,.pop-get-reward .btn_bottom,.pop-grayraven-reward .btn_bottom,.pop-error .btn_nothing,.pop-victory .btn_nothing,.pop-plan-b .btn_play', dialog.closeDiv);

    const oNowTopss = $('.route .route-v2').position().top;

    console.log(oNowTopss);
    const t2 = new TimelineMax({ repeat: -1, yoyo: true });

    t2.fromTo($('.route .route-v2'), 0.5, { top: oNowTopss }, { top: oNowTopss + 5 });

    const swp1 = new Swiper('#swp1', {
        initialSlide: 0,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 500,
        spaceBetween: 0,
        loop: true, // 必须
        init: true,
        resizeObserver: true,
        pagination: {
            el: '.swp-pic .swiper-pagination',
            clickable: true,
        },
    });
    // 活动规则
    $(document).on('click', '.title-gz', (event) => {
        event.preventDefault();
        dialog.alertPop_gz();
    });


    // dialog.alertPop_a();

    // dialog.alertPop_nothing();

});

// 滚动时添加
$(window).scroll(() => {
    let scrollT = $(window).scrollTop();
    scrollT = parseInt(scrollT);
    // console.log(scrollT)
    // 添加云 动画
    if (scrollT > 100) {
        $('.botbar').addClass('fixed');
    }
    if (scrollT < 100) {
        $('.botbar').removeClass('fixed');
    }
});

// rem
(function (designWidth, maxWidth) {
    const doc = document;
    const win = window;
    const docEl = doc.documentElement;
    const remStyle = document.createElement('style');
    let tid;

    function refreshRem() {
        let { width } = docEl.getBoundingClientRect();
        maxWidth = maxWidth || 750;
        width > maxWidth && (width = maxWidth);
        const rem = width * 100 / designWidth;
        remStyle.innerHTML = `html{font-size:${rem}px;}`;
    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        let wrap = doc.createElement('div');
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    // 要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();

    win.addEventListener('resize', () => {
        clearTimeout(tid); // 防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener('pageshow', (e) => {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === 'complete') {
        doc.body.style.fontSize = '16px';
    } else {
        doc.addEventListener('DOMContentLoaded', (e) => {
            doc.body.style.fontSize = '16px';
        }, false);
    }
}(750, 750));
