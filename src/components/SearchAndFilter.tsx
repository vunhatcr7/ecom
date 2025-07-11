import React, { useState } from 'react';
import {
    Box,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Button,
    Paper,
    Typography,
    Chip,
} from '@mui/material';
import {
    Search,
    Clear,
} from '@mui/icons-material';
import { FilterOptions } from '../types';
import { categories, levels, priceRanges } from '../data/mockData';
import { debounce } from '../utils/helpers';

interface SearchAndFilterProps {
    filters: FilterOptions;
    onFiltersChange: (filters: FilterOptions) => void;
    onSearch: (query: string) => void;
    onClearFilters: () => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
    filters,
    onFiltersChange,
    onSearch,
    onClearFilters,
}) => {
    const [searchQuery, setSearchQuery] = useState(filters.searchQuery);

    // Debounced search function
    const debouncedSearch = debounce((query: string) => {
        onSearch(query);
    }, 500);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setSearchQuery(query);
        debouncedSearch(query);
    };

    const handleFilterChange = (field: keyof FilterOptions, value: string) => {
        onFiltersChange({
            ...filters,
            [field]: value,
        });
    };

    const hasActiveFilters = () => {
        return (
            filters.category !== 'All' ||
            filters.level !== 'All' ||
            filters.priceRange !== 'All' ||
            filters.searchQuery !== ''
        );
    };

    return (
        <Paper
            elevation={2}
            sx={{
                p: 3,
                mb: 3,
                borderRadius: 2,
            }}
        >
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
                Tìm kiếm & Lọc
            </Typography>

            <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' },
                gap: 2,
            }}>
                {/* Search Input */}
                <Box>
                    <TextField
                        fullWidth
                        placeholder="Tìm kiếm khóa học..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 2,
                            },
                        }}
                    />
                </Box>

                {/* Category Filter */}
                <Box>
                    <FormControl fullWidth>
                        <InputLabel>Danh mục</InputLabel>
                        <Select
                            value={filters.category}
                            label="Danh mục"
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            sx={{ borderRadius: 2 }}
                        >
                            {categories.map((category) => (
                                <MenuItem key={category} value={category}>
                                    {category}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Level Filter */}
                <Box>
                    <FormControl fullWidth>
                        <InputLabel>Trình độ</InputLabel>
                        <Select
                            value={filters.level}
                            label="Trình độ"
                            onChange={(e) => handleFilterChange('level', e.target.value)}
                            sx={{ borderRadius: 2 }}
                        >
                            {levels.map((level) => (
                                <MenuItem key={level} value={level}>
                                    {level}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>

                {/* Price Range Filter */}
                <Box>
                    <FormControl fullWidth>
                        <InputLabel>Khoảng giá</InputLabel>
                        <Select
                            value={filters.priceRange}
                            label="Khoảng giá"
                            onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                            sx={{ borderRadius: 2 }}
                        >
                            {priceRanges.map((range) => (
                                <MenuItem key={range} value={range}>
                                    {range}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {/* Active Filters Display */}
            {hasActiveFilters() && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                    <Typography variant="body2" color="text.secondary">
                        Bộ lọc đang hoạt động:
                    </Typography>
                    {filters.category !== 'All' && (
                        <Chip
                            label={`Danh mục: ${filters.category}`}
                            size="small"
                            onDelete={() => handleFilterChange('category', 'All')}
                        />
                    )}
                    {filters.level !== 'All' && (
                        <Chip
                            label={`Trình độ: ${filters.level}`}
                            size="small"
                            onDelete={() => handleFilterChange('level', 'All')}
                        />
                    )}
                    {filters.priceRange !== 'All' && (
                        <Chip
                            label={`Giá: ${filters.priceRange}`}
                            size="small"
                            onDelete={() => handleFilterChange('priceRange', 'All')}
                        />
                    )}
                    {filters.searchQuery && (
                        <Chip
                            label={`Tìm kiếm: ${filters.searchQuery}`}
                            size="small"
                            onDelete={() => {
                                setSearchQuery('');
                                onSearch('');
                            }}
                        />
                    )}
                    <Button
                        startIcon={<Clear />}
                        onClick={onClearFilters}
                        size="small"
                        sx={{ ml: 'auto' }}
                    >
                        Xóa tất cả
                    </Button>
                </Box>
            )}
        </Paper>
    );
};

export default SearchAndFilter; 