import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import App from "./Components/App";

export { PAGE_TITLES, REDIRECTS } from "./Components/App";

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
