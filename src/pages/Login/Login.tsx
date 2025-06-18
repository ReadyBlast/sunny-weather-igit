import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import { PasswordInput } from "~shared/ui/PasswordInput";
import * as Yup from "yup";
import { hashPassword } from "~utils/hashPassword";
import { LoginFormContainer } from "~pages/Login/Login.styles.tsx";

const validationSchema = Yup.object({
  login: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
});

export const Login = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const savedUser = localStorage.getItem("user");
      if (!savedUser) {
        alert("User not found");
        return;
      }

      const userData = JSON.parse(savedUser);
      const inputHashedPassword = hashPassword(values.password, userData.salt);

      if (
        values.login === userData.login &&
        inputHashedPassword === userData.password
      ) {
        const token = crypto.randomUUID();
        localStorage.setItem("token", token);
        navigate("/");
      } else {
        alert("Invalid Login or Password");
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <LoginFormContainer>
        <TextField
          name="login"
          label="Login"
          value={formik.values.login}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.login && Boolean(formik.errors.login)}
          helperText={formik.touched.login && formik.errors.login}
        />
        <PasswordInput
          name="password"
          label="Password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button
          type="button"
          variant={"text"}
          size={"small"}
          onClick={() => navigate("../registration")}
        >
          Зарегистрироваться
        </Button>
        <Button type="submit" variant={"contained"}>
          Login
        </Button>
      </LoginFormContainer>
    </form>
  );
};
