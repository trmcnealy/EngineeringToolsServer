declare module "react-snapshot" {
    import * as ReactDOM from "react-dom";
    import * as ReactDOMServer from "react-dom/server";

    export const render: ReactDOM.Renderer;
}
