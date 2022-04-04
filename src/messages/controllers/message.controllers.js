import messages from "../models/message.models.js";
import AppError from "../../utils/appError.js";

const homepage = (req, res) => res.json({ message: "request recieved" });

const getMessages = async (req, res, next) => {
  const message = await messages.find({});
  res.status(200).json({
    status: "success",
    results: message.length,
    data: {
      message,
    },
  });
};

const addMessage = async (req, res, next) => {
  console.log(req.user)
  let messageInfo = {};
  messageInfo.name = req.user.name;
  messageInfo.email = req.user.email;
  messageInfo.message = req.body.message;
  messageInfo.createdAt = new Date().toISOString();
  console.log(messageInfo)
  const newMessage = await messages.create(messageInfo);
  res.status(201).json({
    status: "success",
    newMessage,
  });
};

const getMessage = async (req, res, next) => {
  const message = await messages.findById(req.params.id);
  if (!message) {
    return next(new AppError("No article found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      message,
    },
  });
};

//Update Helper
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

//Update controll API
const updateMessage = async (req, res, next) => {
  let _id = { _id: req.params.id };
  const filterBody = filterObj(req.body, "name", "email", "message");
  const messages = await messages.findByIdAndUpdate(_id, filterBody, {
    new: true,
    runValidators: true,
  });
  if (!messages) {
    res.status(404).json({ status: "No article found with that ID" });
  }
  res.status(200).json({
    status: "success",
    data: {
      articles,
    },
  });
};

const deleteMessage = async (req, res, next) => {
  console.log(req.params.id)
  let query = { _id: req.params.id };
  const articleDeleted = await messages.findByIdAndDelete(query);
  if (!articleDeleted) {
    res.status(404).json({ status: "No article found with that ID" });
  }
  res.status(200).json({
    status: "Deleted Successfully",
    data: null,
  });
};

export { homepage, getMessages, getMessage, updateMessage, addMessage, deleteMessage, messages }