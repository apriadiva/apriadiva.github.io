/**
 * ============================================================
 * SCROLL REVEAL
 * ============================================================
 *
 * Effect:
 *   Fade In
 *   Slide Up From Bottom
 *   Blur -> Sharp
 *
 * Trigger:
 *   IntersectionObserver
 *
 * Behavior:
 *   Element dianimasikan ketika masuk viewport.
 *
 * ============================================================
 */

(() => {
  "use strict";

  /* ==========================================================
     INITIALIZE
     ========================================================== */

  function initScrollReveal() {
    const elements = document.querySelectorAll(".reveal");

    /* Tidak ada element reveal */
    if (!elements.length) {
      return;
    }

    /* ========================================================
       INTERSECTION OBSERVER
       ======================================================== */

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          /*
             Element belum masuk viewport.
          */

          if (!entry.isIntersecting) {
            return;
          }

          /*
             Aktifkan animasi.
          */

          entry.target.classList.add("is-visible");

          /*
             Hentikan observer untuk element tersebut.

             Artinya animasi hanya terjadi satu kali.
          */

          observerInstance.unobserve(entry.target);
        });
      },
      {
        /*
           Element mulai animasi ketika sekitar
           10% bagiannya masuk viewport.
        */

        threshold: 0.1,

        /*
           Trigger sedikit sebelum element
           mencapai bagian bawah viewport.
        */

        rootMargin: "0px 0px -8% 0px",
      },
    );

    /* ========================================================
       OBSERVE ALL ELEMENTS
       ======================================================== */

    elements.forEach((element) => {
      /*
         Pastikan element belum visible
         ketika observer mulai bekerja.
      */

      element.classList.remove("is-visible");

      /*
         Mulai observe.
      */

      observer.observe(element);
    });

    /* ========================================================
       FALLBACK
       ======================================================== */

    /*
       Safety fallback.

       Jika IntersectionObserver tidak tersedia,
       semua element langsung ditampilkan.
    */

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => {
        element.classList.add("is-visible");
      });
    }
  }

  /* ==========================================================
     DOM READY
     ========================================================== */

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollReveal, {
      once: true,
    });
  } else {
    initScrollReveal();
  }
})();
