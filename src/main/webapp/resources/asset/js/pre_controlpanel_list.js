$(function(){

    $(window).load(function(){
        $(".cplist .panel-heading").on('click',function(){
            $("#condition").collapse('toggle');
            var ss=$(".cplist .panel-title span").eq(1);
            ss.hasClass("glyphicon-chevron-down")?ss.removeClass("glyphicon-chevron-down").addClass("glyphicon-chevron-up"):ss.removeClass("glyphicon-chevron-up").addClass("glyphicon-chevron-down");
        });
           
        $('#applylist').DataTable( {
            ajax: "applylist.txt",
            aLengthMenu:[10,20,30,50],
            columns: [
                { "data": "status" },
                { "data": "date" },
                { "data": "idcard" },
                { "data": "name" },
                { "data": "city" },
                { "data": "dealers" }
            ],
            "order": [[1, 'asc']]
        } );
           
        $('#applylist tbody').on('click', 'tr', function () {
            location.href="pre_controlpanel_detail.html";
        });
    });
    
});