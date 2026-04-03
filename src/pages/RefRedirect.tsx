import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function RefRedirect() {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (code) {
      sessionStorage.setItem("nd-ref-code", code.toUpperCase());
      sessionStorage.setItem("nd-ref-source", "link");
    }
    navigate("/", { replace: true });
  }, [code, navigate]);

  return null;
}
