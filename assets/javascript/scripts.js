document.addEventListener("DOMContentLoaded", function () {
	updateCardRandomDesign();
	updateRippleEffect();
	updateCard3DRotate();
	updateVisibilityBackButton();
	updateInputsFilters();
	updatePayButton();
});

function updatePayButton() {
	// Специальная функция для механик при нажатии на кнопку оплаты
	$("#ID_PAY_BUTTON").on("click", function (e) {
	});
};

function updateInputsFilters() {
	// Текст будет показываться при невалидности поля
	var valideText = "Заполните это поле.";

	// Установить статус валидности для указанных ИД обьектов проверяя текущую и минимальную длину текста
	$("#ID_CARD_NUMBER, #ID_CARD_DATE, #ID_CARD_CVC").on("keypress change", function () {
		if ($(this).val().length < $(this).attr("minlength")) {
			this.setCustomValidity(valideText);
		} else {
			this.setCustomValidity("");
		};
	});
	
	// Форматировать текст во время ввода для указаных ИД обьектов
	$("#ID_CARD_NUMBER").on("keypress change", function () {
		$(this).val(function (index, value) {
			var regex = value;
			regex = regex.replace(/\D/g, "");
			regex = regex.replace(/\W/gi, "");
			regex = regex.replace(/(.{4})/g, "$1 ");
			regex = regex.replace(/(.{19})(.*)/g, "$1");
			return regex;
		});
	});

	// Форматировать текст во время ввода для указаных ИД обьектов
	$("#ID_CARD_DATE").on("keypress change", function () {
		$(this).val(function (index, value) {
			var regex = value;
			regex = regex.replace(/\D/g, "");
			regex = regex.replace(/\W/gi, "");
			regex = regex.replace(/(.{2})/g, "$1 / ");
			regex = regex.replace(/(.{7})(.*)/g, "$1");
			return regex;
		});
	});

	// Форматировать текст во время ввода для указаных ИД обьектов
	$("#ID_CARD_CVC").on("keypress change", function () {
		$(this).val(function (index, value) {
			var regex = value;
			regex = regex.replace(/\D/g, "");
			regex = regex.replace(/\W/gi, "");
			return regex;
		});
	});
};

function updateCardRandomDesign() {
	$(".card3d").removeClass("rotated");
	var designs = 18;
	var random = Math.floor(Math.random() * designs);
	$(".frontface, .backface").css({ background: `url(/assets/images/card-background-design${random}.png)` });
}

function updateRippleEffect() {
	$("button").on("click", function (e) {
		$btn = $(this);
		var $offset = $(this).offset();
		$span = $("<span/>");

		var w = $(this).width();
		var x = e.pageX - $offset.left;
		var y = e.pageY - $offset.top;

		$span.addClass("ripple");
		$span.css({
			width: w + "px",
			height: w + "px",
			top: y + "px",
			left: x + "px",
		});

		$btn.append($span);
	});
};

function updateCard3DRotate() {
	$(".card3d").on("click", function (e) {
		if (e.target.nodeName != "INPUT") {
			$(this).toggleClass("rotated");
		};
	});
};

function updateVisibilityBackButton() {
	const URLgoBack = getAllUrlParams().goback;
	var URLtarget = getAllUrlParams().target;

	// Hide and show the "back" button when necessary
	if (URLgoBack == undefined) {
		$("#ID_BACK_BUTTON").addClass("hidden");
	} else {
		$("#ID_BACK_BUTTON").removeClass("hidden");
	};

	// Return to the previous page when pressing the "back" button
	$("#ID_BACK_BUTTON").on("click", function (e) {
		if (URLgoBack != undefined) {
			if (URLtarget == undefined) {
				URLtarget = "_self";
			};
			window.open(URLgoBack, URLtarget).focus();
			return
		};
		history.go(-1);
	});
};

function getAllUrlParams(url) {
	// get query string from url (optional) or window
	var queryString = url ? url.split('?')[1] : window.location.search.slice(1);

	// we'll store the parameters here
	var obj = {};

	// if query string exists
	if (queryString) {

		// stuff after # is not part of query string, so get rid of it
		queryString = queryString.split('#')[0];

		// split our query string into its component parts
		var arr = queryString.split('&');

		for (var i = 0; i < arr.length; i++) {
			// separate the keys and the values
			var a = arr[i].split('=');

			// set parameter name and value (use 'true' if empty)
			var paramName = a[0];
			var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];

			// (optional) keep case consistent
			paramName = paramName.toLowerCase();
			if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();

			// if the paramName ends with square brackets, e.g. colors[] or colors[2]
			if (paramName.match(/\[(\d+)?\]$/)) {

				// create key if it doesn't exist
				var key = paramName.replace(/\[(\d+)?\]/, '');
				if (!obj[key]) obj[key] = [];

				// if it's an indexed array e.g. colors[2]
				if (paramName.match(/\[\d+\]$/)) {
					// get the index value and add the entry at the appropriate position
					var index = /\[(\d+)\]/.exec(paramName)[1];
					obj[key][index] = paramValue;
				} else {
					// otherwise add the value to the end of the array
					obj[key].push(paramValue);
				}
			} else {
				// we're dealing with a string
				if (!obj[paramName]) {
					// if it doesn't exist, create property
					obj[paramName] = paramValue;
				} else if (obj[paramName] && typeof obj[paramName] === 'string') {
					// if property does exist and it's a string, convert it to an array
					obj[paramName] = [obj[paramName]];
					obj[paramName].push(paramValue);
				} else {
					// otherwise add the property
					obj[paramName].push(paramValue);
				}
			}
		}
	}

	return obj;
}