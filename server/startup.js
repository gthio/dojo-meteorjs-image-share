Meteor.startup(function(){
  
  if (Images.find().count() == 0){
    for (var i = 1; i <= 3 ; i++){
      
      Images.insert({
        img_src: "meteor_" + i + ".jpg",
        img_alt: "meteor " + i + " pic"
        });
    }

    console.log("startup.js says: " + Images.find().count());
  } 
});