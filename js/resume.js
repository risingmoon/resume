/*Resume
 */
var app = app || {};

app.HeaderModel = Backbone.Model.extend({
  url: "data/resume.json"
});


app.EducationCollection = Backbone.Collection.extend({
  section: "#education",
  model: Backbone.Model,
  url: 'data/education.json'
});

app.EducationView = Backbone.View.extend({
  template: _.template("<h2>Education</h2>"),
  initialize: function() {
	this.model.bind('change', this.render, this);
	this.model.fetch();
  },
  render: function() {
    return this.template(this.model.attributes);
  }
});

app.SectionView = Backbone.View.extend({
  el: 'body',
  template: _.template($("#education").html()),
  initialize: function(){
	this.collection.fetch({reset: true})
	this.render();

    //this.listenTo( this.collection, 'add', this.renderEducation );
	//this.listenTo( this.collection, 'reset', this.render );
	//this.model.bind('change', this.render, this);
	//this.model.fetch();
  },
  render: function() {
	this.collection.each(function( item ) {
	  this.renderModel( item );
	}, this );
    //this.$el.append(this.template(this.model.attributes));
	//return this;
  }
});


var HeaderView = Backbone.View.extend({
  el: 'body',
  template: _.template($('#header').html()),
  model: new app.HeaderModel,
  initialize: function(){
	this.model.bind('change', this.render, this);
	this.model.fetch();
	//this.model.fetch();
    //this.render();
  },
  render: function() {
    this.$el.html(this.template(this.model.attributes));
	return this;
  }
});

//new HeaderView();

