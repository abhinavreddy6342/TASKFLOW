import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
      <div className="text-center">
        <p className="font-tech text-sm text-cyan-300">404 / NOT FOUND</p>

        <h1 className="font-display mt-4 text-5xl">Lost?</h1>

        <Link
          to="/login"
          className="font-body mt-6 inline-block text-slate-400 hover:text-white"
        >
          Return to TaskFlow
        </Link>
      </div>
    </div>
  );
}

export default NotFound;