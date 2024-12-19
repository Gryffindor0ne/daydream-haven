import { SelectChangeEvent } from '@mui/material';

interface Plan {
    name: string;
    prices: number[];
}

export interface ProductInfo {
    id: string;
    name: string;
    price: number;
    plans?: Plan[];
    thumbnail: string;
    detailImages: string[];
    categoryId: number;
    roastingLevel: string;
    origin: string[];
    flavor: string[];
    productComposition?: string[];
    bulkOrderAvailable: boolean;
    isVisible: boolean;
}

export interface QuantityButtonProps {
    quantity: number;
    onIncrease: () => void;
    onDecrease: () => void;
}

export interface SelectorProps {
    productPrice: number;
    capacity: string;
    setCapacity: React.Dispatch<React.SetStateAction<string>>;
    grindSize: string;
    setGrindSize: React.Dispatch<React.SetStateAction<string>>;
    period: string;
    setPeriod: React.Dispatch<React.SetStateAction<string>>;
    handleOptionChange: (
        event: SelectChangeEvent<string>,
        setter: React.Dispatch<React.SetStateAction<string>>,
    ) => void;
}
