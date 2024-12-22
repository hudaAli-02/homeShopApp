import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bcrypt from "bcrypt";
import CustomerModel from "./models/CustomerModel.js";
import PostModel from "./models/Posts.js";
import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";


const app = express();
app.use(express.json());
app.use(cors());

const connectString ="mongodb+srv://admin:admin@homeshopappcluster.rnxfr.mongodb.net/homeShopDb?retryWrites=true&w=majority&appName=homeShopAppCluster";

mongoose.connect(connectString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

app.use("/uploads", express.static(__dirname+"/uploads"));


  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-"+ file.originalname);
    },
  });
  const upload = multer({ storage: storage});

app.post("/registerCustomer", async (req, res) => {
    try {
      const username = req.body.username;
      const email = req.body.email;
      const password = req.body.password;
      const hashedpassword = await bcrypt.hash(password, 10);
      const country = req.body.country;
      const phone = req.body.phone;
      const firstName = req.body.firstName;
      const lastName = req.body.lastName;

  
      const customer = new CustomerModel({
        username: username,
        email: email,
        password: hashedpassword,
        country: country,
        phone: phone,
        firstName: firstName,
        lastName: lastName,

      });
  
      await customer.save();
      res.send({ customer: customer, msg: "Added." });
    } catch (error) {
      res.status(500).json({ error: "An error occurred" });
    }
  });

app.post("/login", async(req, res)=>{
    try{
      const {email, password} = req.body;
      const customer = await CustomerModel.findOne({email: email});
      if (!customer){
        return res.status(500).json({ error: "customer not found. "});
      }
      console.log(customer);
      const passwordMatch = await bcrypt.compare(password, customer.password);
      if(!passwordMatch){
        return res.status(401).json({error: "Authentication failed"});
      }
      res.status(200).json({customer, message: "Success."});
    }catch(err){
      res.status(500).json({error: err.message});
    }
  });

app.post("/logout", async (req, res) => {
    res.status(200).json({ message: "Logged out successfully" });
  });

app.post("/savePost", async (req, res) => {
    try {
      const postMsg = req.body.postMsg;
      const email = req.body.email;
  
      console.log(email);
      const post = new PostModel({
        postMsg: postMsg,
        email: email,
      });
  
      await post.save();
      res.send({ post: post, msg: "Added." }); 
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  
  
app.get("/getPosts", async (req, res) => {
    try {
      
      const posts = await PostModel.find({}).sort({ createdAt: -1 });
  
      const countPost = await PostModel.countDocuments({});
  
      res.send({ posts: posts, count: countPost });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });


  app.put("/likePost/:postId/", async (req, res) => {
    const postId = req.params.postId;
    const userId = req.body.userId;
  
    try {
      const postToUpdate = await PostModel.findOne({ _id: postId });
  
      if (!postToUpdate) {
        return res.status(404).json({ msg: "Post not found." });
      }
  
      const userIndex = postToUpdate.likes.customers.indexOf(userId);
  
  
      if (userIndex !== -1) {
        const udpatedPost = await PostModel.findOneAndUpdate(
          { _id: postId },
          {
            $inc: { "likes.count": -1 }, 
            $pull: { "likes.customers": userId }, 
          },
          { new: true } 
        );
  
        res.json({ post: udpatedPost, msg: "Post unliked." });
      } else {
    
        const updatedPost = await PostModel.findOneAndUpdate(
          { _id: postId },
          {
            $inc: { "likes.count": 1 }, 
            $addToSet: { "likes.customers": userId }, 
          },
          { new: true }
        );
  
        res.json({ post: updatedPost, msg: "Post liked." });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  });
  
  app.put("/updateCustomerProfile/:email/",
    upload.single("profilePic"),
     async(req, res) => {
    const email = req.params.email;
    const username = req.body.username;
    const password = req.body.password;
    const country = req.body.country;
    const phone = req.body.phone;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;


    try{
      const customerToUpdate = await CustomerModel.findOne({ email: email});

      if (!customerToUpdate){
        return res.status(404).json({error: "Customer not found"});
      }
      let profilePic = null;
      if(req.file) {
        profilePic = req.file.filename;
        if (customerToUpdate.profilePic){
          const oldFilePath =path.join(
            __dirname,
            "uploads",
            customerToUpdate.profilePic
          );
          fs.unlink(oldFilePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            }else {
              console.log("Old file deleted successfully");
            }
          });
          customerToUpdate.profilePic = profilePic;
        }
      } else {
        console.log("No file uploaded");
      }

      customerToUpdate.username = username;
      customerToUpdate.country = country;
      customerToUpdate.phone = phone;
      customerToUpdate.firstName = firstName;
      customerToUpdate.lastName = lastName;

      if (password !== customerToUpdate.password){
        const hashedpassword = await bcrypt.hash(password, 10);
        customerToUpdate.password = hashedpassword;
      }else{
        customerToUpdate.password = password;
      }
      await customerToUpdate.save();

      res.send({ customer: customerToUpdate, msg: "Updated." });

      


    }catch(err){
      res.status(500).json({error: err.message});
      
    }
  });

app.listen(3001, () => {
    console.log("You are connected");
  });