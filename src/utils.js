require('dotenv').config();

const email_validation = (email) => {
    try {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (emailRegex.test(email.toLowerCase())) {
            return { status: true, message: "email validated" };
        } else {
            return { status: false, message: "Invalid Email" };
        }
    } catch (err) {
        console.error(err.message);
        return { status: false, message: "Something Went Wrong!!" };
    }
}

const password_validation = (password) => {
    try {
        if (typeof password !== "string") {
            return {status: false, message: "Password must be a string"};
        }

        if (password.length < 6) {
            return {status: false, message: "Password must be 6 characters long"};
        }

        const hasUpperCase = /[A-Z]/.test(password);
        const hasSpecialChar = /[!@#$%^&*]/.test(password);

        if (!hasUpperCase) {
            return {status: false, message: "Password must contain at least one uppercase letter"};
        }

        if (!hasSpecialChar) {
            return {status: false, message: "Password must contain at least one special character (@, #, $, etc.)"};
        }

        return {status: true, message: "valid password"};
    } catch (err) {
        console.error(err.message);
        return { status: false, message: "Something Went Wrong!!" };
    }
}

const generate_random_user_id = (len) => {
    try {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let userId = '';
        for (let i = 0; i < len; i++) {
            userId += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return {status: true, user_id: userId};
    } catch(err)
    {
        console.error(err.message);
        return {status: false, message: "Something Went Wrong!!"};
    }
};

module.exports = { emailValidation: email_validation, passwordValidation: password_validation, generateUserId: generate_random_user_id };