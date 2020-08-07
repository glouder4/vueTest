$(document).ready(function(){
	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}
	function soundClick(number) {
	  var audio = new Audio(); // Создаём новый элемент Audio
	  audio.src = number+'.ogg'; // Указываем путь к звуку "клика"
	  audio.autoplay = true; // Автоматически запускаем
	}
	let queueButtons = []; let isStarted = false; let userQueueButtons = [];
	function gameEnd(gameRound){
		$('.game-info>h2')[0].innerText = 'Игра завершена на раунде: '+queueButtons.length;
		isStarted = false;
		queueButtons = [];
		userQueueButtons = [];
	}
	function makeQueue(delay){
		if(isStarted){
			queueButtons.push(getRandomInt(1,4));
			let i = 0;
			function playSound(){
				setTimeout(function(){	
					$('#game>ul>li')[queueButtons[i]-1].style.border = '2px solid black';										
					soundClick(queueButtons[i]);
					setTimeout(function(){
						$('#game>ul>li')[queueButtons[i]-1].style.border = '0';
						i++;					
						if( (i != queueButtons.length)&&(queueButtons[i] != undefined) ) playSound();
						else return;
					},300)	
				},delay-300)						
			}
			playSound();
		}
	}
	 let delay = 0;
	$('#start').click(function(){
		isStarted = true;
		queueButtons = [];
		userQueueButtons = [];
		$('.game-info>h2')[0].innerText = userQueueButtons.length;
		let different = '';
		for( let i =0; i < $('.game-options>input').length;i++ ){
			if( $('.game-options>input')[i].checked == true ){
				if( $('.game-options>input')[i].value == 'easy' ) delay = 1500;
				else if ( $('.game-options>input')[i].value == 'normal' ) delay = 1000;
				else if ( $('.game-options>input')[i].value == 'hard' ) delay = 400;
			}
		}
		makeQueue(delay);
	})	
	$('#game>ul>li').click(function(){
		let buttonNumber = $(this).attr('data-tile');
		soundClick(buttonNumber);
		if(isStarted){
			userQueueButtons.push( parseInt(buttonNumber) );
			for(let i =0 ; i < userQueueButtons.length;i++){
				if(userQueueButtons[i] != queueButtons[i]){
					gameEnd(queueButtons.length);
					break;
				}
			}
			if( (userQueueButtons.length == queueButtons.length)&&(isStarted) ){
			 userQueueButtons = [];
			 makeQueue(delay);
			}
		}		
	})
})