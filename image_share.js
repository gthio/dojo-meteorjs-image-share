Images = new Mongo.Collection("images");

console.log(Images.find().count());

if (Meteor.isClient) {
        
  Template.images.helpers({images: Images.find({}, {sort: {rating: -1}})});
  
  Template.images.events(
      {
          'click .js-image' : function (event) {
              $(event.target).css("width", "50px");
          },
          
          'click .js-image-del': function (event){
              var image_id = this._id;
              
              $("#" + image_id).hide('slow', function(){
                Images.remove({"_id": image_id});                  
              })},
              
         'click .js-image-rate' : function (event) {
            
            var rating = $(event.currentTarget).data("userrating");
            var image_id = this.id;
            
            Images.update({_id: image_id}, {$set: {rating: rating}});
            
          },
            
            
              
                
          
      }
  );
}

