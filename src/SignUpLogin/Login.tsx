import { Button, Checkbox, PasswordInput, rem, TextInput, Anchor } from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";

const Login = () => {
  const inputStyle = {
    input: {
      backgroundColor: "transparent",
      border: "1px solid #444",
      "&:hover": { borderColor: "#FACC15" },
      "&:focus": { borderColor: "#FACC15" }
    },
    label: { color: "white", marginBottom: "5px" }
  };

  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold text-white">Welcome Back</div>

      <TextInput
        withAsterisk
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label="Email"
        placeholder="Your email"
        styles={inputStyle}
      />

      <PasswordInput
        withAsterisk
        leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
        label="Password"
        placeholder="Password"
        styles={inputStyle}
      />

      <div className="flex justify-between items-center">
        <Checkbox label="Remember me" />
        <Anchor size="sm">Forgot password?</Anchor>
      </div>

      <Button
        className="!bg-bright-sun-400 !text-black hover:!bg-bright-sun-400"
        fullWidth
      >
        Login
      </Button>

      <div className="mx-auto text-white">
        Don’t have an account?{" "}
        <Link to="/signup" className="text-bright-sun-400 hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
