var HeaderModel = Backbone.Model.extend({
  url: "data/resume.json"
});
var HeaderView = Backbone.View.extend({
  el: 'body',
  template: _.template($('#header').html()),
  model: new HeaderModel,
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
var ResumeView = Backbone.View.extend({
  el: 'body',
  initialize: function(){
    this.render();
  },
  render: function(){
    this.$el.html("<h1>TEST</h1>");
  }
});

//var resumeView = new ResumeView();
var headerView = new HeaderView();
