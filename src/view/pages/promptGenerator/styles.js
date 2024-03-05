import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    chipItem: {
        margin: '4px !important'
    },
    btnContainer: {
        margin: '8px 0 24px 0',
        display: 'flex',
        justifyContent: 'end',
        gap: '12px',
    },
    formTextfield: {
        width: '100%',
        boxSizing: 'border-box',
        background: '#fff',
        marginBottom: '16px !important'
    },
    itemItem: {
        border: '1xp solid #ccc',
        borderRadius: '8px',
        background: '#fff',
        marginBottom: '12px'
    }
}));
  
export default useStyles;