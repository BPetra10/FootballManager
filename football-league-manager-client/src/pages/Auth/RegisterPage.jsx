import { Link } from "react-router-dom";

import {
    FaUser,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa6";

import FormCard from "../../components/common/Form/FormCard";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";
import ErrorAlert from "../../components/common/ErrorAlert/ErrorAlert";

import { useRegisterForm } from "../../hooks/auth/useRegisterForm";

import football from "../../assets/images/home/football.jpg";

import "./Auth.css";

function RegisterPage() {

    const {

        formData,
        errors,
        generalError,

        showPassword,
        showConfirmPassword,

        setShowPassword,
        setShowConfirmPassword,

        handleChange,
        handleSubmit

    } = useRegisterForm();

    return (

        <main
            className="auth-page"
            style={{
                backgroundImage: `url(${football})`
            }}
        >

            <div className="auth-overlay">

                <FormCard
                    title="Create Account"
                    subtitle="Start building your legacy."
                >

                    <form
                        className="form"
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

                        <p className="form-footer">

                            Already have an account?

                            <Link to="/login">
                                Sign in
                            </Link>

                        </p>

                    </form>

                </FormCard>

            </div>

        </main>

    );

}

export default RegisterPage;