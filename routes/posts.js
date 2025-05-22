const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const db = require('../config/db');

// Search posts
router.get('/search', async (req, res) => {
    try {
        const searchQuery = `%${req.query.q}%`;
        const [posts] = await db.query(
            `SELECT p.*, u.username as author_name 
             FROM posts p 
             JOIN users u ON p.author_id = u.id 
             WHERE p.title LIKE ? OR p.content LIKE ? 
             ORDER BY p.created_at DESC`,
            [searchQuery, searchQuery]
        );

        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get all posts with pagination
router.get('/', async (req, res) => {
    try {
        // Logic to filter by author, without pagination
        const authorId = req.query.author; // Get author ID from query parameter

        let postQuery = `SELECT p.*, u.username as author_name 
                         FROM posts p 
                         JOIN users u ON p.author_id = u.id`;
        const queryParams = [];

        if (authorId) {
            postQuery += ` WHERE p.author_id = ?`;
            queryParams.push(authorId);
        }

        postQuery += ` ORDER BY p.created_at DESC`; // Removed LIMIT and OFFSET

        const [posts] = await db.query(postQuery, queryParams);

        // We are not doing pagination here, so just return the posts
        res.json({ posts });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Get single post
router.get('/:id', async (req, res) => {
    try {
        const [posts] = await db.query(
            `SELECT p.*, u.username as author_name 
             FROM posts p 
             JOIN users u ON p.author_id = u.id 
             WHERE p.id = ?`,
            [req.params.id]
        );

        if (posts.length === 0) {
            return res.status(404).json({ message: 'Post not found' });
        }

        res.json(posts[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Create post
router.post('/', auth, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        const [result] = await db.query(
            'INSERT INTO posts (title, content, author_id) VALUES (?, ?, ?)',
            [title, content, req.user.id]
        );

        res.status(201).json({ message: 'Post created successfully', postId: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update post
router.put('/:id', auth, async (req, res) => {
    try {
        const { title, content } = req.body;
        const postId = req.params.id;

        // Check post ownership
        const [posts] = await db.query(
            'SELECT * FROM posts WHERE id = ? AND author_id = ?',
            [postId, req.user.id]
        );

        if (posts.length === 0) {
            return res.status(404).json({ message: 'Post not found or unauthorized' });
        }

        await db.query(
            'UPDATE posts SET title = ?, content = ? WHERE id = ?',
            [title, content, postId]
        );

        res.json({ message: 'Post updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Delete post
router.delete('/:id', auth, async (req, res) => {
    try {
        const [result] = await db.query(
            'DELETE FROM posts WHERE id = ? AND author_id = ?',
            [req.params.id, req.user.id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Post not found or unauthorized' });
        }

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
