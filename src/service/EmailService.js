import nodemailer from 'nodemailer'
// let nodemailer = require('nodemailer')

let smtpConfig = {
  host: 'smtp.163.com',
  secure: false,
  port: 25,
  auth: {
    user: 'wangpei9679@163.com',
    pass: '*******'
  }
}
let transporter = nodemailer.createTransport(smtpConfig, {from: 'wangpei9679@163.com'});

export default {
  sendMessage:  (message)=> {
    return new Promise((resolve,reject)=>{
      transporter.sendMail(message, (error)=> {
        if (error) {
          console.log(`send email failure:${error}`);
          reject(error);
        } else {
          console.log('send email success!');
          resolve('success');
        }
        transporter.close();
      });
    })
  }
};
