import helpers from '../helpers';

function setMeter(precent) {
	const $meterArrow = $('.js-meter-arrow');
	const angle = 180 / 100 * precent - 90;
	$meterArrow.css({transform: `translateX(-50%) rotate(${angle}deg)`});
}

function setScore(precent) {
	const $meterScore = $('.js-meter-score');
	const score = precent * 0.41241254125125 * 100;
	$meterScore.html(Math.round(score));
}

function setAproved(precent) {
	const $meterAproed = $('.js-meter-aproved');

	if (precent >= 68) {
		$meterAproed.addClass('active');
	} else {
		$meterAproed.removeClass('active');
	}
}

function calculatePrecent() {
	let $checkbox = $('.js-meter-checkboxes input[type="checkbox"]');
	let checkboxesCount = $checkbox.length;
	let checked = 0;
	let precent = 0;

	$checkbox.each((i, e) => {
		if ($(e).prop('checked')) {
			checked += 1;
		}
	});
	precent = 100 / (checkboxesCount / checked);

	return precent <= 0 ? 0 : precent;
}

function init() {
	helpers.$document.on('click', '.js-meter-checkbox', () => {
		setMeter(calculatePrecent());
		setScore(calculatePrecent());
		setAproved(calculatePrecent());
	});

	setMeter(calculatePrecent());
	setScore(calculatePrecent());
	setAproved(calculatePrecent());
}

export default {
	init,
};
