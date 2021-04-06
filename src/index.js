import "./styles.css";

const imagesCaroselSrcs = ["7.jpg", "8.jpg", "pyramid.jpg"].map(
  (name) => "assets/" + name
);

const imagesCaroselSrcs2 = ["1.jpg", "2.jpg", "5.jpg", "6.jpg"].map(
  (name) => "assets/" + name
);

const imagesCaroselSrcs3 = ["3.jpg", "4.jpg"].map((name) => "assets/" + name);
// window.onload = function (e) {
//   init();
//   loadGallery();
// };
// loadGallery();

function init() {
  const navs = {
    "#home": "Home",
    "#gallery": "Gallery",
    "#services1": "Art",
    "#services2": "Flyers",
    "#services3": "Magazine",
    "#contact": "Contact Me"
  };
  let navBar = document.getElementById("navbar");

  Object.entries(navs).forEach(([href, name]) => {
    // let div = document.createElement("div");
    // div.className = "navContainer";
    let aBtn = document.createElement("a");
    aBtn.className = "navButtons";
    aBtn.href = href;
    aBtn.innerText = name;
    aBtn.onclick = (e) => {
      e.preventDefault();
      let id = e.target.href.split("#")[1];
      document.getElementById(id).scrollIntoView({
        behavior: "smooth"
      });
    };
    // div.appendChild(aBtn);
    navBar.appendChild(aBtn);
  });

  // let navBar = document.getElementById("navbar");
  // let navbarButtons = document.querySelectorAll(".navButtons");
  // navbarButtons.forEach((button) => {
  //   button.addEventListener("click", (e) => {
  //     e.preventDefault();
  //     let id = e.target.href.split("#")[1];
  //     document.getElementById(id).scrollIntoView({
  //       behavior: "smooth"
  //     });
  //      });
  // });
  // console.log(navbarButtons);
}

function galleryImgHover(e) {}
function galleryImgClick(e) {}

function loadGallery() {
  let gallery = document.querySelector("#gallery");
  // for (let index = 0; index < 12; index++) {
  // IMPOTRANT! needs to preload all the images for smooth transition later in the carosules
  [...imagesCaroselSrcs, ...imagesCaroselSrcs2, ...imagesCaroselSrcs].forEach(
    (imgName) => {
      let img = document.createElement("img");
      img.src = imgName;
      // Math.random() > 0.5 ? "placeholder.png" : "placeholder-image-tall.png";
      img.className = "gallery-image";
      img.addEventListener("onhover", galleryImgHover);
      img.addEventListener("onhover", galleryImgClick);
      let container = document.createElement("div");
      container.className = "gallery-image-container";
      container.appendChild(img);
      gallery.appendChild(container);
    }
  );
}

// document.getElementById("app").innerHTML = `
// <h1>Hello Vanilla!</h1>
// <div>
//   We use the same configuration as Parcel to bundle this sandbox, you can find more
//   info about Parcel
//   <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
// </div>
// `;

// // When the user scrolls the page, execute myFunction
// window.onscroll = function() {myFunction()};

// // Get the navbar
// var navbar = document.getElementById("navbar");

// // Get the offset position of the navbar
// var sticky = navbar.offsetTop;

// // Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
// function myFunction() {
//   if (window.pageYOffset >= sticky) {
//     navbar.classList.add("sticky")
//   } else {
//     navbar.classList.remove("sticky");
//   }
// }

function caroselNextImage(args) {
  const { id, list, idPrev, idNext } = args;
  return (direction) => {
    let container = document.getElementById(id);
    if (direction === 0) {
      document
        .querySelector(idPrev)
        .addEventListener("click", () => caroselNextImage(args)(-1));
      document
        .querySelector(idNext)
        .addEventListener("click", () => caroselNextImage(args)(1));
      let mainImg = document.createElement("img");
      mainImg.src = list[args.index];
      mainImg.className = "carosuel-item";
      container.appendChild(mainImg);
      return;
    }
    let oldImg = container.children[0];
    console.log(oldImg, args.index);
    oldImg.classList.remove("carosel-image-fade-in");
    oldImg.classList.add("carosel-image-fade-out");

    oldImg.ontransitionend = () => {
      console.log("startt");
      args.index = (list.length + (args.index + direction)) % list.length;
      oldImg.src = list[args.index];
      oldImg.classList.remove("carosel-image-fade-out");
      oldImg.classList.add("carosel-image-fade-in");
      oldImg.ontransitionend = () => null;
    };
  };
}
(function () {
  window.addEventListener(
    "scroll",
    () => {
      document.body.style.setProperty(
        "--scroll",
        window.pageYOffset / (document.body.offsetHeight - window.innerHeight)
      );
    },
    false
  );
  init();
  loadGallery();
  window.carousel1 = {
    id: "carosel-image-container",
    index: 0,
    list: imagesCaroselSrcs,
    idPrev: "#caroselPrev",
    idNext: "#caroselNext"
  };
  caroselNextImage(window.carousel1)(0);

  window.carousel2 = {
    id: "carosel-image-container2",
    index: 0,
    list: imagesCaroselSrcs2,
    idPrev: "#caroselPrev2",
    idNext: "#caroselNext2"
  };
  caroselNextImage(window.carousel2)(0);

  window.carousel3 = {
    id: "carosel-image-container3",
    index: 0,
    list: imagesCaroselSrcs3,
    idPrev: "#caroselPrev3",
    idNext: "#caroselNext3"
  };
  caroselNextImage(window.carousel3)(0);
  // 2nd carousel
})();
