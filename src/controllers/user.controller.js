import { getOneVarchar, insertMany } from "../services/universal.service.js";
import { sendOtptoEmail } from "../utils/email.js";
import { hashPassword } from "../utils/hash.js";
import { userValidation } from "../validation/user.valid.js";


export const postUser = async (req, res) => {
    try {

        // await userValidation(req.body);

        const { email, username, password, role } = req.body;
        const hashedpassword = hashPassword(password);


        const user = await getOneVarchar('users', 'email', email);
        console.log(user);
        if (user.length) {
            return res.status(400).send({
                message: "User already exists"
            });
        };

        if(role){
            const result = await insertMany('users', ['email', 'username', 'password'], [email, username, hashedpassword]);
        }else {
            const result = await insertMany('users', ['email', 'username', 'password', 'role'], [email, username, hashedpassword, role]);
        }

        const emailres = await sendOtptoEmail()

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