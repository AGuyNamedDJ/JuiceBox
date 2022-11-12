const express = require('express');
const tagsRouter = express.Router();

const { getAllTags, getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
	console.log('A request is being made to /tags');

	next();
});

tagsRouter.get('/', async (req, res) => {
	const tags = await getAllTags();
	res.send({
		tags,
	});
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
	// read the tagname from the params
	const tagName = req.params.tagName;

	try {
		const allPostsByTagName = await getPostsByTagName(tagName);

		// filter out any posts which are both inactive and not owned by the current user...
		const postsByTagName = allPostsByTagName.filter((post) => {
			if (post.active && post.author.active) {
				return true;
			}
			if (req.user && post.author.id === req.user.id) {
				return true;
			}
			return false;
		});

		res.send({postsByTagName,});
	} catch ({ name, message }) {
		// Sends the name and message to the error handler
		next({ name, message });
	}
});

module.exports = tagsRouter;