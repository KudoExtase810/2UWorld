type User = {
    email: string;
    username: string;
    password: string;
    points: number;
    previousMessages: Message[];
    createdAt: Date;
    avatarConfig: {
        faceColor: "#F9C9B6" | "#AC6651";
        earSize: "big" | "small";
        eyeStyle: "circle" | "oval" | "smile";
        noseStyle: "long" | "round" | "short";
        mouthStyle: "laugh" | "peace" | "smile";
        shirtStyle: "hoody" | "polo" | "short";
        glassesStyle: "none" | "round" | "square";
        hairColor: string;
        hairStyle: "normal" | "thick" | "mohawk" | "womanLong" | "womanShort";
        shirtColor: string;
        bgColor: string;
    };
};
type Message = {
    author: User;
    body: string;
    createdAt: Date;
};
type ConfigProperty =
    | "faceColor"
    | "earSize"
    | "eyeStyle"
    | "noseStyle"
    | "mouthStyle"
    | "shirtStyle"
    | "glassesStyle"
    | "hairColor"
    | "hairStyle"
    | "shirtColor"
    | "bgColor";
