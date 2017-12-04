$(document).ready(function(){
    $(window).on("load",function(){
        imgLocation();

        //模拟滚动加载更多
        var imgData={"data":[{"src":"jj1.jpg"},{"src":"jj2.jpg"},{"src":"jj3.jpg"},{"src":"jj4.jpg"},{"src":"jj5.jpg"},{"src":"jj6.jpg"},{"src":"jj7.jpg"},{"src":"jj8.jpg"},{"src":"jj9.jpg"},{"src":"jj10.jpg"},{"src":"jj1.jpg"}]};
        window.onscroll = function(){
            if(scrollSide()){
                $.each(imgData.data,function(index,value){
                    var boxDiv = $("<div>").addClass("box").appendTo($("#container"));
                    var contentDiv = $("<div>").addClass("content").appendTo(boxDiv);
                    console.log("./img/"+$(value).attr("src"));
                    $("<img>").attr("src","./img/"+$(value).attr("src")).appendTo(contentDiv);
                });
                imgLocation();
            }
        };
    });
});

function scrollSide() {
    var box = $(".box");
    var lastboxHeight = box.last().get(0).offsetTop+Math.floor(box.last().height()/2);
    var documentHeight = $(document).height();
    var scrollHeight = $(window).scrollTop();
    return (lastboxHeight < scrollHeight+documentHeight)?true:false;
}

function imgLocation() {
    //得到每行的个数
    var boxs = $(".box");
    var boxWidth = boxs.eq(0).width();
    var num = Math.floor($(window).width()/boxWidth);

    //将下一行第一个图放在上一行最矮的图下方
    var boxArr=[];
    boxs.each(function(index,value){
        var boxHeight = boxs.eq(index).height();
        if(index<num){
            boxArr[index] = boxHeight;
        }else {
            var minboxHeight = Math.min.apply(null, boxArr);
            var minboxIndex = $.inArray(minboxHeight, boxArr);
            // console.log(minboxIndex);
            // console.log(value);
            $(value).css({
                "position":"absolute",
                "top":minboxHeight,
                "left":boxs.eq(minboxIndex).position().left
            });
            boxArr[minboxIndex]+=boxs.eq(index).height();
        }
    });
}