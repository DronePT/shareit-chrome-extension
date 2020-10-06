import { colors } from "../../_vars.css";

export const styles = `
  .shareit-article {
    background-color: ${colors.white};
    box-shadow: 0px 4px 16px -8px rgba(0, 0, 0, .32),
      0px 2px 8px -4px rgba(0, 0, 0, .32);
    border: solid 1px rgba(0, 0, 0, .08);
    margin-bottom: 1em;
    border-radius: .25em;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    animation: fadeIn;
    animation-duration: 260ms;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  }

  .shareit-article .image {
    width: 100%;
    height: 120px;
    background-color: #f1f2f3;
    background-size: cover;
    background-position: center center;

    color: inherit;
    text-decoration: none;

    display: flex;
    align-items: flex-end;
  }

  .shareit-article .title {
    background: linear-gradient(0deg, rgba(13,0,26,0.95) 0%, rgba(13,0,26,0.85) 15%, rgba(13,0,26,0) 100%);

    width: 100%;
    height: 100%;

    text-shadow: 0px 2px ${colors.primary50};

    display: flex;
    align-items: flex-end;
    padding: 1em;
    color: ${colors.white};
    font-weight: 700;
    font-size: 1.15em;
  }

  .shareit-article .description {
    padding: 1em;
    font-weight: 400;
    color: ${colors.black80};
  }

  .shareit-article--footer {
    padding: .5em 1em;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .shareit-article--likes {
    display: flex;
    align-items: center;
  }

  .shareit-article--likes .likes-icon {
    width:24px;

    transition: all 150ms ease-in-out;
  }

  .shareit-article--likes .likes-icon path {
    fill: ${colors.black80};
  }

  .shareit-article--likes .likes-icon.liked path,
  .shareit-article--likes .likes-icon:hover path {
    fill: ${colors.primary};
  }

  .shareit-article--likes .likes-icon:hover {
    transform: scale(1.2);
    color: ${colors.primary};
  }

  .shareit-article--likes .likes-count {
      margin-left: .5em;
  }

  .shareit-article--author {
    display: flex;
    align-items: center;
  }

  .shareit-article--author label {
    color: ${colors.black50};
    text-transform: uppercase;
    font-size: 0.75em;
    margin-right: .5em;
    font-weight: 700;
    text-shadow: 0px -1px rgba(255, 255, 255, .5);
  }
`;
