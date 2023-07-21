
import {  getConnection } from "../databases/mysql"

export const getAll = async (table) => {
    try {
        const connection = await getConnection();
        const data = connection.query(`select * from ${table} `)
        return data
    } catch (error) {
        console.log(error);
    }
}
export const getOne = async (id, table) => {
    try {
        const connection = await getConnection();
        let dataOne = await connection.query(`select * from ${table} where id = ?`,  id)
        return dataOne
    } catch (error) {
        console.log(error);
    }
}
// supper admin: làm được tất cả
// admin : làm đc tất cả chỉ không được xóa admin đi 
// user: tải phiển
export const deleteData = async (id, table) => {
    try {
        const connection = await getConnection();
        let deleteOne =  connection.query(`delete  from ${table} where id = ?`,id)
        return deleteOne
    } catch (error) {
        console.log(error);
    }
}
export const createData = async (table,data)=>{
    try {
     const connection = await getConnection();
     const create =  connection.query(`insert into ${table} SET ?`,data);
     return data;
    } catch (error) {
     console.log(error);
    }
 }
export const updateData = async (table,id,data)=>{
    try {
        const connection = await getConnection();
     let updateData = await connection.query(`UPDATE ${table} SET ? WHERE id = ?`,[data,id]);
     return updateData;
    } catch (error) {
     console.log(error);
    }
 }

