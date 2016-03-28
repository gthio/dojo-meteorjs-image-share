Session.set("imageLimit", 4);
    
lastScrollTop = 0;
    
$(window).scroll(function(event){
    if ($(window).scrollTop() + $(window).height() > $(document).height() - 100){

        var scrollTop = $(this).scrollTop();
            
        if (scrollTop > lastScrollTop) {

            Session.set("imageLimit", Session.get("imageLimit") + 2);
        }
            
        lastScrollTop = scrollTop;
    } 
});
    
    
Accounts.ui.config({
    
    passwordSignupFields: "USERNAME_AND_EMAIL"
});
        
Template.images.helpers({
      
    images:function(){
      
        if (Session.get("userFilter")){
            
            return Images.find({createdBy: Session.get("userFilter")}, {sort: {createdOn: -1, rating: -1}});
        }
        else {
            
            return Images.find({}, {sort: {createdOn: -1, rating: -1}, limit: Session.get("imageLimit")});
        }
    },
      
    filtering_images:function(){
        
        if (Session.get("userFilter")){
            
            return true;
        }  
        else {
            
            return false;
        }
    },
      
    getFilterUser:function(){
        
        if (Session.get("userFilter")){
            
            var user = Meteor.users.findOne(
                {_id: Session.get("userFilter")});
                 
                return user.username;
        }
        else {
              
            return "anom";
        }
    },
      
    getUser:function(user_id){
          
        var user = Meteor.users.findOne({_id:user_id});
        
        if (user) {
        
            return user.username;
        }
        else {
            
            return "anonymouse user"
        }
    }      
});
  
Template.body.helpers({

    username: function(){
      
        if (Meteor.user()){
            
          return Meteor.user().username;
        }
        else{
          
          return "anonymous internet user";
        }
    }
});
  
Template.images.events({
    
    'click .js-image' : function (event){
        
        $(event.target).css("width", "50px");
    },
          
    'click .js-image-del': function (event){
        
        var image_id = this._id;
              
        $("#" + image_id).hide('slow', function(){
        
            Images.remove({"_id": image_id});                  
        })
    },
              
    'click .js-image-filter': function(event){
        
        Session.set("userFilter", this.createdBy);
    },  
              
    'click .js-image-filter-remove': function(event){
              
        Session.set("userFilter", undefined);
    },               
              
    'click .js-image-rate' : function (event){
            
        var rating = $(event.currentTarget).data("userrating");
        var image_id = this.id;
            
        Images.update({_id: image_id}, {$set: {rating: rating}});
            
    }, 
          
    'click .js-show-image-form' : function(event){
              
        $("#image_add_form").modal('show')
    }
      
});
  
Template.image_add_form.events({
    
    'submit .js-add-image': function(event){
        
        var img_src, img_alt;
        
        img_src = event.target.img_src.value;
        img_alt = event.target.img_alt.value;
        
        console.log(img_src + " - " + img_alt);
        
        if(Meteor.user()) {
            
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