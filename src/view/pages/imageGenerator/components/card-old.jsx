import * as React from 'react';
import {Box, Card, CardActions, CardContent, Button, Typography} from '@mui/material';
import '../style.css';

const ImageCard = (props) => {
    const formatRevisedPrompt = (revisedPrompt) => {
        const formattedData = revisedPrompt.split(".").filter(item => item.trim() !== '');
        return formattedData;
    }
    const downloadImage = (imageData) => {
        window.location.href = imageData;
    }
    return (
        <Card sx={{ maxWidth: 345 }} className='image-card'>
            <img
                src={props.imageSrc}
                style={{maxWidth: '345px'}}
                alt=''
            />
            <CardContent>
                <Box className='card-title'>
                {props.name}
                </Box>
                <Typography variant="body2" color="text.secondary">
                    <ul className='revised-list'>
                    {formatRevisedPrompt(props.revisedPrompt).map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                    </ul>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" onClick={() => downloadImage(props.imageSrc)}>Download</Button>
            </CardActions>
        </Card>
    );
}

export default ImageCard;
