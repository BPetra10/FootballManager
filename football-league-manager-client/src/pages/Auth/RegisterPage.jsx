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

import football from "../../assets/images/home/football.jpg";

import "./Auth.css";

function RegisterPage() {

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

                    <form className="auth-form">

                        <Input
                            label="Username"
                            name="username"
                            placeholder="Choose a username"
                            leftIcon={<FaUser />}
                        />

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            leftIcon={<FaEnvelope />}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
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
                        />

                        <Input
                            label="Confirm Password"
                            name="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
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