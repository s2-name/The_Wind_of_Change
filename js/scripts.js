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



// ----------------------AJAX---------------------------------
function CreateRequest(){
    var Request = false;
    if (window.XMLHttpRequest){
        //Gecko-совместимые браузеры, Safari, Konqueror
        Request = new XMLHttpRequest();
    }
    else if (window.ActiveXObject){
        //Internet explorer
        try{
             Request = new ActiveXObject("Microsoft.XMLHTTP");
        }    
        catch (CatchException){
             Request = new ActiveXObject("Msxml2.XMLHTTP");
        }
    }
 
    if (!Request){
        alert("Невозможно создать XMLHttpRequest");
    }
    
    return Request;
}


/*
Функция посылки запроса к файлу на сервере
r_method  - тип запроса: GET или POST
r_path    - путь к файлу
r_args    - аргументы вида a=1&b=2&c=3...
r_handler - функция-обработчик ответа от сервера
*/
function SendRequest(r_method, r_path, r_args, r_handler){
    //Создаём запрос
    var Request = CreateRequest();
    
    //Проверяем существование запроса еще раз
    if (!Request){
        return;
    }
    
    //Назначаем пользовательский обработчик
    Request.onreadystatechange = function(){
        //Если обмен данными завершен
        if (Request.readyState == 4){
            //Передаем управление обработчику пользователя
            r_handler(Request);
        }
    }
    
    //Проверяем, если требуется сделать GET-запрос
    if (r_method.toLowerCase() == "get" && r_args.length > 0)
    r_path += "?" + r_args;
    
    //Инициализируем соединение
    Request.open(r_method, r_path, true);
    
    if (r_method.toLowerCase() == "post"){
        //Если это POST-запрос
        
        //Устанавливаем заголовок
        Request.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
        //Посылаем запрос
        Request.send(r_args);
    }
    else{
        //Если это GET-запрос
        
        //Посылаем нуль-запрос
        Request.send(null);
    }
}  

// ----------------------feedbacks----------------------------
	let feedback_block = document.querySelector('.feedback_sity');
	if (feedback_block) {
		
		SendRequest('get', 'js/feedback.json', '', function(req){

			let feedbacks = JSON.parse(req.responseText);
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
		});		
	}


	// ----------------footer links-----------------------------
	let links = document.getElementById('links');
	let source = document.getElementById('source');
	document.getElementById('to_source').addEventListener('click', function(){
		links.classList.add('hide');
		source.classList.remove('hide');
	});
	document.getElementById('to_links').addEventListener('click', function(){
		links.classList.remove('hide');
		source.classList.add('hide');
	});
});