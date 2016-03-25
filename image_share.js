Images = new Mongo.Collection("images");

console.log(Images.find().count());

if (Meteor.isClient) {
  var img_data = [
      {
        img_src : "meteor_1.jpg",
        img_alt : "meteor 1 pic"
      },
      {
        img_src : "meteor_2.jpg",
        img_alt : "meteor 2 pic"
      },
      {
        img_src : "meteor_3.jpg",
        img_alt : "meteor 3 pic"
      }];        
  
  Template.images.helpers({images: img_data});
  
  Template.images.events(
      {
          'click .js-image' : function (event) {
              $(event.target).css("width", "50px");
          }
      }
  );
}

if (Meteor.isServer) {

}
