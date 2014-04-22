define(['dojo/_base/declare', 'dojo/dom', 'dojo/dom-construct'], function(declare, dom, Build, SsThrowView){
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
            var grid = Build.create('table', {class: 'table-bordered'});

            // cree le header
            var header = Build.create('thead', {innerHTML: '<tr></tr>'});
            Build.place(header, grid);
            // crée la colonne qui va lister les propriétés
            var colHeader = Build.create('th', {innerHTML: 'Prop'}); 
            Build.place(colHeader, header);
    
            // crée l'entete Time
            for (var iTime =0; iTime < this.data.time.length; iTime++) {
                var aTime = this.data.time[iTime];
                colHeader = Build.create('th', { 
                        innerHTML: '<td>Time '+iTime+'<button id="addThrow-'+iTime+' type="button" class="btn">add Throw</button></td>',
                        colspan: aTime.length
                    });
                Build.place(colHeader, header, 'last');
            }

            // cree le contenu: pour chaque propriete trouvé, on parcours tout les temps
            var tbody = Build.create('tbody');
            Build.place(tbody, grid);
            var listProp = this.data.properties;
            for (var i =0; i < listProp.length; i++) {
                var propName = listProp[i];
                var h = '<td>'+propName+'</td>';
                for (var c = 0; c < this.data.time.length; c++) {
                    var aTime =  this.data.time[c];
                    for (var idxThrow = 0; idxThrow < aTime.length; idxThrow++) {
                        var aThrow = aTime[idxThrow]; 
                        //TODO: http://dojo-toolkit.33424.n3.nabble.com/Creating-widgets-programmatically-td3771022.html
                        h = h+'<td><input data-dojo-type="dijit/form/ComboBox" value="'+aThrow[propName]+'"></input></td>';
                    }
                }
                var row = Build.create('tr', {innerHTML: h});
                Build.place(row, tbody, 'last');
            }
            return grid;
        },

    });
});
