import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductInfo } from '~/components/ProductsList';
import { axiosInstance } from '~/lib/axiosInstance';

const ProductDetail = () => {
    const { id } = useParams();
    const [lists, setLists] = useState<ProductInfo[]>([]);

    const getLists = async () => {
        try {
            const { data } = await axiosInstance.get(`/shop`);
            setLists(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getLists();
    }, []);

    const getListItemById = (id: string) => {
        return lists.find((item) => item.product_no.toString() === id);
    };

    const listItem = getListItemById(id as string);

    console.log(listItem);

    return (
        <Box sx={{ minHeight: '75vh', paddingTop: 12, paddingX: 2, marginTop: 10, marginBottom: 22 }}>
            <Typography
                sx={{
                    fontFamily: 'Gowun Batang',
                    fontSize: 20,
                    marginTop: 1.5,
                    marginBottom: 0.5,
                    paddingX: 2,
                }}
            >
                {listItem?.name}
            </Typography>
        </Box>
    );
};

export default ProductDetail;
