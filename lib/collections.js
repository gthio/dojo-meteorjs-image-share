Images = new Mongo.Collection("images");

Images.allow({

  insert: function(userId, doc){
    
    console.log("testing security on image insert");

    if (Meteor.user()){
      
      if (doc.createdBy != userId){
        return false;
      }
      else {
        return true;
      }
      
    }
    else {
      return false;
    }
  },

  remove: function(userId, doc) {
    return true;
  }
    
});