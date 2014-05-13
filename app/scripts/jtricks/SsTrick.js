define(['dojo/_base/declare', 'dojo/dom', 'dojo/dom-construct'], function(declare, dom, Build, SsThrow){
    'use strict';

    return declare(null, {
        constructor: function() {
            this.name = '';
            this.time = [];
            this.properties = ['ssTime', 'ssBase', 'thrHand', 'thrPos', 'catHand', 'catPos'];
        },

        addTime: function() {
            console.log('addTime');
            var aThrow = {};
            for(var i=0; i < this.properties.length; i++) {
                aThrow[this.properties[i]] = ' ';
            }
            var arr = new Array();
            arr.push(aThrow);
            this.time.push(arr); 
        },

        addThrow: function(idxTime) {
            console.log('addThrow '+idxTime);
            // pour le temps correspondant au bouton, on cree un nouveau lancer, que l'on ajoute
            var currentThrow = this.time[idxTime];
            var aThrow = {};
            for(var i=0; i < this.properties.length; i++) {
                aThrow[this.properties[i]] = ' ';
            }
            currentThrow.push(aThrow);
        }
        
    });
});
