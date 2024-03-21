import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import BasicAlert from '~/components/BasicAlert';
import { useNavigate } from 'react-router-dom';

const Wholesale = () => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMessage] = useState('');

    const navigate = useNavigate();

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
            {showAlert && <BasicAlert open={showAlert} onClose={handleAlertClose} message={alertMessage} />}
            <Box sx={{ minHeight: '75vh', paddingTop: 12, marginTop: 10 }}></Box>
        </Container>
    );
};

export default Wholesale;
