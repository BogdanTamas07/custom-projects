const box = document.querySelector(".box");
const container = document.querySelector(".container");

const observer = new ResizeObserver((entries) => {
  const [
    {
      contentRect: { width },
      target,
    },
  ] = entries ?? [];
  const isSmall = width < 150;

  target.style.backgroundColor = isSmall ? "blue" : "red";
});

observer.observe(box);
observer.observe(container);
