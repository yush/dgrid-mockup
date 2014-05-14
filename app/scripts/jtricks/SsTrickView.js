define(['dojo/_base/declare', 'dojo/dom', 'dojo/dom-construct', 'dijit/form/ComboBox', 'dijit/form/TextBox', 'dojo/query', 'dojo/on'], function(declare, dom, Build, ComboBox, Text, Query, On, SsThrowView ){
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

        toHtml: function(nodeName) {
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
                        innerHTML: '<td>Time '+iTime+'<button id="addThrow-'+iTime+' type="button" class="btnAddThrow")">add Throw</button></td>',
                        colspan: aTime.length,
                    });
                Build.place(colHeader, header, 'last');
            }

            // cree le contenu: pour chaque propriete trouvé, on parcours tout les temps
            var tbody = Build.create('tbody');
            Build.place(tbody, grid);
            var listProp = this.data.properties;
            for (var i =0; i < listProp.length; i++) {
                // pour chaque propriete, on crée une ligne
                var propName = listProp[i];
                var h = '<td>'+propName+'</td>';
                var row = Build.create('tr', {innerHTML: h});
                // pour chaque temps
                for (var c = 0; c < this.data.time.length; c++) {
                    var aTime =  this.data.time[c];
                    // pour chaque lancer (> 1 pour synchrone ou multiplex )
                    for (var idxThrow = 0; idxThrow < aTime.length; idxThrow++) {
                        var aThrow = aTime[idxThrow]; 
                        var cell = Build.create('td');
                        var combo= new Text({
                            name: propName+'-'+c+'-'+idxThrow, 
                            value: aThrow[propName] /* no or empty value! */,
                            placeHolder: "type in"
                        });
                        Build.place(combo.domNode, cell, 'last');
                        Build.place(cell, row);
                        On(combo, 'change', function(e){
                            var name = this.get("name");
                            var newValue = this.get("value");
                            var arr = name.split('-');
                            console.info(arr);
                            trickTest.updateValue(arr[0], arr[1], arr[2], newValue);
                        });
                    }
                }
                Build.place(row, tbody, 'last');
            }

            var domTrick = dom.byId(nodeName);
            Build.place(grid, domTrick, "only");
            this.connectAddThrowEvents();
            return grid;
        },

        updateValue: function(prop, iTime, iThrow, newValue) {
            this.data.time[iTime][iThrow][prop]= newValue;
        },

        connectAddThrowEvents: function() {
            var listBt = Query(".btnAddThrow");
            listBt.forEach(function(n) {
                On(n, 'click', function() {
                    var tTime = listBt.indexOf(n);
                    console.log(n);
                    tk.addThrow(tTime);
                    trickTest.loadJson(tk);
                    h = trickTest.toHtml("trick");
                });
            });
        }, 

    });
});
