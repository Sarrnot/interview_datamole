import styled from "styled-components";

export const Button = styled.button`
    all: unset;

    width: 25px;
    height: 25px;

    background-color: ${(props) => props.theme.colors.grass9};
    border: 1px solid;
    border-color: ${(props) => props.theme.colors.olive9};
    border-radius: 50%;

    color: #fff;

    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
