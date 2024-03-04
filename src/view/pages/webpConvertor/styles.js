import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    controlLayer: {
        flex: 1,
    },
    outputLayer: {
        flex: 1
    },
    imageGroup: {
        display: 'flex',
        gap: '24px',
        justifyContent: 'start',
        marginBottom: '20px'
    },
    imageGrid: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: '12px'
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
        padding: '8px 0 0 0',
    },
    pixelImage: {
        width: '300px',
        borderRadius: '4px',
        boxShadow: '1px 1px 2px #ccc',
        '&:hover': {
            cursor: '-webkit-not-allowed',
            cursor: 'not-allowed',
        },
    }
}));
  
export default useStyles;