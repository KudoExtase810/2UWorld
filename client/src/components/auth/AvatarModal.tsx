import Avatar, { genConfig } from "react-nice-avatar";
import type { AvatarConfig } from "react-nice-avatar";
import { TbArrowsRandom } from "react-icons/tb";
import { toast } from "react-hot-toast";

interface props {
    config: AvatarConfig;
    setConfig: React.Dispatch<React.SetStateAction<AvatarConfig>>;
    setIsEdited: React.Dispatch<React.SetStateAction<boolean>>;
}

const AvatarModal = ({ config, setConfig, setIsEdited }: props) => {
    const possibleChoices = {
        faceColor: ["#F9C9B6", "#AC6651"],
        earSize: ["big", "small"],
        eyeStyle: ["circle", "oval", "smile"],
        noseStyle: ["long", "round", "short"],
        mouthStyle: ["laugh", "peace", "smile"],
        shirtStyle: ["hoody", "polo", "short"],
        glassesStyle: ["none", "round", "square"],
        hairColor: [
            "#506AF4",
            "#000",
            "#ffff5a",
            "#FC909F",
            "#fff",
            "#77311D",
            "#F48150",
            "#D2EFF3",
        ],
        hairStyle: ["normal", "thick", "mohawk", "womanLong", "womanShort"],
        shirtColor: ["#6BD9E9", "#F4D150", "#9287FF", "#77311D", "#FC909F", ""],
        bgColor: [
            "#D2EFF3",
            "#FC909F",
            "#F48150",
            "#FFEBA4",
            "#6BD9E9",
            "#506AF4",
            "#E0DDFF",
            "#74D153",
            "linear-gradient(45deg, #178bff 0%, #ff6868 100%)",
            "linear-gradient(45deg, #56b5f0 0%, #45ccb5 100%)",
            "linear-gradient(45deg, #3e1ccd 0%, #ff6871 100%)",
            "linear-gradient(45deg, #1729ff 0%, #ff56f7 100%)",
        ],
    };

    const avatar = {
        randomize: () => {
            setConfig(genConfig({ hatStyle: "none" }));
        },
        customize: (property: ConfigProperty) => {
            if (property === "hairColor") {
                if (
                    config!.hairStyle === "mohawk" ||
                    config!.hairStyle === "thick"
                ) {
                    return toast.error(
                        "Oops, this one isn't customizeable yet! :("
                    );
                }
            }

            const possibleValues = possibleChoices[property];

            let index = possibleValues.indexOf(config![property]!);

            if (index === -1) index = 0;

            if (index < possibleValues.length - 1) index++;
            else index = 0;

            config![property] = possibleValues[index] as any;

            setConfig({ ...config });
        },
    };

    return (
        <dialog id="avatarmodal" className="modal">
            <form method="dialog" className="modal-box">
                <div className="flex justify-between items-center">
                    <h3
                        className="font-bold text-lg"
                        onClick={() => console.log(config)}
                    >
                        Customize your Avatar
                    </h3>
                    <button
                        onClick={() =>
                            toast.success("Your changes have been saved.")
                        }
                        aria-label="close modal"
                        className="btn btn-sm btn-circle btn-ghost text-lg"
                    >
                        ✕
                    </button>
                </div>
                <p className="py-4">
                    Create your own unique avatar in order to complete the
                    registration process.
                </p>
                <section className="my-2">
                    <div className="relative">
                        <button
                            aria-label="randomize avatar"
                            className="btn btn-secondary btn-circle bg-opacity-60 absolute right-6 hover:animate-spin"
                            onClick={(e) => {
                                e.preventDefault();
                                avatar.randomize();
                            }}
                        >
                            <TbArrowsRandom size={22} />
                        </button>
                        <Avatar
                            className="w-48 h-48 mx-auto mb-5"
                            {...config}
                        />
                    </div>
                    <div className="bg-gray-500 px-3 py-2 w-full my-2 rounded-3xl flex justify-between">
                        {Object.keys(possibleChoices).map((prop, idx) => (
                            <button
                                key={idx}
                                className="rounded-full w-10 h-10 bg-accent hover:bg-secondary transition-colors duration-300 text-gray-950"
                                onClick={(e) => {
                                    e.preventDefault();
                                    avatar.customize(prop as ConfigProperty);
                                }}
                            >
                                {prop.charAt(0)}
                            </button>
                        ))}
                    </div>
                </section>
                <div className="modal-action">
                    <button className="btn" onClick={() => setIsEdited(true)}>
                        I'm Done
                    </button>
                </div>
            </form>
        </dialog>
    );
};

export default AvatarModal;
