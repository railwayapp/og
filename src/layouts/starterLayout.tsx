import { GetCSSFn, ILayout, LayoutComponent } from "../types";
import { colourThemes, defaultTheme } from "./colours";
import { gString, RLogo } from "./utils";

const getCSS: GetCSSFn = config => {
  const theme = gString(config, "Theme", defaultTheme).toLowerCase();
  const colours = colourThemes[theme];

  return `
  .top {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    background-color: ${colours.bg};
    color: ${colours.fg};
    padding: 80px;
  }

    .rlogo {
      position: absolute;
      top: 60px;
      left: 60px;
    }

    h1 {
      margin: 0;
      text-align: right;
      font-size: 1.5em;
      font-weight: 800;
      max-width: 1600px;
    }

    .dicon-wrapper {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 80px;
    }

    .dicon {
      width: 300px;
      height: 300px;
      border-radius: 2px;
    }

    .em {
      color: ${colours.pink};
    }

    .url {
      margin-top: 40px;
      text-align: right;
      font-size: 45px;
      color: ${colours.gray};
    }
    `;
};

const Component: LayoutComponent = ({ config }) => {
  const name = gString(config, "Name");
  const url = gString(config, "URL");

  return (
    <div className="top">
      <RLogo config={config} />

      <div className="content">
        <div className="dicon-wrapper">
          <img
            className="dicon"
            src={`https://devicons-production.up.railway.app/${name}`}
          />
        </div>

        <h1>
          Deploy <span className="em">{name}</span> on Railway
        </h1>

        {url && <div className="url">{url}</div>}
      </div>
    </div>
  );
};

export const starterLayout: ILayout = {
  name: "Starter",
  properties: [
    {
      name: "Theme",
      type: "select",
      options: ["Light", "Dark"],
      default: defaultTheme,
    },
    {
      name: "Name",
      type: "text",
      default: "BlitzJS",
      placeholder: "Starter title",
    },
    { name: "URL", type: "text", placeholder: "GitHub repo URL" },
  ],
  getCSS,
  Component,
};