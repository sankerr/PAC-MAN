var users = {'a':'a'};
var cur_user = null;
var register_validator = null;
var login_validator = null;

$(function() {
  	$.validator.addMethod('strongPassword', function(value, element) {
		return this.optional(element) 
			|| value.length >= 8
			&& /\d/.test(value)
			&& /[A-Z]/i.test(value)
			&& /[a-z]/i.test(value);
	}, 'Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters.')
	
	$.validator.addMethod('userExist', function(value, element) {
		return this.optional(element) 
			|| !(value in users);
	}, 'User name exist, please choose a different name.')
	
	$("#user_name").focus(function(){
		var firstname = $("#first_name").val();
		var lastname = $("#last_name").val();
		if (firstname && lastname && !this.value){
			this.value = firstname+"."+lastname;
		}
	},)
	
	register_validator = $("#register_form").validate({
		rules: {
			first_name: {
				required: true,
				nowhitespace: true,
				lettersonly: true
			},
			last_name: {
				required: true,
				nowhitespace: true,
				lettersonly: true
			},
			user_name: {
				required: true,
				nowhitespace: true,
				userExist: true
			},
			password: {
				required: true,
				strongPassword: true
			},
			confirm_password: {
				required: true,
				equalTo: '#password'
			},
			email: {
				required: true,
				email: true
			},
			birthday: {
				required: true
			}
		},
		messages: {
			email: {
				required: 'Please enter an email address.',
				email: 'Please enter a <em>valid</em> email address.'
			}
		},
		submitHandler: function(form) {
			after_register();
		}
	});
});

$("#register_btn, #menu_register").click(function() {
	if (register_validator != null){
		register_validator.resetForm();
	}
});

$(function() {
	
	login_validator = $("#login_form").validate({
		rules: {
			login_user_name: {
				required: true,
				nowhitespace: true
			},
			login_password: {
				required: true
			}
		},
		submitHandler: function(form) {
			if (checke_login()){
				cur_user = document.getElementById('login_user_name').value;
				if (pre_game_validator != null){
					pre_game_validator.resetForm();
				}
				after_login();
			}
			else{
				alert('Username or password is incorrecte.');
				document.getElementById('login_user_name').value = '';
				document.getElementById('login_password').value = '';
			}
		}
	});
});

$("#login_btn, #menu_login").click(function() {
	if (login_validator !== null){
		login_validator.resetForm();
	}
});

function after_login(){
	$('#login').hide();
	$('#logo_div').hide();
	$('#game').show();
	$('#load_gif').show();
	document.getElementById('lblPlayer').value = cur_user;
	setTimeout(pre_game_settings,3000);
}

function after_register(){
	$('#register').hide();
	sign_up();
	$('#login').show();
}

function pre_game_settings(){
	$('#load_gif').hide();
	document.getElementById('num_balls').value = '';
	document.getElementById('num_ghost').value = '';
	document.getElementById('time').value = '';
	up = 'ArrowUp';
	right = 'ArrowRight';
	left = 'ArrowLeft';
	down = 'ArrowDown';
	document.getElementById('point_color_5').value = "#ffffff";
	document.getElementById('point_color_15').value = "#14b716";
	document.getElementById('point_color_25').value = "#e52929";
	$('#pre_game').show();
}

function sign_up(){
	users[document.getElementById('user_name').value]=document.getElementById('password').value;
}

function checke_login(){
	var name = document.getElementById('login_user_name').value;
	if (name in users){
		var pass = document.getElementById('login_password').value;
		if (pass == users[name]){
			return true;
		}
	}
	return false;
}

