import Grid from '@mui/material/Grid';
import Product from '~/components/Product';

export type ProductInfo = {
    id: number;
    name: string;
    price: number;
    delivery_fee: number;
    product_image: string;
    product_detail_image: string[];
    category_no: number;
    roasting_level: string;
    origin: string[];
    flavor: string[];
    large_capacity: number;
};

const ProductsList = ({ lists }: { lists: ProductInfo[] }) => {
    return (
        <Grid container spacing={2}>
            {lists?.map((list: ProductInfo, idx) => (
                <Grid item xs={12} sm={12} md={4} lg={4} key={idx}>
                    <Product key={idx} {...list} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductsList;
