import { useNavigate } from "react-router-dom";
import { Music, CheckCircle, Search, Calendar, Send } from "lucide-react";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Music className="w-5 h-5 text-white" />
            </div>
            <span className="font-semibold text-lg">TalentConnect</span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#how-it-works" className="hover:text-foreground transition-colors">How it Works</a>
            <a onClick={() => navigate("/login")} className="hover:text-foreground transition-colors">Browse Talents</a>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={() => navigate("/login")}
              className="text-sm bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-accent px-3 py-1 rounded-full text-sm text-primary mb-6">
                <CheckCircle className="w-4 h-4" />
                Trusted by 10,000+ event organizers
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6">
                Find the Perfect{" "}
                <span className="text-primary">Talent</span> for Your Event
              </h1>

              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                Connect with top-rated singers, DJs, bands, and hosts.
                Browse portfolios, check availability, and book instantly.
              </p>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
                >
                  <Search className="w-5 h-5" />
                  Browse Talents
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="flex items-center gap-2 bg-white text-foreground px-6 py-3 rounded-xl border border-border hover:border-primary/30 hover:bg-accent transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Post an Event
                </button>
              </div>
            </div>

            {/* Right */}
            <div className="relative hidden lg:block">
              <div className="rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1566735355837-2269c24e644e"
                  alt="Concert performance"
                  className="w-full h-96 object-cover"
                />
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="text-sm font-medium">Booking Confirmed!</div>
                  <div className="text-xs text-muted-foreground">
                    DJ Pulse - Corporate Party
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Book your perfect talent in three simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Calendar,
                title: "Create Your Event",
                desc: "Tell us about your event — date, location, budget, and what type of talent you need.",
              },
              {
                icon: Search,
                title: "Find Talents",
                desc: "Browse our curated marketplace of verified performers.",
              },
              {
                icon: Send,
                title: "Send Booking Request",
                desc: "Found the perfect match? Send a booking request.",
              },
            ].map((step, i) => (
              <div key={i} className="text-center p-6">
                <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center mx-auto mb-5">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>

                <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-medium mb-3">
                  {i + 1}
                </div>

                <h3 className="text-lg font-semibold mb-2">
                  {step.title}
                </h3>

                <p className="text-sm text-muted-foreground">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}