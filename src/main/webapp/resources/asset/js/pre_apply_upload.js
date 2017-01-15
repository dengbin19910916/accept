function showThumbnail(i) { // 上传显示缩略图
        var resultFile = $("#upload_card"+i)[0].files[0];
        if (resultFile) {
            var reader = new FileReader();
            reader.readAsDataURL(resultFile);
            reader.onload = function (e) {
                $("#upfile"+i).hide();
                $("#pic_close"+i+",#card"+i).show();
                $("#card"+i).attr({'src':this.result,'alt':resultFile.name});
            }; 
        }
}
function scaleThumbnail(obj){ // 缩放图片
    var winheight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // 窗口可视高度
    var winwidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // 窗口可视宽度
    var zoom=parseInt(obj.style.zoom,10)||100;
    zoom+=event.wheelDelta/12;
    if(zoom>0&&zoom<=100 && $(obj).width()<=1150 && $(obj).height()<=600 && $(obj).width()<winwidth && $(obj).height()<winheight) 
        obj.style.zoom=zoom+'%';
    CheckPosition();
    return false;
} 
function CheckPosition(){ // 校正图片位置
    var winheight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // 窗口可视高度
    var winwidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // 窗口可视宽度
    var dialog=$("#pre_pic_detail .modal-dialog");
    var width=dialog.width(); //对话框宽
    var height=dialog.height(); // 对话框高
    dialog.css({"margin-left":(winwidth-width)/2+"px","margin-top":(winheight-height)/2+"px"});
}
function CheckPosition2(obj){ // 校正图片位置
    var winheight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // 窗口可视高度
    var winwidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // 窗口可视宽度
    var dialog=obj.children(".modal-dialog");
    var width=dialog.width(); //对话框宽
    var height=dialog.height(); // 对话框高
    dialog.css({"margin-left":(winwidth-width)/2+"px","margin-top":(winheight-height)/2+"px"});
}
function CheckUpdatePic(){
    if($("#card1").attr("src")=="" || $("#card2").attr("src")=="" || $("#card3").attr("src")=="" ){
        $("#pre_submit").modal({
            show:true,
            // backdrop:'static',
        });
        $("#pre_submit").css("visibility","hidden");
        return false;
    }else{
        $("#pre_submit_loading").modal({
            show:true,
        });
        $("#pre_submit_loading").css("visibility","hidden");
        WillPass(1,2); 
        return true;
    }
}
$(function(){	
    $(window).load(function(){
        $(".poptip").tooltip({
            html:true,
            toggle:"tooltip",
            trigger:"hover",
            placement:"right",
            container:"body",
            title:"单击该图标并选择图片文件点击打开即可上传"
        });  // 提示

        $("#pre_submit").on('shown.bs.modal',function(){ // 图片完全显示后校正位置
            CheckPosition2($(this));
            $("#pre_submit").css("visibility","visible");
        });

        $("#pre_pic_detail").on('shown.bs.modal',function(){ // 图片完全显示后校正位置
            CheckPosition2($(this));
            $("#pre_pic_detail").css("visibility","visible"); 
        });

        $("#pre_submit_loading").on('shown.bs.modal',function(){ // 图片完全显示后校正位置
            CheckPosition2($(this));
            $("#pre_submit_loading").css("visibility","visible"); 
        });

    	$(".pic_close").on('click',function(){ // 关闭缩略图
    		$(this).parent().children(".upfile").show();
    		$(this).parent().children(".card,.pic_close").hide();
            $(this).parent().children(".card").attr("src","");
            $(this).parent().children(".card").attr("alt","");
    	});
        
        $(".card").on('click',function(){ // 点击缩略图显示图片详情
            var winheight=window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight; // 窗口可视高度
            var winwidth=window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // 窗口可视宽度
            var src=$(this).attr('src');
            var alt=$(this).attr('alt');
            var w= (winwidth>=900)? 850 : (winwidth-100); 
            var h= (winheight>=480)? 450 : (winheight-100);
            $("#pre_pic_detail .pic_detail").attr({"src":src,"alt":alt});
            $("#pre_pic_detail .pic_detail").css({width:w+"px",height:h+"px",zoom:"100%"});
            $("#pre_pic_detail").css("visibility","hidden"); 
            $("#pre_pic_detail").modal({
                show:true,
                // backdrop:'static',
            }); 
        });

        $("#pre_pic_detail .previous").on('click',function(){ // 点击到上一张
            var cur_src=$("#pre_pic_detail .pic_detail").attr("src");
            var card_arr=[],j=0,cur_index;  // 获取已传图片的src数组和当前图片在数组中的索引
            for(var i=1;i<=3;i++){
                var src=$("#card"+i).attr("src");
                if(src!=""){
                    card_arr[j]=src;
                    if(src==cur_src){
                        cur_index=j;
                    }
                    j++;
                }
            }
            if(card_arr.length>1){
                var next_src=card_arr[(cur_index-1+card_arr.length)%card_arr.length];
                $("#pre_pic_detail .pic_detail").attr("src",next_src);
            }
        });

        $("#pre_pic_detail .next").on('click',function(){  // 点击到下一张
            var cur_src=$("#pre_pic_detail .pic_detail").attr("src");
            var card_arr=[],j=0,cur_index;  // 获取已传图片的src数组和当前图片在数组中的索引
            for(var i=1;i<=3;i++){
                var src=$("#card"+i).attr("src");
                if(src!=""){
                    card_arr[j]=src;
                    if(src==cur_src){
                        cur_index=j;
                    }
                    j++;
                }
            }
            if(card_arr.length>1){
                var next_src=card_arr[(cur_index+1)%card_arr.length];
                $("#pre_pic_detail .pic_detail").attr("src",next_src);
            }
        });

        $("#pre_pic_detail .enlarge").on('click',function(){ // 放大
            var obj=$("#pre_pic_detail .pic_detail")[0];
            var zoom=parseFloat($(obj).css("zoom"))*100;
            if(parseInt(zoom)<100)
                obj.style.zoom=(parseInt(zoom)+10)+'%';
            CheckPosition();
        });

        $("#pre_pic_detail .shrink").on('click',function(){ // 缩小
            var obj=$("#pre_pic_detail .pic_detail")[0];
            var zoom=parseFloat($(obj).css("zoom"))*100;
            if(parseInt(zoom)>10)
                obj.style.zoom=(parseInt(zoom)-10)+'%';
            CheckPosition();
        });  

    });
});