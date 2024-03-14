import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    controlLayer: {
        flex: 1,
        display: 'flex',
        gap: '16px'
    },
    outputLayer: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        marginTop: '24px',
    },
    formTextfield: {
        marginBottom: 0,
    },
    imageGroup: {
        display: 'flex',
        gap: '24px',
        justifyContent: 'center',
        marginBottom: '20px',
    },
    imageGrid: {
        display: 'grid',
        gridTemplateColumns: 'auto auto',
        gap: '12px'
    },
}));
  
export default useStyles;