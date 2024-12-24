import Grid from '@mui/material/Grid';

import Product from '~/components/product/Product';
import { ProductInfo } from '~/types/product';

const ProductsList = ({ lists }: { lists: ProductInfo[] }) => {
    return (
        <Grid container spacing={2}>
            {lists?.map((list: ProductInfo, idx) => (
                <Grid item xs={6} sm={6} md={4} lg={4} key={idx}>
                    <Product key={idx} {...list} />
                </Grid>
            ))}
        </Grid>
    );
};

export default ProductsList;
