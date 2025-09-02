import Navbar from "../components/Navbar";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <div class="w-screen bg-blue-500">
      <div className="min-h-screen bg-gray-50">
        <Navbar buttonText="Sign up" />
        <div className="flex justify-center items-center py-12">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
