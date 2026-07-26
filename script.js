// Interactive Portfolio Script

document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Mobile Menu Navigation ---
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuIcon = document.getElementById("menu-icon");
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.contains("hidden");
      if (isHidden) {
        mobileMenu.classList.remove("hidden");
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
      } else {
        mobileMenu.classList.add("hidden");
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      }
    });

    mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
      });
    });
  }

  // --- 2. Skill Tab Filtering ---
  const tabButtons = document.querySelectorAll(".skill-tab-btn");
  const skillCards = document.querySelectorAll(".skill-card");

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");

      // Update button active styles
      tabButtons.forEach((btn) => {
        btn.classList.remove(
          "bg-cyan-500/20",
          "text-cyan-300",
          "border-cyan-500/40",
        );
        btn.classList.add(
          "text-gray-400",
          "hover:text-white",
          "hover:bg-slate-800",
          "border-transparent",
        );
      });

      button.classList.add(
        "bg-cyan-500/20",
        "text-cyan-300",
        "border-cyan-500/40",
      );
      button.classList.remove(
        "text-gray-400",
        "hover:text-white",
        "hover:bg-slate-800",
        "border-transparent",
      );

      // Filter Skill Cards
      skillCards.forEach((card) => {
        const cardCategory = card.getAttribute("data-category");
        if (category === "all" || cardCategory === category) {
          card.style.display = "block";
          card.style.opacity = "1";
          card.style.transform = "translateY(0)";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // --- 3. Scroll Reveal Observer ---
  const revealElements = document.querySelectorAll(".reveal-on-scroll");
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // --- 4. Active Section Navigation Indicator ---
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll('nav a[href^="#"]');

  window.addEventListener("scroll", () => {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      const href = link.getAttribute("href").substring(1);
      if (href === currentSectionId) {
        link.classList.add("text-cyan-400", "font-semibold");
        link.classList.remove("text-gray-300");
      } else {
        link.classList.remove("text-cyan-400", "font-semibold");
        link.classList.add("text-gray-300");
      }
    });
  });

  // --- 5. Contact Form Submission Handling ---
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("form-name")?.value || "Friend";
      showToast(`Thank you, ${name}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }
});

// --- Copy to Clipboard Utility with Toast Notification ---
function copyToClipboard(text) {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast("Copied email to clipboard!");
      })
      .catch(() => {
        fallbackCopyTextToClipboard(text);
      });
  } else {
    fallbackCopyTextToClipboard(text);
  }
}

function fallbackCopyTextToClipboard(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.left = "-9999px";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast("Copied email to clipboard!");
  } catch (err) {
    showToast("Failed to copy text.");
  }
  document.body.removeChild(textArea);
}

// --- Toast Notification Display ---
function showToast(message) {
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  if (toast && toastMessage) {
    toastMessage.textContent = message;
    toast.classList.remove(
      "translate-y-20",
      "opacity-0",
      "pointer-events-none",
    );
    toast.classList.add("translate-y-0", "opacity-100");

    setTimeout(() => {
      toast.classList.remove("translate-y-0", "opacity-100");
      toast.classList.add("translate-y-20", "opacity-0", "pointer-events-none");
    }, 3500);
  }
}
