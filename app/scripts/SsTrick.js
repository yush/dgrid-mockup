define(['bower_components/dojo/_base/declare', 'bower_components/dojo/dom', 'bower_components/dojo/dom-construct'], function(declare, dom, Build, SsThrow){
    'use strict';

    return declare(null, {
        constructor: function() {
            this.name = '';
            this.time = [];
            this.properties = ['ssTime', 'ssBase', 'thrHand', 'thrPos', 'catHand', 'catPos'];
        },

        addTime: function() {
            console.log('addThrow');
            var aThrow = {};
            for(var i=0; i < this.properties.length; i++) {
                aThrow[this.properties[i]] = ' ';
            }
            var arr = new Array();
            arr.push(aThrow);
            this.time.push(arr); 
        },

        
    });
});
