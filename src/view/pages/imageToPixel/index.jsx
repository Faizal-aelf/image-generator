/**
 * 
 * Image To pixel component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import { useState, useRef } from 'react';
import {Lightbox} from "react-modal-image";
import {Slider, Box, TextField} from '@mui/material';
import Pixelate from 'pixelate';

// COMMON COMPONENT
import {Loader, Empty} from '../../atom';
import PageHeader from '../common/header/pageHeader';

// STYLE IMPORT
import useStyles from './styles';

const ImageToPixelPage = () => {
  // DECLARE STYLE
  const classes = useStyles();

  // STATE VARIABLE
  const [imageDataUrl, setImageDataUrl] = useState(null);
  const [pixelImageDataUrl, setPixelImageDataUrl] = useState(null);
  const [pixelate, setPixelate] = useState(null);
  const [range, setRange] = useState(0);
  const [isLoading, setLoading] = useState(false);
  const [imageModal, setImageModal] = useState({
    src: null,
    isOpen: false,
  });

  // REF VARIABLE
  const imageRef = useRef();
  const originalImageRef = useRef();
    
  // HANDLE IMAGE TO PIXEL CONVERT
  const handleRangeChange = (event) => {
    const rangeAmount = event.target.value;
    const pixelAmount = rangeAmount/100;
    setRange(rangeAmount);
    pixelate.setWidth(600).setAmount(pixelAmount).render();
  };
    
  // HANDLE IMAGE TO DATA/IMAGE FORMAT
  const handleImageUpload = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();
      setLoading(true);
      try {
          reader.onloadend = async () => {
              setImageDataUrl(reader.result);
              setPixelImageDataUrl(reader.result);
              setTimeout(() => setPixelate(new Pixelate(imageRef.current)), 0);
          };
          if (file) {
          reader.readAsDataURL(file);
          } 
      } catch (error) {
          console.error('Error generating prompts:', error);
      } finally {
          console.log("Finally: ");
          setLoading(false);
      } 
  };

  // HANDLE IMAGE MODAL STATE
  const handleImageModal = (src) => {
    setImageModal({...imageModal, src, isOpen: true});
  }

  // HANDLE IMAGE MODAL CLOSE
  const onCloseModal = () => {
    setImageModal({src: null, isOpen: false});
  }

  return (
    <>
      <PageHeader title='Image to Pixel' subtitle="Here's what you're looking at"></PageHeader>
      { isLoading && <Loader/>} 
      <Box className={classes.container}>
        <Box className={classes.controlLayer}>
          <TextField 
            accept="image/*" 
            type="file" 
            variant="outlined" 
            className={classes.formTextfield}
            onChange={handleImageUpload}
            fullWidth
            required
            helperText='Upload only image files'/>
          <Slider defaultValue={range} valueLabelDisplay="auto" onChange={handleRangeChange} disabled={!imageDataUrl}/>
        </Box>
        <Box className={classes.outputLayer}>
          {imageDataUrl ? (
            <Box className={classes.imageGroup}>
              <Box className={classes.imageBox}>
                <img onClick={() => handleImageModal(originalImageRef.current.src)} ref={originalImageRef} className={classes.pixelImage} src={pixelImageDataUrl} alt="Uploaded" />
                <Box className={classes.imageTitle}>Original Image</Box>
              </Box>
              <Box className={classes.imageBox}>
                <img onClick={() => handleImageModal(imageRef.current.src)} ref={imageRef} className={classes.pixelImage} src={imageDataUrl} alt="Uploaded"  />
                <Box className={classes.imageTitle}>Pixelate Image</Box>
              </Box>
            </Box>
          ) : <Empty 
          title='No image uploaded' 
          subtitle='Please upload image to pixelate' 
          icon={<i className="fa fa-upload"></i>}/>}
        </Box>
      </Box>
      {imageModal.isOpen && <Lightbox
        small={imageModal.src}
        large={imageModal.src}
        onClose={onCloseModal}
      />}
    </>
  );
};

export default ImageToPixelPage;