import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Avatar from "react-nice-avatar";
import { useUserData } from "../../contexts/UserContext";
import TextSplitter from "./TextSplitter";

const CurrentMessage = () => {
    const [currentMsg, setCurrentMsg] = useState<Message>();
    const { data } = useUserData();
    useEffect(() => {
        const getCurrentMessage = async () => {
            try {
                const URL = `${import.meta.env.VITE_API_URL}/currentMessage`;
                const response = await axios.get(URL);
                const msg = response.data as Message;
                setCurrentMsg(msg);
            } catch (error: any) {
                if (error.response.data.message) {
                    toast.error(error.response.data.message);
                }
            }
        };
        getCurrentMessage();
    }, []);

    return (
        <div className="bg-primary mx-3 px-3 py-6 rounded-md my-12 bg-opacity-75">
            <div className="flex gap-4">
                <Avatar
                    className="w-[160px] h-[160px] !rounded-lg bg-contain"
                    {...data?.avatarConfig}
                />
                <div className="w-4/5">
                    <h3 className="text-2xl font-semibold w-full text-gray-200 -mt-2 mb-3 border-b border-accent-content">
                        John Doe
                    </h3>
                    <div className="bg-accent-content rounded-md p-3 min-h-[88%] text-lg max-h-48 overflow-y-auto custom-scroll text-gray-200 bg-opacity-90 relative">
                        <TextSplitter characterLimit={120}>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Explicabo, ea fugit! Eaque iusto placeat
                            tempore perferendis a mollitia, optio sit expedita
                            rerum nulla veritatis animi cupiditate hic unde vero
                            eum! Sunt doloribus impedit amet reiciendis
                            accusantium, suscipit dolorum obcaecati temporibus
                            aliquam provident fugit facilis soluta ducimus magni
                            at atque voluptates earum consequuntur consectetur
                            placeat! Illo cumque harum nostrum eos quod
                            assumenda, sapiente, eum dolorem inventore, iste
                            nobis nesciunt qui voluptatum at magnam nemo
                            exercitationem minus quo! Repellat est illum
                            dolores!
                        </TextSplitter>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentMessage;
