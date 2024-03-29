/**
 * 
 * Menu constants
 * @author - NA 
 * @date - 1st March, 2024
 * 
 */
// ROUTER IMPORT
import * as PATH from '../../../routes/constants';
   
export const mainMenuItems = [
    {
        id: 'HOME',
        label: 'Home',
        icon: <i className="fa fa-th-large"></i>,
        link: PATH.HOME_PATH
    }
];

export const utilsMenuItems = [
    {
        id: 'GENERATEIMAGE',
        label: 'Generate Image',
        icon: <i className="fa fa-file-image-o"></i>,
        link: PATH.GENERATE_IMAGE_PATH,
    },
    {
        id: 'PROMPTGENERATOR',
        label: 'Prompt Generator',
        icon: <i className="fa fa-commenting-o"></i>,
        link: PATH.PROMPT_GENERATOR_PATH,
    },
    {
        id: 'IMAGETOPIXEL',
        label: 'Image to Pixel',
        icon: <i className="fa fa-file-image-o"></i>,
        link: PATH.IMAGE_TO_PIXEL_PATH,
    },
    {
        id: 'WEBPCONVERTOR',
        label: 'Webp Convertor',
        icon: <i className="fa fa-compress"></i>,
        link: PATH.WEBP_CONVERTOR_PATH,
    },
    {
        id: 'REMOVEBACKGROUND',
        label: 'Remove Background',
        icon: <i className="fa fa-eraser"></i>,
        link: PATH.REMOVE_BACKGROUND_PATH,
    },
    {
        id: 'WATERMARK',
        label: 'Watermark',
        icon: <i className="fa fa-tint"></i>,
        link: PATH.WATERMARK_PATH,
    },
    {
        id: 'OUTPUT',
        label: 'Output',
        icon: <i className="fa fa-bolt"></i>,
        link: PATH.OUTPUT_PATH,
    },
];

export const helpMenuItems = [
    {
        id: 'HELP',
        label: 'Help',
        icon: <i className="fa fa-question-circle"></i>,
        link: PATH.HELP_PATH,
    },
];