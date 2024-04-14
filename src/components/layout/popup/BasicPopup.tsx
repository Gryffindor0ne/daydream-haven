import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface PopupProps {
    open: boolean;
    onClose: () => void;
    message: string;
    cartPopupClose?: (open: boolean) => void;
}

const BasicPopup: React.FC<PopupProps> = ({ open, onClose, message, cartPopupClose }: PopupProps) => {
    return (
        <Dialog
            open={open}
            onClose={() => {
                onClose();
                if (cartPopupClose) {
                    cartPopupClose(false);
                }
            }}
        >
            <DialogTitle sx={{ width: 400, fontSize: 17 }}>Daydream Haven에서 알려드립니다.</DialogTitle>
            <DialogContent>
                <Typography sx={{ fontSize: 14 }}>{message}</Typography>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        onClose();
                        if (cartPopupClose) {
                            cartPopupClose(false);
                        }
                    }}
                    autoFocus
                >
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BasicPopup;
