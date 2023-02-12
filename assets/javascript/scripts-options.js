/* --- OPTIONS LOADING --- */
loadTheme();

function loadTheme() {
	// Load local data
	const key = "data-theme";
	var loaded = localStorage.getItem(key);

	// Returns:
	// - null	->	Not loaded/Not saved
	// - "0"	->	Light theme
	// - "1"	->	Dark theme

	// If the theme was not loaded, then the default value was assigned
	if (loaded == null) {
		loaded = 0;
		localStorage.setItem(key, loaded);
	};

	// Now set the theme to the site
	$("html").attr(key, loaded);

	// Perform further only after full loading DOM content
	document.addEventListener("DOMContentLoaded", function () {

		// Setup the toggle in the right position
		if (loaded == 1) {
			$("#ID_THEME_SWITCHER").prop("checked", true);
		};

		// Change the value when pressed to the togl toggle
		$("#ID_THEME_SWITCHER").click(function () {
			var swithTo = (document.documentElement.getAttribute(key) == 0) ? 1 : 0;
			document.documentElement.setAttribute(key, swithTo);
			localStorage.setItem(key, swithTo);
		});
	});
};