/* wlo:Cflower */

import $ from 'jquery';

// import './jquery.mCustomScrollbar.concat.min'

import planAPic from '../images/pop/plan-a-pic.png'
import planBPic from '../images/pop/plan-b-pic.png'
import planLottPic from '../images/pop/plan-lott-pic.png'
import planVictory from '../images/pop/plan-victory.png'
import planError from '../images/pop/plan-error.png'
import planCPic from '../images/pop/plan-c-pic.png'
import planNothingPic from '../images/pop/plan-nothing-pic.png'
import planWz2Pic from '../images/pop/plan-wz2-pic.png'
import planEPic from '../images/pop/plan-e-pic.png'
import planWz3Pic from '../images/pop/plan-wz3-pic.png'
import grayravenTeam from '../images/pop/grayraven-team.png'
import planHelpPic from '../images/pop/plan-help-pic.png'
import planOverPic from '../images/pop/plan-over-pic.png'

import titleReward from '../images/pop/title-reward.png'

let dialog;
if (!dialog) dialog = {};
dialog = {
    // 关闭  document.location.reload()
    closeDiv() {
        $('body').css('position', 'relative');
        $('#alertInfo').stop(true, true).animate({
            top: '-100%',
            opacity: '0',
        }, 'fast', () => {
            $('#maskLayer,#alertInfo').remove().hide();
        });
    },
    //
    maskLayer() {
        $('#maskLayer,#alertInfo').remove();
        const maskLayer = "<div id='maskLayer'></div>";
        const alertInfo = "<div id='alertInfo'><span class='close'>关闭</span></div>";
        $('body').append(maskLayer, alertInfo);
        $('.wrap').addClass('row');
        $('#maskLayer').height('100%').show();
    },
    // 显示提示信息框
    showInfo(alertHtml) {
        dialog.maskLayer();
        // $("body").css({'position':'fixed','width':'100%'});
        const _winH = $(window).height(); // ﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┐
        const _scrollTop = $(document).scrollTop(); //　　　　　　　　　　　      ├→
        $('#alertInfo').append(alertHtml).show(); // ﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣﹣┘
        const _thisDomWidth = $('#alertInfo').outerWidth();
        const _thisDomHeight = $('#alertInfo').outerHeight();
        let topD = parseInt(_scrollTop + (_winH - _thisDomHeight) / 2);
        const mL = parseInt(_thisDomWidth / 2);
        if (_thisDomHeight >= _winH) {
            topD = _scrollTop;
            if (_scrollTop + _thisDomHeight >= $(document).height()) {
                topD = $(document).height() - _thisDomHeight;
            }
            $('#alertInfo').css('position', 'absolute');
        } else {
            topD = (_winH - _thisDomHeight) / 2;
            $('#alertInfo').css('position', 'fixed');
        }
        $('#alertInfo').css({
            'margin-left': `-${mL}px`,
        }).stop(true, true).animate({
            top: `${topD}px`,
            'margin-left': `-${mL}px`,
            opacity: '1',
        }, 'fast');
    },
    // 改变窗口大小时改变弹出层的位置
    alertInfoPo() {
        const _winHResize = $(window).height();
        let _scrollTopResize = $(document).scrollTop();
        const _thisDomWidthResize = $('#alertInfo').outerWidth();
        const _thisDomHeightResize = $('#alertInfo').outerHeight();
        let topResize = parseInt(_scrollTopResize + (_winHResize - _thisDomHeightResize) / 2);
        if (topResize >= $('body').height() - _thisDomHeightResize) {
            _scrollTopResize = $('body').height() - _thisDomHeightResize;
            topResize = _scrollTopResize - (_winHResize - _thisDomHeightResize) / 2;
        }
        if (_thisDomHeightResize >= _winHResize) {
            topResize = _scrollTopResize;
            if (_scrollTopResize + _thisDomHeightResize >= $(document).height()) {
                topResize = $(document).height() - _thisDomHeightResize;
            }
            $('#alertInfo').css('position', 'absolute');
        } else {
            topResize = (_winHResize - _thisDomHeightResize) / 2;
            $('#alertInfo').css('position', 'fixed');
        }
        $('html,body').stop(true, true).animate({
            scrollTop: _scrollTopResize,
        });
        $('#alertInfo').stop(true, true).animate({
            top: `${topResize}px`,
            'margin-left': `-${_thisDomWidthResize / 2}px`,
        });
        $('#maskLayer').height($('body').height());
    },
    // 视频弹窗
    alertVideo(videoUrl) {
        const sendUrl = videoUrl;

        dialog.showInfo(
            '<div class=\'pop_warp  popytbVideo\'>'
            + '<div class=\'before \'>'
            // +"<embed src='"+videoUrl+"' type='application/x-shockwave-flash' allowscriptaccess='always' allowfullscreen='true' wmode='opaque'>"
            // + "<iframe border='0' marginwidth='0' framespacing='0' marginheight='0' src='https://www.youtube.com/embed/" + sendUrl + "' frameborder='0' noresize='scrolling='no' width='100%' height='100%' vspale='0' id='iframe' name='iframe' allowfullscreen></iframe>" +
            + `<video src="${sendUrl}" muted loop autoplay="autoplay" playsinline="" webkit-playsinline="" x5-playsinline="" controls="controls"></video>`
            + '</div>'
            + '</div>',
        );
    },
    // 图片弹窗
    alertImages(imgUrl) {
        dialog.showInfo(
            "<div class='pop_warp pop_warp_img popVideo' id='custom_scrollbar'>"
            + "<div class='before '>"
            + `<img class="imgcove" src="${imgUrl}" alt="">`
            + '</div>'
            + '</div>',
        );
    },
    // UID登录
    alertUidLogin() {
        const uidHtml = `
            <a href="https://grayraven.onelink.me/gj4i/eden" class="btn btn_down_link" target="_blank"> https://grayraven.onelink.me/gj4i/eden </a>
            <a href="https://pgrjpdeeplink.onelink.me/hQpR/6d9356f1" target="_blank" class="btn btn_gogame"></a> `;

        dialog.showInfo(`<div class="pop pop_uid_login">
            <div class="borbox">
                ${uidHtml}
            </div>
        </div>`);
    },
    // 登陆
    alertPopLogin() {
        const LoginHtml = `
            <a href="https://grayraven.kr/firn-night/auth.html?authclient=facebook" target="_blank" class="btn btn_fb_login"></a>
        `;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop_login">
                <p>로그인 후 이벤트 참여 가능</p>
                ${LoginHtml}
            </div>
        </div>`);
    },
    // pop1
    alertPop_a() {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove" src="${planAPic}" alt="">
            <p>어느날, 곡은 한 통의 비밀서신을 받았습니다. 서신에는 어딘가에 신비한 고서가 숨겨져 있으며, 고서 중에는 구룡 고도에 들어가 유적을 복원하는 방법이 적혀 있을 수도 있다는 내용이 적혀져 있었습니다.</p>
            <p>[나는 연합공동체의 주인이자 구룡의 정신이다. 구룡은 구룡의 방식으로 미래를 결정한다. 구룡 고도 유적으로 들어가는 방법은 외부에 알려져서는 안 된다.]</p>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-plan-a">
                ${_html}
                <a href="javascript:;" class="btn btn_play"></a>
            </div>
        </div>`);
    },
    // pop2
    alertPop_b() {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove" src="${planBPic}" alt="">
            <p>곡은 지상의 침식체들을 공격하며, <br/> 거침없이 앞으로 나아갔습니다. </p>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-plan-b">
                ${_html}
                <a href="javascript:;" class="btn btn_play"></a>
            </div>
        </div>`);
    },
    // 答题
    alertPop_lott(msg, option1, option2, option3, id) {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove" src="${planLottPic}" alt="">
            <p>${msg}</p>

            <div class="options plana" data-id="${id}" data-option='a'>${option1}</div>
            <div class="options planb" data-id="${id}" data-option='b'>${option2}</div>
            <div class="options planc" data-id="${id}" data-option='c'>${option3}</div>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-plan-lott">
                ${_html}
                <a href="javascript:;" class="btn lott-tips-msg">정답 시 전진 1회 GET!</a>
            </div>
        </div>`);
    },
    // 答题正确
    alertPop_lott_victory() {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove" src="${planVictory}" alt="">
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-victory">
                ${_html}
                <a href="javascript:;" class="btn btn_nothing"></a>
            </div>
        </div>`);
    },
    // 答题错误
    alertPop_lott_error() {
        const _html = `<div class="plan-cen gray"> 
            <img class="imgcove" src="${planError}" alt="">
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg ">
            <div class="borbox pop-error">
                ${_html}
                <a href="javascript:;" class="btn btn_nothing"></a>
            </div>
        </div>`);
    },
    // pop3
    alertPop_c() {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove" src="${planCPic}" alt="">
            <p>정자에 도착한 곡은 휴식을 <br/> 취한 뒤 걸음을 옮겼습니다.</p>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-plan-c">
                ${_html}
                <a href="javascript:;" class="btn btn_get_code"></a>
            </div>
        </div>`);
    },
    // pop4 - 无事发生
    alertPop_nothing(msg = '앞으로 전진!', url = `${planNothingPic}`) {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove" src="${url}" alt="">
            <p>${msg}</p>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-plan-nothing">
                ${_html}
                <a href="javascript:;" class="btn btn_nothing"></a>
            </div>
        </div>`);
    },
    // pop5 - 遗留物资 第八步
    alertPop_d(img = `${planWz2Pic}`) {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove" src="${img}" alt="">
            <p>버려진 지역에서 누군가 두고 <br/> 간 물자를 발견했습니다.</p>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-plan-d">
                ${_html}
                <a href="javascript:;" class="btn btn_plan_d"></a>
            </div>
        </div>`);
    },
    // pop6 - 空中花园补给箱
    alertPop_e() {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove" src="${planEPic}" alt="">
            <p>공중정원이 두고 간 보급상자를 <br/> 발견했습니다.</p>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-plan-e">
                ${_html}
                <a href="javascript:;" class="btn btn_plan_e"></a>
            </div>
        </div>`);
    },
    // pop5.5 - 遗留物资 第十八步
    alertPop_f(img = `${planWz3Pic}`) {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove" src="${img}" alt="">
            <p>버려진 지역에서 누군가 두고 <br/> 간 물자를 발견했습니다.</p>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-plan-f">
                ${_html}
                <a href="javascript:;" class="btn btn_plan_f"></a>
            </div>
        </div>`);
    },
    // pop7 - 灰鸦小队支援
    alertPop_grayravenTeam(option1, option2, option3) {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove" src="${grayravenTeam}" alt="">
            <p>임무 수행 중 그레이 레이븐 소대를 만났습니다.소대원 중 한 명을 곡에게 지원 보낼 수 있습니다.
누구를 보내시겠습니까?</p>

            <div class="options plana" data-pid='1'>${option1}</div>
            <div class="options planb" data-pid='2'>${option2}</div>
            <div class="options planc" data-pid='3'>${option3}</div>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-gyr-team">
                ${_html}
            </div>
        </div>`);
    },
    // pop8 - 救出伊凡
    alertPop_help() {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove" src="${planHelpPic}" alt="">
            <p>곡은 어느 동굴에서 고서를 발견했습니다.</p>
            <p>다행히 고서에는 구룡 고도와 관련된 내용만 기록돼 있을 뿐 구룡 고도 <br/> 안에 들어가는 방법은 기록돼 있지 않았습니다.</p>
            <p>안도의 한숨을 쉰 곡은 이 고서 역시 소장할 만한 가치가 있다고 생각해 고서를 품에 넣고, <br/>구룡 쪽으로 발걸음을 돌렸습니다.            </p>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-help">
                ${_html}
                <a href="javascript:;" class="btn btn_plan_help"></a>
            </div>
        </div>`);
    },
    // pop9 over
    alertPop_over() {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove" src="${planOverPic}" alt="">
            <p>이번 위기는 잘 넘어갔지만, 연합 공동체의 주인이자 구룡의 
            정신으로써 앞으로의 전투를 준비해야 합니다.</p>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-over">
                ${_html}
                <a href="javascript:;" class="btn btn_plan_over">获得</a>
            </div>
        </div>`);
    },
    // 获得奖励
    alertPop_get_reward(img1, img2, txt1, txt2) {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove title-reward" src="${titleReward}" alt="">
            
            <div class="reward-lott">
                <dl class="lottpic-icon">
                    <dt><img class="imgcove lott-pic" src="${img1}" alt=""></dt>
                    <dd>${txt1}</dd>
                </dl>
                <dl class="lottpic-icon">
                    <dt><img class="imgcove lott-pic" src="${img2}" alt=""></dt>
                    <dd>${txt2}</dd>
                </dl>
            </div>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg pop-global-bg2">
            <div class="borbox pop-get-reward">
                ${_html}

                <div class="reward-btns">
                    <a href="javascript:;" class="btn btn_jiaohuan">交换</a>
                    <a href="javascript:;" class="btn btn_bottom">下一个</a>
                </div>
            </div>
        </div>`);
    },
    // 获得奖励2 - 只有一个奖励时
    alertPop_get_reward_one(img, txt) {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove title-reward" src="${titleReward}" alt="">
            
            <div class="reward-lott">
                <dl class="lottpic-icon">
                    <dt><img class="imgcove lott-pic" src="${img}" alt=""></dt>
                    <dd>${txt}</dd>
                </dl>
            </div>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg pop-global-bg2">
            <div class="borbox pop-get-reward">
                ${_html}

                <div class="reward-btns">
                    <a href="javascript:;" class="btn btn_jiaohuan">交换</a>
                    <a href="javascript:;" class="btn btn_bottom">下一个</a>
                </div>
            </div>
        </div>`);
    },
    // 灰鸦小队支援-成功
    alertPop_grayraven_reward(img, txt) {
        const _html = `<div class="plan-cen"> 
            <img class="imgcove lott-pic" src="${img}" alt="">
            <p> ${txt}</p>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-grayraven-reward">
                ${_html}
                <a href="javascript:;" class="btn btn_bottom">获得</a>
            </div>
        </div>`);
    },
    // 活动规则
    alertPop_gz() {
        const _html = `<div class="plan-cen"> 

            <p>이벤트 기간:X월XX일~X월XX일 23：59</p>
            <br/>
            <p>1. 페이지 하단의 [전진] 버튼을 눌러 SNS 로그인 진행 시, 매일 전진 횟수 3회를 획득할 수 있습니다. 우측 하단의 [공유] 버튼을 통해 SNS에 공유하면 전진 횟수를 1회 추가 획득할 수 있습니다. (1일 1회)</p>
            <br/>

            <p>2. 곡이 한 번 전진할 때 마다 전진 횟수는 1회씩 차감되며, 전진 횟수는 매일 00:00에 리셋됩니다.</p>
            <br/>

            <p>3. 특정 구간에 도달하면 미니 퀴즈가 나타나며, 정답을 맞히면 전진 기회가 1회 추가됩니다.</p>
            <br/>

            <p>4. 또 다른 특정 구간에서는 보급품(보상)을 획득할 수 있습니다. 획득 기록과 교환코드는 페이지 좌측 하단의 [보급 기록]을 통해서 확인할 수 있습니다. 교환코드는 게임 내에서 등록해 사용할 수 있습니다.</p>
            <br/>

            <p>※교환코드의 유효기간은 XX년 XX월 XX일까지이오니, 참고 바랍니다.</p>
            <p>※교환코드는 1회만 사용 가능합니다. 사용한 교환코드는 다시 사용할 수 없습니다.</p>
            <br/>

            <p>보급품(보상) 미리보기:</p>
            <p>너트, 구조체 경험치 캡슐(대), 스킬 포인트, 4성 의식 강화 재료, 4성 무기 강화 재료, 기본 캐릭터 연구권, A급 구조체 역원 조각</p>
            <br/>

            <p>주의사항</p>
            <br/>
            <p>1. 본 이벤트 중에는 매일 0:00에 전진 횟수가 리셋되며, 미사용 전진 횟수는 사용할 수 없게 되니 참고 바랍니다.</p>
            <br/>
            <p>2. 본 이벤트는 X월 XX일 XX:XX에 종료됩니다. 이벤트 종료 후에는 전진 횟수가 남아 있어도 진행이 불가합니다.</p>
            <br/>
            <p>3. 본 이벤트에서 획득한 보상은 수령자 본인에게 귀속되며, 가족 또는 친구 등 제3자에게 양도, 판매, 교환이 불가합니다. 만일 수령자와 제3자 간에 관련 분쟁이 발생했을 경우, HK HERO ENTERTAINMENT CO., LIMITED(이하 당사)는 어떠한 책임을 지지 않습니다.</p>
            <br/>
            <p>4. 당사는 필요하다고 판단했을 경우, 본 이벤트의 운영방침(설명)을 자유롭게 변경할 수 있으며, 원활한 운용을 위해 필요한 대응을 취할 수 있습니다. </p>
            <br/>
            <p>5. 본 이벤트의 참여자는 본 이벤트의 운영방침을 준수하며, 운영방침에 어떠한 의의를 제기하지 않습니다.</p>
            <br/>
            <p>6. 본 이벤트의 대한 문의는 cs@grayraven.kr를 통해 하실 수 있습니다.</p>
            <br/>
            <p>7. 참여자의 정보관리에 대한 내용은 "개인정보처리방침"를 확인하시기 바랍니다.</p>
        </div>`;

        dialog.showInfo(`<div class="pop pop-global-bg">
            <div class="borbox pop-hdgz">
                ${_html}
            </div>
        </div>`);

        // $(".pop-hdgz .plan-cen").mCustomScrollbar();
    },
    // 我的背包
    alertPop_mylott(data) {
        // let _html = `<div class="plan-cen">
        //     <dl class='dl_lists'>
        //         <dd> <b class="cms-lott-icon"></b> <span class="code" id='dum1'>XDF3FXCV</span> </dd>
        //         <i class='copyele'>COPY</i>
        //     </dl>
        // </div>`;

        let _htmlInner = '';
        let lottImg = '';
        for (let i = 0; i < data.length; i++) {
            const element = data[i];

            if (data[i].current_serial == 4) {
                lottImg = `<img class="n1" src="//cdnstatic.herogame.com/static/grayraven_kr/firnnight/images/pop/lott-ys-jq1.png" alt="">
                <img class="n2" src="//cdnstatic.herogame.com/static/grayraven_kr/firnnight/images/pop/lott-wq-jq1.png" alt="">
                `;
            }

            if (data[i].current_serial == 8) {
                lottImg = `<img class="n1" src="//cdnstatic.herogame.com/static/grayraven_kr/firnnight/images/pop/lott-wz-jq1.png" alt="">
                <img class="n2" src="//cdnstatic.herogame.com/static/grayraven_kr/firnnight/images/pop/lott-wz-jq2.png" alt="">
                `;
            }

            if (data[i].current_serial == 12) {
                lottImg = `<img class="n3" src="//cdnstatic.herogame.com/static/grayraven_kr/firnnight/images/pop/lott-kz-jq1.png" alt="">`;
            }

            if (data[i].current_serial == 18) {
                lottImg = `<img class="n1" src="//cdnstatic.herogame.com/static/grayraven_kr/firnnight/images/pop/lott-ls-jq1.png" alt="">
                <img class="n2" src="//cdnstatic.herogame.com/static/grayraven_kr/firnnight/images/pop/lott-jy-jq1.png" alt="">
                `;
            }

            if (data[i].current_serial == 25) {
                sess_partner_id = JSON.parse(sessionStorage.getItem('sess-partner-id'));

                if (sess_partner_id == 1) {
                    lottImg = `<img class="n3" src="//cdnstatic.herogame.com/static/grayraven_kr/firnnight/images/pop/plan-lxy.png" alt="">`;
                }
                if (sess_partner_id == 2) {
                    lottImg = `<img class="n3" src="//cdnstatic.herogame.com/static/grayraven_kr/firnnight/images/pop/plan-lm.png" alt="">`;
                }
                if (sess_partner_id == 3) {
                    lottImg = `<img class="n3" src="//cdnstatic.herogame.com/static/grayraven_kr/firnnight/images/pop/plan-li.png" alt="">`;
                }
            }

            _htmlInner += ` 
            <dl class='dl_lists'>
                <dd> <b class="cms-lott-icon">${lottImg}</b> <span class="code" id='dum${i + 1}'>${data[i].gift_code}</span> </dd>
                <i class='copyele'>COPY</i>
            </dl>
        `;
        }

        let _html = `<div class="plan-cen">${_htmlInner}</div>`;


        dialog.showInfo(`<div class="pop pop-global-bg pop-global-bg-mylott">
            <div class="borbox pop-plan-mylott">
                ${_html}
                <dl class="tipmsg">
                    <dt>[교환방법]</dt>
                    <dd>① 복사 버튼을 터치해 상기 교환코드를 복사한 후, 게임을 실행하세요.</dd>
                    <dd>② 게임 메인화면 좌측 지휘관 ID를 터치하세요.</dd>
                    <dd>③ 지휘관 화면 우측 하단에 위치한 교환코드 란에 입력하세요.</dd>
                </dl>
                <a href="javascript:;" class="btn btn_plan"></a>
            </div>
        </div>`);

        // $(".pop-plan-mylott .plan-cen").mCustomScrollbar();
    },

};

