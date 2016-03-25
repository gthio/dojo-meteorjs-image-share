if (Meteor.isServer){
    
    Meteor.startup(function(){
       if (Images.find().count() == 0){
           Images.insert(
               
            {
                img_src : "meteor_1.jpg",
                img_alt : "meteor 1 pic"
            }
           );
       } 
        
    });
    
}