gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

ScrollSmoother.create({
  wrapper: "#smooth-wrapper",
  content: "#smooth-content",
  smooth: 4,            // Smoothness (higher is slower)
  effects: true,          // Enable data-speed & data-lag
});


let isShortHeight = window.screen.height < 1050;  // this is only tp make animation acccording to screen height but not requrired..
                                                  // you can remove or change this value according to your requrement
// console.log(window.screen.height);

// The headphone needs to land exactly on top of the empty "Audira Plus" slot in
// the Top Picks grid. That target position depends on real layout (fonts,
// section spacing, image sizes) rather than any fixed number, so instead of a
// hardcoded vh guess we measure the gap between the headphone's pristine
// resting position and the product image, once layout has settled.
//
// The baseline is captured immediately, before any GSAP tween has touched the
// element (position:absolute; top:2.2%, no transform yet) — that way the
// measurement can't be corrupted by the entrance fade/scale-in still being
// mid-flight, or by the user having already scrolled by the time fonts/images
// finish loading.
const headphoneBaselineTop = document.getElementById('headphone').getBoundingClientRect().top + window.scrollY;

function getHeadphoneLandingY() {
  const targetImg = document.querySelector('#section5 .product img');
  if (!targetImg) return isShortHeight ? '458.4vh' : '435.4vh';

  const targetTop = targetImg.getBoundingClientRect().top + window.scrollY;
  const deltaVh = (targetTop - headphoneBaselineTop) / window.innerHeight * 100;
  return `${deltaVh.toFixed(2)}vh`;
}

// Runs the callback once web fonts and the product images (which decide the
// exact height of the Top Picks grid) have finished loading, so the
// measurement above is based on final layout instead of a still-reflowing page.
function whenLandingSpotIsMeasurable(callback) {
  const targetImg = document.querySelector('#section5 .product img');
  const settle = () => document.fonts.ready.then(() => requestAnimationFrame(() => requestAnimationFrame(callback)));
  if (targetImg && !targetImg.complete) {
    targetImg.addEventListener('load', settle, { once: true });
  } else {
    settle();
  }
}

ScrollTrigger.matchMedia({
  "(min-width: 991px)": function () {

    gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section2',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
      y: '100vh',
      x: '18vw',
      width: '32vw',
      rotate: 90,
      ease: 'none',
      immediateRender: false
    });

    gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section3',
        start: 'top bottom',
        end: 'bottom bottom',
        scrub: true,
      },
      y: '255vh',
      x: '0',
      width: '30vw',
      rotate: 60,
      ease: 'none',
      immediateRender: false
    });

    gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section4',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
      y: '360vh',
      width: '38vw',
      rotate: 0,
      ease: 'none',
      immediateRender: false
    });

     gsap.to('#headphone', {
      scrollTrigger: {
        trigger: '#section5',
        start: 'top bottom',
        end: 'center bottom',
        scrub: true,
      },
      y: isShortHeight ? '370vh' : '355vh',

      ease: 'none',
      immediateRender: false
    });

    whenLandingSpotIsMeasurable(() => {
      gsap.to('#headphone', {
        scrollTrigger: {
          trigger: '#section5',
          start: 'top bottom',
          end: 'bottom bottom',
          scrub: true,
        },
        y: getHeadphoneLandingY(),
        width: '270px',
        ease: 'none',
        immediateRender: false
      });

      // If the visitor has already scrolled past this point by the time layout
      // settles, force GSAP to re-sync progress to the current scroll position
      // instead of waiting for the next scroll event.
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        ScrollTrigger.getAll().forEach((st) => st.update());
      });
    });

    // content animation

    gsap.from('#section2 .content-wrapper', {
      scrollTrigger: {
        trigger: '#section2',
        start: '-50% bottom',
        end: 'center center',
        scrub: true,
      },
      y: '140%',
      ease: 'power1.inOut',
    });

    gsap.from('#section3 .heading', {
      scrollTrigger: {
        trigger: '#section3',
        start: 'top bottom',
        end: 'center bottom',
        scrub: true,
      },
      y: '140%',
      ease: 'power1.inOut',
    });

    gsap.from('#section4 img', {
      scrollTrigger: {
        trigger: '#section4',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
      width: 0,
      opacity: 0,
      ease: 'power1.inOut',
    });

    gsap.from('#section6 .content-wrapper', {
      scrollTrigger: {
        trigger: '#section6',
        start: 'top bottom',
        end: 'center center',
        scrub: true,
      },
      y: '40%',
      duration: 2,
      ease: 'power1.inOut',
    });

    // hero section text animation
    let split = SplitText.create('#section1 .heading', {
      type: 'chars, words, lines',
      mask: 'lines'
    });

    gsap.from(split.chars, {
      yPercent: ()=> gsap.utils.random(-100, 100),
      rotation: ()=> gsap.utils.random(-30, 30),
      autoAlpha: 0,
      ease: 'back.out(1.5)',
      stagger: {
        amount: 0.5,
        from: 'random'
      },
      duration: 1.5
    });

    gsap.from('#headphone', {
      opacity: 0,
      scale: 0,
      duration: 1,
      delay: 1,
      ease: 'power1.inOut'
    })

  }
})

