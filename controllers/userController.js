import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/error.js";
import { User } from "../models/userSchema.js";
import { sendToken} from "../utils/jwtToken.js";

export const register = catchAsyncErrors(async (req, res,next ) => {
    const{name, email, password, phone, role, education} = req.body;
    if(!name || !email || !password || !phone || !role || !education){
        return next(new ErrorHandler("PLEASE fill Full details!",400));
    }
    let user = await User.findOne({ email });
    if (user) {
        return next(new ErrorHandler("User with this email already exists",400));
    } 
     user = await User.create({
        name,
        email,
        password,
        phone, 
        role, 
        education,
    });
    sendToken(user,200, "User registered successfully", res);
});

export const login = catchAsyncErrors(async (req, res, next)=>{
    const{ email, password, role } = req.body;
    if(!email || !password || !role){
        return next(new ErrorHandler("please fill full form!",400));
    }
    const user = await User.findOne({email}).select("+password");
    if (!user) {
        return next(new ErrorHandler("Invalid email or password!",400));
    }
    const isPasswordMatched = await user.comparePassword(password);
    if(!isPasswordMatched) {
    return next(new ErrorHandler("invalid email or  password!",400));   
    }
    if (user.role !== role){
        return next(
            new ErrorHandler(`User with provided role (${role}) not found!`,400,));
    }
    sendToken(user, 200, "User logged in successfully", res);

});

export const logout = catchAsyncErrors((req, res, next)=>{
    res
       .status(200)
       .cookie("token", "", { 
        expires: new Date(Date.now()),
        httpOnlyz: true,
       })
       .json({
        success: true,
        message:"User logged out successfully!"
       });
});


export const getMyProfile = catchAsyncErrors((req, res, next)=> {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});