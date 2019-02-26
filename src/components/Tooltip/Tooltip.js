import styled from "styled-components";

const Tooltip = styled.div.attrs(props => ({
    style: {
        transform: `translate(${props.x}px, ${props.y}px)`,
    }
}))`
	background: rgba(0, 0, 0, 0.7);
    border-radius: 3px;
    position: absolute;
    top: 0;
    left: 0;
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    z-index: 100;
    pointer-events: none;
    color: white;
    text-shadow: 1px 1px rgba(0, 0, 0, 0.3),
        -1px -1px rgba(0, 0, 0, 0.3),
        -1px 1px rgba(0, 0, 0, 0.3),
        1px -1px rgba(0, 0, 0, 0.3);
`;

export default Tooltip;