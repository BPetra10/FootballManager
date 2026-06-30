import { Link } from "react-router-dom";
import { useState } from "react";

import {
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

function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);

    return (

        <main
            className="auth-page"
            style={{
                backgroundImage: `url(${football})`
            }}
        >

            <div className="auth-overlay">

                <AuthCard
                    title="Welcome Back!"
                    subtitle="Sign in to continue managing your football club."
                >

                    <form className="auth-form">

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
                            placeholder="Enter your password"
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

                        <div className="auth-form-options">

                            <Link
                                to="/forgot-password"
                                className="auth-link"
                            >
                                Forgot password?
                            </Link>

                        </div>

                        <Button
                            type="submit"
                            variant="filled"
                        >
                            Sign In
                        </Button>

                        <p className="auth-footer">

                            Don't have an account?

                            <Link to="/register">
                                Create one
                            </Link>

                        </p>

                    </form>

                </AuthCard>

            </div>

        </main>

    );

}

export default LoginPage;