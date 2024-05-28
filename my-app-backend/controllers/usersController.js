const UserModel = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const REFRESH_SECRET_KEY = process.env.REFRESH_SECRET_KEY;
const bcrypt = require("bcrypt");
const saltRounds = 10;
const EXPIRES_IN = "4d";
const REFRESH_EXPIRES_IN = "7d";
exports.register = async (req, res, next) => {
  try {
    // Kiểm tra xem người dùng đã nhập đủ thông tin hay chưa
    if (
      !req.body.name ||
      !req.body.email ||
      !req.body.password ||
      !req.body.phone
    ) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields." });
    }

    // Kiểm tra xem email đã tồn tại trong cơ sở dữ liệu hay chưa
    const existingUser = await UserModel.findOne({ email: req.body.email });

    if (existingUser) {
      // Nếu email đã tồn tại, gửi một thông báo cho người dùng
      return res
        .status(400)
        .json({ message: "Email already exists. Please login." });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

    // Nếu không, tạo một người dùng mới với thông tin từ yêu cầu
    const user = new UserModel({ ...req.body, password: hashedPassword });
    const result = await user.save();

    res.json({
      message: "User registered successfully",
      user: result,
    });
  } catch (error) {
    next(error);
  }
};
exports.login = async (req, res, next) => {
  try {
    // Kiểm tra xem người dùng đã nhập đủ thông tin hay chưa
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields." });
    }

    // Tìm người dùng trong cơ sở dữ liệu bằng email
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      // Nếu không tìm thấy người dùng, gửi một thông báo cho người dùng
      return res.status(400).json({ message: "The email does not exist." });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({ message: "The password is incorrect." });
    }
    // Kiểm tra xem mật khẩu có khớp không
    // if (user.password !== req.body.password) {
    //   // Nếu mật khẩu không khớp, gửi một thông báo cho người dùng
    //   return res.status(400).json({ message: "The password is incorrect." });
    // }
    if (validPassword) {
      const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
        expiresIn: EXPIRES_IN,
      });

      const refreshToken = jwt.sign({ _id: user._id }, REFRESH_SECRET_KEY, {
        expiresIn: REFRESH_EXPIRES_IN,
      });

      res.json({
        message: "User logged in successfully",
        token: token,
        refreshToken: refreshToken, // return refresh token
        user: user,
      });
    }
    // Nếu tất cả đều ổn, gửi một thông báo thành công
    // res.json({ message: "User logged in successfully" });
  } catch (error) {
    next(error);
    console.log(error);
  }
};
exports.resetPassword = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.newpassword || !req.body.confirmpassword) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields." });
    }

    if (req.body.newpassword !== req.body.confirmpassword) {
      return res.status(400).json({
        message: "The new password and confirm password do not match.",
      });
    }

    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "The email does not exist." });
    }

    const hashedPassword = await bcrypt.hash(req.body.newpassword, saltRounds);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};

exports.changePassword = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.currentPassword || !req.body.newPassword) {
      return res
        .status(400)
        .json({ message: "Please enter all required fields." });
    }

    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "The email does not exist." });
    }

    const validPassword = await bcrypt.compare(
      req.body.currentPassword,
      user.password
    );

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: "The current password is incorrect." });
    }

    const hashedPassword = await bcrypt.hash(req.body.newPassword, saltRounds);

    user.password = hashedPassword;
    await user.save();

    res.json({
      message: "Password changed successfully",
      password: user.password,
    });
  } catch (error) {
    next(error);
  }
};
