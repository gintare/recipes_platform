import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, ProgressBar, Alert, Image } from 'react-bootstrap';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios.post('YOUR_UPLOAD_ENDPOINT', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(progress);
        },
      });

      setImageUrl(response.data.imageUrl); // Assuming the response contains the image URL
      setUploadSuccess(true);
      setUploadError('');
    } catch (error) {
      setUploadError('Failed to upload image');
      setUploadSuccess(false);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group controlId="formFile">
          <Form.Label>Upload Image</Form.Label>
          <Form.Control type="file" onChange={handleFileChange} />
        </Form.Group>
        {uploadProgress > 0 && (
          <ProgressBar now={uploadProgress} label={`${uploadProgress}%`} />
        )}
        <Button variant="primary" onClick={handleUpload}>
          Upload
        </Button>
      </Form>
      {uploadSuccess && (
        <Alert variant="success" className="mt-3">
          Image uploaded successfully!
        </Alert>
      )}
      {uploadError && (
        <Alert variant="danger" className="mt-3">
          {uploadError}
        </Alert>
      )}
      {imageUrl && (
        <div className="mt-3">
          <Image src={imageUrl} thumbnail />
        </div>
      )}
    </div>
  );
}

export default ImageUpload;