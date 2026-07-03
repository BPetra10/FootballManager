import { Link } from "react-router-dom";
import { useState } from "react";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa6";

import AuthCard from "../../components/auth/AuthCard/AuthCard";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import ErrorAlert from "../../components/common/ErrorAlert/ErrorAlert";

import { register } from "../../services/authService";
import { validateRegister } from "../../validators/authValidator";

import football from "../../assets/images/home/football.jpg";

import "./Auth.css";

function RegisterPage() {

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [errors, setErrors] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const [generalError, setGeneralError] = useState("");

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setErrors(prev => ({
            ...prev,
            [name]: ""
        }));

        setGeneralError("");

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        setGeneralError("");

        const validationErrors =
            validateRegister(formData);

        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);

            return;

        }

        try {

            await register(formData);

            alert("Registration successful!");

            setFormData({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

            setErrors({
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            });

        }
        catch (error) {

            if (error?.errors) {

                setErrors(prev => ({
                    ...prev,
                    ...error.errors
                }));

                return;

            }

            setGeneralError(
                error?.message ??
                "Registration failed."
            );

        }

    };

    return (

        <main
            className="auth-page"
            style={{
                backgroundImage: `url(${football})`
            }}
        >

            <div className="auth-overlay">

                <AuthCard
                    title="Create Account"
                    subtitle="Start building your legacy."
                >

                    <form
                        className="auth-form"
                        onSubmit={handleSubmit}
                    >

                        <ErrorAlert message={generalError} />

                        <Input
                            label="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Choose a username"
                            leftIcon={<FaUser />}
                            error={errors.username}
                        />

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            leftIcon={<FaEnvelope />}
                            error={errors.email}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Create a password"
                            leftIcon={<FaLock />}
                            rightIcon={
                                showPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                            onRightIconClick={() =>
                                setShowPassword(!showPassword)
                            }
                            error={errors.password}
                        />

                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Repeat your password"
                            leftIcon={<FaLock />}
                            rightIcon={
                                showConfirmPassword
                                    ? <FaEyeSlash />
                                    : <FaEye />
                            }
                            onRightIconClick={() =>
                                setShowConfirmPassword(!showConfirmPassword)
                            }
                            error={errors.confirmPassword}
                        />

                        <Button
                            type="submit"
                            variant="filled"
                        >
                            Create Account
                        </Button>

                        <p className="auth-footer">

                            Already have an account?

                            <Link to="/login">
                                Sign in
                            </Link>

                        </p>

                    </form>

                </AuthCard>

            </div>

        </main>

    );

}

export default RegisterPage;