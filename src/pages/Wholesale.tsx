import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

import BasicPopup from '~/components/layout/popup/BasicPopup';

const Wholesale = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 스크롤을 맨 위로 이동
        window.scrollTo(0, 0);
    }, []);

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
            <Box sx={{ minHeight: '75vh', paddingTop: 12, marginTop: 10 }}></Box>
        </Container>
    );
};

export default Wholesale;
