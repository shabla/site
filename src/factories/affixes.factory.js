import * as utils from "../utils";

export const getRandomPrefix = () => {
    const prefixes = [
        "Super",
        "Ultra",
        "Decent",
        "Amazing",
        "Cheap"
    ];

    return prefixes[utils.getRandomInt(0, prefixes.length - 1)];
}

export const getRandomSuffix = () => {
    const suffixes = [
        "of doom",
        "of light",
        "of darkness",
        "of zigzag",
        "of blight"
    ];

    return suffixes[utils.getRandomInt(0, suffixes.length - 1)];
}