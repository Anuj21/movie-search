import { publish } from 'gh-pages';

publish(
	'public', // path to public directory
	{
		branch: 'gh-pages',
		repo: 'https://github.com/Anuj21/movie-search.git', // Update to point to your repository
		user: {
			name: 'Anuj JOSHI', // update to use your name
			email: 'anujjoshi21@gmail.com' // Update to use your email
		}
	},
	() => {
		console.log('Deploy Complete!');
	}
);
