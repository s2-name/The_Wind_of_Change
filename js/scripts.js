document.addEventListener("DOMContentLoaded", function(){

	let nav_toggle_button = document.querySelector('.toggle_button');
	if (nav_toggle_button) {
		nav_toggle_button.addEventListener('click', function(){
			nav_toggle_button.parentNode.classList.toggle('show');
			
		});
	}

	let header = document.querySelector('header');
	if (header) {
		let set = header.getAttribute('data-bgset').split(', ');
		let set_len = set.length;
		let i = 0;

		setInterval(function(){
			if (i >= set_len-1) {
				i = 0;
			}else {
				i++;
			}
			header.style.backgroundImage = 'linear-gradient(45deg, #484848a3, #000000eb), url("img/header-backgrounds/'+set[i]+'")';
		}, 5000);
	}
});