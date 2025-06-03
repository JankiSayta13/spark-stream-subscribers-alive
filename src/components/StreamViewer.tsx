
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface StreamViewerProps {
  channelId: string;
}

const StreamViewer = ({ channelId }: StreamViewerProps) => {
  const [isStreamActive, setIsStreamActive] = useState(false);
  const [viewerCount, setViewerCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    // Simulate checking if stream is active
    const checkStreamStatus = () => {
      setIsStreamActive(Math.random() > 0.3); // 70% chance stream is active
      setViewerCount(Math.floor(Math.random() * 1000) + 10);
    };

    checkStreamStatus();
    const interval = setInterval(checkStreamStatus, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [channelId]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    window.location.reload();
  };

  const handleShareChannel = () => {
    const channelUrl = `${window.location.origin}/channel/${channelId}`;
    navigator.clipboard.writeText(channelUrl);
    toast({
      title: "Channel URL Copied",
      description: "You can share this URL with others to access this channel",
    });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold">Channel: {channelId}</h1>
          <p className="text-gray-400">{viewerCount} viewers</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleShareChannel} variant="outline">
            Share Channel
          </Button>
          <Button onClick={handleLogout} variant="destructive">
            Logout
          </Button>
        </div>
      </div>

      {/* Stream Content */}
      <div className="p-4">
        {isStreamActive ? (
          <div className="bg-black rounded-lg overflow-hidden">
            {/* Placeholder for actual stream embed */}
            <div className="aspect-video bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                <h2 className="text-2xl font-bold mb-2">🔴 LIVE</h2>
                <p className="text-gray-300">Streaming content for channel {channelId}</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-gray-800 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Stream Offline</h2>
            <p className="text-gray-400">This channel is currently not streaming. Check back later!</p>
          </div>
        )}

        {/* Chat or Additional Content */}
        <div className="mt-6 bg-gray-800 rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-4">Channel Information</h3>
          <div className="space-y-2">
            <p><strong>Channel ID:</strong> {channelId}</p>
            <p><strong>Status:</strong> {isStreamActive ? "🔴 Live" : "⚫ Offline"}</p>
            <p><strong>Viewers:</strong> {viewerCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamViewer;
