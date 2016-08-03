$(".w-1").click(function() {
    var list = $(this);
    list.addClass("showLi").siblings().removeClass("showLi");
    $(".newsCon").eq(list.index()).addClass("newsConShow").siblings().removeClass("newsConShow");
    var kind = $(".showLi a").attr("rel");
    if (kind != "推荐") {
        loadNews(kind);
    }
});
//点击加载更多
$(".loadMore").click(function() {
    var kind = $(".showLi a").attr("rel"); 
    loadNews(kind);
});
//页面自动加载
$(document).ready(function() {
    var kind = $(".showLi a").attr("rel"); 
    loadNews(kind); 
});
//通过get方式获取json数组
function loadNews(kind) {
	$(".newsConShow").empty(); 
    $.ajax({
        type: "GET",
        url: "php/index.php",
        data: {
        	kind:kind
        },
        dataTypes: "josn",
        success: function(data) {
            if (data == "blank") { //成功
            	var box = $("<div>").addClass("newsBox").value("数据为空").appendTo($(".newsConShow"));
            } else {
                $.each(data, function(index, value) {
                    var box = $("<div>").addClass("newsBox").appendTo($(".newsConShow"));
                    var newsImg = $("<div>").addClass("newsImg").appendTo(box);
                    $("<img>").attr("src", "img/ad/" + $(value).attr("newsimg")).appendTo(newsImg);
                    var newsText = $("<div>").addClass("newsText").appendTo(box);
                    $("<h4>").addClass("newsName").text($(value).attr("newstitle")).appendTo(newsText);
                    var newsOther = $("<div>").addClass("newsOther").appendTo(newsText);
                    $("<span>").addClass("newsTime").text($(value).attr("newstime")).appendTo(newsOther);
                });
            }
        }
    });
}
