import * as utils from "../../utils";
import { itemsData } from "constants";

const getRandomType = () => {
    return { ...itemsData.types[utils.getRandomInt(0, itemsData.types.length - 1)] };
};

const getRandomSubType = subTypes => {
    return { ...subTypes[utils.getRandomInt(0, subTypes.length - 1)] };
}

const getRandomPrefix = () => {
    const prefixes = [
        "Super",
        "Ultra",
        "Decent",
        "Amazing",
        "Cheap"
    ];

    return prefixes[utils.getRandomInt(0, prefixes.length - 1)];
}

const getRandomSuffix = () => {
    const suffixes = [
        "of doom",
        "of light",
        "of darkness",
        "of zigzag",
        "of blight"
    ];

    return suffixes[utils.getRandomInt(0, suffixes.length - 1)];
}

const getRandomQuality = () => {
    const qualities = [
        { name: "Common", color: "fff" }, // white
        { name: "Uncommon", color: "909bec" }, // blue
        { name: "Rare", color: "e0cf48" }, // yellow
        { name: "Legendary", color: "dc6dff" }, // purple
    ];

    return { ...qualities[utils.getRandomInt(0, qualities.length - 1)] };
}

export const generateRandomItem = () => {
    // TODO for equipable items:
    // 1. determine item type (weapon, belt, boots, ...)
    //      - each type has a set of components
    // 2. determine item sub-type (shortsword, axe, small shield, ...)

    const type = getRandomType();
    const subType = getRandomSubType(type.subTypes);

    const item = {
        type,
        subType,
        prefix: getRandomPrefix(),
        suffix: getRandomSuffix(),
        quality: getRandomQuality(),
        inventory: {
            height: subType.invHeight,
            width: subType.invWidth
        }
    };

    // parse item components here

    if (subType.minDefense && subType.maxDefense) {
        item.defense = utils.getRandomInt(subType.minDefense, subType.maxDefense);
    }

    if (subType.canAttack) {
        item.canAttack = subType.canAttack;
    }

    return item;
}