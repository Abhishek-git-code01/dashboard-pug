function toggleAccordion(el) {
  const item = el.parentElement;

  item.classList.toggle("active");

  const body = item.querySelector(".accordion-body");

  if (item.classList.contains("active")) {
    body.style.maxHeight = body.scrollHeight + "px";
  } else {
    body.style.maxHeight = null;
  }
}