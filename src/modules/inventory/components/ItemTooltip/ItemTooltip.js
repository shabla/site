import React from "react";
import styled from "styled-components";

const ComponentsFormatters = {
    name: item => {
        const subTypeName = item.subType.name;

        const nameFormatterByQuality = {
            Common: () => `Common ${subTypeName}`,
            Uncommon: () => `${item.prefixes[0].name} ${subTypeName.toLowerCase()} ${item.suffixes[0].name}`,
            Rare: () => `Rare ${subTypeName}`,
            Legendary: () => `Legandary ${subTypeName}`
        };

        return (
            <div className="name">
                {nameFormatterByQuality[item.quality.name]() || `Unknown quality ${subTypeName}`}
            </div>
        );
    },
    typeName: item => {
        return <div className="type-name">{item.type.name}</div>
    },
    defense: item => {
        return item.defense &&
            <div><span>Defense:</span> {item.defense}</div>
    },
    requirements: item => {
        const statsRequirements = [];
        if (item.subType.minStr) {
            statsRequirements.push({
                name: "strength",
                value: item.subType.minStr
            })
        }
        if (item.subType.minDex) {
            statsRequirements.push({
                name: "dexterity",
                value: item.subType.minDex
            })
        }
        if (item.subType.minInt) {
            statsRequirements.push({
                name: "intelligence",
                value: item.subType.minInt
            })
        }

        if (statsRequirements.length > 0) {
            return [
                <hr key="hr-before-reqs" />,
                ...statsRequirements.map(req => {
                    return <div key={"req-" + req.name}><span>Required {req.name}:</span> {req.value}</div>
                })
            ];
        };
    },
    canAttack: item => {
        return item.canAttack && [
            <div key="damage"><span>Damage:</span> {item.canAttack.minDamage}-{item.canAttack.maxDamage}</div>,
            <div key="critchance"><span>Critical Chance:</span> {item.canAttack.baseCrit * 100}%</div>,
            <div key="aps"><span>Attacks per second:</span> {item.canAttack.speed}</div>,
            <div key="range"><span>Range:</span> {item.canAttack.range}</div>,
        ];
    },
    affixes: item => {
        const affixes = [];

        const modifiersById = {};
        item.prefixes.forEach(prefix => {
            Object.keys(prefix.modifiers).forEach(modifierId => {
                const value = prefix.modifiers[modifierId];

                if (modifiersById[modifierId]) {
                    modifiersById[modifierId].value += value;
                } else {
                    modifiersById[modifierId] = {
                        id: prefix.id,
                        format: prefix.formatter || `unknown prefix(${prefix.id})`,
                        value
                    };
                }
            });
        });

        item.suffixes.forEach(suffix => {
            Object.keys(suffix.modifiers).forEach(modifierId => {
                const value = suffix.modifiers[modifierId];

                if (modifiersById[modifierId]) {
                    modifiersById[modifierId].value += value;
                } else {
                    modifiersById[modifierId] = {
                        id: suffix.id,
                        format: suffix.formatter || `unknown suffix(${suffix.id})`,
                        value
                    };
                }
            });
        });

        Object.keys(modifiersById).forEach((modifierId, index) => {
            const modifier = modifiersById[modifierId];
            const format = modifier.format.replace(`{${modifierId}}`, modifier.value);
            affixes.push(<div className="affix" key={`prefix-${modifier.id}`}>{format}</div>);
        });

        return affixes;
    }
}

const ItemTooltip = styled(({ className, item }) => {
    return (
        <div className={className}>
            {ComponentsFormatters.name(item)}
            {ComponentsFormatters.typeName(item)}
            {ComponentsFormatters.defense(item)}
            {ComponentsFormatters.canAttack(item)}
            {ComponentsFormatters.requirements(item)}
            <hr key="hr-before-affixes" />
            {ComponentsFormatters.affixes(item)}
        </div>
    )
})`
    text-align: center;
    padding: 5px;
    line-height: 18px;
    border-radius: 3px;
    box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.3), inset 0 0 5px 1px rgba(0, 0, 0, 0.5);
    height: 100%;

    .name {
        font-size: 14px;
        font-weight: 700;
        color: #${props => props.item.quality.color};
    }

    .type-name {
        font-size: 13px;
        font-weight: 400;
        color: #bbb;
        margin-bottom: 5px;
    }

    span {
        color: #ccc;
    }

    .affix {
        color: #bebeff;
    }

    hr {
        border-color: #aaa;
        height: 1px;
        margin: 4px 5px;
    }
`;

export default ItemTooltip;