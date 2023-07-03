import { uploadPicture } from "../middleware/uploadPictureMiddleware.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";
import { fileRemover } from "../utils/fileRemover.js";
import { v4 as uuidv4 } from "uuid";

const createPost = async (req, res, next) => {
  try {
    const  { title, caption, body, tags } = req.body;
    const post = new Post({
      title: title,
      caption: caption,
      slug: uuidv4(),
      body: {
        type: "doc",
        content: body,
      },
      photo: "",
      user: req.user._id,
      tags: tags,
    });

    const createdPost = await post.save();
    return res.json(createdPost);
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findOne({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ message: "Makale bulunamadı" });

    }

    const upload = uploadPicture.single("postPicture");

    const handleUpdatePostData = async (data) => {
      const { title, caption, slug, body, tags, categories } = JSON.parse(data);
      post.title = title || post.title;
      post.caption = caption || post.caption;
      post.slug = slug || post.slug;
      post.body = body || post.body;
      post.tags = tags || post.tags;
      post.categories = categories || post.categories;
      const updatedPost = await post.save();
      return res.json(updatedPost);
    };

    upload(req, res, async function (err) {
      if (err) {
        return res.status(400).json({ message: "Fotoğraf yüklenirken bir hatayla karşılaşıldı" });
      } else {
        // every thing went well
        if (req.file) {
          let filename;
          filename = post.photo;
          if (filename) {
            fileRemover(filename);
          }
          post.photo = req.file.filename;
          handleUpdatePostData(req.body.document);
        } else {
          let filename;
          filename = post.photo;
          post.photo = "";
          fileRemover(filename);
          handleUpdatePostData(req.body.document);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete({ slug: req.params.slug });

    if (!post) {
      return res.status(404).json({ message: "Makale bulunamadı" });
    }

    await Comment.deleteMany({ post: post._id });

    return res.json({
      message: "Makale başarıyla silindi",
    });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {

    const post = await Post.findOne({ slug: req.params.slug }).populate([
      {
        path: "user",
        select: ["avatar", "name"],
      },
      {
        path: "comments",
        match: {
          check: true,
          parent: null,
        },
        populate: [
          {
            path: "user",
            select: ["avatar", "name"],
          },
          {
            path: "replies",
            match: {
              check: true,
            },
            populate: [
              {
                path: "user",
                select: ["avatar", "name"],
              },
            ],
          },
        ],
      },
    ]);

    

    if (!post) {
      const error = new Error("Post was not found");
      return next(error);
    }

    return res.json(post);
  } catch (error) {
    next(error);
  }
};

const PAGE_SIZE = 6; // Sayfa başına gösterilecek maksimum gönderi sayısı

const getAllPosts = async (req, res, next) => {
  try {
    const { search } = req.query;
    const page = parseInt(req.query.page) || 1; // Geçerli sayfa numarası, varsayılan olarak 1
    const skip = (page - 1) * PAGE_SIZE; // Atlanacak gönderi sayısı

    let query = {};
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const totalPosts = await Post.countDocuments(query); // Toplam gönderi sayısı

    let posts = await Post.find(query)
      .skip(skip)
      .limit(PAGE_SIZE)
      .populate([
        {
          path: "user",
          select: ["avatar", "name", "verified"],
        },
      ])
      .exec();

    const totalPages = Math.ceil(totalPosts / PAGE_SIZE); // Toplam sayfa sayısı

    res.json({ posts, totalPages });
  } catch (error) {
    next(error);
  }
};


export { createPost, updatePost, deletePost, getPost, getAllPosts };
