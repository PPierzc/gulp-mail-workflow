# gulp-mail-workflow

A simple framework to build styled emails quickly.

### Getting Started
#### Fork this repository
#### The Workflow
Put the data you want to use into `/src/data/` in the form of a JSON and call it `news.json`.
e.g.
	
	{
		"title": "Example Title",
		"body": "Example body",
	}
Next design the layout using pug and place the .pug file into `/src/templates/`
e.g.
	
	head
		link(rel='stylesheet', type='text/css', href='all.css')
	h2= title
	p= body

Finally style the mail using sass and place your .scss file into `/src/sass/`.

The framework allows realtime editing through running the `gulp serve` command. This will open a new card in your browser and it will show you your design.