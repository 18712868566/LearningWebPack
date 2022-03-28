import '../css/style.css'
import '../bower_components/swiper/dist/css/swiper.css'


import $ from 'jquery'
import Swiper from 'swiper'
import { dialog } from './common'

import './TweenMax.min'

import { Projet_Global_Parameter } from './webmainAxios.min'


$(function () {
    $(document).on("click", "#alertInfo .close,.pop-plan-nothing .btn_nothing,.pop-get-reward .btn_bottom,.pop-grayraven-reward .btn_bottom,.pop-error .btn_nothing,.pop-victory .btn_nothing,.pop-plan-b .btn_play", dialog.closeDiv);

    let oNowTopss = $(`.route .route-v2`).position().top;

    console.log(oNowTopss);
    var t2 = new TimelineMax({ repeat: -1, yoyo: true });

    t2.fromTo($(`.route .route-v2`), 0.5, { top: oNowTopss }, { top: oNowTopss + 5 });

    var swp1 = new Swiper('#swp1', {
        initialSlide: 0,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        speed: 500,
        spaceBetween: 0,
        loop: true, //必须
        init: true,
        resizeObserver: true,
        pagination: {
            el: '.swp-pic .swiper-pagination',
            clickable: true,
        },
    });
    // 活动规则
    $(document).on('click', '.title-gz', function (event) {
        event.preventDefault();
        dialog.alertPop_gz();
    });

    // 记录
    $(document).on('click', '.botbar-logs,.pop-get-reward .btn_jiaohuan', function (event) {
        event.preventDefault();
        // 获取登录状态
        sess_isLogin = sessionStorage.getItem('sess-isLogin');
        if (JSON.parse(sess_isLogin)) {
            // 调取奖励记录 - 奖励背包
            Projet_Global_Parameter.getDrawLog();
        } else {
            // layer.msg('请先登录');
            dialog.alertPopLogin();
        }
    })

    // 分享
    $('.botbar-share').on('click', function () {
        // 获取登录状态
        sess_isLogin = sessionStorage.getItem('sess-isLogin');
        if (JSON.parse(sess_isLogin)) {
            // layer.msg('fb分享');
            Projet_Global_Parameter.fbShare();
        } else {
            // layer.msg('请先登录');
            dialog.alertPopLogin();
        }
    });

    // 曲前进
    $('.botbar-go').on('click', function () {
        // 获取登录状态
        sess_isLogin = sessionStorage.getItem('sess-isLogin');
        if (JSON.parse(sess_isLogin)) {
            // 调用前进
            Projet_Global_Parameter.move();
        } else {
            // layer.msg('请先登录');
            dialog.alertPopLogin();
        }
    });

    // 答题
    $($(document).on('click', '.pop-plan-lott .options', function (event) {
        event.preventDefault();

        let id = $(this).attr('data-id');
        let option = $(this).attr('data-option');

        Projet_Global_Parameter.answer(id, option);
    }));


    // 中奖兑换码 -- 复制
    $(document).on('click', '.dl_lists .copyele', function (event) {
        event.preventDefault();
        var $getId = $(this).siblings('dd').find('span').attr('id');
        // console.log($getId);
        Projet_Global_Parameter.tapCopy($getId);
        layer.msg('교환코드 복사 성공, 게임에서 교환하세요.');
        // layer.msg('複製成功！趕快打開遊戲兌換獎勵吧！');
    });

    // 剧情1 守林人营地 -- 弹出获得奖励
    $(document).on('click', '.pop-plan-c .btn_get_code', function (event) {
        event.preventDefault();
        // 获得奖励
        dialog.alertPop_get_reward('../images/pop/lott-ys-jq1.png', '../images/pop/lott-wq-jq1.png', '4성 의식 강화 재료×3', '4성 무기 강화 재료×3');
    })

    // 剧情2 遗留物资 -- 弹出获得奖励
    $(document).on('click', '.pop-plan-d .btn_plan_d', function (event) {
        event.preventDefault();
        // 获得奖励
        dialog.alertPop_get_reward('../images/pop/lott-wz-jq1.png', '../images/pop/lott-wz-jq2.png', '너트×30000', '스킬 포인트×5');
    })

    // 剧情3 空中花园补给箱 -- 弹出获得奖励
    $(document).on('click', '.pop-plan-e .btn_plan_e', function (event) {
        event.preventDefault();
        // 获得奖励
        dialog.alertPop_get_reward_one('../images/pop/lott-kz-jq1.png', '기본 캐릭터 연구권×200');
    })

    // 剧情4 灰鸦小队支援
    $(document).on('click', '.pop-gyr-team .options', function (event) {
        event.preventDefault();
        // 发起支援请求
        let pid = $(this).attr('data-pid');
        Projet_Global_Parameter.choosePartner(pid);
    })

    // 剧情5 遗留物资
    $(document).on('click', '.pop-plan-f .btn_plan_f', function (event) {
        event.preventDefault();
        // 获得奖励
        dialog.alertPop_get_reward('../images/pop/lott-ls-jq1.png', '../images/pop/lott-jy-jq1.png', '너트×50000', '경험치 캡슐(대)×3');
    })

    // 终点
    $(document).on('click', '.pop-over .btn_plan_over', function (event) {
        event.preventDefault();
        // 获得奖励
        sess_partnerId = JSON.parse(sessionStorage.getItem('sess-partner-id'));

        if (sess_partnerId == 1) {
            dialog.alertPop_get_reward_one('../images/pop/plan-lxy.png', '루시아・여명 역원 조각×3');
        }
        if (sess_partnerId == 2) {
            dialog.alertPop_get_reward_one('../images/pop/plan-lm.png', '리브・유광 역원 조각×3');
        }
        if (sess_partnerId == 3) {
            dialog.alertPop_get_reward_one('../images/pop/plan-li.png', '리・이화 역원 조각×3');
        }
    });


    // 打开游戏
    $(document).on('click', '.pop-plan-mylott .btn_plan', function (event) {
        event.preventDefault();
        if ((/iphone|android|mobile/i.test(navigator.userAgent.toLowerCase()))) {
            let aLink = document.createElement('a');
            let evt = document.createEvent("HTMLEvents");
            evt.initEvent("click", true, true);
            aLink.setAttribute("target", "_blank");
            aLink.href = 'https://punishingkr.onelink.me/D8Wq/lostchapter';
            aLink.click();
        } else {
            layer.msg('게임을 실행해주세요.');
        }
    })

});

