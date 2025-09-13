import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// Layout
import Layout from "../../Layout/Layout";

// Components
import { Title } from "../../Components/Text";
import { GoogleButton } from "../../Components/Button";
import { InputField } from "../../Components/Input";

// Store
import useAuthStore from "../../Store/useAuthStore";

interface UserData {
  email: string;
  password: string;
}

const ManualSignIn = () => {
  const { signinManual } = useAuthStore();

  const initialUserData: UserData = {
    email: "",
    password: "",
  };

  const [userData, setUserData] = useState<UserData>(initialUserData);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;

    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signinManual(userData);

      setUserData(initialUserData);
    } catch (error: any) {
      console.log(error?.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <InputField
          type="email"
          name="email"
          value={userData.email}
          placeholder="Email"
          required
          onChange={handleInputChange}
        />

        <InputField
          type="password"
          name="password"
          value={userData.password}
          placeholder="Password"
          required
          onChange={handleInputChange}
        />

        <button
          type="submit"
          className="bg-white/10 hover:bg-white/20 transition-colors rounded-md p-2 text-white font-medium mt-2"
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

const Signup = () => {
  const { signinWithGoogle } = useAuthStore();

  const navigate = useNavigate();

  return (
    <Layout className="flex flex-col">
      <Title title="Signup" className="text-center" />

      <div className="w-full flex-1 grid place-items-center">
        {/* Sign In Card */}
        <div className="w-11/12 xs:w-80 text-white/75 bg-secondary rounded-lg flex flex-col gap-y-2 justify-center p-side-spacing">
          <GoogleButton
            label="Sign up with Google"
            onClick={signinWithGoogle}
          />

          <p className="font-medium text-center">OR</p>

          <ManualSignIn />

          <p className="text-white/75 text-sm text-center">
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} className="font-medium">
              Log in
            </span>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
