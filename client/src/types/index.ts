export {};
declare global {
    interface Window {
        avatarmodal: {
            showModal: () => void;
        };
        msgmodal: {
            showModal: () => void;
        };
    }
}
