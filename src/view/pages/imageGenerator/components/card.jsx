/**
 * 
 * Card component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import {useState} from 'react';
import {Card} from '@mui/material';
import {Lightbox} from "react-modal-image";

// STYLE IMPORT
import '../style.css';

const ImageCard = (props) => {

    // STATE VARIABLE
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <>
        <Card sx={{ maxWidth: 300 }} className='image-card'>
            <img
                src={props.imgSrc}
                alt=''
                className='pixel-image' 
                onClick={() => setModalOpen(true)}
            />
        </Card>
            {isModalOpen && <Lightbox
            small={props.imgSrc}
            large={props.imgSrc}
            onClose={() => setModalOpen(false)}
          />}
        </>
    );
}

export default ImageCard;
