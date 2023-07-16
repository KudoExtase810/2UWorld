import { useState } from "react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import axios from "axios";
import type { AvatarConfig } from "react-nice-avatar";
import { useNavigate } from "react-router-dom";

interface props {
    config: AvatarConfig;
    isEdited: boolean;
}

type FormValues = {
    email: string;
    username: string;
    password: string;
    avatarConfig: User["avatarConfig"];
};

const RegisterForm = ({ config, isEdited }: props) => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState } = useForm<FormValues>();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const registerUser = async (data: FormValues) => {
        if (!isEdited) return;
        setIsSubmitting(true);
        try {
            const URL = `${import.meta.env.VITE_API_URL}/auth/register`;
            await axios.post(URL, {
                email: data.email,
                username: data.username,
                password: data.password,
                avatarConfig: config,
            });

            toast.success("Your account was successfully created.");
            navigate("/login");
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
            onSubmit={handleSubmit(registerUser)}
            noValidate
        >
            <div className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input
                        type="email"
                        placeholder="user@email.com"
                        className="input input-bordered"
                        {...register("email", {
                            required: {
                                value: true,
                                message: "This field is required !",
                            },
                            minLength: {
                                value: 6,
                                message: "Email is too short !",
                            },
                            maxLength: {
                                value: 64,
                                message: "Email is too long !",
                            },
                        })}
                    />
                    <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                        {formState.errors.email?.message}
                    </span>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Username</span>
                    </label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="input input-bordered"
                        {...register("username", {
                            required: {
                                value: true,
                                message: "This field is required !",
                            },
                            minLength: {
                                value: 4,
                                message: "The chosen username is too short !",
                            },
                            maxLength: {
                                value: 14,
                                message: "The chosen username is too long !",
                            },
                        })}
                    />
                    <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                        {formState.errors.username?.message}
                    </span>
                </div>
                <div className="form-control mb-2">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input
                        type="password"
                        placeholder="••••••••"
                        className="input input-bordered"
                        {...register("password", {
                            required: {
                                value: true,
                                message: "This field is required !",
                            },
                            minLength: {
                                value: 6,
                                message: "The chosen password is too short !",
                            },
                            maxLength: {
                                value: 64,
                                message: "The chosen password is too long !",
                            },
                        })}
                    />
                    <span className="label-text-alt text-red-600 text-sm mt-1 ml-1">
                        {formState.errors.password?.message}
                    </span>
                </div>

                <div className="form-control mt-6">
                    {!isSubmitting ? (
                        <button
                            className="btn btn-primary"
                            type="submit"
                            onClick={() =>
                                !isEdited && window.avatarmodal.showModal()
                            }
                        >
                            Create an Account
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

export default RegisterForm;
