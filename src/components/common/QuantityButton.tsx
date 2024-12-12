import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AddCircleOutlined, RemoveCircleOutlined } from '@mui/icons-material';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';

type QuantityButtonProps = {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
};

const QuantityButton = ({ quantity, onIncrease, onDecrease }: QuantityButtonProps) => {
    const { isMobile } = useResponsiveLayout();
    const mobileProp = isMobile ? '10px' : '50px';

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2 }}>
            <IconButton
                onClick={onDecrease}
                aria-label="Decrease quantity"
                sx={{ width: mobileProp, height: mobileProp, color: '#AB886D' }}
            >
                <RemoveCircleOutlined />
            </IconButton>
            <Typography sx={{ mx: 3 }}>{quantity}</Typography>
            <IconButton
                onClick={onIncrease}
                aria-label="Increase quantity"
                sx={{ width: mobileProp, height: mobileProp, color: '#AB886D' }}
            >
                <AddCircleOutlined />
            </IconButton>
        </Box>
    );
};

export default QuantityButton;
