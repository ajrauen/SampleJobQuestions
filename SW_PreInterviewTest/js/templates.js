/*
    Ideally, this would have been created with something like Handlebars and precompiled. Underscores templates are
     not really suited to 'complex' HTML. It could have been 'neater' by putting it in the HTML but, then your mixing
     view and logic. Having it as a JS object also makes it reusable in other pages.
 */

var spice = spice || {};

spice.templates = (function(){
    var gridItem =  _.template('<div personid="<%= id %>" class="grid_item">'+
        '          <div class="grid_item_container">'+
        '            <div class="person_left_container">'+
        '              <div class="image_container">'+
        '               <% if (photo_url){ %>'+
        '                <img src="<%= photo_url %>">'+
        '               <% } else { %>' +
        '                <img src="img/default.png">'+
        '               <% } %>' +
        '              </div>'+
        '            </div>'+
        '            <div class="person_right_container">'+
        '              <div class="grid_item_close_container">'+
        '                <button personid="<%= id %>" class="close_btn"></button>'+
        '              </div>'+
        '              <label><%= name %></label>'+
        '            </div>'+
        '          </div>'+
        '        </div>');

    return {
        gridItem:gridItem
    }


})();

