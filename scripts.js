// Backbone model

var Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    }
});

// Backbone collections

var Blogs = Backbone.Collection.extend({});

// instantiate two blogs

// var blog1 = new Blog({
//     author: 'Nikita',
//     title: 'Nikita blog',
//     url: 'http://nikitablog.com'
// });
//
// var blog2 = new Blog ({
//     author: 'Jhon',
//     title: 'Jhons blog',
//     url: 'http://jhonsblog.con'
// });


// instatiate collections

var blogs = new Blogs();

// Backbone views

var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function () {
        this.template = _.template($('.blog_list_template').html());
    },
    events: {
        'click .edit_blog': 'edit',
        'click .update_blog': 'update'
    },
    edit:  function () {
      $('.edit_blog').hide();
        $('.delete_blog').hide();
        $('.update_blog').show();
        $('.cancel_blog').show();

        var author = this.$('.author').html();
        var title = this.$('.title').html();
        var url = this.$('.url').html();

        this.$('.author').html('<input type="text" class="form-control author_update" value="' + author + '">');
        this.$('.title').html('<input type="text" class="form-control author_update" value="' + title + '">');
        this.$('.url').html('<input type="text" class="form-control author_update" value="' + url + '">');

    },
    update: function () {
        this.model.set('author', $('.autor_update').val());
        this.model.set('title', $('.title_update').val());
        this.model.set('url', $('.url_update').val());
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs_list'),
    initialize: function () {
        this.model.on('add', this.render, this);
        this.model.on('change', this.render,this);
    },
    render: function () {
        var self = this;
        this.$el.html('');
        _.each(this.model.toArray(), function (blog) {
            self.$el.append((new BlogView({model: blog})).render().$el);
        });
        return this;
    }
});

var blogsView = new BlogsView();

$(document).ready(function () {
    $('.add_blog').on('click', function () {
        console.log(1);
        var blog = new Blog({
            author: $('.author_input').val(),
            title: $('.title_input').val(),
            url: $('.url_input').val()
        });
        $('.top_inputs input').val('');
        console.log(blog.toJSON());
        blogs.add(blog);
    });
});