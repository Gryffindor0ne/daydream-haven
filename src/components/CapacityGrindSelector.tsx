import { useState } from 'react';

import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { GRINDSIZE_SET } from '~/utils/constants';
import { formattedNumber } from '~/utils/utils';

type SelectorProps = {
    productPrice: number;
    capacity: string;
    setCapacity: React.Dispatch<React.SetStateAction<string>>;
    grindSize: string;
    setGrindSize: React.Dispatch<React.SetStateAction<string>>;
    handleOptionChange: (
        event: SelectChangeEvent<string>,
        setter: React.Dispatch<React.SetStateAction<string>>,
    ) => void;
};

const CapacityGrindSelector = ({
    productPrice,
    capacity,
    setCapacity,
    grindSize,
    setGrindSize,
    handleOptionChange,
}: SelectorProps) => {
    const CAPACITY_OPTION = [
        { value: '', label: '용량을 선택하세요.', disabled: true },
        { value: '200', label: '200g' },
        { value: '500', label: `500g (+${formattedNumber(productPrice)}원)` },
    ];

    const [isOpen, setIsOpen] = useState(false);

    const handleSelectClick = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <FormControl sx={{ marginY: 2, maxWidth: 450, width: '100%' }}>
                <Typography
                    sx={{
                        width: 120,
                        fontSize: 13,
                        marginY: 0.5,
                        paddingLeft: 1,
                    }}
                >
                    용량
                </Typography>
                <Select
                    value={capacity}
                    displayEmpty
                    onChange={(event) => handleOptionChange(event, setCapacity)}
                    sx={{ fontSize: 12 }}
                >
                    {CAPACITY_OPTION.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                            sx={{ fontSize: 12 }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ marginY: 2, maxWidth: 450, width: '100%' }}>
                <Typography
                    sx={{
                        width: 120,
                        fontSize: 13,
                        marginY: 0.5,
                        paddingLeft: 1,
                    }}
                >
                    분쇄도
                </Typography>
                {capacity ? (
                    <Select
                        value={grindSize}
                        displayEmpty
                        onChange={(event) => handleOptionChange(event, setGrindSize)}
                        sx={{ fontSize: 12 }}
                    >
                        <MenuItem value="" disabled sx={{ fontSize: 12 }}>
                            <em>분쇄도를 선택하세요</em>
                        </MenuItem>
                        {GRINDSIZE_SET.map((grindSize, idx) => (
                            <MenuItem key={idx} value={idx} sx={{ fontSize: 12 }}>
                                {grindSize}
                            </MenuItem>
                        ))}
                    </Select>
                ) : (
                    <Select
                        value={grindSize}
                        onClose={handleClose}
                        onOpen={handleSelectClick}
                        displayEmpty={!isOpen}
                        onChange={(event) => handleOptionChange(event, setGrindSize)}
                        sx={{ fontSize: 12 }}
                    >
                        <MenuItem value="" disabled sx={{ fontSize: 12 }}>
                            <em>{isOpen ? '용량을 먼저 선택해주세요.' : '분쇄도를 선택하세요.'}</em>
                        </MenuItem>
                    </Select>
                )}
            </FormControl>
        </>
    );
};

export default CapacityGrindSelector;
