gsap.registerPlugin(ScrollTrigger);

if (typeof Lenis !== "undefined") {
  const lenis = new Lenis({
    duration: 1.5,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}
//   cursor on hover in navbar

var crsr = document.querySelector(".cursor");
var main = document.querySelector(".main");

if (crsr && main) {
  main.addEventListener("mousemove", function (details) {
    gsap.to(".cursor", {
      left: details.x,
      top: details.y,
    });
  });
}

// function canva() {
//   const canvas = document.querySelector("canvas");
//   const tools = canvas.getContext("2d");
//   // is line se saare tools which can draw 2d lines will be given to you
//   canvas.width = window.innerWidth;
//   canvas.height = window.innerHeight;

//   window.addEventListener("resize", function () {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//     render();
//   });
//   function files(index) {
//     var data = `
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0248.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0249.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0250.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0251.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0252.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0253.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0254.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0255.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0256.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0257.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0258.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0259.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0260.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0261.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0262.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0263.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0264.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0265.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0266.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0267.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0268.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0269.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0270.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0271.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0272.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0273.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0274.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0275.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0276.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0277.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0278.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0279.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0280.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0281.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0282.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0283.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0284.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0285.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0286.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0287.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0289.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0290.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0291.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0292.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0293.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0294.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0295.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0296.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0297.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0298.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0299.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0300.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0301.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0302.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0303.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0304.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0305.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0306.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0307.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0308.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0309.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0310.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0311.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0312.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0313.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0314.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0315.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0316.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0317.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0318.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0319.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0320.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0321.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0322.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0323.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0324.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0325.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0326.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0327.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0328.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0329.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0330.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0331.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0332.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0333.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0334.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0335.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0336.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0337.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0338.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0339.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0340.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0341.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0342.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0343.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0344.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0345.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0346.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0347.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0348.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0349.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0350.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0351.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0352.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0353.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0354.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0355.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0356.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0357.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0358.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0359.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0360.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0361.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0362.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0363.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0364.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0365.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0366.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0367.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0368.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0369.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0370.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0371.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0372.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0373.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0374.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0375.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0376.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0377.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0378.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0379.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0380.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0381.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0382.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0383.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0384.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0385.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0386.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0387.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0388.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0389.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0390.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0391.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0392.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0393.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0394.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0395.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0396.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0397.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0398.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0399.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0400.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0401.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0402.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0403.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0401.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0404.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0405.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0406.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0407.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0408.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0409.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0410.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0411.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0412.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0413.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0414.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0415.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0416.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0417.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0418.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0419.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0420.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0421.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0422.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0423.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0424.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0425.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0426.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0427.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0428.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0429.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0430.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0431.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0432.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0433.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0434.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0435.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0436.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0437.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0438.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0439.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0440.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0441.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0442.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0443.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0444.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0445.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0446.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0447.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0448.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0449.png
//                         C:/Users/Welcome/OneDrive/Desktop/portfolio_website/images/0450.png
//             `;
//     return data.split("\n")[index];
//   }
//   const frameCount = 204;

//   const images = [];
//   const currentShowing = {
//     frame: 1,
//   };

//   for (let i = 0; i < frameCount; i++) {
//     const img = new Image();
//     img.src = files(i);
//     images.push(img);
//   }

//   gsap.to(currentShowing, {
//     frame: frameCount - 1,
//     snap: "frame",
//     ease: "none",
//     scrollTrigger: {
//       trigger: ".main",
//       scroller: "body",
//       start: "top top",
//       end: "400% top",
//       scrub: 0.5,
//       // markers: true,
//       pin: true,
//       onUpdate: render,
//     },
//   });

//   images[0].onload = render;

//   function render() {
//     drawImageScaled(images[currentShowing.frame], tools);
//   }

//   function drawImageScaled(img, tools) {
//     var canvas = tools.canvas;
//     var hRatio = canvas.width / img.width;
//     var vRatio = canvas.height / img.height;
//     var ratio = Math.max(hRatio, vRatio);
//     var centerShift_x = (canvas.width - img.width * ratio) / 2;
//     var centerShift_y = (canvas.height - img.height * ratio) / 2;
//     tools.clearRect(0, 0, canvas.width, canvas.height);
//     tools.drawImage(
//       img,
//       0,
//       0,
//       img.width,
//       img.height,
//       centerShift_x,
//       centerShift_y,
//       img.width * ratio,
//       img.height * ratio
//     );
//   }
// }

// function preload() {
//   const tl = gsap.timeline();

//   tl.to(".loading-circle", {
//     duration: 0.9,
//     rotation: 720,
//     transformOrigin: "center center",
//     repeat: -1,
//     ease: "none",
//   })
//     .to(".loading-circle", {
//       y: -200,
//       opacity: 0,
//       ease: "none",
//     })

//     .to(".loading-anim>h1", {
//       y: -50,
//       delay: 0.05,
//       opacity: 1,
//       stagger: 0.2,
//     })

//     .to(".l-line", {
//       width: "700px",
//       duration: 1,
//       ease: "power2.inOut",
//       transformOrigin: "center center",
//     })
//     .to(".pre-loader", {
//       backgroundColor: "#000",
//       color: "#FFF",
//       onComplete: showMainContent,
//     })
//     .to(".pre-loader", {
//       left: "-100%",
//       top: 0,
//     });
// }

// function showMainContent() {
//   gsap.to(".main", {
//     opacity: 1,
//   });
// }

var para = gsap.timeline({
  scrollTrigger: {
    trigger: ".page-1",
    start: "top top",
    end: "bottom 0%",
    scrub: true,
    pin: true,
  },
});
para.to(
  "#img-1",
  {
    x: 300,
  },
  "hui"
);
para.to(
  "#img-2",
  {
    x: -300,
  },
  "hui"
);
para.to(
  "#img-3",
  {
    x: 400,
  },
  "hui"
);
para.to(
  "#img-4",
  {
    x: -400,
  },
  "hui"
);
para.to(
  "#fence-img-1",
  {
    x: 100,
  },
  "hui"
);
para.to(
  "#fence-img-2",
  {
    x: -100,
  },
  "hui"
);
para.to(
  "#fence-img-3",
  {
    x: 1850,
    filter: "brightness(20%)",
  },
  "hui"
);
para.to(
  "#fence-img-4",
  {
    x: -10,
    y: -150,
  },
  "hui"
);
para.to(
  "#fence-img-5",
  {
    x: 80,
    y: -130,
  },
  "hui"
);
para.to(
  "#fence-img-6",
  {
    x: -10,
    y: -190,
  },
  "hui"
);
para.to(
  "#fence-img-7",
  {
    x: -10,
    y: -150,
  },
  "hui"
);
para.to(
  "#fence-img-8",
  {
    x: 40,
    y: -150,
  },
  "hui"
);
para.to(
  "#fence-img-9",
  {
    x: -70,
    y: -130,
  },
  "hui"
);
para.to(
  "#fence-img-10",
  {
    y: -180,
    x: -10,
    width: "100%",
    height: "100%",
  },
  "hui"
);
para.to(
  ".page-1-img img",
  {
    width: "120%",
    height: "120%",
  },
  "hui"
);

para.to(
  ".planet img",
  {
    y: -500,
    rotate: "30deg",
  },
  "hui"
);
para.to(
  ".meteor img",
  {
    y: 2000,
    x: -3000,
  },
  "hui"
);
para.to(
  ".landing-para",
  {
    y: -200,
    opacity: 1,
  },
  "hui"
);

// strategy part

gsap.to(".strategy", {
  backgroundColor: "#fff",
  scrollTrigger: {
    trigger: ".strategy",
    start: "bottom 20%",
    end: "bottom top",
    scrub: true,
  },
});
gsap.to(".strat-1 h1", {
  color: "#000",
  scrollTrigger: {
    trigger: ".strat-1 h1",
    start: "100% 0%",
    end: "bottom -40%",
    scrub: true,
  },
});
gsap.to(".strategy svg", {
  left: "80%",
  rotate: "90deg",
  color: "#000",
  scrollTrigger: {
    trigger: ".strategy svg",
    start: "100% 0%",
    end: "bottom -40%",
    scrub: true,
  },
});
gsap.to(".name", {
  transform: "translateY(-40px)",
  scrollTrigger: {
    start: "30% 10%",
    end: "0 0",
    scrub: 1,
  },
});

var clutter = "";

document
  .querySelector(".part-1>p")
  .textContent.split("")
  .forEach(function (dets) {
    clutter += `<span>${dets}</span>`;

    document.querySelector(".part-1>p").innerHTML = clutter;
  });
gsap.to(".part-1>p>span", {
  scrollTrigger: {
    trigger: ".part-1>p>span",
    start: "0 80%",
    end: "bottom top",
    scrub: 2,
  },
  color: "#fff",
  stagger: 0.035,
});
var clutter = "";

document
  .querySelector(".part-3>p")
  .textContent.split("")
  .forEach(function (dets) {
    clutter += `<span>${dets}</span>`;

    document.querySelector(".part-3>p").innerHTML = clutter;
  });
gsap.to(".part-3>p>span", {
  scrollTrigger: {
    trigger: ".part-3>p>span",
    start: "0% 80%",
    end: "bottom top",
    scrub: 2,
  },
  color: "#fff",
  stagger: 0.035,
});

// infinte loop effect

var marquee = gsap.timeline({
  scrollTrigger: {
    trigger: ".part-2",
    start: "0 90%",
    end: "bottom 0",
    scrub: 0.1,
  },
});
marquee.to(
  ".stripe-l",
  {
    marginLeft: "-80%",
  },
  "loop"
);
marquee.to(
  ".stripe-r",
  {
    marginLeft: "0%",
  },
  "loop"
);

// var sections = gsap.utils.toArray(".hor");
// var cont = document.querySelector(".horizontal");
// gsap.to(sections, {
//   xPercent: -100 * (sections.length - 1),
//   ease: "none",
//   duration: 6,
//   scrollTrigger: {
//     trigger: ".horizontal",
//     pin: true,
//     scrub: 1,
//     end: `+=${cont.offsetWidth}`,
//   },
// });
var zoom = gsap.timeline({
  scrollTrigger: {
    trigger: ".zooming",
    start: "50% 50%",
    end: "150% 50%",
    scrub: true,
    pin: true,
  },
});
zoom.to(
  ".top-cnt",
  {
    rotateX: "110deg",
    opacity: 0,
    duration: 1.5,
  },
  "rotate"
);
zoom.to(
  ".btm-cnt",
  {
    rotateX: "-110deg",
    opacity: 0,
    duration: 1.5,
  },
  "rotate"
);
zoom.to(
  ".img",
  {
    width: "100%",
    height: "100%",
    duration: 5,
  },
  "rotate"
);

var hover = document.querySelectorAll(".hov-1");

hover.forEach((index) => {
  index.addEventListener("mouseenter", function () {
    var att = index.getAttribute("data-image");
    crsr.style.width = "300px";
    crsr.style.height = "300px";
    crsr.style.borderRadius = "0";
    crsr.style.backgroundImage = `url(${att})`;
  });
  index.addEventListener("mouseleave", function () {
    index.style.background = "transparent";
    crsr.style.width = "0px";
    crsr.style.height = "0px";
    crsr.style.borderRadius = "50%";
    crsr.style.backgroundImage = `none`;
  });
});

// gsap.to(".horizontal", {
//   xPercent: -66.667,
//   scrollTrigger: {
//     trigger: ".horizontal",
//     scrub: true,
//     pin: true,
//   },
// });
// preload();
// timeline1();
// canva();
