<script>   
    var elid="";
    module.exports = {
        methods:{            
            showDataList: function(el){
                var div = $("#idrop-"+this.elId); 
                $(".showInput").hide();
                div.show(),div.css("left",el.target.offsetLeft+"px"),div.css("min-width",el.target.offsetWidth+"px");                    
                el.srcElement.select();                  
                this.dataList = searchData(this.dataDefault,this.noResultsMsg,this.elId);  
                elid = this.elId;                
                
            },
            selectData : function(el){                   
                if(el.toElement.dataset.vlues != 0){            
                    var input = $("#"+this.elId);                    
                    var div = $("#idrop-"+this.elId);                                
                    input.val(el.target.innerHTML),div.hide(); 
                }
            },
            searchData : function(el){                    
              this.dataList = searchData(this.dataDefault,this.noResultsMsg,this.elId);        
            },
            selectType : function(){
                if(this.Type == "select"){
                    return 1;
                }
                return 0;
            },
            getData: function(){
                var option = JSON.parse(this.dataOption);
                if(this.Type == 'dropdown'){
                    var url = option.dataPath;                   
                    this.$http({
                        url: url,
                        method: 'GET',                    
                    }).then(function (response) {                    
                        this.dataDefault = response.data;
                    }, function (response) {
                        //request error
                    });
                }
            }            
        },
        props: ['inputType',"dataOption"],
        data: function() {             
            var option = JSON.parse(this.dataOption);               
            return {
                dataList:  {},
                dataDefault: {},
                Type: this.inputType,
                noResultsMsg: option.noResultsMsg,
                elId:parseInt(Math.random()*100000)
                
            }
        },
        ready: function() {
          // GET request
          this.getData();
       }
    }
    
    var searchData = function(arrdata,noResultsMsg,elid){
          var arr=[];
          var values = $("#"+elid).val();         
          for(var i=0;i<arrdata.length;i++){
            if(arrdata[i].dataText.indexOf(values) >= 0){
                arr.push(arrdata[i])
            }
          }                        
          if(values == ""){
            return  arrdata;           
          }else{                
            if(arr.length === 0){
                arr.push({"dataText":noResultsMsg,"dataValue":"0"})
            }
            return  arr; 
          }
    };    
    $(document).on("click",function(e){          
        if(e.target.id.indexOf(elid) >= 0){
            return;
        }else{                    
            $(".showInput").hide(); 
        }
    })
</script>

<template >     
        <input type="text" class="dropdown" id="{{elId}}" @focus="showDataList" @keyup="searchData" />
        <div id="idrop-{{elId}}" class="showInput" v-if="this.Type == 'dropdown'">        
            <div v-for="item in dataList" data-vlues="{{item.dataValue}}" id="idrop-item-{{elId}}"  @click="selectData">{{ item.dataText }}</div>
        </div> 
</template>

<style>
    .showInput{                                        
        float: left;
        display:none;
        position: absolute;
        background: #fff;
        z-index:999;
        overflow: auto;
        max-height: 245px;         
        box-shadow: 1px 1px 2px #ccc;
    }
    .showInput div{
        width: 100%;
        cursor: pointer;
        padding: 5px;
        white-space: pre-wrap;
        border-bottom: 1px solid #f3f3f3;        
    }
    .showInput div:last-child{
        border-bottom:0px;
    }
    .showInput div:hover{
        background: #eee;
    }
</style>
