define(['bower_components/dojo/_base/declare', 'bower_components/dojo/dom', 'bower_components/dojo/dom-construct'], function(declare, dom, Build, SsThrowView){
    'use strict';
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
        constructor: function() {
            this.data = {};
            this.listThrow = [];
        },
        
        loadJson: function(aDataTrick) {
            this.data = aDataTrick;
        },

        toHtml: function() {
            var grid = Build.create('table', {class: 'table table-bordered'});

            // cree le header
            var header = Build.create('thead', {innerHTML: '<tr></tr>'});
            Build.place(header, grid);
            // crée la colonne qui va lister les propriétés
            var colHeader = Build.create('th', {innerHTML: 'Prop'}); 
            Build.place(colHeader, header);
    
            // crée la colonne Time
            for (var iTime =0; iTime < this.data.time.length; iTime++) {
                var aTime = this.data.time[iTime];
                colHeader = Build.create('th', { 
                        innerHTML: 'Time '+iTime,
                        colspan: aTime.length
                    });
                Build.place(colHeader, header, 'last');
            }

            // cree le contenu: pour chaque propriete trouvé, on parcours tout les temps
            var tbody = Build.create('tbody');
            Build.place(tbody, grid);
            var listProp = this.data.properties;
            for (var i =0; i < listProp.length; i++) {
                var h = '';
                for (var c = 0; c < this.data.time.length; c++) {
                    var aTime =  this.data.time[c];
                    for (var idxThrow = 0; idxThrow < aTime.length; idxThrow++) {
                        var aThrow = aTime[idxThrow]; 
                        h = h+'<td><input data-dojo-type="dijit/form/comboBox" value="'+aThrow[i]+'"></input></td>';
                    }
                }
                var row = Build.create('tr', {innerHTML: h});
                Build.place(row, tbody, 'last');
            }
            return grid;
        },

    });
});
