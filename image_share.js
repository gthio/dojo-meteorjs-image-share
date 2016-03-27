Images = new Mongo.Collection("images");

console.log(Images.find().count());

if (Meteor.isClient) {
    
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_AND_EMAIL"
    });
        
  Template.images.helpers({
      images: Images.find({}, {sort: {createdOn: -1, rating: -1}}),
      
      getUser:function(user_id){
          
          var user = Meteor.users.findOne({_id:user_id});
          if (user){
              return user.username;
          }
          else{
              return "anonymouse user"
          }
      }
      
      });
  
  
  
  Template.body.helpers({username: function() {
      
      if (Meteor.user())
      {
          return Meteor.user().username;
      }
      else
      {
          return "anonymous internet user";
      }
  }
  });
  
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
          
          'click .js-show-image-form' : function(event){
              
              $("#image_add_form").modal('show')
          }
      }
  );
  
  Template.image_add_form.events({
    
    'submit .js-add-image': function(event){
        var img_src, img_alt;
        
        img_src = event.target.img_src.value;
        img_alt = event.target.img_alt.value;
        
        console.log(img_src + " - " + img_alt);
        
        if(Meteor.user()){
          Images.insert({
            
            img_src: img_src,
            img_alt: img_alt,
            createdOn: new Date(),
            createdBy: Meteor.user()._id
        });          
        }

        
        $("#image_add_form").modal('show');
        
        return false;
    }
   
      
  });
}

