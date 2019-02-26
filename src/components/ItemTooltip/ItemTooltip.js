import React from "react";
import styled from "styled-components";

const ComponentsFormatters = {
    name: item => {
        const name = `${item.prefix} ${item.subType.name.toLowerCase()} ${item.suffix}`;
        return <div className="name">{name}</div>
    },
    typeName: item => {
        return <div className="type-name">{item.type.name}</div>
    },
    defense: item => {
        return item.defense &&
            <div>Defense: {item.defense}</div>
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
                <hr key="hr-top-req" />,
                ...statsRequirements.map(req => {
                    return <div key={"req-" + req.name}>Required {req.name}: {req.value}</div>
                }),
                <hr key="hr-bot-req" />
            ];
        };
    },
    canAttack: item => {
        return item.canAttack && [
            <div key="damage">Damage: {item.canAttack.minDamage}-{item.canAttack.maxDamage}</div>,
            <div key="critchance">Critical Chance: {item.canAttack.baseCrit * 100}%</div>,
            <div key="aps">Attacks per second: {item.canAttack.speed}</div>,
            <div key="range">Range: {item.canAttack.range}</div>,
        ];
    }
}

const ItemTooltip = styled(({ className, item }) => {
    console.log(item)

    return (
        <div className={className}>
            {ComponentsFormatters.name(item)}
            {ComponentsFormatters.typeName(item)}
            {ComponentsFormatters.defense(item)}
            {ComponentsFormatters.canAttack(item)}
            {ComponentsFormatters.requirements(item)}
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

    hr {
        border-color: #aaa;
        height: 1px;
        margin: 4px 5px;
    }
`;

export default ItemTooltip;