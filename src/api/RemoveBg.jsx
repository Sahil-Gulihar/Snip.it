// RemoveBgComponent.jsx
import React, { useState } from 'react';
import axios from 'axios';

const RemoveBgComponent = ({ urlMilega }) => {
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleRemoveBg = async () => {
    const formData = new FormData();
    formData.append('size', 'auto');
    formData.append('image_url', urlMilega);

    const headers = new Headers();
    for (const pair of formData.entries()) {
      headers.append('Content-Disposition', `form-data; name="${pair[0]}"`);
    }

    try {
      const response = await axios({
        method: 'post',
        url: 'https://api.remove.bg/v1.0/removebg',
        data: formData,
        responseType: 'arraybuffer',
        headers: {
          ...headers,
          'X-Api-Key': import.meta.env.REACT_APP_X_API_KEY,
        },
        encoding: null,
      });

      if (response.status !== 200) {
        setError(`Error: ${response.status} ${response.statusText}`);
        return;
      }

      const blob = new Blob([response.data], { type: 'image/png' });
      const imageUrl = URL.createObjectURL(blob);
      setResult(imageUrl);
    } catch (error) {
      setError(`Request failed: ${error}`);
    }
  };

  return (
    <div>
      <button onClick={handleRemoveBg} disabled={!urlMilega}>
        Remove Background
      </button>
      {error && <p>{error}</p>}
      {result && <img src={result} alt="No background" />}
    </div>
  );
};

export default RemoveBgComponent;