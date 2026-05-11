import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrganizerProfile, createOrganizerProfile, updateOrganizerProfile } from '@/api/organizer/organizer';
import { getMe, logout } from '@/api/auth';
import { Building2, Globe, MapPin, LogOut, Pencil } from 'lucide-react';

export default function OrganizerProfile() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);
    const [hasProfile, setHasProfile] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [form, setForm] = useState({
        company_name: '',
        description: '',
        website: '',
        location: '',
        profile_picture: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        getMe().then(setUser).catch(() => navigate('/login'));
        getOrganizerProfile()
            .then((data) => {
                setProfile(data);
                setHasProfile(true);
                setForm({
                    company_name: data.company_name || '',
                    description: data.description || '',
                    website: data.website || '',
                    location: data.location || '',
                    profile_picture: data.profile_picture || '',
                });
            })
            .catch(() => setHasProfile(false));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (hasProfile) {
                const updated = await updateOrganizerProfile(form);
                setProfile(updated);
            } else {
                const created = await createOrganizerProfile(form);
                setProfile(created);
                setHasProfile(true);
            }
            setIsEditing(false);
            alert('Profile saved!');
        } catch (err) {
            alert('Failed to save profile');
            console.error(err);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">
                    Welcome, {user?.name} 👋
                </h1>
                <button onClick={handleLogout} className="flex items-center gap-1 text-sm text-red-500 hover:underline">
                    <LogOut className="w-4 h-4" /> Logout
                </button>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-2xl border border-border p-6 max-w-xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Company Profile</h2>
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                        <Pencil className="w-3 h-3" />
                        {isEditing ? 'Cancel' : hasProfile ? 'Edit' : 'Create Profile'}
                    </button>
                </div>

                {/* View Mode */}
                {!isEditing && hasProfile && (
                    <div className="space-y-3 text-sm">
                        <div className="flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-muted-foreground" />
                            <span>{profile?.company_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>{profile?.location || '—'}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Globe className="w-4 h-4 text-muted-foreground" />
                            {profile?.website
                                ? <a href={profile.website} target="_blank" className="text-primary hover:underline">{profile.website}</a>
                                : <span>—</span>
                            }
                        </div>
                        <p className="text-muted-foreground">{profile?.description || '—'}</p>
                    </div>
                )}

                {/* No Profile Yet */}
                {!isEditing && !hasProfile && (
                    <p className="text-sm text-muted-foreground">
                        You haven't set up your company profile yet. Click "Create Profile" to get started.
                    </p>
                )}

                {/* Edit / Create Form */}
                {isEditing && (
                    <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                        <div>
                            <label className="text-muted-foreground block mb-1">Company Name</label>
                            <input
                                type="text"
                                name="company_name"
                                value={form.company_name}
                                onChange={handleChange}
                                required
                                placeholder="e.g. TalentConnect Events"
                                className="w-full px-4 py-2.5 rounded-lg border border-border outline-none focus:border-primary text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-muted-foreground block mb-1">Description</label>
                            <textarea
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                                rows={3}
                                placeholder="Tell talents about your company"
                                className="w-full px-4 py-2.5 rounded-lg border border-border outline-none focus:border-primary text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-muted-foreground block mb-1">Location</label>
                            <input
                                type="text"
                                name="location"
                                value={form.location}
                                onChange={handleChange}
                                placeholder="e.g. Naga, Bicol"
                                className="w-full px-4 py-2.5 rounded-lg border border-border outline-none focus:border-primary text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-muted-foreground block mb-1">Website</label>
                            <input
                                type="url"
                                name="website"
                                value={form.website}
                                onChange={handleChange}
                                placeholder="https://yourcompany.com"
                                className="w-full px-4 py-2.5 rounded-lg border border-border outline-none focus:border-primary text-sm"
                            />
                        </div>
                        <div>
                            <label className="text-muted-foreground block mb-1">Profile Picture URL</label>
                            <input
                                type="url"
                                name="profile_picture"
                                value={form.profile_picture}
                                onChange={handleChange}
                                placeholder="https://yourlogo.com/logo.png"
                                className="w-full px-4 py-2.5 rounded-lg border border-border outline-none focus:border-primary text-sm"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-primary text-white py-2.5 rounded-lg hover:bg-primary/90 transition-colors font-medium"
                        >
                            Save Profile
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}
