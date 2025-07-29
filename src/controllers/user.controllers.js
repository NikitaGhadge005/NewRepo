import { asyncHandler } from "../utils/asyncHandlear.js";
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.models.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler( async ( req , res) => {

   //get details from user 
   //validation - not enpty
   //check if user already exists:username and email
   // check for image , check for avtar
   // upload them on cloudinary
   // create user object- create entry in db   
   //remove password and refres token fileds from responsx
   //check for user creation
   //return respons

  
      const { username, email, fullName, password } = req.body;
      console.log(req.body);
      
              //console.log("email", email);   
              
              // if(fullName===""){
              //   throw new ApiError(400,"fullName is require")
              // }
         
      
      if(
        [ username, email, fullName, password ].some((field)=> field?.trim()==="" )
        )
        {throw new ApiError(400,"All Fields are required")
      
        }
      
      const existedUser= await User.findOne({
      
        $or:[{username},{email}]
      
      })
      
      if(existedUser){
        throw new ApiError(409,"User with eamil or Usename is already exist")
      }
      
      const avatarLocalPath = req.files?.avatar?.[0]?.path;
      //const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
      console.log(req.files);

      
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
      

      if(!avatarLocalPath)
      {
        throw new ApiError(400,"Avatar is required")
      }
      
      const avatar= await uploadOnCloudinary(avatarLocalPath)
      const coverImage= await uploadOnCloudinary(coverImageLocalPath)
      
      if(!avatar){
        throw new ApiError(400,"avatar is required on cloudinary");
        
      }
      
      
      const user =await User.create({
        fullName,
        avatar:avatar.url|| "",
        coverImage:coverImage?.url || "",
        email,
        username:username.toLowerCase(),
        password
      })
      
      const createUser= await User.findById(user._id).select("-password  -refreshToken")
      
      if(!createUser){
        throw new ApiError(500,"Something Went Wrong While resigtering the user");
        
      }
      
      return res.status(201).json(
        new ApiResponse(201,createUser,"User Register Successfully")
      )
        
})


export {registerUser}