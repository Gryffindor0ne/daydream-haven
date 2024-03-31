import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

import ProductsList from '~/components/ProductsList';
import { axiosInstance } from '~/lib/axiosInstance';

const Subscription = () => {
    const [lists, setLists] = useState([]);

    const getLists = async () => {
        try {
            const { data } = await axiosInstance.get(`/subscriptions`);
            setLists(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getLists();
    }, []);

    console.log(lists);

    return (
        <Box sx={{ minHeight: '75vh', paddingTop: 12, paddingX: 2, marginTop: 10, marginBottom: 22 }}>
            {lists.length !== 0 && <ProductsList lists={lists} />}
        </Box>
    );
};

export default Subscription;
