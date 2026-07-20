export function validateRegister(formData) {

    const errors = {};

    if (!formData.username.trim()) {

        errors.username = "Username is required.";

    }
    else if (formData.username.length < 5) {

        errors.username =
            "Username must contain at least 5 characters.";

    }

    if (!formData.email.trim()) {

        errors.email = "Email is required.";

    }
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {

        errors.email = "Invalid email address.";

    }

    if (!formData.password) {

        errors.password = "Password is required.";

    }
    else if (formData.password.length < 8) {

        errors.password =
            "Password must contain at least 8 characters.";

    }

    if (!formData.confirmPassword) {

        errors.confirmPassword =
            "Please confirm your password.";

    }
    else if (formData.password !== formData.confirmPassword) {

        errors.confirmPassword =
            "Passwords do not match.";

    }

    return errors;

}

export function validateLogin(formData) {

    const errors = {};

    if (!formData.usernameOrEmail.trim()) {

        errors.usernameOrEmail =
            "Username or email is required.";

    }

    if (!formData.password) {

        errors.password =
            "Password is required.";

    }

    return errors;

}