import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import BasicPopup from '~/components/layout/popup/BasicPopup';
import useScrollToTop from '~/hooks/useScrollToTop';

const Wholesale = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

    useScrollToTop();

    const handleAlertClose = () => {
        setShowAlert(false);
        navigate('/');
    };

    useEffect(() => {
        setShowAlert(true);
        setAlertMessage('시업자 회원 전용 메뉴입니다.');
    }, []);

    return (
        <Container maxWidth="lg">
            {showAlert && <BasicPopup open={showAlert} onClose={handleAlertClose} message={alertMessage} />}
            <Box sx={{ minHeight: '75vh', pt: 12, mt: 10 }}></Box>
        </Container>
    );
};

export default Wholesale;
