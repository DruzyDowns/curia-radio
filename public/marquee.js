const marqueeText =
  " FL | Press Play | Streaming Live From Curia On the Drag | Gainesville";
const marquee = new Array(70).fill(marqueeText);
console.log(marquee);
const marqueeSpan = document.querySelector(".marquee span");
marqueeSpan.innerHTML = marquee;
