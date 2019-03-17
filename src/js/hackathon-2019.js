// import '../css/base.scss'
import '../css/hackathon-2019.scss'

const $D = $(document)
const $W = $(window)
const $body = $('body')
const $scrollBar = $('.scroll-bar')
const $scrollSlider = $('.scroll-slider')
const $colTitle = $('.hack-col-title')
const $title = $('.cw-title')
const $lineTitle = $('.cw-line-title')
const $bannerBlack = $('.banner-black')
const $footerBlack = $('.footer-black')
const $bannerWrap = $('.banner-wrapper')
const $bannerCont = $('.banner-wrapper .container')
const $mapButton = $('.show-map-button')
const $mapDialog = $('#map-dialog')
const $closeBtn = $('.cw-dialog .icon-close')
const docH = $D.outerHeight(true)
const winH = $W.height()

let titlePos = []
let titleHeight = []
const setScrollReveal = () => {
  window.sr = ScrollReveal();

  sr.reveal('.section-content', {
    delay: 200,
    distance: '100px',
    duration: 500,
    easing: 'cubic-bezier(0.5, 0, 0, 1)',
    interval: 0,
    opacity: 0,
    origin: 'bottom',
    rotate: {
        x: 0,
        y: 0,
        z: 0,
    },
    scale: 1,
    cleanup: false,
    desktop: true,
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor: 0.4,
    viewOffset: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
    }
  })
}

const setTextLogoAnime = () => {
  anime({
    targets: 'path',
    strokeDashoffset: [anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 1000,
    delay: function(el, i) { return i * 250 },
    direction: 'alternate',
    loop: true
  })
}

const init = () => {
  if ($W.scrollTop() !== 0) {
    $bannerBlack.show()
    $footerBlack.removeClass('active').fadeOut()
    $colTitle.removeClass('turn-white')
    $scrollBar.removeClass('turn-white')
    $bannerCont.css('opacity', 1)
  }
  if ($W.scrollTop() == 0) {
    $colTitle.addClass('turn-white')
    $scrollBar.addClass('turn-white')
  }
  // setScrollReveal()
  setTextLogoAnime()

  $mapButton.on('click', () => {
    // console.log('click');
    $mapDialog.fadeIn()
  })
  $closeBtn.on('click', () => {
    $mapDialog.fadeOut()
  })
}

init()

$W.on('scroll', (e) => {
  let scrollT = $W.scrollTop()
  let scrollScale = (scrollT / (docH - winH)) * 100
  // console.log(scrollT);

  // 滚动距离在标题的±100范围内
  switch (true) {
    // 简介
    case (scrollT > (titlePos[0]-750) && scrollT <= (titlePos[0] + titleHeight[0])):
      setLineHeight(0, scrollT - (titlePos[0]-750))
      break
    // 嘉宾评委
    case (scrollT > (titlePos[1]-900) && scrollT <= (titlePos[1] + titleHeight[1])):
      // console.log('嘉宾评委', titlePos[1]);
      setLineHeight(1, scrollT - (titlePos[1]-900))
      break
    // 报名
    case (scrollT > (titlePos[2]-750) && scrollT <= (titlePos[2] + titleHeight[2])):
      // console.log('报名');
      setLineHeight(2, scrollT - (titlePos[2]-750))
      break
    // 赞助商
    case (scrollT > (titlePos[3]-750) && scrollT <= (titlePos[3] + titleHeight[3])):
      // console.log('赞助商');
      setLineHeight(3, scrollT - (titlePos[3]-750))
      break
    // 合作伙伴
    case (scrollT > (titlePos[4]-750) && scrollT <= (titlePos[4] + titleHeight[4])):
      // console.log('合作伙伴');
      setLineHeight(4, scrollT - (titlePos[3]-750))
      break
    // 媒体社区
    case (scrollT > (titlePos[5]-750) && scrollT <= (titlePos[5] + titleHeight[5])):
      // console.log('媒体社区');
      setLineHeight(5, scrollT - (titlePos[5]-750))
      break
  }


  switch (true) {
    case (!$bannerWrap.hasClass('turn-white') && scrollT > (winH / 4) && scrollT < winH):
      // console.log('out banner');
      $bannerBlack.fadeOut()
      $footerBlack.removeClass('active').fadeOut()
      $bannerCont.css('opacity', 0)
      $colTitle.removeClass('turn-white')
      $scrollBar.removeClass('turn-white')
      break
    case (scrollT <= (winH / 4)):
      // console.log('in banner');
      $bannerBlack.fadeIn()
      $colTitle.addClass('turn-white')
      $scrollBar.addClass('turn-white')
      $bannerCont.css('opacity', 1)
      break
    case (scrollT > (docH - winH - 200)):
      // console.log('footer');
      $footerBlack.addClass('active').fadeIn()
      $colTitle.addClass('turn-white')
      $scrollBar.addClass('turn-white')
      break
    case ($footerBlack.hasClass('active') && scrollT < (docH - winH - 200) && scrollT > winH):
      // console.log('out footer');
      $footerBlack.removeClass('active').fadeOut()
      $colTitle.removeClass('turn-white')
      $scrollBar.removeClass('turn-white')
      $bannerBlack.fadeOut()
      break
    default:
      $bannerBlack.fadeOut()
      $footerBlack.removeClass('active').fadeOut()
      $colTitle.removeClass('turn-white')
      $scrollBar.removeClass('turn-white')
      break
  }


  $scrollSlider.css('height', `${100 - scrollScale}%`)
})

const setLineHeight = (index, dis) => {
  let height = 0
  dis =dis * 0.5
  height = 200 - dis > 0 ? 200 - dis : 0
  height = height > 200 ? 200 : height

  $($lineTitle[index]).find('.line-top').css('height', `${height}px`)
}

function isInViewPort (element) {
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
  const top = element.getBoundingClientRect() && element.getBoundingClientRect().top
  // console.log('top', top)
  return top  <= viewPortHeight + 100
}

let titleMap = $title.map((idx,ele) => {
  let $ele = $(ele)
  return $ele.text().trim()
})

$('.cw-line-title').map((idx,ele) => {
  let $ele = $(ele)
  titlePos.push($ele.offset().top)
  titleHeight.push($ele.outerHeight())
})

// console.log(titleMap);
// console.log(titlePos, titleHeight);
