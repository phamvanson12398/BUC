import bcrypt from "bcrypt";
import {
  createData,
  deleteData,
  getAll,
  getOne,
  updateData,
} from "../models/myLibrary";
const table = "users";
const getUser = async (req, res) => {
  try {
    const User = await getAll(table);
    return res.status(200).json({
      message: "Get data success",
      data: User,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get data error",
      err: error,
    });
  }
};
const getOneUser = async (req, res) => {
  let id = req.params.id;
  try {
    const user = await getOne(id, table);
    return res.status(200).json({
      message: "Get One User Success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Get One User error",
      err: error,
    });
  }
};
let hashPassword = async (password) => {
  const pass = await bcrypt.hash(password, 10);
  return pass;
};
const createUser = async (req, res) => {
  let pass = await hashPassword(req.body.password);
  let data = {
    user_name: req.body.user_name,
    password: pass,
    email: req.body.email,
    phone: req.body.phone,
    permission_id: req.body.permission_id,
  };
  console.log(data);
  try {
    const User = await createData(table, data);
    return res.status(201).json({
      message: "Created User success",
      data: User,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Created User error",
    });
  }
};
const deleteUser = async (req, res) => {
  let id = req.params.id;
  try {
    const remove = await deleteData(id, table);
    const user = getUser();
    return res.status(200).json({
      message: "Delete user success!",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Delete user error!",
      err: error,
    });
  }
};
const updateUser = async (req, res) => {
  const id = req.params.id;
  const data = {
    user_name: req.body.user_name,
    password: pass,
    email: req.body.email,
    phone: req.body.phone,
    permission_id: req.body.permission_id,
  };
  try {
    const update = await updateData(table, id, data);
    const user = getOneUser;
    return res.status(201).json({
      message: "update user success",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "update user error",
      err: error,
    });
  }
};
// let re = bcrypt.compare('123456','$2b$10$AnUJmBWPASfBziR/u8/v7u/JVPnUNWNqtDrWYZG35J0I9SRAQdeDK',(err,result)=>{
//     if(!err){
//         console.log('oke')
//     }
//     else{
//         console.log(err)
//     }
// })
export default {
  createUser,
  getUser,
  deleteUser,
  getOneUser,
  updateData,
};
