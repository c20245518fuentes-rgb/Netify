import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const closeMenu = () => {
	const toggle = document.querySelector(".menu-toggle");
	const navigation = document.querySelector(".site-nav");

	toggle?.setAttribute("aria-expanded", "false");
	toggle?.setAttribute("aria-label", "Open navigation");
	if (toggle) toggle.textContent = "Menu";
	navigation?.classList.remove("is-open");
};

document.querySelector(".menu-toggle")?.addEventListener("click", (event) => {
	const toggle = event.currentTarget;
	const navigation = document.querySelector(".site-nav");
	const isOpen = toggle.getAttribute("aria-expanded") !== "true";

	toggle.setAttribute("aria-expanded", String(isOpen));
	toggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
	toggle.textContent = isOpen ? "Close" : "Menu";
	navigation?.classList.toggle("is-open", isOpen);
});

document.querySelectorAll(".site-nav a").forEach((link) => {
	link.addEventListener("click", closeMenu);
});

const themeToggle = document.querySelector(".theme-toggle");

if (themeToggle instanceof HTMLButtonElement) {
	const setTheme = (theme) => {
		const isDark = theme === "dark";
		document.documentElement.dataset.theme = theme;
		themeToggle.setAttribute("aria-pressed", String(isDark));
		themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
		document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#111813" : "#F7F4ED");

		try {
			localStorage.setItem("neatify-theme", theme);
		} catch (error) {
			console.error("Unable to save the theme preference.", error);
		}
	};

	setTheme(document.documentElement.dataset.theme === "dark" ? "dark" : "light");
	themeToggle.addEventListener("click", () => {
		setTheme(document.documentElement.dataset.theme === "dark" ? "light" : "dark");
	});
}

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