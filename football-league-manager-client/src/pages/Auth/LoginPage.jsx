import { Link } from "react-router-dom";

import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa6";

import FormCard from "../../components/common/Form/FormCard";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import ErrorAlert from "../../components/common/ErrorAlert/ErrorAlert";

import { useLoginForm } from "../../hooks/auth/useLoginForm";

import football from "../../assets/images/home/football.jpg";

import "./Auth.css";

function LoginPage() {

    const {

        formData,
        errors,
        generalError,

        showPassword,

        setShowPassword,

        handleChange,
        handleSubmit

    } = useLoginForm();

    return (

        <main
            className="auth-page"
            style={{
                backgroundImage: `url(${football})`
            }}
        >

            <div className="auth-overlay">

                <FormCard
                    title="Welcome Back!"
                    subtitle="Sign in to continue managing your football club."
                >

                    <form
                        className="form"
                        onSubmit={handleSubmit}
                    >

                        <ErrorAlert message={generalError} />

                        <Input
                            label="Username or Email"
                            name="usernameOrEmail"
                            value={formData.usernameOrEmail}
                            onChange={handleChange}
                            placeholder="Enter your username or email"
                            leftIcon={<FaEnvelope />}
                            error={errors.usernameOrEmail}
                        />

                        <Input
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={formData.password}
                            onChange={handleChange}
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
                            error={errors.password}
                        />

                        <div className="form-options">

                            <Link
                                to="/forgot-password"
                                className="form-link"
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

                        <p className="form-footer">

                            Don't have an account?

                            <Link to="/register">
                                Create one
                            </Link>

                        </p>

                    </form>

                </FormCard>

            </div>

        </main>

    );

}

export default LoginPage;