export { dialog };

// 默认开始  1
// dialog.alertPop_a();

// 2 - 答题  A
// dialog.alertPop_lott('퍼니싱 침식에 대응할 수 있으며, 구조체와 지휘관이 사고 신호를 주고 받을 수 있는 것은 무엇인가?', '역원장치', '의식의 바다', '異重이중합 코어合コア');

// 第三步
// dialog.alertPop_b();

// 4  守林人营地
// dialog.alertPop_c();

// 5 无事发生
// dialog.alertPop_nothing();

// 6 答题 B
// dialog.alertPop_lott('곡의 기체명은?', '광견', '작령', '리고르');

// 7 无事发生
// dialog.alertPop_nothing();

// 8 遗留物资
// dialog.alertPop_d();

// 9 无事发生
// dialog.alertPop_nothing();

// 10 无事发生
// dialog.alertPop_nothing();

// 11 无事发生 C
// dialog.alertPop_lott('세리카의 별명은?', '천사', '공중정원의 노예', '공중정원의 패왕');

// 12 空中花园补给箱
// dialog.alertPop_e();

// 13 无事发生
// dialog.alertPop_nothing();

// 14 无事发生 B
// dialog.alertPop_lott('극야회귀 로제타 외전에서 어린 로제타와 처음 만난 소녀의 이름은?', '테미아', '리하', '푸브');

