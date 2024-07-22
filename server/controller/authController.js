const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../Models/user");
const fineModel = require("../Models/fine");

const loginController = async (req, res) => {
  try {
    const { loginEmail, loginPassword } = req.body;
    // const Email = loginEmail.toLowerCase();

    if (!loginEmail || !loginPassword) {
      return res.status(422).send({
        message: "please enter all field",
        success: false,
      });
    }
    const user = await userModel.findOne({ email: loginEmail });
    if (!user) {
      return res.status(422).send({
        message: "user not found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(loginPassword, user.password);
    if (!isMatch) {
      return res.status(422).send({
        message: "Invalid Email or Password",
        success: false,
      });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "login success",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `error in login Controller ${error.message}`,
    });
  }
};

const singUpController = async (req, res) => {
  try {
    const { name, signUpEmail, signUpPassword, role } = req.body;
    // const Email = signUpEmail.toLowerCase();
    const existingUser = await userModel.findOne({ email: signUpEmail });
    if (!signUpEmail || !signUpPassword || !name) {
      return res.status(422).send({
        message: "Invalid Email or password",
        success: false,
      });
    }
    if (existingUser) {
      return res.status(200).send({
        message: "user already exist",
        success: false,
      });
    }
    // const password = signUpPassword;
    // const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(signUpPassword, salt);
    // req.body.password = hashPassword;
    const newUser = new userModel({
      name,
      email: signUpEmail,
      password: hashPassword,
      role,
    });
    // const newUser = new userModel(req.body);
    await newUser.save();
    const fine = new fineModel({ userId: newUser._id, fine: 0 });
    await fine.save();
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).send({
      message: "register successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Error in Signup controller ${error.message}`,
    });
  }
};

module.exports = { singUpController, loginController };
