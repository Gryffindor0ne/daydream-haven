/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from '@mui/material/Button';
import { AddressProps } from '~/pages/OrderPayment';

declare global {
    interface Window {
        daum: any;
    }
}

type DaumPostcodeData = {
    address: string;
    zonecode: string;
    roadAddress: string;
    jibunAddress: string;
    autoRoadAddress: string;
    autoJibunAddress: string;
    bname: string;
    buildingName: string;
    apartment: string;
};

const AddressSearchForm = ({ onAddressSelect }: { onAddressSelect: (address: AddressProps) => void }) => {
    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: (data: DaumPostcodeData) => {
                // console.log(data);
                onAddressSelect({ postcode: data.zonecode, address: data.address });
            },
        }).open();
    };

    return (
        <div>
            <Button
                variant="contained"
                onClick={handleAddressSearch}
                sx={{
                    '&:hover': {
                        color: '#ffffff',
                        background: '#B67352',
                    },
                }}
            >
                주소 검색
            </Button>
        </div>
    );
};

export default AddressSearchForm;
