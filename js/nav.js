
$("#menu_welcome").click(function() {
    rest_bord();
	hideAll();
	$('#welcome').show();
});

$("#login_btn, #menu_login").click(function() {
    rest_bord();
	hideAll();
	document.getElementById('login_user_name').value = '';
	document.getElementById('login_password').value = '';
	$('#login').show();
});

$("#register_btn, #menu_register").click(function() {
    rest_bord();
	hideAll();
	document.getElementById('first_name').value = '';
	document.getElementById('last_name').value = '';
	document.getElementById('user_name').value = '';
	document.getElementById('password').value = '';
	document.getElementById('confirm_password').value = '';
	document.getElementById('email').value = '';
	document.getElementById('birthday').value = '';
	$('#register').show();
});

function hideAll(){
	$('#welcome').hide();
	$('#login').hide();
	$('#register').hide();
	$('#about').hide();
	$('#game').hide();
	$('#board').hide();
	$('#game_over_div').hide();
	$('#pre_game').hide();
	$('#logo_div').show();
};

