//When the page is ready, execute the init function
$(document).ready(function(){
  spice.app.init();
});

var spice = spice || {};

spice.app =  (function(){

  var addPerson,
      removePerson,
      appendPersonToGrid,
      fillGrid,

      onRemoveClick,
      onAddSubmit,
      init,

      //I added id's to make things easier to find in the DOM
      celebrityArray = [
        { name: "Mark-Paul Gosselaar", photo_url: "", id:"1" },
        { name: "Delta Burke", photo_url: "img/avatars/delta.png", id:"2"  },
        { name: "Alf", photo_url: "img/avatars/alf.png", id:"3"  },
        { name: "Jaleel White", photo_url: "img/avatars/jaleel.png", id:"4"  },
        { name: "Ralph Macchio", photo_url: "img/avatars/ralph.png", id:"5"  },
        { name: "Candace Cameron", photo_url: "img/avatars/candace.png", id:"6"  },
        { name: "Patrick Duffy", photo_url: "img/avatars/pduff.png", id:"7"  },
        { name: "Arnold Schwartzengger", photo_url: "img/avatars/arnold.png", id:"8"  }
      ]
      ;
  /*
    Add Create button listeners
    Populate grid with items in celebityArray
   */
  init = function(){
    $('form button').click(onAddSubmit);
    fillGrid();
  };

  /*
    populate grid by passing data into a grid_item template.
   */
  fillGrid = function(){
    _.each(spice.app.data,function(item){
      appendPersonToGrid(item);
    });
  };

  /*
   Call underscores template function with data argument and prepend that to the person grid.
   Then add the remove event listeners.

   Another way to do this would be to:
   $('#personGrid').prepend($(spice.templates.gridItem(data)).

   However, in the above, the new DOM object hasn't been created so adding .click to the end it will not work.
   Thus you would have to add it via another method like:
   $('.grid_item[personid="' + object.id +  '"]').click....

   So the current implementation is cleaner
   */
  appendPersonToGrid = function(data){
    $(spice.templates.gridItem(data)).prependTo('#personGrid').find('.close_btn').click(onRemoveClick)
  };

  /*
    When a user clicks the close ('x') button:
      Get the personid from the button
      Remove the person from the data array
      Remove the html: Note that jQuery.remove() also deletes the bound event handlers freeing up memory.
   */
  onRemoveClick = function(evt){
    var id = $(evt.currentTarget).attr('personid');
    removePerson(id);
    $('.grid_item[personid="' + id +  '"]').remove()
  };

  /*
      When a user clicks the create button:
      Add the person to the data array by getting the input values and calling the addPerson function
      Add the person to the DOM by passing the personObj into the appendPersonToGrid function
   */
  onAddSubmit = function(evt){
    var personObj = addPerson($('#nameInput').val(),$('#photoURLInput').val());
    appendPersonToGrid(personObj);
    return false;
  };

  /*
    Create a person object from the passed in data.
    Make the id some random number. Normally you'd check for id collisions, though problem via the backend.

    After you make the object, add it to data array
    Then return it so that the calling function can use the new obj
   */
  addPerson = function(name,photo_url){
    var obj = {};
    obj.name = name;
    obj.photo_url = photo_url? photo_url:"img/default.png";
    obj.id = Math.floor(Math.random()*100000000 + 1).toString();
    spice.app.data.push(obj);
    return obj;
  };

  /*
    Use underscore to find the first matching object by 'id'.
    Then have it return an array without that object.
   */
  removePerson = function(id){
    spice.app.data = _.without(spice.app.data,_.findWhere(spice.app.data,{id:id}))
  };

  return {
    data:celebrityArray,
    init:init
  }


})();

