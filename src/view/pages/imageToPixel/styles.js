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
}));
  
export default useStyles;