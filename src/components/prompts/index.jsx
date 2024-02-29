import React, { useState } from 'react';
import {Box, TextField, Button} from '@mui/material';
import axios from 'axios';
import Loader from '../loader';
import {GENERATE_IMAGE_API} from '../../utils/constants';
import {mockData} from './data/data';
import {convertTableIntoArray} from './utils';
import ImageCard from './components/card';
import ChangeImageBackground from './components/changeImageBackground';
import './style.css';

const PromptsSection = () => {
    const [message, setMessage] = useState("Create a low complexity sprite pixel art of a cat. The cat should have a simple design suitable for a retro video game, with minimal detail to keep it recognizable but not intricate. Make sure there's only one figure of cat and no other illustration. The background should be a single color that contrasts with the cat to make the sprite clearly visible. Keep the background clean without any decorations.");
    const [isLoading, setLoading] = useState(false);
    const [generatedPrompts, setGeneratedPrompts] = useState('');

    const handleGeneratePrompts = async () => {
        setLoading(true);
        try {
            const response = await axios.post(
                GENERATE_IMAGE_API,
                    {
                        prompt: message
                    },
                    {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log("response: ", response);
            setGeneratedPrompts(response.data);
        } catch (error) {
            console.error('Error generating prompts:', error);
            setGeneratedPrompts('');
        } finally {
            console.log("Finally: ");
            setLoading(false);
        }
    };

  return (
    <Box className="container">
        { isLoading && <Loader/>}
        <Box className="form-container">
            <TextField 
                value={message} 
                label="Prompt message" 
                placeholder='Enter a basic prompt idea.' 
                variant="outlined" 
                className="form-textfield"
                onChange={(e) => setMessage(e.target.value)}
                fullWidth
                multiline
                maxRows={5}
                required/>
            <Box className="btn-container">
                <Button variant="contained" onClick={handleGeneratePrompts}>Generate Prompts</Button>
            </Box>
        </Box>
        {generatedPrompts && <div dangerouslySetInnerHTML={{ __html: generatedPrompts }} />}
        
    </Box>
  );
};

export default PromptsSection;

/**
 <ul className='image-list'>
    {generatedPrompts.map((item, index) => (
        <li key={index}>
            <ImageCard {...item}/>
        </li>
    ))}    
</ul>} */
