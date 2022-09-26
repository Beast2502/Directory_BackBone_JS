app = app || {};

app.views.Person = Backbone.View.extend({
    tagName : 'li',
    attributes : function(){
        return {
            class : 'person' + this.model.get('type')
        }
    },
    events: {
        'click .list-header' : 'showDetails'
    } ,

    template : _.template($('#person-template').html()),
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },
    showDetails : function(e){
        $(e.target).toggleClass('active');
        $(e.target).siblings('.details').slideToggle('fast');

    }
});

app.views.People = Backbone.View.extend({
    el : '#wrapper',
    initialize : function(data){
        this.collection = new app.collections.People(data);
        this.render();
        this.on('change:searchFilter' , this.filterBySearch,this);
        this.collection.on("reset" , this.render , this);
    },
    events:{
        'keyup #searhBox' : 'serachFilter'
    },
    render : function(){
        let self = this;
        $('#listing').empty();
        _.each(this.collection.models, function(person){
            self.renderPerson(person);
        },this)
    },
    renderPerson : function(person){
        let newPerson = new app.views.Person({
            model:person
        });
        $('#listing').append(newPerson.render().el);
    },
    serachFilter : function(e){
        this.serachFilter = e.target.value;
        this.trigger('change:searchFilter');
    },
    filterBySearch: function(){
        this.collection.reset(directoryData ,{silent:true});
        let filterString = this.serachFilter, 
        filtered = _.filter(this.collection.models, function(item){
            return item.get('lastname').toLowerCase().indexOf(filterString.toLowerCase()) !== -1;
        })
        this.collection.reset(filtered);
    }
})