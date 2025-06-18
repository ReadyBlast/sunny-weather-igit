import { Button, Typography } from "@mui/material";
import { DEFAULT_MESSAGES } from "~pages/ErrorPage/ErrorPage.consts.ts";
import { useNavigate } from "react-router";
import { ReactNode } from "react";
import {
  ErrorPageActionsBox,
  ErrorPageContainer,
} from "~pages/ErrorPage/ErrorPage.styles.ts";

type ErrorPageProps = {
  statusCode: number;
  title?: string;
  description?: string;
  actions?: ReactNode;
};

export const ErrorPage = ({
  statusCode,
  title,
  description,
  actions,
}: ErrorPageProps) => {
  const navigate = useNavigate();

  const errorInfo = DEFAULT_MESSAGES[
    statusCode as keyof typeof DEFAULT_MESSAGES
  ] || {
    title: title || "Error",
    description: description || "An unexpected error occurred",
  };

  const defaultActions = (
    <Button variant="contained" onClick={() => navigate("/")}>
      Back to Main
    </Button>
  );

  return (
    <ErrorPageContainer>
      <Typography variant={"h2"}>{errorInfo.title}</Typography>
      <Typography>{errorInfo.description}</Typography>
      <ErrorPageActionsBox>{actions || defaultActions}</ErrorPageActionsBox>
    </ErrorPageContainer>
  );
};
