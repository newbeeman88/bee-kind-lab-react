import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { AlertCircle, Shield, User, Mail, Key } from 'lucide-react';

interface ValidationRulesProps {
  compact?: boolean;
}

export function ValidationRules({ compact = false }: ValidationRulesProps) {
  if (compact) {
    return (
      <div className="bg-muted/30 rounded-lg p-2 space-y-1">
        <div className="flex items-center space-x-2 text-xs font-medium text-foreground">
          <Shield className="w-3 h-3" />
          <span>Security Requirements</span>
        </div>
        <div className="text-xs text-muted-foreground space-y-0.5 leading-tight">
          <p>• Username: 3-20 chars, letters/numbers/hyphens/underscores</p>
          <p>• Email: Valid format (user@domain.com)</p>
          <p>• Password: 8+ chars, upper/lower/number/special character</p>
        </div>
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center space-x-2 text-base">
          <Shield className="w-4 h-4" />
          <span>Account Security Requirements</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm font-medium">
            <User className="w-3 h-3 text-primary" />
            <span>Username Requirements</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-0.5 ml-5">
            <li>• 3-20 characters long</li>
            <li>• Letters, numbers, hyphens (-), and underscores (_) only</li>
            <li>• Cannot start or end with special characters</li>
            <li>• Cannot be all numbers</li>
            <li>• Cannot use reserved names (admin, support, etc.)</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm font-medium">
            <Mail className="w-3 h-3 text-primary" />
            <span>Email Requirements</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-0.5 ml-5">
            <li>• Valid email format (user@domain.com)</li>
            <li>• No consecutive dots (..)</li>
            <li>• Maximum 254 characters</li>
          </ul>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-sm font-medium">
            <Key className="w-3 h-3 text-primary" />
            <span>Password Requirements</span>
          </div>
          <ul className="text-xs text-muted-foreground space-y-0.5 ml-5">
            <li>• At least 8 characters long</li>
            <li>• At least one lowercase letter (a-z)</li>
            <li>• At least one uppercase letter (A-Z)</li>
            <li>• At least one number (0-9)</li>
            <li>• At least one special character (!@#$%^&*)</li>
            <li>• No common patterns (123, abc, qwerty)</li>
            <li>• Cannot be a commonly used weak password</li>
          </ul>
        </div>
        
        <div className="p-2 bg-muted/50 rounded-lg">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-3 h-3 text-orange-500 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <p className="font-medium text-foreground mb-1">Security Tips:</p>
              <ul className="space-y-0.5">
                <li>• Use a unique password you don't use elsewhere</li>
                <li>• Consider using a password manager</li>
                <li>• Avoid using personal information in passwords</li>
                <li>• Make your password at least 12 characters for better security</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
