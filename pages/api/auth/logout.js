import { serialize } from "cookie";

export default function logoutHandler(req, res) {
  const { userToken: token } = req.cookies;
  console.log(token);

  if (!token) {
    return res.status(401).json({
      success: false,
      error: "Token does not exist",
    });
  }

  try {
    const serialized = serialize("userToken", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    res.setHeader("Set-Cookie", serialized);
    res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}
