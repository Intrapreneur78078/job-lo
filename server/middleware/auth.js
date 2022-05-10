import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
  const token = authHeader.split(" ")[1]; //[0] : Bearer , [1] : token
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(payload)
    //attach user request object
    // req.user = payload;
    req.user = {userId : payload.userId};
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

export default auth;
