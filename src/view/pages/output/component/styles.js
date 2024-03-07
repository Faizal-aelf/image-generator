import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    imageModalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal: {
        width: '1000px',
        boxSizing: 'border-box',
        background: '#fff',
        padding: '12px 35px 12px 12px',
        borderRadius: '12px',
        position: 'relative'
    },
    image: {
        width: '300px'
    },
    layout: {
        display: 'flex',
        flexDirection: 'row',
        flex: 1
    },
    imageLayer: {
        width: '650px',
    }, 
    controlLayer: {
        flex: 1,
        paddingLeft: '24px'
    },
    imageGroup: {
        display: 'flex',
        flex: 1,
        gap: '24px'
    },
    closeIcon: {
        position: 'absolute',
        top: '12px',
        right: '16px',
        cursor: 'pointer',
        fontSize: '22px',
        fontWeight: 400,
        color: '#454545',
    }
}));
  
export default useStyles;