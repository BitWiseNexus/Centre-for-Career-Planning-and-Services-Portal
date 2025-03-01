import Thread from '../models/thread.model.js';
import cloudinary from '../config/cloudinary.js';

export const getThreads = async (req, res) => {
    try {
        const threads = await Thread.find().populate({
            path: 'comments',
            populate: {
                path: 'author'
            }
        }).populate('author');
        res.status(200).json({ success: true, threads: threads });
    } catch (e) {
        console.log("error in getThreads controller", e.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
}

export const createThread = async (req, res) => {
    try {
        const loggedInUser = req.userId;
        const { title, text, file } = req.body;

        let fileUrl;

        if (file) {
            const uploadFile = await cloudinary.uploader.upload(file, {
                folder: 'CCPS_Portal'
            });
            fileUrl = uploadFile.secure_url;
        }

        const newThread = new Thread({
            title,
            text,
            file: fileUrl,
            author: loggedInUser
        });

        await newThread.save();
        // todo: real time functionality using socket.io

        res.status(201).json({ success: true, newThread });

    } catch (e) {
        console.log("error in createThread controller", e.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
}

export const createComment = async (req, res) => {
    try {
        const author = req.userId;
        const { threadId } = req.params;

        const thread = await Thread.findById(threadId);
        if (!thread) {
            return res.status(404).json({ success: false, message: "Thread not found" });
        }

        const { text, file } = req.body;

        let fileUrl;

        if (file) {
            const uploadFile = await cloudinary.uploader.upload(file, {
                folder: 'CCPS_Portal'
            });
            fileUrl = uploadFile.secure_url;
        }

        const newComment = new Comment({
            threadId,
            author,
            text,
            file: fileUrl,
        });

        await newComment.save();

        thread.comments.push(newComment);
        await thread.save();

        res.status(201).json({ success: true, newComment });

    } catch (e) {
        console.log("error in createComment controller", e.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
}

export const upvote = async (req, res) => {
    try {
        const { threadId } = req.params;
        const userId = req.userId;

        const thread = await Thread.findById(threadId);
        if (!thread) {
            return res.status(404).json({ success: false, message: "Thread not found" });
        }

        if (thread.upvotes.includes(userId)) {
            thread.upvotes.pull(userId);
        } else {
            thread.upvotes.push(userId);
            thread.downvotes.pull(userId);
        }

        await thread.save();

        res.status(200).json({ success: true, thread });

    } catch (e) {
        console.log("error in upvote controller", e.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
}

export const downvote = async (req, res) => {
    try {
        const { threadId } = req.params;
        const userId = req.userId;

        const thread = await Thread.findById(threadId);
        if (!thread) {
            return res.status(404).json({ success: false, message: "Thread not found" });
        }

        if (thread.downvotes.includes(userId)) {
            thread.downvotes.pull(userId);
        } else {
            thread.downvotes.push(userId);
            thread.upvotes.pull(userId);
        }

        await thread.save();

        res.status(200).json({ success: true, thread });

    } catch (e) {
        console.log("error in downvote controller", e.message);
        res.status(500).json({ success: false, error: "Server Error" });
    }
}