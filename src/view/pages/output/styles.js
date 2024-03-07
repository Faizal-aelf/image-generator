import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    container: {
        flex: 1,
    },
    accordionTitle: {
        fontSize: '15px',
        fontWeight: 600
    },
    datalist: {
        listStyle: 'none',
        margin: 0,
        padding: 0,
        margin: '12px 0 16px 0',
    },
    dataListItem: {
        display: 'inline-block',
        width: '300px',
        padding: '8px',
        margin: '0 12px 24px 0',
        border: '1px solid #ccc',
        borderRadius: '8px',
        verticalAlign: 'top'
    },
    title: {
        marginTop: '-12px',
        fontSize: '13px',
        color: '#393939'
    },
    copyIcon: {
        cursor: 'pointer'
    }
}));
  
export default useStyles;