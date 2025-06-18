import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PasswordInput } from "~shared/ui/PasswordInput";
import { generateSalt, hashPassword } from "~utils/hashPassword";
import { RegistrationFormContainer } from "~pages/Registration/Registration.styles.tsx";

const validationSchema = Yup.object({
  login: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
});

export const Registration = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      login: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const salt = generateSalt();
      const hashedPassword = hashPassword(values.password, salt);

      const userData = {
        login: values.login,
        password: hashedPassword,
        salt,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      navigate(-1);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <RegistrationFormContainer>
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
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <PasswordInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          helperText={
            formik.touched.confirmPassword && formik.errors.confirmPassword
          }
        />
        <Button type="submit" size={"small"}>
          Зарегистрироваться
        </Button>
      </RegistrationFormContainer>
    </form>
  );
};
