import {
  Anchor,
  Button,
  Checkbox,
  PasswordInput,
  rem,
  TextInput,
  Select
} from "@mantine/core";
import { IconAt, IconLock } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const SignUp = () => {
  // ✅ STATES
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<string | null>("user");

  const inputStyle = {
    input: {
      backgroundColor: "transparent",
      border: "1px solid #444",
      transition: "border-color 0.2s ease",
      "&:hover": { borderColor: "#FACC15" },
      "&:focus": { borderColor: "#FACC15" }
    },
    label: { color: "white", marginBottom: "5px" }
  };

  const handleSignup = () => {
    const data = {
      name,
      email,
      password,
      confirmPassword,
      role
    };

    console.log("Signup Data:", data);
  };

  return (
    <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
      <div className="text-2xl font-semibold text-white">Create Account</div>

      <TextInput
        withAsterisk
        label="Full Name"
        placeholder="Your name"
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        styles={inputStyle}
      />

      <TextInput
        withAsterisk
        leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />}
        label="Email"
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.currentTarget.value)}
        styles={inputStyle}
      />

      <PasswordInput
        withAsterisk
        leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} />}
        label="Password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.currentTarget.value)}
        styles={inputStyle}
      />

      <PasswordInput
        withAsterisk
        leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} />}
        label="Confirm Password"
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.currentTarget.value)}
        styles={inputStyle}
      />

      {/* ✅ ROLE SELECT */}
      <Select
        label="Select Role"
        value={role}
        onChange={(value) => setRole(value)}
        data={[
          { value: "user", label: "Job Seeker" },
          { value: "recruiter", label: "Recruiter" },
          { value: "admin", label: "Admin" }
        ]}
        styles={inputStyle}
      />

      <Checkbox
        label={
          <>
            I accept{" "}
            <Anchor className="text-bright-sun-400">
              terms & conditions
            </Anchor>
          </>
        }
      />

      <Button
        onClick={handleSignup}
        className="!bg-bright-sun-400 !text-black"
        fullWidth
      >
        Sign up
      </Button>

      <div className="mx-auto text-white">
        Have an account?{" "}
        <Link to="/login" className="text-bright-sun-400 hover:underline">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;