// 滚动时添加
$(window).scroll(function () {
    var scrollT = $(window).scrollTop()
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
    var doc = document,
        win = window,
        docEl = doc.documentElement,
        remStyle = document.createElement("style"),
        tid;

    function refreshRem() {
        var width = docEl.getBoundingClientRect().width;
        maxWidth = maxWidth || 750;
        width > maxWidth && (width = maxWidth);
        var rem = width * 100 / designWidth;
        remStyle.innerHTML = 'html{font-size:' + rem + 'px;}';
    }

    if (docEl.firstElementChild) {
        docEl.firstElementChild.appendChild(remStyle);
    } else {
        var wrap = doc.createElement("div");
        wrap.appendChild(remStyle);
        doc.write(wrap.innerHTML);
        wrap = null;
    }
    //要等 wiewport 设置好后才能执行 refreshRem，不然 refreshRem 会执行2次；
    refreshRem();

    win.addEventListener("resize", function () {
        clearTimeout(tid); //防止执行两次
        tid = setTimeout(refreshRem, 300);
    }, false);

    win.addEventListener("pageshow", function (e) {
        if (e.persisted) { // 浏览器后退的时候重新计算
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 300);
        }
    }, false);

    if (doc.readyState === "complete") {
        doc.body.style.fontSize = "16px";
    } else {
        doc.addEventListener("DOMContentLoaded", function (e) {
            doc.body.style.fontSize = "16px";
        }, false);
    }
})(750, 750);