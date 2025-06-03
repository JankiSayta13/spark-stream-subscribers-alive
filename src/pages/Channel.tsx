
import { useParams, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import LoginForm from "../components/LoginForm";
import StreamViewer from "../components/StreamViewer";

const Channel = () => {
  const { channelId } = useParams<{ channelId: string }>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage or session)
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (token: string) => {
    localStorage.setItem('authToken', token);
    setIsAuthenticated(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!channelId) {
    return <Navigate to="/" replace />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-6">Access Channel: {channelId}</h1>
          <p className="text-gray-600 text-center mb-6">
            Please log in to access this streaming channel
          </p>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      </div>
    );
  }

  return <StreamViewer channelId={channelId} />;
};

export default Channel;
