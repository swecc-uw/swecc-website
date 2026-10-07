import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";

import App from "./app/App";

export { PAGE_TITLES, REDIRECTS } from "./app/App";

export function render(url: string) {
  return renderToString(
    <StaticRouter location={url}>
      <App />
    </StaticRouter>,
  );
}
