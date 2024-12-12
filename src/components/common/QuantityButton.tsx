import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { AddCircleOutlined, RemoveCircleOutlined } from '@mui/icons-material';

type QuantityButtonProps = {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
};

const QuantityButton = ({ quantity, onIncrease, onDecrease }: QuantityButtonProps) => {
    return (
        <Box display="flex" alignItems="center" sx={{ px: 2 }}>
            <IconButton onClick={onDecrease} aria-label="Decrease quantity">
                <RemoveCircleOutlined />
            </IconButton>
            <Typography sx={{ mx: 2 }}>{quantity}</Typography>
            <IconButton onClick={onIncrease} aria-label="Increase quantity">
                <AddCircleOutlined />
            </IconButton>
        </Box>
    );
};

export default QuantityButton;
