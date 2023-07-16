import { useState } from "react";
import AvatarModal from "../components/auth/AvatarModal";
import RegisterForm from "../components/auth/RegisterForm";
import { genConfig, type AvatarConfig } from "react-nice-avatar";

const Register = () => {
    // avatar config data
    const [config, setConfig] = useState<AvatarConfig>(
        genConfig({ hatStyle: "none" })
    );

    // to determine whether to register or show the avatar modal
    const [isEdited, setIsEdited] = useState(false);

    return (
        <>
            <AvatarModal
                config={config}
                setConfig={setConfig}
                setIsEdited={setIsEdited}
            />
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold">Register now!</h1>
                        <p className="py-6">
                            Provident cupiditate voluptatem et in. Quaerat
                            fugiat ut assumenda excepturi exercitationem quasi.
                            In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                    </div>
                    <RegisterForm config={config} isEdited={isEdited} />
                </div>
            </div>
        </>
    );
};

export default Register;
