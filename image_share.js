Images = new Mongo.Collection("images");

console.log(Images.find().count());

if (Meteor.isClient) {
        
  Template.images.helpers({images: Images.find()});
  
  Template.images.events(
      {
          'click .js-image' : function (event) {
              $(event.target).css("width", "50px");
          },
          
          'click .js-image-del': function (event){
              var image_id = this._id;
              
              $("#" + image_id).hide('slow', function(){
                Images.remove({"_id": image_id});                  
              })
          }
      }
  );
}

