import React from "react";
import { Camera, Zap } from "lucide-react";

interface ScannerTabProps {
  scanning: boolean;
  selectedFile: File | null;
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  darkMode: boolean;
}

const ScannerTab: React.FC<ScannerTabProps> = ({
  scanning,
  selectedFile,
  onFileUpload,
  darkMode,
}) => {
  return (
    <div className="text-center">
      <Camera className="w-20 h-20 mx-auto mb-4 text-blue-500" />
      <h2 className="text-2xl font-bold mb-4">Photo Upload Scanner</h2>
      <p className={`mb-6 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
        Upload photos of your clothing items for AI analysis and categorization
      </p>

      <div className="mb-4">
        <label
          htmlFor="file-upload"
          className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition hover:scale-105 disabled:opacity-50 inline-block"
        >
          {scanning ? (
            <>
              <Zap className="inline w-5 h-5 mr-2 animate-pulse" />
              Analyzing...
            </>
          ) : (
            <>
              <Camera className="inline w-5 h-5 mr-2" />
              Choose File & Scan
            </>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          onChange={onFileUpload}
          disabled={scanning}
          className="hidden"
        />
      </div>

      {selectedFile && (
        <div className="mb-4">
          <p className="text-sm">Selected: {selectedFile.name}</p>
        </div>
      )}

      {scanning && (
        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-3 mb-2 overflow-hidden">
            <div
              className="bg-blue-500 h-3 rounded-full animate-pulse"
              style={{ width: "70%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-500">
            AI analyzing clothing items...
          </p>
        </div>
      )}
    </div>
  );
};

export default ScannerTab;
