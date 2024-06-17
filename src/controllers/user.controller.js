import { getOneVarchar, insertMany, putmany } from "../services/universal.service.js";
import { userRegister } from "../services/user.service.js";
import { sendOtptoEmail } from "../utils/email.js";
import { userValidation } from "../validation/user.valid.js";



// register qismi bitdi  dayarli toliq
export const postUser = async (req, res) => {
    try {

        await userValidation(req.body);

        const { uuid, emailres, user} = await userRegister(req.body)

        if (user) {
            return res.status(400).send({
                message: user
            });
        };

        return res.status(201).send({
            message: "User successfully registered",
            uuid: uuid,
            otpSend: emailres
        });

    } catch (e) {
        console.log(e)
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    };
};


// verify qismi bitdi faqat validatsiya qo'shgan yaxshi 
export const verifyOtp = async (req, res) => {
    try {
        const { uuid, otp} = req.body;

        const userotp = await getOneVarchar('userotps', 'uuid', uuid);

        if(!userotp.length) {
            return res.status().send({
                message: "Otp not found"
            });
        }

        if(userotp[0].otp == otp){
            await putmany('users', ['status'], ['active'], 'uuid', uuid);
            return res.status(200).send({
                message: "Otp verifyed"
            });
        };

        return res.status(400).send({
            message: "Invalid otp"
        });

    } catch (e) {
        console.log(e)
        return res.status(500).send({
            message: "Server Error",
            error: e
        });
    };
}
