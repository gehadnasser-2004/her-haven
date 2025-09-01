import { FaEnvelope, FaFacebook } from "react-icons/fa";
export default function LoginForm() {
  return (
    <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-xl font-semibold mb-6">Welcome back</h2>

      <form className="flex flex-col gap-4 text-left">
        <div>
          <label className="block mb-1">Email</label>
          <input
            type="email"
            placeholder="jane.doe@example.com"
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
        </div>
        <div>
          <label className="block mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-3 py-2 border rounded-lg bg-gray-100"
          />
          <a href="#" className="text-sm text-gray-500 hover:underline">
            Forgot password?
          </a>
        </div>

        <button className="w-full py-2 rounded-lg bg-pink-500 text-white font-medium hover:bg-pink-600">
          Log in
        </button>
      </form>
      <div className="max-w-md mx-auto mt-6 text-center">
        <p className="text-sm text-gray-500 mb-4">Or continue with</p>
        <div className="flex gap-4 justify-center">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
            <FaEnvelope />
            Continue with Email
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200">
            <FaFacebook className="text-blue-600" />
            Continue with Facebook
          </button>
        </div>
      </div>
      <div className="text-center mt-8 text-sm">
        Don’t have an account?{" "}
        <a href="#" className="text-pink-500 hover:underline">
          Sign up
        </a>
      </div>
    </div>
  );
}
