// =========================================
// Personal Information Page — script.js
// =========================================

// ---------- Boot screen ----------
const bootScreen = document.getElementById("bootScreen");
const bootButton = document.getElementById("bootButton");

document.body.classList.add("boot-locked");
bootButton.focus();

function enterPage() {
  bootScreen.classList.add("is-closing");
  document.body.classList.remove("boot-locked");
  bootButton.disabled = true;

  window.setTimeout(function () {
    bootScreen.remove();
  }, 650);
}

bootButton.addEventListener("click", enterPage);

// ---------- Contact form feedback ----------
const contactForm = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

contactForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const emailInput = document.getElementById("emailAddress");
  const email = emailInput.value.trim();
  const message = document.getElementById("messageBox").value.trim();

  if (fullName === "" || email === "" || message === "") {
    formNote.textContent = "Please fill out every field before submitting.";
  } else if (!emailInput.validity.valid) {
    formNote.textContent = "Please enter a valid email address.";
  } else {
    formNote.textContent = `Thanks, ${fullName}. This demo form is not connected to a message service. Please email me directly using the address below.`;
  }
});

// ---------- Active nav link highlight on scroll ----------
const navLinks = document.querySelectorAll("#navMenu .nav-link");
const sections = document.querySelectorAll("section[id], header[id]");
const navMenu = document.getElementById("navMenu");

function updateActiveNavLink() {
  const scrollPosition = window.scrollY + 120;
  let activeSectionId = sections[0]?.id;

  sections.forEach(function (section) {
    if (section.offsetTop <= scrollPosition) {
      activeSectionId = section.id;
    }
  });

  navLinks.forEach(function (link) {
    const isActive = link.getAttribute("href") === `#${activeSectionId}`;
    link.classList.toggle("active-link", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink, { passive: true });
window.addEventListener("resize", updateActiveNavLink);
updateActiveNavLink();

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (navMenu.classList.contains("show") && window.bootstrap) {
      window.bootstrap.Collapse.getOrCreateInstance(navMenu).hide();
    }
  });
});