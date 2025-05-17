import { loginWithGoogle } from "@/store/auth";
import { ArrowRight, BookOpen, Lock, Shield } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch =  useDispatch();
  const {loading} = useSelector((state) => state.auth);
  const handleGoogleLogin = () => {
    dispatch(loginWithGoogle());
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center items-center mb-4">
            <BookOpen className="h-10 w-10 text-amber-600 mr-2" />
            <Lock className="h-10 w-10 text-amber-800" />
          </div>
          <h1 className="text-3xl font-bold text-amber-900 mb-2">
            Akan Heritage
          </h1>
          <p className="text-amber-700 mb-6">
            Discover the rich cultural heritage of the Akan people. Explore
            traditions, history, and connect with your roots.
          </p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg py-3 px-4 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="mr-2"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            <span className="text-gray-700 font-medium">
              Continue with Google
            </span>
            <ArrowRight className="h-5 w-5 ml-2 text-gray-500" />
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <div className="flex items-center justify-center gap-1 mb-2">
            <Shield className="h-4 w-4" />
            <p>Your data is protected. We never share your information.</p>
          </div>
          <p>
            By continuing, you agree to our{" "}
            <a href="#" className="text-amber-600 hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-amber-600 hover:underline">
              Privacy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
