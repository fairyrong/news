$(".active").click(function() {
    var list = $(this);
    $(".page-block").eq(list.index()).addClass("page-show").siblings().removeClass("page-show")
    list.addClass("hover").siblings().removeClass("hover")
});

//页面就绪,查询所有新闻
$(document).ready(function() {
    searchNewsByKind("所有");
});
//点击查询或刷新,显示当前类别新闻
$(".searchBtn, .refreshBtn").click(function() {
    var kind = $(".newsKindShow span").text();
    searchNewsByKind(kind);
});
//下拉框值改变
$(".selected").change(function() {
    var kind = $('.selected option:selected').text(); //选中的文本
    $(".selected").val(kind);
    $(".newsKindShow span").html(kind);
});
//通过类型查找新闻
function searchNewsByKind(kind) {
    $(".trNews").remove();
    $.ajax({
        type: "GET",
        url: "php/index.php",
        data: {
            kind: kind
        },
        dataTypes: "josn",
        success: function(data) {
            if (data == "blank") { //没有信息
                alert("相关新闻为空！");
            } else {
                $.each(data, function(index, value) { //添加到表格中
                    var tr = $("<tr>");
                    tr.addClass("trNews");
                    $("<td>").text($(value).attr("newsid")).appendTo(tr);
                    $("<td>").text($(value).attr("newskind")).appendTo(tr);
                    var title = sub($(value).attr("newstitle"));
                    $("<td>").text(title).appendTo(tr);
                    var img = sub($(value).attr("newsimg"));
                    $("<td>").text(img).appendTo(tr);
                    var text = sub($(value).attr("newstext"));
                    $("<td>").text(text).appendTo(tr);
                    var link = sub($(value).attr("newslink"));
                    $("<td>").text(link).appendTo(tr);
                    $("<td>").text($(value).attr("newstime")).appendTo(tr);
                    var edit = $("<td>").appendTo(tr);
                    $("<a>").text("编辑 ").addClass("changeNews").appendTo(edit);
                    $("<a>").text("删除").addClass("delNews").appendTo(edit);
                    $(".lastRow").before(tr);
                });
            }
        },
    });
}
function sub(str){
    if(str.length>=15){
        str = str.substring(1,15)+"...";
    }
    return str;
}
//删除新闻
$(".table").on("click", ".delNews", function() {
    //删除后查找一遍
    var tr = $(this).parents("tr");
    var id = tr.find("td").eq(0).text();
    if (id == "") { //从数据库删除
        tr.remove();
    } else {
        $.ajax({
            type: "POST",
            url: "php/del.php",
            data: "id=" + id,
            success: function() {
                alert("删除成功");
                tr.remove();
            }
        });
    }
});
//关闭新闻编辑框
$(".closeNews").click(function() {
    $(".newsData").removeClass("newsDataShow")
});
//编辑新闻
$(".table").on("click", ".changeNews", function() {
    //显示编辑新闻窗口
    var tr = $(this).parents("tr");
    var id = tr.find("td").eq(0).text();
    //添加
    if (id == "") { //没有内容
        $(".newsAdd").addClass("newsDataShow");
        //添加新闻,点击保存
        $(".newsAdd .saveNews").click(function() {
            $.ajax({
                type: "POST",
                url: "php/add.php",
                data: $(".newsAdd").serialize(),
                success: function() {
                    //关闭编辑框
                    $(".newsAdd").removeClass("newsDataShow");
                    alert("添加成功！");
                    //刷新页面
                    var kind = $(".newsKindShow span").text();
                    searchNewsByKind(kind);
                }
            });
        });
    } else { //更新
        $(".newsUpdate").addClass("newsDataShow");
        //显示数据到弹出框
        var id = tr.find("td").eq(0).text();
        var kind = tr.find("td").eq(1).text();
        var name = tr.find("td").eq(2).text();
        var img = tr.find("td").eq(3).text();
        var text = tr.find("td").eq(4).text();
        var link = tr.find("td").eq(5).text();
        var time = tr.find("td").eq(6).text();
        $(".newsUpdate #newsId").val(id); //OK
        $(".newsUpdate #addName").val(name); //OK
        $(".newsUpdate #choseImg").val(img); //file
        $(".newsUpdate #addText").val(text); //OK
        $(".newsUpdate #addLink").val(link); //OK
        $(".newsUpdate #addTime").attr("value",time); //date
        $(".newsUpdate #choseKind").val(kind); //select
        //点击保存
        $(".newsUpdate .saveNews").click(function() {
            $.ajax({
                type: "POST",
                url: "php/update.php",
                data: $(".newsUpdate").serialize(),
                success: function() {
                    //关闭编辑框
                    $(".newsUpdate").removeClass("newsDataShow");
                    alert("修改成功！");
                    //刷新页面
                    var kind = $(".newsKindShow span").text();
                    searchNewsByKind(kind);
                }
            });
        });
    }
});

//添加新闻,添加后编辑
$(".addNews").click(function() {
    var addNews = "<tr> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td></td> <td><a class='changeNews'>编辑</a> <a class='delNews'>删除</a></td> </tr>";
    $(".lastRow").before(addNews);
});
