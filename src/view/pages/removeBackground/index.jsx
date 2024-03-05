/**
 * 
 * Remove Background component
 * @author - NA 
 * @date - 4th March, 2024
 * 
 */
// GENERIC IMPORT
import { useState } from 'react';
import imglyRemoveBackground from "@imgly/background-removal"
import {Box, TextField, Button, Tooltip, IconButton} from '@mui/material';

// COMMON COMPONENT
import {Empty, Container} from '../../atom';
import {CardImage} from '../../molecules';
import PageHeader from '../common/header/pageHeader';

// STYLE IMPORT
import useStyles from './styles';

const RemoveBackgroundPage = () => {
  // DECLARE STYLE
  const classes = useStyles();

  // STATE VARIABLE
  const [fileObject, setFileObject] = useState({
    file: null,
    sourceImageSize: 0,
    sourceImageURL: null,
    destinationImageSize: 0,
    destinationImageURL: null,
    updatedBgImageURL: null
  });
  const [isLoading, setLoading] = useState(false);
  const [updatedColor, setUpdatedColor] = useState();
    
  const handleRemoveImageBG = (event) => {
    setLoading(true);
    const file = event.target.files[0];
    const config =  {
      output: {
        format: 'image/webp',
        quality: 0.8,
        type: 'foreground',
      }
    };
    imglyRemoveBackground(URL.createObjectURL(file), config).then((blob) => {
      // The result is a blob encoded as PNG. It can be converted to an URL to be used as HTMLImage.src
      setFileObject({
        file: file,
        sourceImageSize: file.size,
        sourceImageURL: URL.createObjectURL(file),
        destinationImageSize: blob.size,
        destinationImageURL: URL.createObjectURL(blob),
        updatedBgImageURL: null
      });
      setLoading(false);
    })
  };

  const changeBackground = (newBGColor) => {
    if (fileObject.destinationImageURL && newBGColor) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const img = new Image();
      img.onload = function() {
        canvas.width = img.width;
        canvas.height = img.height;
        context.drawImage(img, 0, 0);
        context.globalCompositeOperation = 'destination-over'; // Set the blend mode
        context.fillStyle = newBGColor; // Set the background color
        context.fillRect(0, 0, canvas.width, canvas.height);
        const newImageUrl = canvas.toDataURL('image/webp'); // Convert canvas to image URL
        setTimeout(() => {
          setFileObject({
            ...fileObject,
            updatedBgImageURL: newImageUrl
          });
        }, 0);
      };
      img.src = fileObject.destinationImageURL;
    } else {
      alert("Color not selected");
    }
  };

  return (
    <Container>
      <PageHeader title='Remove Background' subtitle="Here's what you're looking at" {...{isLoading}}></PageHeader>
      <Box className={classes.controlLayer}>
        <TextField 
          accept="image/*" 
          type="file" 
          variant="outlined" 
          className={classes.formTextfield}
          onChange={handleRemoveImageBG}
          fullWidth
          required
          helperText='Upload only image files'
          />
      </Box>
      <Box className={classes.outputLayer}>
        {fileObject.destinationImageURL ? 
        (
          <Box className={classes.imageGroup}>
            <CardImage file={
                {
                  imageSrc: fileObject.sourceImageURL,
                  title: 'Original Image',
                }
            }/>
            <Box className={classes.imageBox}>
              <img className={classes.pixelImage} src={fileObject.destinationImageURL} alt="Converted Image" />
              <Box className={classes.imageTitle}>Webp Image</Box>
              <Tooltip title="Chose your color and click change background link to generate new image." arrow style={{ backgroundColor: 'transparent' }}>
                <IconButton>
                  <TextField  
                    type="color" 
                    variant="outlined" 
                    value={updatedColor}
                    onChange={(event) => {
                      setUpdatedColor(event.target.value)
                    }}
                    className={classes.formColorfield}
                    size="small"
                    inputProps={{
                      style: {
                        padding: '3px 4px'
                      }
                  }}
                  />
                  <Button variant="text" onClick={() => changeBackground(updatedColor)} disabled={!updatedColor}>Change background</Button>
                </IconButton>
              </Tooltip>
            </Box>
            {fileObject.updatedBgImageURL &&
              <CardImage file={
                {
                  imageSrc: fileObject.updatedBgImageURL,
                  title: 'Updated Background color',
                  isDownloadable: true,
                  isWebp: true
                }
              }/>
            }
          </Box>
        ) : <Empty 
        title='No image uploaded' 
        subtitle='Please upload image to convert into webp format' 
        icon={<i className="fa fa-upload"></i>}/>}
      </Box>
    </Container>
  );
};

export default RemoveBackgroundPage;