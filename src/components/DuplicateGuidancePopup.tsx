import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useAppDispatch } from '~/app/reduxHooks';
import { OrderProductSummaryInfo } from '~/components/ProductSelectBox';
import { addToCart } from '~/features/cart/cartSlice';

interface PopupProps {
    open: boolean;
    products: OrderProductSummaryInfo[];
    onClose: () => void;
    showCartGuidancePopup: (open: boolean) => void;
}

const DuplicateGuidancePopup: React.FC<PopupProps> = ({
    open,
    onClose,
    products,
    showCartGuidancePopup,
}: PopupProps) => {
    const dispatch = useAppDispatch();

    return (
        <Dialog open={open}>
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
                    sx={{
                        fontSize: 13,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    장바구니에 동일한 상품이 존재합니다.
                </Typography>
                <Typography sx={{ fontSize: 13, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    장바구니에 해당 상품을 추가하겠습니까?
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
                            onClick={onClose}
                            sx={{
                                '&:hover': {
                                    color: '#B67352',
                                    background: '#ffffff',
                                },
                            }}
                            autoFocus
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
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
                                '&:hover': {
                                    color: '#ffffff',
                                    background: '#B67352',
                                },
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 14,
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
