import { error } from "ajv/dist/vocabularies/applicator/dependencies";
import { getConnection } from "../databases/mysql";

export const getAll = async (table) => {

  const connection = await getConnection();
  const data = await connection.query(`select * from ${table} `);
  if (data[0].length === 0) {
    throw new Error("Dữ liệu không tồn tại!")
  }
  return data[0];

};
export const getOne = async (id, table) => {
  const connection = await getConnection();
  let dataOne = await connection.query(
    `select * from ${table} where id = ?`,
    id
  );
  if (dataOne[0].length === 0) {
    throw new Error("Dữ liệu không tồn tại !")
  }
  return dataOne[0];
};

export const createData = async (table, data) => {

  const connection = await getConnection();
  let createData = await connection.query(`INSERT INTO ${table} SET ?`, data);
  if (!createData) {
    throw new Error("Đã xảy ra lỗi : ", error.message)
  }
  return createData;

};
export const updateData = async (table, id, data) => {

  const connection = await getConnection();
  let updateData = await connection.query(
    `UPDATE ${table} SET ? WHERE id = ?`,
    [data, id]
  );
  if (!updateData) {
    throw new Error("Đã xảy ra lỗi : ", error.message)
  }
  return updateData;


};
export const checkUser = async (user_name) => {
  const connection = await getConnection();
  const userName = await connection.query(`select * from users where user_name = ?`, user_name);
  if (userName[0].length === 0) {
    throw new Error("Đã xảy ra lỗi : không tìm thấy user ")
  }
  return userName[0];
}
export const deleteData = async (id, table) => {

  const connection = await getConnection();
  let deleteOne = await connection.query(
    `delete  from ${table} where id = ?`,
    id)
  if (!deleteOne) {
    throw new Error("Đã xảy ra lỗi : ", error.message)
  }
};
export const deleteToken = async (user_id) => {
  const connection = await getConnection();
  const dlToken = await connection.query(`delete from refTokens where user_id = ? `, user_id);
  if (!dlToken) {
    throw new Error("Chưa thể xóa được token!")
  }

}
export const getOneToken = async (user_id) => {
  const connection = await getConnection();
  const dlToken = await connection.query(`select * from refTokens where user_id = ? `, user_id);
  if (!dlToken) {
    throw new Error("Chưa thể xóa được token!")
  }
  return dlToken[0];
}
export const getFileVersion = async (version_id) => {

  const connection = await getConnection();
  let dataOne = await connection.query(
    `select * from files where version_id = ?`,
    version_id
  );
  if (!dataOne) {
    throw new Error("Đã xảy ra lỗi : ", error.message)
  }
  return dataOne[0];

}

export const checkFile = async (filename) => {
  const connection = await getConnection();
  const file = await connection.query(`select * from files where name = ?`, filename);
  
  if (!file) {
    throw new Error("Đã xảy ra lỗi : ", error.message)
  }
  return file[0];
}
export const checkToken = async (name) => {
  const connection = await getConnection();
  let token = await connection.query(
    `select * from blacklist where name = ?`,
    name
  );
  if (token[0].length !== 0) {
    throw new Error("Token không còn giá trị sử dụng !")
  }
};
export const deleteVersion = async (device_id) => {
  const connection = await getConnection();
  const dlVersion = await connection.query(`delete from versions where device_id = ? `, device_id);
  if (!dlVersion) {
    throw new Error("lỗi chưa xóa được version")
  }

}
export const deleteFile = async (version_id)=>{
  const connection = await getConnection();
  const dlFile = await connection.query(`delete from files where version_id = ? `, version_id);
  if (!dlFile) {
    throw new Error("lỗi chưa xóa được file")
  }
}