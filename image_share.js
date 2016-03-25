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
}

if (Meteor.isServer) {

}
