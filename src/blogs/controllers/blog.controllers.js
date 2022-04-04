import blogs from "../models/blog.models.js";
import catchAsync from "../../utils/catchAsync.js";
import AppError from "../../utils/appError.js"
const homepage = (req, res) => res.json({ message: "request recieved" });

const getBlogs = catchAsync(async (req, res, next) => {
  const articles = await blogs.find({});
  res.status(200).json({
    status: "success",
    results: articles.length,
    data: {
      articles,
    },
  });
});


const addBlog = catchAsync(async (req, res, next) => {
  let articleInfo = {};
  articleInfo.title = req.body.title;
  articleInfo.article = req.body.article;
  articleInfo.author = req.user.name;
  articleInfo.imagesUrl = req.body.imagesUrl;
  articleInfo.createdAt = new Date().toISOString();
  const newArticle = await blogs.create(articleInfo);
  res.status(201).json({
    message: "Blog was successfully created",
    newArticle,
  });
});

const getBlog = catchAsync(async (req, res, next) => {
  const Article = await blogs.findById(req.params.id);
  if (!Article) {
    return next(new AppError("No article found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
      Article,
  });
});

//Update Helper
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

//Update controll API
const updateBlog = catchAsync(async (req, res, next) => {
  let _id = { _id: req.params.id };
  const filterBody = filterObj(req.body, "imagesUrl", "title", "article");
  const articles = await blogs.findByIdAndUpdate(_id, filterBody, {
    new: true,
    runValidators: true,
  });
  if (!articles) {
    return next(new AppError("No article found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      articles,
    },
  });
});
const addComment = catchAsync(async (req, res, next) => {
  console.log("add comment: ",req.params)
  let id = { _id: req.params.id };
  console.log("add comment: ",id)
  const filterBody = filterObj(req.body, "comment", "name", "email");
  console.log("add comment: ",filterBody)
  const articles = await blogs.updateOne(
    { _id: id },
    { $push: { comments: filterBody } }
 )
  
  if (!articles) {
    return next(new AppError("No article found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      articles,
    },
  });
});

const deleteBlog = catchAsync(async (req, res, next) => {
  let query = { _id: req.params.id };
  const articleDeleted = await blogs.findByIdAndDelete(query);
  if (!articleDeleted) {
    return next(new AppError("No article found with that ID", 404));
  }
  res.status(200).json({
    status: "Deleted Successfully",
    data: null,
  });
});

export { homepage, getBlogs, getBlog, updateBlog, addBlog, deleteBlog, addComment };
