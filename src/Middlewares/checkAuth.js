import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import ajv from "ajv";
import { checkToken, deleteToken, getOne, getOneToken } from "../models/myLibrary";

const authToken = (req, res, next) => {
  const tokenBearer = req.header("Authorization");
  if (!tokenBearer || !tokenBearer.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Bearer Token missing",
    });
  }
  const token = tokenBearer.split(" ")[1];
  jwt.verify(token, process.env.SECRECT_REFRESH_TOKEN, async (err, decode) => {
    if (err) {
      return res.status(401).json({
        message: `Error : ${err.message}`,
      });
    } else {
      console.log(decode);
      const user = await getOne(decode.id, "users");
      req.user = user[0];

      next();
    }
  });
};

const checkLogin = async (req, res, next) => {
  const bearToken = req.header("Authorization");

  try {
    if (!bearToken || !bearToken.startsWith("Bearer")) {
      return res.status(401).json({
        message: "You are not logged in",
      });
    }
    const token = bearToken.split(" ")[1];
    await checkToken(token);

    await jwt.verify(token, process.env.SECRECT_ACCESS_TOKEN,  (err, decode) => {
      if (err) {
        return res.status(401).json({ message: "Invalid access token" });
      } else {
        req.user_id = decode.id;
      }
    });
    const expToken = await getOneToken(req.user_id);
    console.log(expToken);
        if (expToken.length !==0 ) {
         await jwt.verify(expToken[0].token,process.env.SECRECT_REFRESH_TOKEN, async(err, decode) => {
              if (err) {
                await deleteToken(req.user_id)
                return res.status(400).json({
                  message: `yeu cau dang nhap lai`,
                });
              } else {
                // chuyển token đến phiên đăng xuất đê lưu vào black list
                req.token = token;
                next();
              }
            }
          );
        }else{
          return res.status(400).json({
              message: "Bạn chưa đăng nhập!"
          })
      }
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
const checkForm = (req, res, next) => {
  const Ajv = new ajv();
  const authSchema = {
    type: "object",
    properties: {
      user_name: {
        type: "string",
      },
      password: {
        type: "string",
        minLength: 6,
        maxLength: 24,
      },
    },
    required: ["user_name", "password"],
    additionalProperties: false,
  };
  const data = req.body;

  const validate = Ajv.compile(authSchema);
  const check = validate(data);
  if (!check) {
    return res.status(400).json({
      message: `${validate.errors[0].message}`,
    });
  } else {
    next();
  }
};
export default {
  authToken,
  checkLogin,
  checkForm,
};
