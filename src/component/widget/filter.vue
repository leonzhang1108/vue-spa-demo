<script> 
    var elid=0;
    module.exports = {
        props: {
            "name":String,
            "id":String,
            "dataList":Object,
            "lableName":String,
            "dataColumns":Object,
            "className":String
        },
        data: function () {
            return {
                input_id:this.id +"-",
                dispalyData:{},
                selectIndex:0
            }
        },
        methods: {
            //生成下拉框
            showDataList: function (el) {
                var dropDiv = $("#drop-" + this.input_id);
                $(".ag--showDropList").hide(); 
                var top = el.target.offsetHeight + el.target.offsetTop;
                var left = el.target.offsetLeft;
                var MinWidth = el.target.offsetWidth;
                el.srcElement.select(); //选中
                this.searchData();  
                dropDiv.show(), dropDiv.css("left", left + "px"),dropDiv.css("top",  top + "px"), dropDiv.css("min-width", MinWidth + "px");
                elid=this.input_id;          
            },  
            searchData:function (){
                var arr = [];
                var values = $("#" + this.input_id).val();
                for (var i = 0; i < this.dataList.data.length; i++) {
                    if (this.dataList.data[i]['dataText'].indexOf(values) >= 0) {
                        arr.push(this.dataList.data[i])
                    }
                    
                }   
                
                if (values == "") {
                    this.dispalyData = this.dataList.data;                    
                } else {
                    if (arr.length === 0) {
                        arr.push({"dataText": "没有匹配到", "dataValue": "0"})
                    }                    
                    this.dispalyData = arr;                    
                }
            },
            //下拉框选中后操作
            selectData: function (el) {
                if (el.toElement.dataset.values != 0) {
                    var input = $("#" + this.input_id);
                    var div = $("#drop-" + this.input_id);                     
                    input.val(el.target.innerHTML.trim()), div.hide();
                }
            },
            //填写过滤下拉框数据
            queryData: function (el) {
                this.dispalyData = this.searchData();  
            },
            //onTab关闭DropList
            onBlur: function (el) {
                $("#drop-" + this.input_id).hide();
            },
            //上
            onArrowTop: function (el) {
                var Drop = $("#drop-"+ this.input_id);
                var item = Drop.find(".ag--showDropList-item");     
                var itemIndex = $(".ag--selectDrop-item").index();
                item.removeClass("ag--selectDrop-item");
                if(itemIndex == 0){
                    itemIndex = 0;                                        
                }else if(itemIndex > 0 && itemIndex < item.length){                    
                    itemIndex--;
                }else if(itemIndex == -1){                    
                    itemIndex = 0;
                }                
                item.eq(itemIndex).addClass("ag--selectDrop-item"); 
                Drop.scrollTop(item.eq(itemIndex).position().top)
            },
            //下
            onArrowDw: function (el) {                
                var Drop = $("#drop-"+ this.input_id);
                var item = Drop.find(".ag--showDropList-item");
                var itemIndex = $(".ag--selectDrop-item").index();
                item.removeClass("ag--selectDrop-item");
                if(itemIndex == item.length - 1){
                    itemIndex = item.length - 1;                                        
                }else if(itemIndex >= 0 && itemIndex < item.length){                    
                    itemIndex++;
                }else if(itemIndex == -1){                    
                    itemIndex = 0;
                }                
                item.eq(itemIndex).addClass("ag--selectDrop-item"); 
                Drop.scrollTop(item.eq(itemIndex).position().top)
                
            },
            onEnter:function(){
                var input = $("#" + this.input_id);
                var div = $("#drop-" + this.input_id);
                if($(".ag--selectDrop-item").length){
                     input.val($(".ag--selectDrop-item").html().trim()), div.hide();                      
                     input.blur();
                 }else{
                    var content = div.find(".ag--showDropList-item").eq(0).html().trim();
                    input.val(content), div.hide();                      
                    input.blur();
                 }  
                this.selectIndex  = 0; 
                $(".ag--showDropList").scrollTop(0),$(".ag--showDropList-item").removeClass("ag--selectDrop-item");        
            }
        }
    }    

    //全局点击事件监听
    $(document).on("click", function (e) {        
        if (e.target.id.indexOf(elid) >= 0) {
            return;
        } else {            
            $(".ag--showDropList").hide(),$(".ag--showDropList").scrollTop(0),$(".ag--showDropList-item").removeClass("ag--selectDrop-item");
        }
    })
    $(document).on("keyup",function (event){    
        if(event.keyCode == 9){
            var type = event.target.attributes['data-type'] || "";
            if(type != ""){
                if(type.value != "date" && type.value != "filter" ){
                    $(".ag--showDropList").hide(),$(".ag--showDropList").scrollTop(0),$(".ag--showDropList-item").removeClass("ag--selectDrop-item");
                }
            }
        }
    })
</script>

<template>
    <div class="ag--input-wrap {{className}}" >
        <label>{{lableName}}：</label>
        <input type="text" id="{{input_id}}" name="{{name}}" data-type="filter" @focus="showDataList" autocomplete="off"  @keyup="searchData" @keyup.38="onArrowTop"  @keyup.40="onArrowDw" @keyup.13="onEnter"  />        
        <div id="drop-{{input_id}}" class="ag--showDropList">
            <div v-for="item in dispalyData" data-values="{{item[dataColumns.value]}}" id="drop-item-{{input_id}}" class="ag--showDropList-item" @click="selectData">
                {{item[dataColumns.name] }}
            </div>
        </div>
    </div>
</template>

<style>
    .ag--showDropList{        
        display: none;
        position: absolute;
        background: #fff;
        z-index: 999;
        overflow: auto;
        max-height: 245px;
        box-shadow: 1px 1px 2px #ccc;
    }
    .ag--filter-item label{
        display: inline-block;
    }
    .ag--showDropList-item{
        cursor: pointer;
        padding: 5px;
    }
    .ag--showDropList-item:hover{
        background-color: aliceblue;
    }
    .ag--selectDrop-item{
        background-color: aliceblue;
    }
</style>
