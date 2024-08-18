"use client"
import useUploadStore from '../../store/useUploadStore';

export default function Review() {
  const uploadedFile = useUploadStore((state) => state.uploadedFile);

  return (
    <div className="p-10 md:p-20 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-8">Review Your Upload</h1>
      {uploadedFile ? (
        <div className="w-full max-w-2xl p-8 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">{uploadedFile.name}</h2>
          <p className="text-gray-700 mb-6">File Size: {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
          <p className="text-gray-600">The file has been successfully uploaded. You can now proceed with your review.</p>
        </div>
      ) : (
        <p className="text-gray-600">No file uploaded. Please go back and upload a file.</p>
      )}
    </div>
  );
}
