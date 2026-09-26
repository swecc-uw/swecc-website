import { useEffect } from "react";

function ExternalRedirect({ to }: { to: string }) {
  useEffect(() => {
    window.location.href = to;
  }, [to]);

  return null;
}

export default ExternalRedirect;
