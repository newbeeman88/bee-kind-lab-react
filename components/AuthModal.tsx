import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import { 
  validateRegistration, 
  validateLogin, 
  validateUsername,
  validateEmail,
  validatePassword,
  validatePasswordConfirmation,
  getPasswordStrength
} from './utils/validation';
// import { ValidationRules } from './ValidationRules';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  onRegister: (username: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  defaultTab?: 'login' | 'register';
}

export function AuthModal({ isOpen, onClose, onLogin, onRegister, defaultTab = 'login' }: AuthModalProps) {
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  
  // Validation states
  const [loginErrors, setLoginErrors] = useState<string[]>([]);
  const [registerErrors, setRegisterErrors] = useState<string[]>([]);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState({ login: false, register: false, confirm: false });
  
  // Real-time validation states
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Clear all errors and reset form states
  const clearErrors = () => {
    setLoginErrors([]);
    setRegisterErrors([]);
    setFieldErrors({});
  };

  // Handle field blur for validation
  const handleFieldBlur = (field: string, value: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    validateField(field, value);
  };

  // Validate individual fields
  const validateField = (field: string, value: string) => {
    const errors: string[] = [];
    
    switch (field) {
      case 'username':
        const usernameValidation = validateUsername(value);
        if (!usernameValidation.isValid) {
          errors.push(...usernameValidation.errors);
        }
        break;
      case 'email':
        const emailValidation = validateEmail(value);
        if (!emailValidation.isValid) {
          errors.push(...emailValidation.errors);
        }
        break;
      case 'password':
        const passwordValidation = validatePassword(value);
        if (!passwordValidation.isValid) {
          errors.push(...passwordValidation.errors);
        }
        break;
      case 'confirmPassword':
        const confirmValidation = validatePasswordConfirmation(registerForm.password, value);
        if (!confirmValidation.isValid) {
          errors.push(...confirmValidation.errors);
        }
        break;
    }
    
    setFieldErrors(prev => ({ ...prev, [field]: errors }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginErrors([]);

    const validation = validateLogin(loginForm);
    if (!validation.isValid) {
      setLoginErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await onLogin(loginForm.email, loginForm.password);
      if (result.success) {
        setLoginForm({ email: '', password: '' });
        clearErrors();
        toast.success('Welcome back! You have successfully signed in.');
        onClose();
      } else {
        setLoginErrors([result.error || 'Login failed. Please check your credentials.']);
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      setLoginErrors(['An unexpected error occurred. Please try again.']);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setRegisterErrors([]);

    const validation = validateRegistration({
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
      confirmPassword: registerForm.confirmPassword
    });

    if (!validation.isValid) {
      setRegisterErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    try {
      const result = await onRegister(registerForm.username, registerForm.email, registerForm.password);
      if (result.success) {
        setRegisterForm({ username: '', email: '', password: '', confirmPassword: '' });
        clearErrors();
        setTouched({});
        toast.success(`Welcome to The BeeKind Lab, ${registerForm.username}! Your account has been created successfully.`);
        onClose();
      } else {
        setRegisterErrors([result.error || 'Registration failed. Please try again.']);
        toast.error(result.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      setRegisterErrors(['An unexpected error occurred. Please try again.']);
      toast.error('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Update form handlers with validation
  const updateLoginForm = (field: keyof typeof loginForm, value: string) => {
    setLoginForm(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const updateRegisterForm = (field: keyof typeof registerForm, value: string) => {
    setRegisterForm(prev => ({ ...prev, [field]: value }));
    if (touched[field]) {
      validateField(field, value);
    }
    // Also validate confirm password if password changes
    if (field === 'password' && touched['confirmPassword']) {
      validateField('confirmPassword', registerForm.confirmPassword);
    }
  };

  // Get password strength for display
  const passwordStrength = getPasswordStrength(registerForm.password);
  const strengthPercentage = Math.max(10, (passwordStrength.score / 8) * 100);

  // Helper function to show field errors
  const getFieldError = (field: string) => {
    return touched[field] && fieldErrors[field] && fieldErrors[field].length > 0 
      ? fieldErrors[field][0] 
      : null;
  };

  // Helper function to check if field is valid
  const isFieldValid = (field: string) => {
    return touched[field] && (!fieldErrors[field] || fieldErrors[field].length === 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="auth-modal sm:max-w-lg max-w-[95vw] h-[90vh] sm:h-auto sm:max-h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-center text-2xl text-foreground">
            Welcome to The BeeKind Lab
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            Join our beekeeping community or sign in to your account
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 min-h-0 overflow-hidden">
          <Tabs defaultValue={defaultTab} className="w-full h-full flex flex-col">
            <TabsList className="grid w-full grid-cols-2 flex-shrink-0 mb-4">
              <TabsTrigger value="login">Log In</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
          
            <TabsContent value="login" className="flex-1 min-h-0 mt-0">
              <div className="h-full flex flex-col">
                <div className="space-y-1 flex-shrink-0 text-center mb-6">
                  <h3 className="text-lg font-semibold">Sign in to your account</h3>
                  <p className="text-sm text-muted-foreground">
                    Welcome back to the beekeeping community
                  </p>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto modal-scroll">
                <form onSubmit={handleLogin} className="space-y-3 sm:space-y-4">
                  {loginErrors.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <ul className="list-disc list-inside space-y-1">
                          {loginErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <div className="relative">
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        value={loginForm.email}
                        onChange={(e) => updateLoginForm('email', e.target.value)}
                        onBlur={(e) => handleFieldBlur('email', e.target.value)}
                        className={`rounded-lg pr-10 ${
                          getFieldError('email') 
                            ? 'border-destructive focus-visible:ring-destructive' 
                            : isFieldValid('email') 
                            ? 'border-green-500 focus-visible:ring-green-500' 
                            : ''
                        }`}
                      />
                      {isFieldValid('email') && (
                        <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                      )}
                    </div>
                    {getFieldError('email') && (
                      <p className="text-sm text-destructive">{getFieldError('email')}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="login-password"
                        type={showPassword.login ? "text" : "password"}
                        placeholder="Enter your password"
                        value={loginForm.password}
                        onChange={(e) => updateLoginForm('password', e.target.value)}
                        className="rounded-lg pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, login: !prev.login }))}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword.login ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                  >
                    {isSubmitting ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
                </div>
              </div>
            </TabsContent>
          
            <TabsContent value="register" className="flex-1 min-h-0 mt-0">
              <div className="h-full flex flex-col">
                <div className="space-y-1 flex-shrink-0 text-center mb-6">
                  <h3 className="text-lg font-semibold">Create an account</h3>
                  <p className="text-sm text-muted-foreground">
                    Join our buzzing community of beekeepers
                  </p>
                </div>
                <div className="flex-1 min-h-0 overflow-y-auto modal-scroll pb-4 pr-2" style={{maxHeight: '350px', minHeight: '200px'}}>
                <form onSubmit={handleRegister} className="space-y-4">
                  {registerErrors.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        <ul className="list-disc list-inside space-y-1">
                          {registerErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                          ))}
                        </ul>
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-username">Username</Label>
                    <div className="relative">
                      <Input
                        id="register-username"
                        type="text"
                        placeholder="BeekeeperBuzz"
                        value={registerForm.username}
                        onChange={(e) => updateRegisterForm('username', e.target.value)}
                        onBlur={(e) => handleFieldBlur('username', e.target.value)}
                        className={`rounded-lg pr-10 ${
                          getFieldError('username') 
                            ? 'border-destructive focus-visible:ring-destructive' 
                            : isFieldValid('username') 
                            ? 'border-green-500 focus-visible:ring-green-500' 
                            : ''
                        }`}
                      />
                      {isFieldValid('username') && (
                        <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                      )}
                    </div>
                    {getFieldError('username') && (
                      <p className="text-sm text-destructive">{getFieldError('username')}</p>
                    )}
                    {touched.username && !getFieldError('username') && (
                      <p className="text-sm text-muted-foreground">
                        3-20 characters, letters, numbers, hyphens, and underscores only
                      </p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <div className="relative">
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="your@email.com"
                        value={registerForm.email}
                        onChange={(e) => updateRegisterForm('email', e.target.value)}
                        onBlur={(e) => handleFieldBlur('email', e.target.value)}
                        className={`rounded-lg pr-10 ${
                          getFieldError('email') 
                            ? 'border-destructive focus-visible:ring-destructive' 
                            : isFieldValid('email') 
                            ? 'border-green-500 focus-visible:ring-green-500' 
                            : ''
                        }`}
                      />
                      {isFieldValid('email') && (
                        <CheckCircle2 className="absolute right-3 top-3 h-4 w-4 text-green-500" />
                      )}
                    </div>
                    {getFieldError('email') && (
                      <p className="text-sm text-destructive">{getFieldError('email')}</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Password</Label>
                    <div className="relative">
                      <Input
                        id="register-password"
                        type={showPassword.register ? "text" : "password"}
                        placeholder="Create a password"
                        value={registerForm.password}
                        onChange={(e) => updateRegisterForm('password', e.target.value)}
                        onBlur={(e) => handleFieldBlur('password', e.target.value)}
                        className={`rounded-lg pr-10 ${
                          getFieldError('password') 
                            ? 'border-destructive focus-visible:ring-destructive' 
                            : isFieldValid('password') 
                            ? 'border-green-500 focus-visible:ring-green-500' 
                            : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, register: !prev.register }))}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword.register ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                    
                    {/* Password Strength Indicator */}
                    {registerForm.password && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Password strength:</span>
                          <span className={passwordStrength.color}>{passwordStrength.label}</span>
                        </div>
                        <Progress 
                          value={strengthPercentage} 
                          className="h-2"
                        />
                      </div>
                    )}
                    
                    {getFieldError('password') && (
                      <p className="text-sm text-destructive">{getFieldError('password')}</p>
                    )}
                    {touched.password && !getFieldError('password') && (
                      <div className="text-sm text-muted-foreground space-y-1">
                        <p>Password requirements:</p>
                        <ul className="text-xs space-y-1 ml-2">
                          <li className={registerForm.password.length >= 8 ? 'text-green-600' : ''}>
                            • At least 8 characters long
                          </li>
                          <li className={/[a-z]/.test(registerForm.password) ? 'text-green-600' : ''}>
                            • One lowercase letter
                          </li>
                          <li className={/[A-Z]/.test(registerForm.password) ? 'text-green-600' : ''}>
                            • One uppercase letter
                          </li>
                          <li className={/\d/.test(registerForm.password) ? 'text-green-600' : ''}>
                            • One number
                          </li>
                          <li className={/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(registerForm.password) ? 'text-green-600' : ''}>
                            • One special character
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="register-confirm">Confirm Password</Label>
                    <div className="relative">
                      <Input
                        id="register-confirm"
                        type={showPassword.confirm ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => updateRegisterForm('confirmPassword', e.target.value)}
                        onBlur={(e) => handleFieldBlur('confirmPassword', e.target.value)}
                        className={`rounded-lg pr-10 ${
                          getFieldError('confirmPassword') 
                            ? 'border-destructive focus-visible:ring-destructive' 
                            : isFieldValid('confirmPassword') 
                            ? 'border-green-500 focus-visible:ring-green-500' 
                            : ''
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                        className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                      {isFieldValid('confirmPassword') && (
                        <CheckCircle2 className="absolute right-10 top-3 h-4 w-4 text-green-500" />
                      )}
                    </div>
                    {getFieldError('confirmPassword') && (
                      <p className="text-sm text-destructive">{getFieldError('confirmPassword')}</p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg"
                  >
                    {isSubmitting ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
                
                {/* Validation Rules - Hidden for cleaner UI */}
                {/* <div className="mt-4">
                  <div className="block md:hidden">
                    <ValidationRules compact />
                  </div>
                  <div className="hidden md:block">
                    <ValidationRules />
                  </div>
                </div> */}
                
                {/* Extra padding to ensure scrollable content */}
                <div className="h-32"></div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}