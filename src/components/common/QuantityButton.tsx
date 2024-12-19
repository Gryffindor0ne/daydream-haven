import { AddCircleOutlined, RemoveCircleOutlined } from '@mui/icons-material';
import { Box, IconButton, Typography } from '@mui/material';

import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { QuantityButtonProps } from '~/types/product';

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
