import { getConnection } from "../databases/mysql";

export const getAll = async (table) => {
  try {
    const connection = await getConnection();
    const data = connection.query(`select * from ${table} `);
    return data;
  } catch (error) {
    console.log(error);
  }
};
export const getOne = async (id, table) => {
  try {
    const connection = await getConnection();
    let dataOne = await connection.query(
      `select * from ${table} where id = ?`,
      id
    );
    return dataOne[0];
  } catch (error) {
    console.log(error);
  }
};
// supper admin: làm được tất cả
// admin : làm đc tất cả chỉ không được xóa admin đi,tai len phien ban 
// user: tải phiển

export const createData = async (table, data) => {
  try {
    const connection = await getConnection();
    let createData = await connection.query(`INSERT INTO ${table} SET ?`, data);
    return createData;
  } catch (error) {
    console.log(error);
  }
};
export const updateData = async (table, id, data) => {
  try {
    const connection = await getConnection();
    let updateData = await connection.query(
      `UPDATE ${table} SET ? WHERE id = ?`,
      [data, id]
    );
    return updateData;
  } catch (error) {
    console.log(error);
  }
};
export const checkUser = async (user_name) => {
  const connection = await getConnection();
  const userName = await connection.query(`select * from users where user_name = ?`, user_name);

  return userName[0];
}
export const deleteData = async (id, table) => {
  try {
    const connection = await getConnection();
    let deleteOne = await connection.query(
      `delete  from ${table} where id = ?`,
      id
    );
    return deleteOne;
  } catch (error) {
    console.log(error);
  }
};
export const deleteToken = async (user_id) => {
  const connection = await getConnection();
  try {
    const dlToken = await connection.query(`delete from refTokens where user_id = ? `, user_id);
    if (dlToken) {
      return dlToken
    }
  } catch (error) {
    console.log("Chưa thể xóa được token");
  }
}