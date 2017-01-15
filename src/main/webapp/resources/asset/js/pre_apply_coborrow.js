$(function(){
	$(window).load(function(){
		$("#borrow .cardtype .searchable-select-item").on('click',function(){
			if($(this).text()=="身份证"){
				$("#borrow .idcard").removeClass("hidden");
				$("#borrow .idcard input[type=radio]").get(0).checked=true;
			}else{
				$("#borrow .idcard").addClass("hidden");
				$("#borrow .idcard-expire").addClass("hidden");
			}
		});
		$("#borrow .idcard input[type=radio]").on('click',function(){
			if($(this).val()==1){
				$("#borrow .idcard-expire").addClass("hidden");
			}else{
				$("#borrow .idcard-expire").removeClass("hidden");
			}
		});
		$("#coborrow .cardtype .searchable-select-item").on('click',function(){
			if($(this).text()=="身份证"){
				$("#coborrow .idcard").removeClass("hidden");
				$("#coborrow .idcard input[type=radio]").get(0).checked=true;
			}else{
				$("#coborrow .idcard").addClass("hidden");
				$("#coborrow .idcard-expire").addClass("hidden");
			}
		});
		$("#coborrow .idcard input[type=radio]").on('click',function(){
			if($(this).val()==1){
				$("#coborrow .idcard-expire").addClass("hidden");
			}else{
				$("#coborrow .idcard-expire").removeClass("hidden");
			}
		});
		$("#guarantee .cardtype .searchable-select-item").on('click',function(){
			if($(this).text()=="身份证"){
				$("#guarantee .idcard").removeClass("hidden");
				$("#guarantee .idcard input[type=radio]").get(0).checked=true;
			}else{
				$("#guarantee .idcard").addClass("hidden");
				$("#guarantee .idcard-expire").addClass("hidden");
			}
		});
		$("#guarantee .idcard input[type=radio]").on('click',function(){
			if($(this).val()==1){
				$("#guarantee .idcard-expire").addClass("hidden");
			}else{
				$("#guarantee .idcard-expire").removeClass("hidden");
			}
		});

		$(".pre_apply .main .types .nav a").on('click',function(e){
			e.preventDefault();
			$(this).tab('show');
		});
		$(".pre_apply .main #borrow .nav a").on('click',function(e){
			e.preventDefault();
			$(this).tab('show');
		});
		$(".pre_apply .main #coborrow .nav a").on('click',function(e){
			e.preventDefault();
			$(this).tab('show');
		});
		$(".pre_apply .main #guarantee .nav a").on('click',function(e){
			e.preventDefault();
			$(this).tab('show');
		});

		$("#appliertype1").on('click',function(){
			if($(this).is(":checked")){
				$(".types ul.nav li").eq(1).removeClass("hidden").addClass("active").siblings().removeClass("active");
				$("#coborrow").addClass("in").addClass("active").siblings().removeClass("in").removeClass("active");
			}else{
				$(".types ul.nav li").eq(1).addClass("hidden");
				$(".types ul.nav li").eq(0).addClass("active").siblings().removeClass("active");
				$("#borrow").addClass("in").addClass("active").siblings().removeClass("in").removeClass("active");

			}
		});
		$("#appliertype2").on('click',function(){
			if($(this).get(0).checked==true){
				$(".types ul.nav li").eq(2).removeClass("hidden").addClass("active").siblings().removeClass("active");
				$("#guarantee").addClass("in").addClass("active").siblings().removeClass("in").removeClass("active");
			}else{
				$(".types ul.nav li").eq(2).addClass("hidden");
				$(".types ul.nav li").eq(0).addClass("active").siblings().removeClass("active");
				$("#borrow").addClass("in").addClass("active").siblings().removeClass("in").removeClass("active");
			}
		});

	});
});