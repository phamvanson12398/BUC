import jwt from "jsonwebtoken";
import {
  checkToken,
  getOne,
  getOneToken,
  deleteToken,
} from "../models/myLibrary";
const table = "users";

const checkAdmin = async (req, res, next) => {
  const bearToken = req.header("Authorization");

  if (!bearToken || !bearToken.startsWith("Bearer")) {
    return res.status(401).json({
      message: "Bạn chưa đăng nhập",
    });
  }
  const token = bearToken.split(" ")[1];
  await checkToken(token);
  jwt.verify(token, process.env.SECRECT_ACCESS_TOKEN, async (err, decode) => {
    if (err) {
      return res.status(401).json({ message: "Invalid access token" });
    } else {
      const user = await getOne(decode.id, "users");

      if (user[0].permission_id == 1 || user[0].permission_id == 2) {
        req.user = user[0];
        const expToken = await getOneToken(user[0].id);
        if (expToken.length !== 0) {
          jwt.verify(
            expToken[0].reftoken,
            process.env.SECRECT_REFRESH_TOKEN,
            async (err, decode) => {
              if (err) {
                await deleteToken(req.user.id);
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
        } else {
          return res.status(400).json({
            message: "Bạn chưa đăng nhập!",
          });
        }
      } else {
        return res.status(401).json({
          message: "Ban khong co quyen truy cap!",
        });
      }
    }
  });
};
//check quyen update , delete
const checkAdminDU = async (req, res, next) => {
  const bearToken = req.header("Authorization");

 
    if (!bearToken || !bearToken.startsWith("Bearer")) {
      return res.status(401).json({
        message: "Bạn chưa đăng nhập",
      });
    }
    const id = req.params.id;
    const userCheck = await getOne(id, table);
    const token = bearToken.split(" ")[1];
    await checkToken(token);
    jwt.verify(token, process.env.SECRECT_ACCESS_TOKEN, async (err, decode) => {
      if (err) {
        return res.status(401).json({ message: "Invalid access token" });
      } else {
        if (decode.permission_id < userCheck[0].permission_id) {
          req.user = decode;
          const expToken = await getOneToken(req.user.id);
          if (expToken.length !== 0) {
            jwt.verify(
              expToken[0].reftoken,
              process.env.SECRECT_REFRESH_TOKEN,
              async (err, decode) => {
                if (err) {
                  await deleteToken(req.user.id);
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
          } else {
            return res.status(400).json({
              message: "Bạn chưa đăng nhập!",
            });
          }
        } else {
          return res.status(403).json({
            message: "Bạn không có quyền thực hiện hành động vơí user này",
          });
        }
      }
    });
    
  } 


export default {
  checkAdmin,
  checkAdminDU,
};
