if (Meteor.isClient) {
  var img_data = {
      img_src : "meteor.jpg",
      img_alt : "meteor pic"
  };        
  
  Template.images.helpers(img_data);
}

if (Meteor.isServer) {

}
