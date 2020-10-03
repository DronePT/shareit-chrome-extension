import { fontFamily, colors } from "../../_vars.css";

export const styles = `
    @import url("https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;700&display=swap");

    #shareit-extension--container {
        position: fixed;
        right: 0;
        top: 0;
        bottom: 0;
        background: ${colors.white};
        color: ${colors.black};
        font-family: ${fontFamily};
        font-weight: 400;
        font-size: 16px;
        text-align: center;
        width: 480px;
        height: 100vh;
        cursor: auto;
        user-select: none;
        box-shadow: -8px 0px 16px -8px rgba(0,0,0,0.16),
            -4px 0px 8px -4px rgba(0,0,0,0.08);
        transition: all 260ms ease-in-out;

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;

        animation: fadeIn;
        animation-duration: 260ms;
        animation-timing-function: ease-in-out;
        animation-fill-mode: forwards;
        animation-iteration-count: 1;
    }

    *, *:before, *:after {
        box-sizing: border-box;
        font-family: inherit;
        font-size: inherit;
        font-weight: inherit;
    }

    button {
        background: ${colors.accent};
        color: ${colors.white};
        border: none;
        border-radius: 0.25em;
        padding: 0.5em 1em;
        outline: none;

        box-shadow: 0px 4px 16px -8px rgba(0, 0, 0, .32),
            0px 2px 8px -4px rgba(0, 0, 0, .54);
    }

    @keyframes fadeIn {
        from {
            transform: scale(0.5);
            opacity: 0;
        }
        to {
            transform: scale(1);
            opacity: 1;
        }
    }
`;
