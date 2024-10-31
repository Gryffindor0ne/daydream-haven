import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useAppDispatch } from '~/app/reduxHooks';
import useScrollToTop from '~/hooks/useScrollToTop';
import { UserInfoProps } from '~/components/order/OrdererInfo';
import useFetchUserInfo from '~/hooks/useFetchUserInfo';
import OrderList from '~/components/order/OrderList';

const MyPage = () => {
    const theme = useTheme();
    const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('lg'));

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useScrollToTop();

    const [userInfo, setUserInfo] = useState<UserInfoProps>();

    useFetchUserInfo({ setUserInfo });

    //dummy data
    const orders = [
        {
            id: '1',
            date: '2024-10-01',
            items: [
                {
                    id: '101',
                    name: 'Product A',
                    quantity: 2,
                    price: 12000,
                    capacity: '200',
                    thumbnail: `https://images.unsplash.com/photo-1523247452367-d68f888d4b80?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
                    grindSize: '3',
                },
                {
                    id: '102',
                    name: 'Product B',
                    quantity: 1,
                    price: 34000,
                    capacity: '200',
                    grindSize: '4',
                    thumbnail: `https://images.unsplash.com/photo-1523247452367-d68f888d4b80?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
                },
            ],
        },
        {
            id: '2',
            date: '2024-10-02',
            items: [
                {
                    id: '201',
                    name: 'Product C',
                    quantity: 1,
                    price: 20000,
                    capacity: '500',
                    grindSize: '1',
                    thumbnail: `https://images.unsplash.com/photo-1523247452367-d68f888d4b80?q=80&w=2487&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
                },
            ],
        },
    ];

    return (
        <Container maxWidth="lg" sx={{ minHeight: 1400 }}>
            <Box sx={{ mt: isTabletOrMobile ? 15 : 25, px: isTabletOrMobile ? 2 : 0, mb: 15 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography
                        sx={{
                            fontSize: 25,
                        }}
                    >
                        마이 페이지
                    </Typography>
                    <Button
                        onClick={() => {
                            dispatch({ type: 'auth/logoutUser' });
                            navigate(`/`);
                        }}
                        sx={{
                            color: '#503C3C',
                            fontFamily: 'Merriweather',
                            fontWeight: 400,
                            fontSize: 14,
                            background: '#F4EDCC',
                        }}
                    >
                        로그아웃
                    </Button>
                </Box>

                <Box sx={{ mt: 5 }}>
                    <Typography sx={{ fontSize: 20, fontFamily: 'Gowun Batang', display: 'flex' }}>
                        안녕하세요,
                        <Box component="span" sx={{ fontSize: 20, fontFamily: 'Gowun Batang', fontWeight: 600, px: 1 }}>
                            {userInfo?.name}
                        </Box>
                        님
                    </Typography>
                </Box>
            </Box>

            <Typography
                sx={{
                    fontSize: 20,
                    px: isTabletOrMobile ? 2 : 0,
                }}
            >
                주문 목록
            </Typography>

            <OrderList orders={orders} />
        </Container>
    );
};

export default MyPage;
