// Store
import useAuthStore from "../../Store/useAuthStore";

const Signup = () => {
  const { signupWithGoogle } = useAuthStore();

  return (
    <div>
      <button onClick={signupWithGoogle}>Signup with Google</button>
    </div>
  );
};

export default Signup;
