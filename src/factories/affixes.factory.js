import * as utils from "../utils";
import prefixes from "constants/prefixes.json";
import suffixes from "constants/suffixes.json";

const getRandomAffix = affixes => {
    const affixIndex = utils.getRandomInt(0, affixes.length - 1);
    const affix = affixes[affixIndex];

    const tierIndex = utils.getRandomInt(0, affix.tiers.length - 1);
    const tier = affix.tiers[tierIndex];

    const modifiers = Object.keys(tier.modifiers)
        .reduce((acc, modifierId) => {
            acc[modifierId] = utils.getRandomInt(tier.modifiers[modifierId].min, tier.modifiers[modifierId].max);
            return acc;
        }, {});

    return {
        id: affix.id,
        formatter: affix.formatter,
        tier: tier.tier,
        name: tier.name,
        modifiers
    };
}

export const getRandomPrefix = () => {
    return getRandomAffix(prefixes);
}

export const getRandomSuffix = () => {
    return getRandomAffix(suffixes);
}