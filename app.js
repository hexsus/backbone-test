console.log(1);
var Book = Backbone.Model.extend({
    validate: function (attr, opt) {
        if(attr.published && typeof attr.published !== 'number') {
            return '`published` should be a number' 
        }
    }
});