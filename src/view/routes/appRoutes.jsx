/**
 * 
 * App Routes
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// GENERIC IMPORT
import { Route, Routes } from 'react-router-dom';
import {Box} from '@mui/material';

// ROUTER IMPORT
import * as PATH from './constants';

// COMMON PAGE IMPORT 
import Header from '../pages/common/header';
import Menu from '../pages/common/menu';
import Footer from '../pages/common/footer';
import NoPage from '../pages/error/noPage';

// PAGES 
import DashboardPage from '../pages/dashboard';
import ImageGeneratorPage from '../pages/imageGenerator';
import ImageToPixelPage from '../pages/imageToPixel';
import WebpConvertorPage from '../pages/webpConvertor';
import RemoveBackgroundPage from '../pages/removeBackground';
import PromptGeneratorPage from '../pages/promptGenerator';
import HelpPage from '../pages/help';

// STYLE IMPORT
import useStyles from './styles';

const AppRoutes = () => {
    // STYLE DECLARE
    const classes = useStyles();
    
    // RENDER HTML
    return (
        <Box className={classes.app}>
            <Box className={classes.layout}>
                <Menu/>
                <Box className={classes.bodyContent}>
                    <Box className={classes.routerContainer}>
                        <Header/>
                        <Routes>
                            <Route path={PATH.HOME_PATH} element={<DashboardPage />}/>
                            <Route path={PATH.GENERATE_IMAGE_PATH} element={<ImageGeneratorPage />}/>
                            <Route path={PATH.IMAGE_TO_PIXEL_PATH} element={<ImageToPixelPage />}/>
                            <Route path={PATH.WEBP_CONVERTOR_PATH} element={<WebpConvertorPage />}/>
                            <Route path={PATH.REMOVE_BACKGROUND_PATH} element={<RemoveBackgroundPage />}/>
                            <Route path={PATH.PROMPT_GENERATOR_PATH} element={<PromptGeneratorPage />}/>
                            <Route path={PATH.HELP_PATH} element={<HelpPage />}/>
                            <Route path="*" element={<NoPage />} />
                        </Routes>
                    </Box>
                    <Footer/>
                </Box>
            </Box>
        </Box>
    );
};

export default AppRoutes;