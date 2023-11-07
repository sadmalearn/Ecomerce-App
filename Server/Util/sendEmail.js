const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    host : 'smtp-mail.outlook.com',
    auth : {
        user : "sadmalearn2310@hotmail.com",
        pass : "Sadma@123"
    }
})

// test transporter

transporter.verify((error,success)=>{
    if (error) {
        console.log('>>>>>>>>>>>', error)
    }else{
        console.log('Success :- ', success)
    }

})
const sendEmail = async (mailOptions) =>{
    try {
        console.log('Sending Mail :-', mailOptions)
        await transporter.sendMail(mailOptions)
        return;
    } catch (error) {
        console.log('>>>>>>>>>>>', error)
    }
}
module.exports = sendEmail