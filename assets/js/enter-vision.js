document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("enter-vision");
  const box = document.getElementById("signup-reveal");
  if (!btn || !box) return;

  btn.addEventListener("click", () => {
    box.hidden = false;

    const y = box.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: y, behavior: "smooth" });

    const email = document.getElementById("vision-email");
    if (email) email.focus();
  });
});
