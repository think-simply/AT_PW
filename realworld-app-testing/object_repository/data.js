import {getUniqueNumber} from "../helpers/utils.spec"
/**
 * ví dụ trên lớp
 */
export const PASS = 12345678 // đây là data input 
//export const USERNAME = 'testUser'
export const FRIST_NAME = 'theu' // snake case = ko bao giờ thay đổi, như là 1 hằng số thì viết hoa hết lên 

//data dùng cho Login page
export const LOGINURL = 'http://localhost:3000'
export const USERNAME = 'Heath93'
export const PASSWORD = 's3cret'

// data dùng cho register page 
const id = getUniqueNumber();
export const registerUrl = 'http://localhost:3000/signup';
export const userNameData = `group3_${id}`;
export const firstNameData = `group3`
export const lastNameData = `group3`
export const passWordData = `123456`
export const passWordDataNo = `1234567`
