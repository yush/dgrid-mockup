define(["dojo/_base/declare", "SsThrow"], function(declare, SsThrow){
  return declare(null, {
    constructor: function(){
    	this.listThrow = [];
    },
    
    addThrow: function() {
    	console.log("addThrow");
    	t = new SsThrow();
    	t.index = this.listThrow.length;
    	this.listThrow.push(t);
    	return t;
    },
    
    
   columnHeaders: function() {
	   headers = this.listThrow.map(function(aItem){
		   return col["col"+aItem.index] = aItem.index;
	   });
	   return headers;
   },
   
   columnData: function() {
       
   },
  });
});
