import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const ImageUploader = () => {
    const { token } = useAuth();

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setUploadStatus(''); // Reset upload status when a new file is selected
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:4000/images/upload', formData, {
        headers: {
          'Authorization': `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
          setUploadProgress(progress);
        },
      });
      console.log(response.data);
      setUploadStatus('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      setUploadStatus('Error uploading image');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <h1 className="text-3xl font-bold mb-4 text-center">Image Uploader</h1>
        <div className="mb-4">
          <label htmlFor="file-input" className="block bg-blue-500 text-white font-semibold py-2 px-4 rounded cursor-pointer text-center hover:bg-blue-600">
            {selectedFile ? 'Change Image' : 'Choose Image'}
          </label>
          <input type="file" accept="image/*" onChange={handleFileInputChange} className="hidden" id="file-input" />
          {selectedFile && (
            <button onClick={handleUpload} className="block w-full bg-green-500 text-white font-semibold py-2 mt-2 rounded hover:bg-green-600">
              Upload
            </button>
          )}
        </div>
        {selectedFile && (
          <div className="mb-4">
            <img src={previewUrl} alt="Preview" className="max-w-full h-auto mx-auto" style={{ maxWidth: '100%' }} />
          </div>
        )}
        {uploadStatus && (
          <div className={`text-center py-2 ${uploadStatus.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {uploadStatus}
          </div>
        )}
        {uploadProgress > 0 && (
          <div className="bg-green-500 h-4 rounded mb-2">
            <div className="bg-white h-full rounded" style={{ width: `${uploadProgress}%` }}></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
