/**
 * 
 * Image Modal component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import clsx from 'clsx';
import { useState, useEffect, useRef } from 'react';
import { Slider, Box, Typography } from '@mui/material';
import Pixelate from 'pixelate';

// COMMON COMPONENT
import {Loader} from '../../../atom';
import {CardImage} from '../../../molecules';
import {convertImageUrlToDataUrl} from '../../../../utils/file';

// STYLE IMPORT
import useStyles from './styles';

const ImageModal = (props) => {
    // DECLARE STYLE
    const classes = useStyles();

    // REF VARIABLE
    const originalImageRef = useRef();
    const pixelImageRef = useRef();

    // STATE VARIABLE
    const [originalImageDataUrl, setOriginalImageDataUrl] = useState(null);
    const [pixelImageDataUrl, setPixelImageDataUrl] = useState(null);
    const [pixelate, setPixelate] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [range, setRange] = useState(0);

    const fetchDataUrl = async (imageUrl) => {
        setLoading(true);
        try {
            const result = await convertImageUrlToDataUrl(imageUrl);
            setOriginalImageDataUrl(result);
            setPixelImageDataUrl(result);
        } catch (error) {
            console.error('Error converting image:', error);
        } finally {
            setLoading(false)
        }
    };

    

    // HANDLE IMAGE TO PIXEL CONVERT
    const handleRangeChange = (event) => {
        const rangeAmount = event.target.value;
        const pixelAmount = rangeAmount/100;
        setRange(rangeAmount);
        pixelate.setWidth(600).setAmount(pixelAmount).render();
    };

    useEffect(() => {
        initialCall();
    }, []);

    const initialCall = async () => {
        await fetchDataUrl(props.imageSource);
        setPixelate(new Pixelate(pixelImageRef.current));
    }

  return (
    <Box className={classes.imageModalOverlay}>
      <Box className={classes.modal}>
        <Box className={classes.layout}>
            <Box className={classes.imageLayer}>
                <Box className={classes.imageGroup}>
                { isLoading && <Loader/>} 
                <CardImage file={
                    {
                    imageSrc: originalImageDataUrl,
                    imageRef: originalImageRef,
                    title: 'Original Image',
                    }
                }/>
                    
                </Box>
            </Box>
            <Box className={classes.controlLayer}>
                <Typography variant="subtitle1" gutterBottom>Controller</Typography>
                <Typography variant="h6" gutterBottom>{props.selectedPrompt}</Typography>
                <Slider defaultValue={range} valueLabelDisplay="auto" onChange={handleRangeChange}/>
                
            </Box>
        </Box>
        <i className={clsx("fa fa-times", classes.closeIcon)} onClick={() => props.onClose()}></i>
      </Box>
    </Box>
  );
};

export default ImageModal;