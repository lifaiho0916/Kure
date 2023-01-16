import { Box } from "../../../node_modules/@mui/material/index";
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import CachedIcon from '@mui/icons-material/Cached';
import { keyframes } from '@mui/system';

function Loading() {
    const spin = keyframes`
        from {
            transform: rotate(360deg);
        }
        to {
            transform: rotate(0deg);
        }
    `;
    return (
        <Box>
            <Box>
                <Box sx={{padding: '20px 30px',background: '#555656',display: 'block',width:'fit-content',margin:'0 auto'}}>
                <CachedIcon sx={{display:'inline-block',height: '40px',width: '40px',animation: `${spin} 2s linear infinite`}} />
                </Box>
            </Box>
        </Box>
    );
}

export default Loading;