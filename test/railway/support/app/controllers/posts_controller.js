load('application');
   

action('index', function() {
    render();
});

action('show', function() {
    render();
});

action('edit', function() {
    render();
});

action('destroy', function() {
    render();
});

action('create', function() {
    render();
});

action('new', function() {
    render();
});

action('update', function() {
    render();
});

action('pathtohelper', function() {
    send({
        path_posts_noparams     : path_to.posts(),
        path_newpost_noparams   : path_to.new_post(),
        path_editpost_noparams  : path_to.edit_post(),
        path_post_noparams      : path_to.post(),

        path_posts_params       : path_to.posts(),     // no params here, because /posts does not take params, except .:format, which is tested later
        path_newpost_params     : path_to.new_post(),  // no params here, because /posts does not take params, except .:format, which is tested later
        path_editpost_params    : path_to.edit_post(123),
        path_editpost_params_obj: path_to.edit_post({id: '123-id'}),
        path_post_params_obj    : path_to.post({id: '321-id'}),

        path_posts_params_format    : path_to.posts({format: 'json'}),
        path_newpost_params_format  : path_to.new_post({format: 'json'}),
        path_editpost_params_format : path_to.edit_post(123, {format: 'json'}),
        path_post_params_format     : path_to.post(321, {format: 'json'}),

        // here we test the "as" option from routes.js config map.resources('posts', {as: 'articles'})
        path_articles_noparams     : path_to.articles(),
        path_newarticle_noparams   : path_to.new_article(),
        path_editarticle_noparams  : path_to.edit_article(),
        path_article_noparams      : path_to.article(),

        path_articles_params       : path_to.articles(),     // no params here, because /articles does not take params, except .:format, which is tested later
        path_newarticle_params     : path_to.new_article(),  // no params here, because /articles does not take params, except .:format, which is tested later
        path_editarticle_params    : path_to.edit_article(123),
        path_editarticle_params_obj: path_to.edit_article({id: '123-id'}),
        path_article_params_obj    : path_to.article({id: '321-id'}),

        path_articles_params_format    : path_to.articles({format: 'json'}),
        path_newarticle_params_format  : path_to.new_article({format: 'json'}),
        path_editarticle_params_format : path_to.edit_article(123, {format: 'json'}),
        path_article_params_format     : path_to.article(321, {format: 'json'})
    });
});
/*
        posts GET    /posts.:format?             posts#index
        posts POST   /posts.:format?             posts#create
     new_post GET    /posts/new.:format?         posts#new
    edit_post GET    /posts/:id/edit.:format?    posts#edit
         post DELETE /posts/:id.:format?         posts#destroy
         post PUT    /posts/:id.:format?         posts#update
         post GET    /posts/:id.:format?         posts#show
        posts GET    /postings.:format?          posts#index
        posts POST   /postings.:format?          posts#create
     new_post GET    /postings/new.:format?      posts#new
    edit_post GET    /postings/:id/edit.:format? posts#edit
         post DELETE /postings/:id.:format?      posts#destroy
         post PUT    /postings/:id.:format?      posts#update
         post GET    /postings/:id.:format?      posts#show
     articles GET    /posts.:format?             posts#index
     articles POST   /posts.:format?             posts#create
  new_article GET    /posts/new.:format?         posts#new
 edit_article GET    /posts/:id/edit.:format?    posts#edit
      article DELETE /posts/:id.:format?         posts#destroy
      article PUT    /posts/:id.:format?         posts#update
      article GET    /posts/:id.:format?         posts#show
 pathtohelper GET    /pathtohelper               posts#pathtohelper
              ALL    /:controller/:action        undefined#undefined
              ALL    /:controller/:action/:id    undefined#undefined
 */