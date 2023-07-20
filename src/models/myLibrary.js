
import { connection, createConnect, getConnection } from "../databases/mysql"

export const getAll = async ($table) => {
    try {
        let dataAll = await getConnection.query(`select * from ? `, [$table])
        return dataAll;
    } catch (error) {
        console.log(error);
    }
}
export const getOne = async ($id, $table) => {
    try {
        let dataOne = await getConnection.query(`select * from ? where id = ?`, [$table, $id])
        return dataOne
    } catch (error) {
        console.log(error);
    }
}
// supper admin: làm được tất cả
// admin : làm đc tất cả chỉ không được xóa admin đi 
// user: tải phiển
export const deleteData = async ($id, $table) => {
    try {
        let deleteOne = await getConnection.query(`delete  from ? where id = ?`, [$table, $id])
        return deleteData
    } catch (error) {
        console.log(error);
    }
}
export const createData = async ($table,$data)=>{
   try {
    let createData = await connection.query("INSERT INTO ? SET ?",[$table,$data]);
    return createData;
   } catch (error) {
    console.log(error);
   }
}
export const updateData = async ($table,$id,$data)=>{
    try {
     let updateData = await getConnection.query(`UPDATE ? SET ? WHERE id = ?`,[$table,$data,$id]);
     return updateData;
    } catch (error) {
     console.log(error);
    }
 }