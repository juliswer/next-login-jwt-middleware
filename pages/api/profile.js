import { verify } from "jsonwebtoken";

export default function profileHandler(req, res) {
  const { userToken: token } = req.cookies;
  const user = verify(token, "secret");
  console.log(user);
  // console.log(token);
  return res.json({
    user: "user123",
  });
}
