import { useState } from "react";
import toast from "react-hot-toast";

const MessageModal = () => {
    const [message, setMessage] = useState("");

    const publishMessage = async () => {
        // e.preventDefault();
        // alert("hola");
        toast.success("Let's goooo!");
    };

    return (
        <>
            <dialog
                id="msgmodal"
                className="modal modal-bottom sm:modal-middle"
            >
                <form method="dialog" className="modal-box">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                        ✕
                    </button>
                    <h3 className="font-bold text-lg mb-3">
                        Tell the whole world something
                    </h3>
                    <textarea
                        className="textarea textarea-bordered rounded-md w-full h-56"
                        placeholder="..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />
                    <div className="modal-action">
                        <button className="btn" onClick={publishMessage}>
                            Submit
                        </button>
                    </div>
                </form>
            </dialog>
        </>
    );
};

export default MessageModal;
