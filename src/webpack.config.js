import '@draft-js-plugins/image/lib/plugin.css';


module.exports = {
	module: {
	  loaders: [
		{
		  test: /plugin\.css$/,
		  loaders: ['style-loader', 'css'],
		},
	  ],
	},
  };