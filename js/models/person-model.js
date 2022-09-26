app = app || {};

app.models.Person = Backbone.Model.extend({
    defaults: {
        'ID' : '',
        'firstname' : '',
        'lastname' : '',
        'homephone' : '',
        'email' : '',
        'parent' : ''
    },
    initialize : function(){
        let self = this;
        if(this.get('person') !== ''){
            self.set('type' ,'student');
        } else {
            self.set('type' , 'parent');
        }

    }
})


app.collections.People = Backbone.Collection.extend({
    model : app.models.Person,
    comparator : function(person){
        return person.get('latname');
    }
})