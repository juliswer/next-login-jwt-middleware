import jwt from "jsonwebtoken";
import { serialize } from "cookie";

export default function loginHandler(req, res) {
  const { email: userEmail, password: userPassword } = req.body;

  // Math.floor(Date.now() / 1000) + 60 === 1 minute from now
  // Math.floor(Date.now() / 1000) + 60 * 60 === 1 hour from now
  // Math.floor(Date.now() / 1000) + 60 * 60 * 24 === 1 day from now
  // Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 === 1 month from now

  // ! Making HARDCODE (code for development)

  try {
    if (userEmail === "admin@local.local" && userPassword === "admin") {
      const _token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          email: "test@test.com",
          password: "test",
        },
        "secret"
      );
      const token = serialize("userToken", _token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 30,
        path: "/",
      });
      res.setHeader("Set-Cookie", token);
      return res.json({
        success: true,
        message: "Login Succesfully",
        userData: {
          email: userEmail,
          password: userPassword,
        },
      });
    } else {
      throw new Error("Invalid email or password");
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
}
