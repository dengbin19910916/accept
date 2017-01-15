function JumpTo(obj,href){
  if($(obj).hasClass("has-passed")){
    location.href=href;
  }
}

var stage_len=3;
var steps_len=new Array(3,4);

function WillPass(stage,step){
  localStorage.has_stage=stage;// 已走阶段数
  localStorage.has_step=step; // 已走步骤数
  return true;
}
function setPassed(){
  var stage=localStorage.has_stage;
  var step=localStorage.has_step;
  for(var i=1;i<=stage_len;i++){
    if(i<=stage){
      $(".pre_apply .stages .stage"+i).addClass("has-passed");
      $(".pre_apply .s"+i+"_steps .step").addClass("has-passed");
    }else{
      $(".pre_apply .stages .stage"+i).removeClass("has-passed");
      $(".pre_apply .s"+i+"_steps .step").removeClass("has-passed");
    }
  }
  for(var i=1;i<=steps_len[stage-1];i++){
    if(i<=step){
      $(".pre_apply .s"+stage+"_steps .step"+i).addClass("has-passed");
    }else{
      $(".pre_apply .s"+stage+"_steps .step"+i).removeClass("has-passed");
    }
  }
}
$(function(){
    $(window).load(function(){
          $("nav a.msg").on('click',function(){
              var notice=$(".panel.notice").css("display","block");
              if(notice.hasClass("shownotice")){
                  notice.removeClass("shownotice").addClass("hidenotice");
                  $(this).parent("li").removeClass('active');
              }else{
                  notice.removeClass("hidenotice").addClass("shownotice");
                  $(this).parent("li").addClass('active');
              }
          });
          $(".panel.notice .panel-heading .close").on('click',function(){
              $(".panel.notice").removeClass("shownotice").addClass("hidenotice");
              $("nav a.msg").parent("li").removeClass('active');
          }); 

          $(".panel.notice .list-group .list-group-item").on('click',function(){
             location.href="pre_controlpanel_detail.html";
          });
          $(".dropdown").on('shown.bs.dropdown',function(){
              $(this).addClass("active");
          });
          $(".dropdown").on('hidden.bs.dropdown',function(){
              $(this).removeClass("active");
          });
          $("a.lang").on('click',function(e){
              e.preventDefault();
              $("#setlang").modal({
                show:true,
                backdrop:'static',
              });
          });

          $("#setlang").on('hidden.bs.modal',function(){
              //... 
          });
          $(".save_setlang").on('click',function(){
              $("#setlang").modal('hide');
          });
          $(".cancel_setlang").on('click',function(){
              $("#setlang").modal('hide');
          });

    });
});
