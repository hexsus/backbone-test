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

var blog1 = new Blog({
    author: 'Nikita',
    title: 'Nikita blog',
    url: 'http://nikitablog.com'
});

var blog2 = new Blog ({
    author: 'Jhon',
    title: 'Jhons blog',
    url: 'http://jhonsblog.con'
});


// instatiate collections

var blogs = new Blogs([blog1, blog2]);

// Backbone views

var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function () {
        this.template = _.template($('.blog_list_template').html());
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function () {
        this.model.on('add', this.render, this);
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
        console.log(blog.toJSON());
        blogs.add(blog);
    });
});