import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from 'react-router-dom';

interface PopupProps {
    open: boolean;
    onClose: (open: boolean) => void;
}

const CartGuidancePopup: React.FC<PopupProps> = ({ open, onClose }: PopupProps) => {
    const navigate = useNavigate();

    return (
        <Dialog open={open} onClose={() => onClose(false)}>
            <DialogTitle
                sx={{
                    width: 340,
                    height: 50,
                    fontSize: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: 2,
                }}
            >
                장바구니 담기
            </DialogTitle>
            <DialogContent>
                <Typography
                    sx={{ fontSize: 14, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    선택하신 상품이 장바구니에 담겼습니다.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Grid
                    container
                    spacing={4}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2 }}
                >
                    <Grid item>
                        <Button
                            variant="outlined"
                            onClick={() => onClose(false)}
                            sx={{
                                '&:hover': {
                                    color: '#B67352',
                                    background: '#ffffff',
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                }}
                            >
                                계속 쇼핑하기
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() => {
                                navigate(`/cart`);
                            }}
                            sx={{
                                '&:hover': {
                                    color: '#ffffff',
                                    background: '#B67352',
                                },
                            }}
                            autoFocus
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
                                }}
                            >
                                장바구니 가기
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default CartGuidancePopup;
