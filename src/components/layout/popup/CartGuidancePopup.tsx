import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';

import { useNavigate } from 'react-router-dom';

import { cartPopupProps } from '~/types/popup';

const CartGuidancePopup: React.FC<cartPopupProps> = ({ open, onClose }: cartPopupProps) => {
    const navigate = useNavigate();

    return (
        <Dialog open={open} onClose={() => onClose(false)}>
            <DialogTitle
                sx={{
                    width: { xs: 320, sm: 400 },
                    height: 50,
                    fontSize: { xs: 20, sm: 24 },
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                }}
            >
                장바구니 담기
            </DialogTitle>
            <DialogContent>
                <Typography
                    sx={{
                        fontSize: { xs: 16, sm: 18 },
                        height: 50,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    선택하신 상품이 장바구니에 담겼습니다.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Grid
                    container
                    spacing={4}
                    sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}
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
                                    fontSize: { xs: 15, sm: 18 },
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
                                    fontSize: { xs: 15, sm: 18 },
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
