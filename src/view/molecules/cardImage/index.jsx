/**
 * 
 * Card Image component
 * @author - NA 
 * @date - 4th March, 2024
 * 
 */
// GENERIC IMPORT
import {Box, Button, Chip} from '@mui/material';
import WebPImage from 'react-webp-image';

// UTILS 
import {handleDownload} from '../../../utils/file';
import {IMAGE_FORMAT} from '../../../utils/constants';

// STYLE IMPORT
import useStyles from './styles';

const CardImage = (props) => {
    const {imageSrc, imageRef, title, size, handleImageModal, isDownloadable, isWebpImage, ...rest} = props.file;
    // DECLARE STYLE
    const classes = useStyles();

    return (
        <Box className={classes.cardImageContainer}>
            {!isWebpImage && <img onClick={() => handleImageModal?.(imageRef?.current?.src)} 
                {...(imageRef && { ref: imageRef })} 
                className={classes.cardImage} src={imageSrc} 
            />}
            {isWebpImage && <WebPImage src={imageSrc} className={classes.cardImage}/>}
            <Box className={classes.cardImageTitle}>{title} {size && <Chip label={size} size="small" variant="outlined" />}</Box>
            {isDownloadable && <Button variant="text" onClick={() => handleDownload(imageSrc, IMAGE_FORMAT.WEBP)} startIcon={<i class="fa fa-download"></i>}>Download</Button>}
        </Box>
    )
};
export default CardImage;