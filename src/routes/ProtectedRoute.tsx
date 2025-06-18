import { FC } from "react";
import { ErrorPage } from "~pages/ErrorPage";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

export const ProtectedRoute = ({ component: Component }: { component: FC }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return token ? (
    <Component />
  ) : (
    <ErrorPage
      statusCode={403}
      actions={
        <Button
          type={"button"}
          variant={"contained"}
          onClick={() => navigate("/login")}
        >
          Go to Login Page
        </Button>
      }
    />
  );
};
