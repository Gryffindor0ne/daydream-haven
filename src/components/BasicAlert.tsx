import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface AlertProps {
    open: boolean;
    onClose: () => void;
}

const BasicAlert: React.FC<AlertProps> = ({ open, onClose }: AlertProps) => {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle sx={{ width: 400, fontSize: 17 }}>Daydream Haven에서 알려드립니다.</DialogTitle>
            <DialogContent>
                <Typography sx={{ fontSize: 14 }}>동일한 선택이 존재합니다.</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} autoFocus>
                    확인
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default BasicAlert;
