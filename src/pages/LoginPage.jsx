import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Music, User, Briefcase } from "lucide-react"
import { login } from "@/api/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate()
  const [role, setRole] = useState("talent")

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const user = await login(email, password);
    console.log('login user:', user);

    if (user?.role === 'talent') {
  navigate('/talent/dashboard');
} else if (user?.role === 'organizer') {
  navigate('/organizer/dashboard');
} else {
  console.log('No role on token');
}
  } catch (err) {
    console.error(err);
    setError('Invalid email or password');
  }
};


  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <Music className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
          <p className="text-sm text-muted-foreground mt-1">Sign in to your TalentConnect account</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-6">

         

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
              />
            </div>
            {error && (
              <div className="text-red-500 text-sm">{error}</div>
            )}
            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
  <button
    onClick={() => navigate("/register")}
    className="text-sm text-primary hover:underline"
  >
    Don't have an account? Register
  </button>
</div>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Home
          </button>
        </div>

      </div>
    </div>
  )
}
