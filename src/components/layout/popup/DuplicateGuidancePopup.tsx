import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';

import { useAppDispatch } from '~/app/reduxHooks';

import { addToCart } from '~/features/cart/cartSlice';
import { duplicatePopupProps } from '~/types/popup';

const DuplicateGuidancePopup: React.FC<duplicatePopupProps> = ({
    open,
    onClose,
    products,
    showCartGuidancePopup,
}: duplicatePopupProps) => {
    const dispatch = useAppDispatch();

    return (
        <Dialog open={open}>
            <DialogTitle
                sx={{
                    width: { xs: 320, sm: 400 },
                    height: 65,
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
                        fontSize: { xs: 15, sm: 17 },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        mb: 0.5,
                    }}
                >
                    장바구니에 동일한 상품이 존재합니다.
                </Typography>
                <Typography
                    sx={{
                        fontSize: { xs: 15, sm: 17 },
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    장바구니에 해당 상품을 추가하겠습니까?
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
                            onClick={onClose}
                            sx={{
                                width: 120,
                                '&:hover': {
                                    color: '#B67352',
                                    background: '#ffffff',
                                },
                            }}
                            autoFocus
                        >
                            <Typography
                                sx={{
                                    fontSize: { xs: 15, sm: 18 },
                                }}
                            >
                                취소
                            </Typography>
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            variant="contained"
                            onClick={() => {
                                dispatch(addToCart(products));
                                showCartGuidancePopup(true);
                                onClose();
                            }}
                            sx={{
                                width: 120,
                                '&:hover': {
                                    color: '#ffffff',
                                    background: '#B67352',
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: { xs: 15, sm: 18 },
                                }}
                            >
                                확인
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
            </DialogActions>
        </Dialog>
    );
};

export default DuplicateGuidancePopup;
