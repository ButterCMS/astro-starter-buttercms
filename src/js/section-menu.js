(function () {
	function onScroll(event) {
		const sections = document.querySelectorAll(".page-scroll");
		const scrollPos =
			window.pageYOffset ||
			document.documentElement.scrollTop ||
			document.body.scrollTop;

		for (let i = 0; i < sections.length; i++) {
			const currLink = sections[i];
			const currLinkHref = currLink.getAttribute("href");
			const val = currLinkHref.replace("/", "");
			const refElement = document.querySelector(val);
			const scrollTopMinus = scrollPos + 73;
			if (
				refElement.offsetTop <= scrollTopMinus &&
				refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
			) {
				document.querySelector(".page-scroll").classList.remove("active");
				currLink.classList.add("active");
			} else {
				currLink.classList.remove("active");
			}
		}
	}

	window.document.addEventListener("scroll", onScroll, { passive: true });
})();