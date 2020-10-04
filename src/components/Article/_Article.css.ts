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
  }

  .shareit-article .image {
    width: 100%;
    height: 120px;
    background-color: red;
    background-size: cover;
    background-position: center center;

    display: flex;
    align-items: flex-end;
  }

  .shareit-article .title {
    background: linear-gradient(0deg, rgba(13,0,26,0.95) 0%, rgba(13,0,26,0.85) 15%, rgba(13,0,26,0) 100%);

    width: 100%;
    height: 75%;

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
`;
