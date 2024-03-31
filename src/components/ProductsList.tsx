import Grid from '@mui/material/Grid';
import Product from '~/components/Product';

export type PriceItem = {
    name: string;
    prices: number[];
};

export type ProductInfo = {
    id: string;
    name: string;
    price: number;
    plans?: PriceItem[];
    thumbnail: string;
    detailImages: string[];
    categoryId: number;
    roastingLevel: string;
    origin: string[];
    flavor: string[];
    largeCapacity: number;
    productComposition?: string[];
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
