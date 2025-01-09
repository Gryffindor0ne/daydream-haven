/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Button } from '@mui/material';

import useResponsiveLayout from '~/hooks/useResponsiveLayout';
import { AddressProps } from '~/types/order';

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
                onAddressSelect({ postcode: data.zonecode, address: data.address });
            },
        }).open();
    };

    const { isMobile } = useResponsiveLayout();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Button
                variant="contained"
                onClick={handleAddressSearch}
                sx={{
                    '&:hover': {
                        color: '#ffffff',
                        background: '#B67352',
                    },
                    fontSize: isMobile ? 13 : 15,
                }}
            >
                주소 검색
            </Button>
        </Box>
    );
};

export default AddressSearchForm;
