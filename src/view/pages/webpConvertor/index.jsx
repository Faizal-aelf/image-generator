/**
 * 
 * Webp Convertor component
 * @author - NA 
 * @date - 4th March, 2024
 * 
 */
// GENERIC IMPORT
import { useState } from 'react';
import {Box, TextField} from '@mui/material';

// COMMON COMPONENT
import {Empty, Container} from '../../atom';
import {CardImage} from '../../molecules';
import PageHeader from '../common/header/pageHeader';

// STYLE IMPORT
import useStyles from './styles';

const WebpConvertorPage = () => {
  // DECLARE STYLE
  const classes = useStyles();

  // STATE VARIABLE
  const [files, setFiles] = useState([]);
  const [isLoading, setLoading] = useState(false);
    
  const handleImageLoad = (event) => {
    setLoading(true);
    const fileList = event.target.files;
    const newFiles = Array.from(fileList).map(file => ({
      file: file,
      originalSize: file.size,
      originalImageURL: URL.createObjectURL(file),
      finalSize: null,
      webPURL: null
    }));

    newFiles.forEach((fileData, index) => {
      const reader = new FileReader();
      reader.onload = function(event) {
        const img = new Image();
        img.onload = function() {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            setFiles(prevFiles => prevFiles.map(prevFile => {
              if (prevFile.file === fileData.file) {
                return {
                  ...prevFile,
                  finalSize: blob.size,
                  webPURL: url
                };
              }
              return prevFile;
            }));
            if (newFiles.length == (index + 1)) setLoading(false);
          }, 'image/webp');
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(fileData.file);
    });

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  };

  return (
    <Container>
      <PageHeader title='Webp Convertor' subtitle="Here's what you're looking at" {...{isLoading}}></PageHeader>
      <Box className={classes.controlLayer}>
        <TextField 
          accept="image/*" 
          type="file" 
          variant="outlined" 
          className={classes.formTextfield}
          onChange={handleImageLoad}
          fullWidth
          required
          helperText='Upload only image files'
          inputProps={{
            multiple: true
          }}
          />
      </Box>
      <Box className={classes.outputLayer}>
        {files.length > 0 ? 
        (<Box className={classes.imageGrid}>
          {files.map((fileData, index) => (
            <Box className={classes.imageGroup} key={index}>
              <CardImage file={
                {
                  imageSrc: fileData.originalImageURL,
                  title: 'Original Image',
                  size: `${(fileData.originalSize / 1024).toFixed(2)} KB`
                }
              }/>
              <CardImage file={
                {
                  imageSrc: fileData.webPURL,
                  title: 'Webp Image',
                  size: `${(fileData.finalSize / 1024).toFixed(2)} KB`,
                  isDownloadable: true,
                  isWebpImage: true
                }
              }/>
            </Box>
          
          ))}
          </Box>) : <Empty 
        title='No image uploaded' 
        subtitle='Please upload image to convert into webp format' 
        icon={<i className="fa fa-upload"></i>}/>}
      </Box>
    </Container>
  );
};

export default WebpConvertorPage;