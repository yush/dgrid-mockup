define(["dojo/_base/declare", "SsThrow"], function(declare, SsThrow){
    /*
     * Principe fonctionnement:
     * Etape 1
     * ========
     * Une fonction affiche un tableau a partir de la description json d'un trick
     * A chaque ajout de colonne on met à jour le json, et on réaffiche l'ensemble du tableau
     *
     * Etape 2
     * =======
     * On réinjecte dans le tableau existant que le fragment nécessaire
     */

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
