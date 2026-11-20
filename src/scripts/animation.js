import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const closeMenu = () => {
	const toggle = document.querySelector(".menu-toggle");
	const navigation = document.querySelector(".site-nav");

	toggle?.setAttribute("aria-expanded", "false");
	toggle?.setAttribute("aria-label", "Open navigation");
	navigation?.classList.remove("is-open");
};

document.querySelector(".menu-toggle")?.addEventListener("click", (event) => {
	const toggle = event.currentTarget;
	const navigation = document.querySelector(".site-nav");
	const isOpen = toggle.getAttribute("aria-expanded") !== "true";

	toggle.setAttribute("aria-expanded", String(isOpen));
	toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
	navigation?.classList.toggle("is-open", isOpen);
});

document.querySelectorAll(".site-nav a").forEach((link) => {
	link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown", (event) => {
	if (event.key === "Escape") closeMenu();
});

const contactForm = document.querySelector("#contact-form");
const contactSuccess = document.querySelector("#contact-success");

if (contactForm instanceof HTMLFormElement && contactSuccess instanceof HTMLElement) {
	contactForm.addEventListener("submit", (event) => {
		event.preventDefault();
		contactForm.reset();
		contactSuccess.hidden = false;
	});
}

if (!prefersReducedMotion) {
	const progress = document.querySelector(".scroll-progress span");

	gsap.to(progress, {
		scaleX: 1,
		ease: "none",
		scrollTrigger: {
			trigger: document.documentElement,
			start: "top top",
			end: "bottom bottom",
			scrub: 0.25,
		},
	});

	gsap.from("[data-hero-reveal]", {
		autoAlpha: 0,
		y: 20,
		duration: 0.8,
		stagger: 0.12,
		ease: "power2.out",
	});

	gsap.utils.toArray("[data-reveal]").forEach((element) => {
		gsap.from(element, {
			autoAlpha: 0,
			y: 22,
			duration: 0.75,
			ease: "power2.out",
			scrollTrigger: {
				trigger: element,
				start: "top 88%",
				once: true,
			},
		});
	});

	gsap.from(".service-card", {
		autoAlpha: 0,
		y: 20,
		duration: 0.65,
		stagger: 0.1,
		ease: "power2.out",
		scrollTrigger: {
			trigger: ".service-grid",
			start: "top 86%",
			once: true,
		},
	});
}