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

app.InterestsModel = Backbone.Model.extend({
	initialize: function(attributes) {
		this.set({
			title: attributes.title,
			interests: attributes.data.join(', ')
		});
	}
});

app.InterestsView = Backbone.View.extend({
	el: "body",
	template: _.template($('#interests').html()),
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.render();
	},
	render: function() {
		this.$el.append(this.template(this.model.attributes));
		return this;
	}
});

app.ResumeModel = Backbone.Model.extend({
	url: '/resume/data/index.json'
});

app.ResumeView = Backbone.View.extend({
	el: 'body',
	initialize: function() {
		app.resume = new app.ResumeModel();
		app.resume.fetch({
			success: function() {
				new app.InterestsView({model: new app.InterestsModel(app.resume.get('interests'))});
			}
		});
		//new app.InterestsView({model: new app.InterestsModel(app.resume.get('interests'))});
		//app.interests = new app.InterestsModel(app.resume.get('interests'));
		//new app.InterestsView({model: app.interests)});
	},
});
