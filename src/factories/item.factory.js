import { getRandomPrefix, getRandomSuffix } from "./affixes.factory";
import itemsData from "constants/items_data.json";
import * as utils from "../utils";
import qualities from "constants/qualities.json";

export const getRandomType = () => {
    return { ...itemsData.types[utils.getRandomInt(0, itemsData.types.length - 1)] };
};

export const getRandomSubType = subTypes => {
    return { ...subTypes[utils.getRandomInt(0, subTypes.length - 1)] };
}

export const getRandomQuality = () => {
    return { ...qualities[utils.getRandomInt(0, qualities.length - 1)] };
}

export const generateRandomItem = () => {
    // TODO for equipable items:
    // 1. determine item type (weapon, belt, boots, ...)
    //      - each type has a set of components
    // 2. determine item sub-type (shortsword, axe, small shield, ...)

    const type = getRandomType();
    const subType = getRandomSubType(type.subTypes);
    const quality = getRandomQuality();

    const prefixes = [];
    for (let i = 0; i < quality.prefixes; i++) {
        prefixes.push(getRandomPrefix());
    }

    const suffixes = [];
    for (let i = 0; i < quality.suffixes; i++) {
        suffixes.push(getRandomSuffix());
    }

    const item = {
        type,
        subType,
        quality,
        prefixes,
        suffixes,
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