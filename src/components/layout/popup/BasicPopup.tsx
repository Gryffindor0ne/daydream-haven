import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from '@mui/material';

import { PopupProps } from '~/types/popup';

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
            <DialogTitle sx={{ width: { xs: 320, sm: 500 }, height: { xs: 60, sm: 70 }, fontSize: { xs: 16, sm: 20 } }}>
                Daydream Haven에서 알려드립니다.
            </DialogTitle>
            <DialogContent>
                <Typography sx={{ fontSize: { xs: 14, sm: 18 } }}>{message}</Typography>
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
