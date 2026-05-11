import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Music, User, Briefcase } from "lucide-react"
import { register } from "@/api/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate()
  const [role, setRole] = useState("")

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!role) {                          // ← ADD THIS
      alert("Please select a role");
      return;
    }

    const user = await register(name, email, password, role);
    console.log('registered user:', user);

    if (user?.role === 'talent') {
      navigate('/talent/dashboard');
    } else if (user?.role === 'organizer') {
      navigate('/organizer/dashboard');
    }
  } catch (error) {
    alert("Registration failed: " + error.message);
    console.error(error);
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
          <h1 className="text-2xl font-bold text-foreground">Create your account</h1>
          <p className="text-sm text-muted-foreground mt-1">Join TalentConnect today</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-border p-6">

          {/* Role Selector */}
          <div className="mb-6">
            <label className="text-sm text-muted-foreground mb-2 block">I am a</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                value={role}
                onClick={() => setRole("talent")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all text-sm ${
                  role === "talent"
                    ? "border-primary bg-accent text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                <User className="w-4 h-4" />
                Talent
              </button>
              <button
                type="button"
                value={role}
                onClick={() => setRole("organizer")}
                className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all text-sm ${
                  role === "organizer"
                    ? "border-primary bg-accent text-primary"
                    : "border-border text-muted-foreground hover:border-primary/30"
                }`}
              >
                <Briefcase className="w-4 h-4" />
                Event Organizer
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-muted-foreground mb-1 block">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm"
            >
              Create Account
            </button>
          </form>

          {/* Go to Login */}
          <div className="mt-4 text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-primary hover:underline"
            >
              Already have an account? Sign in
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
