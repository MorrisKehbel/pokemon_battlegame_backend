import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  if (!req.headers.cookie) {
    return next(new Error("Unauthorized", { cause: 401 }));
  }

  const cookies = req.headers.cookie?.split("; ");
  const cookieArrays = cookies.map((cookie) => cookie.split("="));
  const cookiesObj = Object.fromEntries(cookieArrays);

  const { token } = cookiesObj;

  if (!token) {
    return next(new Error("Unauthorized", { cause: 401 }));
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new Error("Unauthorized", { cause: 401 }));
  }

  const { userId } = payload;

  if (!userId) {
    return next(new Error("Unauthorized", { cause: 401 }));
  }

  req.userId = userId;

  next();
};

export default verifyToken;
