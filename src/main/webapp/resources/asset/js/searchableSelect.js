
$(function(){
    $(window).load(function(){
		$('select').searchableSelect();
		// 更改下拉列表选项后颜色变深
		$(".searchable-select-item").on('click',function(){ 
			$(this).parents(".searchable-select").children(".searchable-select-holder").css("color","#425968");
		});

	});
});

