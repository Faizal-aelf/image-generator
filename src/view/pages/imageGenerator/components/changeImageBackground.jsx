import {useState} from 'react';
import {Card, CardActions, Button} from '@mui/material';
import {imageData1} from '../data/image1'; 
// import {updatedImage1} from '../data/updatedImage1'; 
import '../style.css';

const ChangeImageBackground = (props) => {
    const [backgroundColor, setBackgroundColor] = useState('#000000');
    const [imgData, setImgData] = useState(imageData1);

    const handleBackgroundColorChange = (color) => {
        setBackgroundColor(color);
        // Convert the hex color to RGB
        const rgbColor = hexToRgb(color);
        console.log("rgbColor: ", rgbColor);
        // Update the image data URI with the new background color
        const updatedImageData = updateImageDataUri(imageData1, rgbColor);
        console.log("Update imge data format: ", updatedImageData);
        setImgData(updatedImageData); // You can use this updatedImageData in your application
    };

    // Function to convert hex color to RGB
    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.substring(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return { r, g, b };
    };

    // Function to update image data URI with new background color
    const updateImageDataUri = (imageDataUri, backgroundColor) => {
        const base64Data = imageDataUri.split(',')[1]; // Extract base64 data
  const decodedData = atob(base64Data); // Decode base64 data

  // Add background color to the beginning of the image data
  const updatedData = `background-color: ${backgroundColor}; ${decodedData}`;

  // Recreate the data URI
  const updatedImageDataUri = `data:image/png;base64,${btoa(updatedData)}`;
  return updatedImageDataUri;
    };
    
    return (
        <Card sx={{ maxWidth: 345 }} className='image-card'>
            <img src={imgData} alt="" width={200}/>
            <img src={imgData} alt="" width={200}/>
            
            <CardActions>
                <input type="color" value={backgroundColor} onChange={(e) => handleBackgroundColorChange(e.target.value)} />
                <Button size="small" onClick={() => false}>Download</Button>
            </CardActions>
        </Card>
    );
}

export default ChangeImageBackground;
