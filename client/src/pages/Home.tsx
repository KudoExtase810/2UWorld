import Countdown from "../components/home/Countdown";
import CurrentMessage from "../components/home/CurrentMessage";
import MessageModal from "../components/home/MessageModal";

const Home = () => {
    document.title = "2UWorld | Home";
    return (
        <>
            <MessageModal />
            <Countdown />
            <CurrentMessage />
            {/* <button className="btn" onClick={() => window.msgmodal.showModal()}>
                open modal
            </button> */}
        </>
    );
};

export default Home;
