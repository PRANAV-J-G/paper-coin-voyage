import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { User, Phone, FileText, Save, X } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { useAuth } from '@/contexts/AuthContext';
import { apiService } from '@/services/api';


const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    bio: ''
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      try {
        const data = await apiService.auth.getProfile();
        setProfileData(data);
        setFormData({
          firstName: data.first_name || data.firstName || '',
          lastName: data.last_name || data.lastName || '',
          email: data.email || '',
          phone: data.phone || '',
          bio: data.bio || ''
        });
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleSave = async () => {
    try {
      await apiService.auth.updateProfile(formData);
      // Refresh profile data
      const data = await apiService.auth.getProfile();
      setProfileData(data);
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="text-center">Failed to load profile</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Profile</h1>
            <p className="text-muted-foreground">Manage your account information and trading preferences</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Overview */}
            <Card className="glass-card p-6">
              <div className="text-center space-y-4">
                <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mx-auto">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {profileData.first_name || profileData.firstName || formData.firstName || 'User'} {' '}
                    {profileData.last_name || profileData.lastName || formData.lastName || ''}
                  </h3>
                  <p className="text-muted-foreground">{profileData.email}</p>
                  {(profileData.phone || formData.phone) && (
                    <p className="text-sm text-muted-foreground">{profileData.phone || formData.phone}</p>
                  )}
                </div>
                <div className="flex justify-center space-x-2">
                  <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                    Active Trader
                  </Badge>
                  <Badge variant="outline">
                    Member since {profileData.created_at ? new Date(profileData.created_at).getFullYear() : 'N/A'}
                  </Badge>
                </div>
                {(profileData.bio || formData.bio) && (
                  <div className="text-left">
                    <h4 className="font-semibold text-sm mb-2">About</h4>
                    <p className="text-sm text-muted-foreground">{profileData.bio || formData.bio}</p>
                  </div>
                )}
                
                {/* Contact Information */}
                {(profileData.phone || formData.phone) && (
                  <div className="text-left pt-4 border-t border-border/20">
                    <h4 className="font-semibold text-sm mb-2">Contact</h4>
                    <p className="text-sm text-muted-foreground">{profileData.phone || formData.phone}</p>
                  </div>
                )}
              </div>
            </Card>
                  

            {/* Profile Details */}
            <Card className="glass-card p-6 lg:col-span-2">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Personal Information</h2>
                <Button
                  variant={isEditing ? "outline" : "default"}
                  onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
                >
                  {isEditing ? 'Cancel' : 'Edit Profile'}
                </Button>
              </div>

              <div className="space-y-8">
                {/* Basic Information Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <User className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Basic Information</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        disabled={!isEditing}
                        className="glass-card"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                        disabled={!isEditing}
                        className="glass-card"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      disabled={!isEditing}
                      className="glass-card"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="space-y-4 pt-6 border-t border-border/20">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Contact Information</h3>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      disabled={!isEditing}
                      className="glass-card"
                    />
                    <p className="text-xs text-muted-foreground">
                      We'll use this to send you important trading notifications
                    </p>
                  </div>
                </div>

                {/* Bio Section */}
                <div className="space-y-4 pt-6 border-t border-border/20">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">About You</h3>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      disabled={!isEditing}
                      className="w-full min-h-[120px] px-3 py-2 rounded-md border border-input bg-background text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring glass-card resize-none"
                      placeholder="Tell us about yourself, your trading experience, goals, or anything you'd like to share with the community..."
                    />
                    <p className="text-xs text-muted-foreground">
                      Share your trading journey, experience level, or what you hope to achieve
                    </p>
                  </div>
                </div>

                {isEditing && (
                  <div className="flex space-x-3 pt-6 border-t border-border/20">
                    <Button onClick={handleSave} className="flex-1">
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)} className="flex-1">
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Trading Stats */}
          <Card className="glass-card p-6">
            <h2 className="text-2xl font-bold mb-6">Trading Statistics</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent mb-2">{profileData.total_trades || 0}</div>
                <div className="text-sm text-muted-foreground">Total Trades</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">N/A</div>
                <div className="text-sm text-muted-foreground">Win Rate</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-text mb-2">${(profileData.total_pnl || 0).toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Total P&L</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">{profileData.active_trades || 0}</div>
                <div className="text-sm text-muted-foreground">Active Trades</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;