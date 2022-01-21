document.addEventListener("DOMContentLoaded", function(){

	// -------------------nav menu--------------------------
	let nav_toggle_button = document.querySelector('.toggle_button');
	if (nav_toggle_button) {
		nav_toggle_button.addEventListener('click', function(){
			nav_toggle_button.parentNode.classList.toggle('show');
			
		});
	}


// ------------------------header backgrounds-----------------
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


// ----------------------feedbacks----------------------------
	let feedback_block = document.querySelector('.feedback_sity');
	if (feedback_block) {
		let feedbacks = JSON.parse(feedbackJSON);
		let author_block = feedback_block.querySelector('.feedback_author');
		let name = author_block.querySelector('span');
		let img = author_block.querySelector('img');
		let feedback = feedback_block.querySelector('.feedback');
		let randomFB = parseInt(Math.random() * (feedbacks.length - 0) + 0);
		name.innerHTML = feedbacks[randomFB]['name'];
		feedback.innerHTML = feedbacks[randomFB]['feedback'];
		if (feedbacks[randomFB]['avatar']) {
			img.src = 'img/users-avatars/'+feedbacks[randomFB]['avatar'];
		}else {
			img.src = 'img/users-avatars/user-default-avatar.png';
		}
	}
});