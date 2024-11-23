import { useEffect } from "react";

function ExternalRedirect({ to }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return null;
}

export default ExternalRedirect;
