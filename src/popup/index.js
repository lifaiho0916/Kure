import { Typography, Link } from '@mui/material';

const PopUp = (props) => {
    const { handleStoreIdChange } = props
    
    const changeStoreId = (id) => {
        localStorage.setItem("store_id", id)
        handleStoreIdChange(id)
    }

    return (
        <div
            style={{
                marginTop: '300px',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                alignItems: 'center'
            }}
        >
            <img alt="logo" src="https://kuremendocino.com/themes/ji_kure_theme/images/kure_logo_transparent.png" style={{ maxWidth: '298px', width: '100%' }} />
            <Typography variant="h2" sx={{ color: '#FFFFFF' }}>Welcome to Kure Wellness</Typography>
            <Typography variant="h3" sx={{ color: '#FFFFFF' }}>You must be 21+ years old to use this website</Typography>
            <div style={{ marginTop: '20px', marginBottom: '20px', }}>
                <Typography variant="h3" sx={{ color: '#FFFFFF' }}>Select your closest store</Typography>
            </div>
            <Link sx={{ cursor: 'pointer' }} onClick={() => changeStoreId(2)}>
                <Typography variant="h3" sx={{ color: '#52b4b1' }}>Lake Mendocino</Typography>
            </Link>
            <Typography variant="h6" sx={{ color: '#FFFFFF' }}>800 Lake Mendocino Dr Ukiah, CA 95482</Typography>
            <Link sx={{ cursor: 'pointer' }} onClick={() => changeStoreId(3)}>
                <Typography variant="h3" sx={{ color: '#52b4b1' }}>Willits</Typography>
            </Link>
            <Typography variant="h6" sx={{ color: '#FFFFFF' }}>1788 S Main St. Willits, CA 95490</Typography>
            <Link sx={{ cursor: 'pointer' }} onClick={() => changeStoreId(4)}>
                <Typography variant="h3" sx={{ color: '#52b4b1', }}>South Ukiah</Typography>
            </Link >
            <Typography variant="h6" sx={{ color: '#FFFFFF' }}>1480 S State St Ukiah, CA 95482</Typography>
        </div>
    )
}

export default PopUp