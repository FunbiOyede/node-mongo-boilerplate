const Admin = require("../models/admin");
const {hash,compare} = require('bcryptjs');

/**
 * @class AuthService
 * @description Authenticate admin users
 */
class AuthService {
  constructor() {}

  /**
   *
   * @param {object} admin
   * @description sign admin up
   * @returns  {object} adminRecord
   * @memberof AuthService
   *
   */
  static async SignUp(admin) {
    try {
      if( await Admin.findOne({email:admin.email})){
         throw new Error("User already exists. Please try again.")
      }
      const hashedPassword = await hash(admin.password,12);
      const adminRecord = await Admin.create({
        ...admin,
        password:hashedPassword
      });
  
      return adminRecord;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param {email} email address of admin
   * @description log admin in
   * @returns  {object} adminRecord
   * @memberof AuthService
   *
   */
  // email  for now password later
  static async SignIn(user) {
    try {
      const adminRecord = await Admin.findOne({ email:user.email });
      if (!adminRecord) {
        throw new Error("invalid email");
      }
    
      if(compare(user.password,adminRecord.password)){
        return adminRecord;
        
      }
      throw new Error('invalid password')
     
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
