import AuthCard from "../../components/auth/AuthCard/AuthCard";
import Input from "../../components/common/Input/Input";
import Button from "../../components/common/Button/Button";

import football from "../../assets/images/home/football.jpg";

import {
    FaEnvelope
} from "react-icons/fa6";

import "./Auth.css";

function ForgotPasswordPage() {

    return (

        <main
            className="auth-page"
            style={{
                backgroundImage: `url(${football})`
            }}
        >

            <div className="auth-overlay">

                <AuthCard
                    title="Forgot Password?"
                    subtitle="Enter your email address and we'll send you a password reset link."
                >

                    <form className="auth-form">

                        <Input
                            label="Email"
                            name="email"
                            type="email"
                            placeholder="Enter your email"
                            leftIcon={<FaEnvelope />}
                        />

                        <Button
                            type="submit"
                            variant="filled"
                        >
                            Send Reset Link
                        </Button>

                    </form>

                </AuthCard>

            </div>

        </main>

    );

}

export default ForgotPasswordPage;