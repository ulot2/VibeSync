import { useRef, useCallback, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { ArrowLeft, Image as ImageIcon, Upload, RefreshCw } from "lucide-react";

interface CaptureProps {
  onBack: () => void;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCapture: (base64: string) => void;
}

export function Capture({ onBack, onImageUpload, onCapture }: CaptureProps) {
  const webcamRef = useRef<Webcam>(null);
  const [hasCamera, setHasCamera] = useState(false);
  const [facingMode, setFacingMode] = useState<"user" | "environment">(
    "environment"
  );

  useEffect(() => {
    // Simple check if getUserMedia is available (though react-webcam handles errors gracefully usually)
    setHasCamera(
      !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
    );
  }, []);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      onCapture(imageSrc);
    }
  }, [webcamRef, onCapture]);

  const toggleCamera = useCallback(() => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, []);

  return (
    <div className="h-dvh flex flex-col bg-black relative">
      {/* Header */}
      <div className="p-6 flex items-center justify-between z-10 absolute top-0 w-full">
        <button
          onClick={onBack}
          aria-label="Back"
          className="p-2 bg-black/40 rounded-full backdrop-blur-md text-white border border-white/10"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <button
          onClick={toggleCamera}
          aria-label="Toggle Camera"
          className="p-2 bg-black/40 rounded-full backdrop-blur-md text-white border border-white/10"
        >
          <RefreshCw className="w-6 h-6" />
        </button>
      </div>

      {/* Viewfinder Area */}
      <div className="flex-1 flex items-center justify-center relative overflow-hidden bg-slate-900">
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="absolute inset-0 w-full h-full object-cover"
          videoConstraints={{
            facingMode: facingMode,
          }}
          onUserMediaError={() => setHasCamera(false)}
        />

        {/* Grid Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="w-full h-1/3 border-y border-white/30"></div>
          <div className="h-full w-1/3 border-x border-white/30 absolute top-0 left-1/3"></div>
        </div>

        {/* Central Focus Box */}
        <div className="w-64 h-64 border-2 border-cyan-500/50 rounded-3xl relative pointer-events-none">
          <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-cyan-400 -mt-1 -ml-1 rounded-tl-lg"></div>
          <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-cyan-400 -mt-1 -mr-1 rounded-tr-lg"></div>
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-cyan-400 -mb-1 -ml-1 rounded-bl-lg"></div>
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-cyan-400 -mb-1 -mr-1 rounded-br-lg"></div>
        </div>
      </div>

      {/* Controls Footer */}
      <div className="p-8 pb-12 flex items-center justify-around bg-gradient-to-t from-black via-slate-900/90 to-transparent text-white relative z-10">
        {/* Gallery Trigger */}
        <label className="flex flex-col items-center gap-1 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur border border-white/5">
            <ImageIcon className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium text-slate-300">Gallery</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
          />
        </label>

        {/* Shutter Trigger */}
        <button
          onClick={capture}
          className="transform hover:scale-105 transition-transform active:scale-95"
          aria-label="Take Photo"
        >
          <div className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center p-1">
            <div className="w-full h-full bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.5)]"></div>
          </div>
        </button>

        {/* Upload - Keeping as redundant fallback or for specific 'file' vibes */}
        <label className="flex flex-col items-center gap-1 cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center backdrop-blur border border-white/5">
            <Upload className="w-6 h-6" />
          </div>
          <span className="text-xs font-medium text-slate-300">Upload</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onImageUpload}
          />
        </label>
      </div>
    </div>
  );
}
