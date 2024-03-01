import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    container: {
        display: 'flex',
        flex: 1,
        gap: '30px'
    },
    controlLayer: {
        flex: 1,
    },
    outputLayer: {
        flex: 1
    },
    imageGroup: {
        display: 'flex',
        flex: 1,
        gap: '24px'
    },
    formTextfield: {
        marginBottom: 0,
    },
    imageBox: {
        textAlign: 'center'
    },
    imageTitle: {
        fontSize: '14px',
        fontWeight: 600,
        textAlign: 'center',
        padding: '8px 0',
    },
    pixelImage: {
        width: '300px',
        transform: 'scale(1)',
        borderRadius: '4px',
        boxShadow: '1px 1px 2px #ccc',
        '&:hover': {
            transform: 'scale(1.1)',
            transition: 'all 0.1s linear',
            cursor: '-webkit-zoom-in',
            cursor: 'zoom-in',
        },
    }
}));
  
export default useStyles;