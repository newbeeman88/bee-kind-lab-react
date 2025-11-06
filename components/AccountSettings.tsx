import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Separator } from './ui/separator';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Alert, AlertDescription } from './ui/alert';
// import { User, Mail, Lock, Bell, Shield, Palette, Camera, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { User, Lock, Bell, Shield, Palette, Camera, AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
// import { ImageWithFallback } from './figma/ImageWithFallback';
import { toast } from "sonner";
import { 
  validatePassword, 
  validatePasswordConfirmation, 
  getPasswordStrength 
} from './utils/validation';

interface User {
  username: string;
  email: string;
  bio?: string;
  location?: string;
  experience?: string;
  profilePhoto?: string;
}

interface AccountSettingsProps {
  user: User | null;
  onUpdateUser: (updatedUser: User) => void;
  isDarkMode: boolean;
  currentTheme: string;
  onThemeChange: (theme: string, darkMode: boolean) => void;
}

export function AccountSettings({ user, onUpdateUser, isDarkMode, currentTheme, onThemeChange }: AccountSettingsProps) {
  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    bio: user?.bio || 'Passionate beekeeper with 5 years of experience. I love sharing knowledge about sustainable beekeeping practices.',
    location: user?.location || 'California, USA',
    experience: user?.experience || 'Intermediate',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [profilePhoto, setProfilePhoto] = useState<string | null>(user?.profilePhoto || null);
  const [isSaving, setIsSaving] = useState(false);
  const [isPasswordChanging, setIsPasswordChanging] = useState(false);

  const [settings, setSettings] = useState({
    emailNotifications: true,
    postNotifications: true,
    chatNotifications: false,
    privateProfile: false,
    showEmail: false,
    darkMode: isDarkMode
  });

  const [activeTab, setActiveTab] = useState('profile');

  // Password validation state
  const [passwordTouched, setPasswordTouched] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  
  const [passwordErrors, setPasswordErrors] = useState<{ [key: string]: string[] }>({
    currentPassword: [],
    newPassword: [],
    confirmPassword: []
  });

  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false
  });

  // Mock current password for demonstration (in real app, this would be verified server-side)
  const MOCK_CURRENT_PASSWORD = 'QAZ135qaz!';

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Real-time validation for password fields
    if (field === 'currentPassword' || field === 'newPassword' || field === 'confirmPassword') {
      validatePasswordField(field, value);
      
      // If current password changes, re-validate new password to check if they're different
      if (field === 'currentPassword' && formData.newPassword) {
        setTimeout(() => validatePasswordField('newPassword', formData.newPassword), 0);
      }
      
      // If new password changes, also re-validate confirm password
      if (field === 'newPassword' && formData.confirmPassword) {
        setTimeout(() => validatePasswordField('confirmPassword', formData.confirmPassword), 0);
      }
    }
  };

  const validatePasswordField = (field: string, value: string) => {
    let errors: string[] = [];
    
    switch (field) {
      case 'currentPassword':
        if (!value) {
          errors.push('Current password is required');
        } else if (value !== MOCK_CURRENT_PASSWORD) {
          errors.push('Current password is incorrect');
        }
        break;
        
      case 'newPassword':
        if (value) {
          const validation = validatePassword(value);
          errors = validation.errors;
          
          // Additional check: new password must be different from current password
          if (formData.currentPassword && value === formData.currentPassword) {
            errors.push('New password must be different from current password');
          }
        }
        break;
        
      case 'confirmPassword':
        if (value) {
          const validation = validatePasswordConfirmation(formData.newPassword, value);
          errors = validation.errors;
        }
        break;
    }
    
    setPasswordErrors(prev => ({
      ...prev,
      [field]: errors
    }));
  };

  const handlePasswordFieldBlur = (field: string) => {
    setPasswordTouched(prev => ({ ...prev, [field]: true }));
    validatePasswordField(field, formData[field as keyof typeof formData] as string);
  };

  const togglePasswordVisibility = (field: 'currentPassword' | 'newPassword' | 'confirmPassword') => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const getPasswordFieldError = (field: string) => {
    return passwordTouched[field as keyof typeof passwordTouched] && passwordErrors[field] && passwordErrors[field].length > 0
      ? passwordErrors[field][0]
      : null;
  };

  const isPasswordFieldValid = (field: string) => {
    return passwordTouched[field as keyof typeof passwordTouched] && (!passwordErrors[field] || passwordErrors[field].length === 0);
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    
    // Handle dark mode changes
    if (setting === 'darkMode') {
      onThemeChange(currentTheme, value);
    }
  };

  const handleThemeSelection = (theme: string) => {
    onThemeChange(theme, isDarkMode);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    
    try {
      // Validate required fields
      if (!formData.username.trim()) {
        toast.error('Username is required');
        return;
      }
      
      if (!formData.email.trim()) {
        toast.error('Email is required');
        return;
      }
      
      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        return;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user with all profile data
      if (user) {
        onUpdateUser({
          username: formData.username,
          email: formData.email,
          bio: formData.bio,
          location: formData.location,
          experience: formData.experience,
          profilePhoto: profilePhoto || undefined
        });
      }
      
      // Show success notification
      toast.success('🐝 Profile updated successfully!', {
        description: 'Your beekeeping profile has been saved.',
        duration: 4000,
      });
      
      // In a real app, this would make an API call
      console.log('Saving profile:', { ...formData, profilePhoto });
      
    } catch (error) {
      // Show error notification
      toast.error('Failed to save profile', {
        description: 'Please try again or contact support if the problem persists.',
        duration: 5000,
      });
      console.error('Error saving profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async () => {
    setIsPasswordChanging(true);
    
    try {
      // Mark all fields as touched for validation
      setPasswordTouched({
        currentPassword: true,
        newPassword: true,
        confirmPassword: true
      });

      // Validate all password fields
      validatePasswordField('currentPassword', formData.currentPassword);
      validatePasswordField('newPassword', formData.newPassword);
      validatePasswordField('confirmPassword', formData.confirmPassword);

      // Check if there are any validation errors
      const hasCurrentPasswordError = formData.currentPassword !== MOCK_CURRENT_PASSWORD || !formData.currentPassword.trim();
      const newPasswordValidation = validatePassword(formData.newPassword);
      const confirmPasswordValidation = validatePasswordConfirmation(formData.newPassword, formData.confirmPassword);

      if (hasCurrentPasswordError) {
        toast.error('Current password is incorrect');
        return;
      }

      if (!newPasswordValidation.isValid) {
        toast.error('New password does not meet security requirements', {
          description: newPasswordValidation.errors[0],
          duration: 6000,
        });
        return;
      }

      if (!confirmPasswordValidation.isValid) {
        toast.error('Password confirmation failed', {
          description: confirmPasswordValidation.errors[0],
          duration: 5000,
        });
        return;
      }

      // Check that new password is different from current password
      if (formData.newPassword === formData.currentPassword) {
        toast.error('New password must be different from current password');
        return;
      }
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Clear form and reset validation state
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      setPasswordTouched({
        currentPassword: false,
        newPassword: false,
        confirmPassword: false
      });
      
      setPasswordErrors({
        currentPassword: [],
        newPassword: [],
        confirmPassword: []
      });
      
      // Show success notification
      toast.success('🔒 Password updated successfully!', {
        description: 'Your account is now more secure. Please log in again with your new password.',
        duration: 6000,
      });
      
      // In a real app, this would make an API call
      console.log('Password changed successfully');
      
    } catch (error) {
      toast.error('Failed to update password', {
        description: 'Please try again or contact support if the problem persists.',
        duration: 5000,
      });
      console.error('Error changing password:', error);
    } finally {
      setIsPasswordChanging(false);
    }
  };

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid file type', {
          description: 'Please select a JPG, PNG, or GIF image file.',
        });
        return;
      }
      
      // Validate file size (1MB max)
      const maxSize = 1024 * 1024; // 1MB in bytes
      if (file.size > maxSize) {
        toast.error('File too large', {
          description: 'File size must be less than 1MB.',
        });
        return;
      }
      
      // Create a preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setProfilePhoto(result);
      };
      reader.readAsDataURL(file);
      
      // Show success notification for photo upload
      toast.success('📸 Photo uploaded successfully!', {
        description: 'Your profile photo has been updated.',
        duration: 3000,
      });
      
      // In a real app, you would upload the file to your server here
      console.log('Uploading photo:', file);
    }
  };

  const triggerPhotoUpload = () => {
    const fileInput = document.getElementById('photo-upload') as HTMLInputElement;
    fileInput?.click();
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Lock },
    { id: 'appearance', label: 'Appearance', icon: Palette }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-6">
              <Avatar className="w-20 h-20 cursor-pointer hover:opacity-80 transition-opacity" onClick={triggerPhotoUpload}>
                <AvatarImage src={profilePhoto || ""} />
                <AvatarFallback className="bg-primary text-primary-foreground text-lg">
                  <User className="w-8 h-8" />
                </AvatarFallback>
              </Avatar>
              <div>
                <input
                  id="photo-upload"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
                <Button 
                  variant="outline" 
                  className="mb-2"
                  onClick={triggerPhotoUpload}
                >
                  <Camera className="w-4 h-4 mr-2" />
                  Change Photo
                </Button>
                <p className="text-sm text-muted-foreground">JPG, GIF or PNG. 1MB max.</p>
                {profilePhoto && (
                  <p className="text-xs text-green-600 mt-1">✓ Photo updated successfully!</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                value={formData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="mt-1"
                rows={3}
                placeholder="Tell us about your beekeeping journey..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="experience">Experience Level</Label>
                <select
                  id="experience"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="mt-1 w-full px-3 py-2 border border-border rounded-md bg-background"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
            </div>

            <Button 
              onClick={handleSaveProfile} 
              disabled={isSaving}
              className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Profile'
              )}
            </Button>
          </div>
        );

      case 'security':
        const newPasswordStrength = getPasswordStrength(formData.newPassword);
        const strengthPercentage = Math.max(10, (newPasswordStrength.score / 8) * 100);

        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <div className="space-y-4 max-w-md">
                {/* Current Password */}
                <div>
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="currentPassword"
                      type={showPasswords.currentPassword ? "text" : "password"}
                      value={formData.currentPassword}
                      onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                      onBlur={() => handlePasswordFieldBlur('currentPassword')}
                      className={`pr-10 ${
                        passwordTouched.currentPassword
                          ? isPasswordFieldValid('currentPassword')
                            ? 'border-green-500 focus:border-green-500'
                            : 'border-red-500 focus:border-red-500'
                          : ''
                      }`}
                      placeholder="Enter your current password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('currentPassword')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.currentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    {passwordTouched.currentPassword && isPasswordFieldValid('currentPassword') && (
                      <CheckCircle2 className="absolute right-10 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                  </div>
                  {getPasswordFieldError('currentPassword') && (
                    <p className="text-sm text-red-500 mt-1">{getPasswordFieldError('currentPassword')}</p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="newPassword"
                      type={showPasswords.newPassword ? "text" : "password"}
                      value={formData.newPassword}
                      onChange={(e) => handleInputChange('newPassword', e.target.value)}
                      onBlur={() => handlePasswordFieldBlur('newPassword')}
                      className={`pr-10 ${
                        passwordTouched.newPassword
                          ? isPasswordFieldValid('newPassword')
                            ? 'border-green-500 focus:border-green-500'
                            : 'border-red-500 focus:border-red-500'
                          : ''
                      }`}
                      placeholder="Create a strong new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('newPassword')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.newPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    {passwordTouched.newPassword && isPasswordFieldValid('newPassword') && (
                      <CheckCircle2 className="absolute right-10 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                  </div>
                  {getPasswordFieldError('newPassword') && (
                    <p className="text-sm text-red-500 mt-1">{getPasswordFieldError('newPassword')}</p>
                  )}
                  
                  {/* Password Strength Indicator */}
                  {formData.newPassword && (
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Password Strength</span>
                        <span className={`font-medium ${newPasswordStrength.color}`}>
                          {newPasswordStrength.label}
                        </span>
                      </div>
                      <Progress 
                        value={strengthPercentage} 
                        className={`h-2 ${
                          newPasswordStrength.score <= 2 ? 'bg-red-100' :
                          newPasswordStrength.score <= 4 ? 'bg-orange-100' :
                          newPasswordStrength.score <= 6 ? 'bg-yellow-100' : 'bg-green-100'
                        }`}
                      />
                    </div>
                  )}
                </div>

                {/* Confirm New Password */}
                <div>
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative mt-1">
                    <Input
                      id="confirmPassword"
                      type={showPasswords.confirmPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                      onBlur={() => handlePasswordFieldBlur('confirmPassword')}
                      className={`pr-10 ${
                        passwordTouched.confirmPassword
                          ? isPasswordFieldValid('confirmPassword')
                            ? 'border-green-500 focus:border-green-500'
                            : 'border-red-500 focus:border-red-500'
                          : ''
                      }`}
                      placeholder="Confirm your new password"
                    />
                    <button
                      type="button"
                      onClick={() => togglePasswordVisibility('confirmPassword')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPasswords.confirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    {passwordTouched.confirmPassword && isPasswordFieldValid('confirmPassword') && (
                      <CheckCircle2 className="absolute right-10 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500" />
                    )}
                  </div>
                  {getPasswordFieldError('confirmPassword') && (
                    <p className="text-sm text-red-500 mt-1">{getPasswordFieldError('confirmPassword')}</p>
                  )}
                </div>

                {/* Password Requirements Alert */}
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-sm">
                    <strong>Password Requirements:</strong>
                    <ul className="mt-1 space-y-1 text-xs">
                      <li>• At least 8 characters long</li>
                      <li>• Contains uppercase and lowercase letters</li>
                      <li>• Contains at least one number</li>
                      <li>• Contains at least one special character</li>
                      <li>• Must be different from current password</li>
                      <li>• Avoid common patterns and weak passwords</li>
                    </ul>
                  </AlertDescription>
                </Alert>

                <Button 
                  onClick={handlePasswordChange} 
                  disabled={isPasswordChanging || 
                    !formData.currentPassword || 
                    !formData.newPassword || 
                    !formData.confirmPassword ||
                    passwordErrors.currentPassword.length > 0 ||
                    passwordErrors.newPassword.length > 0 ||
                    passwordErrors.confirmPassword.length > 0
                  }
                  className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
                >
                  {isPasswordChanging ? (
                    <>
                      <div className="w-4 h-4 mr-2 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      Updating Password...
                    </>
                  ) : (
                    'Update Password'
                  )}
                </Button>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
              <p className="text-muted-foreground mb-4">Add an extra layer of security to your account.</p>
              <Button variant="outline">Enable Two-Factor Authentication</Button>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive email updates about your account</p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="post-notifications">Post Interactions</Label>
                  <p className="text-sm text-muted-foreground">Get notified when someone likes or comments on your posts</p>
                </div>
                <Switch
                  id="post-notifications"
                  checked={settings.postNotifications}
                  onCheckedChange={(checked) => handleSettingChange('postNotifications', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="chat-notifications">AI Chat Responses</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications for AI chat responses</p>
                </div>
                <Switch
                  id="chat-notifications"
                  checked={settings.chatNotifications}
                  onCheckedChange={(checked) => handleSettingChange('chatNotifications', checked)}
                />
              </div>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="private-profile">Private Profile</Label>
                  <p className="text-sm text-muted-foreground">Make your profile visible only to approved followers</p>
                </div>
                <Switch
                  id="private-profile"
                  checked={settings.privateProfile}
                  onCheckedChange={(checked) => handleSettingChange('privateProfile', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-email">Show Email</Label>
                  <p className="text-sm text-muted-foreground">Display your email address on your public profile</p>
                </div>
                <Switch
                  id="show-email"
                  checked={settings.showEmail}
                  onCheckedChange={(checked) => handleSettingChange('showEmail', checked)}
                />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-4 text-destructive">Danger Zone</h3>
              <div className="border border-destructive/20 rounded-lg p-4">
                <h4 className="font-medium mb-2">Delete Account</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </div>
        );

      case 'appearance':
        const themeOptions = [
          {
            id: 'honey-gold',
            name: 'Honey Gold',
            description: 'Classic beekeeping theme with warm golden colors',
            gradient: 'from-[#FFB300] to-[#8BC34A]',
            colors: ['#FFB300', '#8BC34A', '#B3E5FC']
          },
          {
            id: 'ocean-breeze', 
            name: 'Ocean Breeze',
            description: 'Cool and refreshing blue-green theme',
            gradient: 'from-[#0077BE] to-[#00A86B]',
            colors: ['#0077BE', '#00A86B', '#87CEEB']
          },
          {
            id: 'lavender-dream',
            name: 'Lavender Dream', 
            description: 'Soft purple theme inspired by lavender fields',
            gradient: 'from-[#9C27B0] to-[#E91E63]',
            colors: ['#9C27B0', '#E91E63', '#DDA0DD']
          },
          {
            id: 'forest-green',
            name: 'Forest Green',
            description: 'Natural green theme for nature lovers',
            gradient: 'from-[#2E7D32] to-[#66BB6A]',
            colors: ['#2E7D32', '#66BB6A', '#A5D6A7']
          },
          {
            id: 'sunset-orange',
            name: 'Sunset Orange',
            description: 'Vibrant orange theme like a beautiful sunset',
            gradient: 'from-[#FF6F00] to-[#FFA726]',
            colors: ['#FF6F00', '#FF8F00', '#FFCC02']
          },
          {
            id: 'deep-purple',
            name: 'Deep Purple',
            description: 'Rich purple theme for a luxurious feel',
            gradient: 'from-[#512DA8] to-[#7C4DFF]',
            colors: ['#512DA8', '#7C4DFF', '#BA68C8']  
          }
        ];

        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode">Dark Mode</Label>
                  <p className="text-sm text-muted-foreground">Switch to dark theme</p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={isDarkMode}
                  onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                />
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-2">Theme Preferences</h3>
              <p className="text-muted-foreground mb-6">Choose a theme that matches your style. Changes apply instantly!</p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {themeOptions.map((theme) => (
                  <div
                    key={theme.id}
                    onClick={() => handleThemeSelection(theme.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
                      currentTheme === theme.id
                        ? 'border-primary shadow-md'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className={`w-full h-16 bg-gradient-to-r ${theme.gradient} rounded-lg mb-3 shadow-sm`}></div>
                    <h4 className="font-medium text-sm mb-1">{theme.name}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{theme.description}</p>
                    <div className="flex space-x-2">
                      {theme.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded-full border border-border/30"
                          style={{ backgroundColor: color }}
                        ></div>
                      ))}
                    </div>
                    {currentTheme === theme.id && (
                      <div className="mt-2 text-xs text-primary font-medium">✓ Currently Active</div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-lg font-medium mb-2">Custom Colors</h3>
              <p className="text-muted-foreground mb-4">Advanced color customization coming soon!</p>
              <Button variant="outline" disabled>
                <Palette className="w-4 h-4 mr-2" />
                Create Custom Theme
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Account Settings</h1>
        <p className="text-muted-foreground mt-2">
          Manage your account preferences and settings
        </p>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-0">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary/10 text-primary border-r-2 border-primary'
                          : 'text-foreground hover:bg-muted/50'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {(() => {
                  const currentTab = tabs.find(tab => tab.id === activeTab);
                  const Icon = currentTab?.icon;
                  return Icon ? <Icon className="w-5 h-5" /> : null;
                })()}
                <span>{tabs.find(tab => tab.id === activeTab)?.label}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {renderTabContent()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}