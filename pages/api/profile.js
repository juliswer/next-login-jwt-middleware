import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {
  const { userToken: token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "no token",
    });
  } else {
    try {
      const user = verify(token, "secret");
      // console.log(user);
      return res.json({ email: user.email, password: user.password });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        error: error.message,
      });
    }

    // console.log(token);
    return res.json({
      user: "user123",
    });
  }
}
