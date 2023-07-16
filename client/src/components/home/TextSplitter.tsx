import { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";
import { FaCaretRight, FaCaretLeft } from "react-icons/fa";

interface props {
    characterLimit: number;
    children: React.ReactNode;
}

const TextSplitter = ({ children, characterLimit }: props) => {
    const text = children;
    const [parts, setParts] = useState<RegExpMatchArray | []>([]);
    const [currentPart, setCurrentPart] = useState(0);

    // Split the text into parts based on the character limit
    useEffect(() => {
        const regex = new RegExp(`(.{1,${characterLimit}})`, "g");
        const splitText = (text as string).match(regex) || [];
        setParts(splitText);
    }, [text, characterLimit]);

    const navigateToNextPart = () => {
        if (currentPart === parts.length - 1) {
            setCurrentPart(0); // Go back to the first part
        } else {
            setCurrentPart(currentPart + 1);
        }
    };

    const navigateToPreviousPart = () => {
        if (currentPart === 0) {
            setCurrentPart(parts.length - 1); // Go to the last part
        } else {
            setCurrentPart(currentPart - 1);
        }
    };

    return (
        <>
            <Typewriter
                component="p"
                options={{
                    delay: 100,
                    strings: parts[currentPart],
                    autoStart: true,
                }}
            />
            {(text as string).length > characterLimit && (
                <div className="absolute bottom-1 right-2">
                    <button
                        onClick={navigateToPreviousPart}
                        disabled={currentPart === 0}
                        className="text-zinc-900 hover:text-zinc-100 transition-colors duration-300 disabled:text-zinc-600"
                    >
                        <FaCaretLeft size={32} />
                    </button>
                    <button
                        onClick={navigateToNextPart}
                        className="text-zinc-900 hover:text-zinc-100 transition-colors duration-300"
                    >
                        <FaCaretRight size={32} />
                    </button>
                </div>
            )}
        </>
    );
};

export default TextSplitter;