// 15 无事发生
// dialog.alertPop_nothing();

// 16 灰鸦小队支援
// dialog.alertPop_grayravenTeam('루시아(여명)', '리브(유광)', '리(이화)');

// 17 无事发生
// dialog.alertPop_nothing();

// 18 遗留物资
// dialog.alertPop_f();

// 19 无事发生
// dialog.alertPop_nothing();

// 20 答题 B
// dialog.alertPop_lott('[수격자]에 대한 설명 중 정확한 것은?', '중도 재난 구역만 가능', '공격력이 감소하지만, 저농도 구역도 가능', '어떤 제한없이 모든 구역 가능');

// 21 救出伊凡 help
// dialog.alertPop_help();

// 22 无事发生
// dialog.alertPop_nothing();

// 23 答题 C
// dialog.alertPop_lott('길드(지휘부)의 "도전"의 리셋 시간은?', '매주 월요일', '매주 목요일', '매주 목요일과 일요일');

// 24 无事发生
// dialog.alertPop_nothing();

// 25 摩尔曼斯克港
// dialog.alertPop_over();

// dialog.alertPop_lott_victory();
// dialog.alertPop_lott_error();

// 活动规则
// dialog.alertPop_gz();

// fb登录
// dialog.alertPopLogin();

// 获得奖励
// dialog.alertPop_get_reward();

// 灰鸦小队支援-成功
// dialog.alertPop_grayraven_reward();

// 我的奖励
// dialog.alertPop_mylott();
