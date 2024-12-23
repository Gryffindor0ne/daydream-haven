import { useState } from 'react';

import { FormControl, MenuItem, Select, Typography } from '@mui/material';

import useCurrentPathAndId from '~/hooks/useCurrentPathAndId';

import { GRINDSIZE_SET, PERIOD_OPTIONS } from '~/utils/constants';
import { formatNumber } from '~/utils/number';
import { SelectorProps } from '~/types/product';
import useResponsiveLayout from '~/hooks/useResponsiveLayout';

const CapacityGrindSelector = ({
    productPrice,
    capacity,
    setCapacity,
    grindSize,
    setGrindSize,
    period,
    setPeriod,
    handleOptionChange,
}: SelectorProps) => {
    const { currentPath } = useCurrentPathAndId();
    const { isMobile } = useResponsiveLayout();
    const responsiveFontSize = isMobile ? 14 : 16;
    const responsiveSeletorFontSize = isMobile ? 12 : 14;

    const CAPACITY_OPTIONS = [
        { value: '', label: '용량을 선택하세요.', disabled: true },
        { value: '200', label: '200g' },
        { value: '500', label: currentPath === 'shop' ? `500g(+${formatNumber(productPrice)}원)` : `500g` },
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
            <FormControl sx={{ my: 2, maxWidth: 450, width: '100%' }}>
                <Typography
                    sx={{
                        width: 120,
                        fontSize: responsiveFontSize,
                        my: 0.5,
                        pl: 1,
                    }}
                >
                    용량
                </Typography>
                <Select
                    value={capacity}
                    displayEmpty
                    onChange={(event) => handleOptionChange(event, setCapacity)}
                    sx={{ fontSize: responsiveSeletorFontSize }}
                >
                    {CAPACITY_OPTIONS.map((option) => (
                        <MenuItem
                            key={option.value}
                            value={option.value}
                            disabled={option.disabled}
                            sx={{ fontSize: responsiveSeletorFontSize }}
                        >
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl sx={{ my: 2, maxWidth: 450, width: '100%' }}>
                <Typography
                    sx={{
                        width: 120,
                        fontSize: responsiveFontSize,
                        my: 0.5,
                        pl: 1,
                    }}
                >
                    분쇄도
                </Typography>
                {capacity ? (
                    <Select
                        value={grindSize}
                        displayEmpty
                        onChange={(event) => handleOptionChange(event, setGrindSize)}
                        sx={{ fontSize: responsiveSeletorFontSize }}
                    >
                        <MenuItem value="" disabled sx={{ fontSize: responsiveSeletorFontSize }}>
                            <em>분쇄도를 선택하세요</em>
                        </MenuItem>
                        {GRINDSIZE_SET.map((grindSize, idx) => (
                            <MenuItem key={idx} value={String(idx)} sx={{ fontSize: responsiveSeletorFontSize }}>
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
                        sx={{ fontSize: responsiveSeletorFontSize }}
                    >
                        <MenuItem value="" disabled sx={{ fontSize: responsiveSeletorFontSize }}>
                            <em>{isOpen ? '용량을 먼저 선택해주세요.' : '분쇄도를 선택하세요.'}</em>
                        </MenuItem>
                    </Select>
                )}
            </FormControl>

            {currentPath === 'subscription' && (
                <FormControl sx={{ my: 2, maxWidth: 450, width: '100%' }}>
                    <Typography
                        sx={{
                            width: 120,
                            fontSize: responsiveFontSize,
                            my: 0.5,
                            pl: 1,
                        }}
                    >
                        기간
                    </Typography>
                    {grindSize ? (
                        <Select
                            value={period}
                            displayEmpty
                            onChange={(event) => handleOptionChange(event, setPeriod)}
                            sx={{ fontSize: responsiveFontSize }}
                        >
                            <MenuItem value="" disabled sx={{ fontSize: responsiveSeletorFontSize }}>
                                <em>기간을 선택하세요</em>
                            </MenuItem>
                            {PERIOD_OPTIONS.map((period, idx) => (
                                <MenuItem key={idx} value={String(idx)} sx={{ fontSize: responsiveSeletorFontSize }}>
                                    {period}
                                </MenuItem>
                            ))}
                        </Select>
                    ) : (
                        <Select
                            value={period}
                            onClose={handleClose}
                            onOpen={handleSelectClick}
                            displayEmpty={!isOpen}
                            onChange={(event) => handleOptionChange(event, setPeriod)}
                            sx={{ fontSize: responsiveSeletorFontSize }}
                        >
                            <MenuItem value="" disabled sx={{ fontSize: responsiveSeletorFontSize }}>
                                <em>{isOpen ? '분쇄도를 먼저 선택해주세요.' : '기간을 선택하세요.'}</em>
                            </MenuItem>
                        </Select>
                    )}
                </FormControl>
            )}
        </>
    );
};

export default CapacityGrindSelector;
