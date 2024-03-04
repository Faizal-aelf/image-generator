/**
 * 
 * Generate Image component
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import React, { useState } from 'react';
import {Box, TextField, Button} from '@mui/material';
import axios from 'axios';

// COMMON COMPONENT
import {Empty} from '../../atom';
import PageHeader from '../common/header/pageHeader';
import ImageCard from './components/card';

// MOCK DATA
import {data as MockData} from '../../../mockData/nftData';

// UTILS
import {GENERATE_IMAGE_API} from '../../../api/constants';

// STYLE IMPORT
import './style.css';

const ImageGeneratorPage = () => {
    const [message, setMessage] = useState("Create a low complexity sprite pixel art of a cat. The cat should have a simple design suitable for a retro video game, with minimal detail to keep it recognizable but not intricate. Make sure there's only one figure of cat and no other illustration. The background should be a single color that contrasts with the cat to make the sprite clearly visible. Keep the background clean without any decorations.");
    const [isLoading, setLoading] = useState(false);
    const [generatedPrompts, setGeneratedPrompts] = useState([]);

    const handleGeneratePrompts = async () => {
        setLoading(true);
        try {
            /* const response = await axios.post(
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
            setGeneratedPrompts(response.data); */
            setGeneratedPrompts(MockData)
        } catch (error) {
            console.error('Error generating prompts:', error);
            setGeneratedPrompts([]);
        } finally {
            console.log("Finally: ");
            setLoading(false);
        }
    };

  return (
    <>
        <PageHeader title='Generate Image' subtitle="Here's what you're looking at"  {...{isLoading}}></PageHeader>
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
            <Box className="btn-container" textAlign='right'>
                <Button variant="contained" onClick={handleGeneratePrompts}>Generate Prompts</Button>
            </Box>
        </Box>
        {generatedPrompts.length > 0 ? 
            (<ul className='image-list'>{
                generatedPrompts.map((item, index) => (
                    <li key={index}><ImageCard imgSrc={item}/></li>
                ))
            }</ul>) : 
            <Empty 
                title='No image generated' 
                subtitle='Please provide your prompt and generate the image' 
                icon={<i className="fa fa-file-image-o"></i>}/>}        
    </>
  );
};

export default ImageGeneratorPage;

// <div dangerouslySetInnerHTML={{ __html: generatedPrompts }} />