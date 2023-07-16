import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useUserData } from "../../contexts/UserContext";

type FormValues = {
    email: string;
    password: string;
};

const LoginForm = () => {
    const navigate = useNavigate();

    const { setData } = useUserData();

    const { register, handleSubmit, formState } = useForm<FormValues>();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const loginUser = async (data: FormValues) => {
        setIsSubmitting(true);
        try {
            const URL = `${import.meta.env.VITE_API_URL}/auth/login`;
            const response = await axios.post(URL, data);
            const token = response.data.token as string;
            cookies.set("2uw-token", token);
            setData(response.data.user);
            navigate("/");
        } catch (error: any) {
            if (error.response.data.message)
                toast.error(error.response.data.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form
            className="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100"
            onSubmit={handleSubmit(loginUser)}
            noValidate
        >
            <div className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        autoComplete="username"
                        type="email"
                        placeholder="user@email.com"
                        className="input input-bordered"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "This field is required !",
                            },
                        })}
                    />
                    <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                        {formState.errors.email?.message}
                    </span>
                </div>

                <div className="form-control mb-2">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        autoComplete="current-password"
                        type="password"
                        placeholder="••••••••"
                        className="input input-bordered"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "This field is required !",
                            },
                        })}
                    />
                    <label className="label">
                        <a href="#" className="label-text-alt link link-hover">
                            Forgot password?
                        </a>
                    </label>
                    <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                        {formState.errors.password?.message}
                    </span>
                </div>

                <div className="form-control mt-6">
                    {!isSubmitting ? (
                        <button className="btn btn-primary" type="submit">
                            Sign in
                        </button>
                    ) : (
                        <button
                            className="btn btn-primary btn-disabled disabled:bg-primary-focus"
                            type="button"
                            disabled
                        >
                            <span className="loading loading-infinity loading-lg bg-primary-content"></span>
                        </button>
                    )}
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
