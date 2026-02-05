import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Shield, Mail, User, Code, Building } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Login = () => {
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userType, setUserType] = useState("user");
  const [loginMethod, setLoginMethod] = useState("mobile");
  const { user, setGuestMode } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSendOtp = async () => {
    if (loginMethod === "mobile" && mobile.length !== 10) {
      toast({
        title: "Invalid mobile number",
        description: "Please enter a valid 10-digit mobile number",
        variant: "destructive",
      });
      return;
    }

    if (loginMethod === "email" && !email.includes("@")) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let result;
      if (loginMethod === "mobile") {
        result = await supabase.auth.signInWithOtp({
          phone: `+91${mobile}`,
          options: {
            data: {
              phone: mobile,
              name: `${userType} ${mobile}`,
              user_type: userType,
            },
            channel: 'sms'
          }
        });
      } else {
        result = await supabase.auth.signInWithOtp({
          email: email,
          options: {
            data: {
              name: `${userType} ${email}`,
              user_type: userType,
            }
          }
        });
      }

      const { data, error } = result;

      if (error) {
        console.error('OTP Error:', error);
        toast({
          title: "Error sending OTP",
          description: error.message || `Failed to send OTP. Please check your ${loginMethod}.`,
          variant: "destructive",
        });
      } else {
        console.log('OTP sent successfully:', data);
        setShowOtp(true);
        toast({
          title: "OTP sent successfully",
          description: `Please check your ${loginMethod === "mobile" ? "SMS" : "email"} for the verification code`,
        });
      }
    } catch (error) {
      console.error('Catch Error:', error);
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEmailPasswordLogin = async () => {
    if (!email.includes("@") || password.length < 6) {
      toast({
        title: "Invalid credentials",
        description: "Please enter a valid email and password (min 6 characters)",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          // Try to sign up the user
          const { error: signUpError } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
              data: {
                name: `${userType} ${email}`,
                user_type: userType,
              }
            }
          });

          if (signUpError) {
            toast({
              title: "Authentication failed",
              description: signUpError.message,
              variant: "destructive",
            });
          } else {
            toast({
              title: "Account created successfully",
              description: "Please check your email for verification",
            });
          }
        } else {
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Login successful",
          description: `Welcome to ${t('appName')}`,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      let result;
      if (loginMethod === "mobile") {
        result = await supabase.auth.verifyOtp({
          phone: `+91${mobile}`,
          token: otp,
          type: 'sms'
        });
      } else {
        result = await supabase.auth.verifyOtp({
          email: email,
          token: otp,
          type: 'email'
        });
      }

      const { error } = result;

      if (error) {
        toast({
          title: "Invalid OTP",
          description: error.message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Login successful",
          description: `Welcome to ${t('appName')}`,
        });
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to verify OTP. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSkipLogin = () => {
    setGuestMode(true);
    toast({
      title: "Guest mode",
      description: "Some features may be limited without login",
    });
    navigate("/dashboard");
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case "developer": return <Code className="w-5 h-5" />;
      case "cs_center": return <Building className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-saffron-light via-background to-gov-green-light flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-end mb-2">
            <LanguageSwitcher />
          </div>
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-saffron to-gov-green rounded-full flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            {t('appName')}
          </CardTitle>
          <CardDescription className="text-base">
            {t('appSubtitle')}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* User Type Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium">Login as</label>
            <Select value={userType} onValueChange={setUserType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select user type">
                  <div className="flex items-center gap-2">
                    {getUserTypeIcon(userType)}
                    <span className="capitalize">
                      {userType === "cs_center" ? "CS Center" : userType}
                    </span>
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>User</span>
                  </div>
                </SelectItem>
                <SelectItem value="developer">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    <span>Developer</span>
                  </div>
                </SelectItem>
                <SelectItem value="cs_center">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4" />
                    <span>CS Center</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Login Methods */}
          <Tabs value={loginMethod} onValueChange={setLoginMethod} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="mobile" className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                Mobile
              </TabsTrigger>
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email
              </TabsTrigger>
            </TabsList>

            <TabsContent value="mobile" className="space-y-4">
              {!showOtp ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mobile Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="tel"
                        placeholder="Enter 10-digit mobile number"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="pl-10"
                        maxLength={10}
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={handleSendOtp}
                    className="w-full h-12 text-lg font-semibold"
                    disabled={mobile.length !== 10 || loading}
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </Button>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Enter OTP</label>
                    <Input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="text-center text-lg tracking-wider"
                      maxLength={6}
                    />
                  </div>
                  <Button 
                    onClick={handleVerifyOtp}
                    className="w-full h-12 text-lg font-semibold"
                    disabled={otp.length !== 6 || loading}
                  >
                    {loading ? "Verifying..." : "Verify & Login"}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowOtp(false)}
                    className="w-full"
                  >
                    Change Mobile Number
                  </Button>
                </>
              )}
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              {!showOtp ? (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Password (Optional)</label>
                    <Input
                      type="password"
                      placeholder="Enter password or leave blank for OTP"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    {password ? (
                      <Button 
                        onClick={handleEmailPasswordLogin}
                        className="w-full h-12 text-lg font-semibold"
                        disabled={!email.includes("@") || loading}
                      >
                        {loading ? "Signing in..." : "Sign In"}
                      </Button>
                    ) : (
                      <Button 
                        onClick={handleSendOtp}
                        className="w-full h-12 text-lg font-semibold"
                        disabled={!email.includes("@") || loading}
                      >
                        {loading ? "Sending..." : "Send OTP"}
                      </Button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Enter OTP</label>
                    <Input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="text-center text-lg tracking-wider"
                      maxLength={6}
                    />
                  </div>
                  <Button 
                    onClick={handleVerifyOtp}
                    className="w-full h-12 text-lg font-semibold"
                    disabled={otp.length !== 6 || loading}
                  >
                    {loading ? "Verifying..." : "Verify & Login"}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowOtp(false)}
                    className="w-full"
                  >
                    Change Email
                  </Button>
                </>
              )}
            </TabsContent>
          </Tabs>

          {/* Skip Login Option */}
          <div className="space-y-2">
            <Button 
              variant="ghost"
              onClick={handleSkipLogin}
              className="w-full text-muted-foreground"
            >
              {t('skipLogin')} ({t('continueAsGuest')})
            </Button>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>By logging in, you agree to our Terms of Service</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;