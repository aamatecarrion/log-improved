import * as React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { useContext } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { LocalStorageContext } from '../../contexts/LocalStorageContext';
import useGetUnique from '../../hooks/useGetUnique';

const columns = [
    {
        field: 'id',
        headerName: 'Name',
        width: 170,
        editable: false,
    },
    {
        field: 'count',
        headerName: 'Count',
        width: 150,
        type: 'number',
        editable: false,
    },
];


export default function Names() {
    const navigate = useNavigate();
    const uniqueRegs = useGetUnique([])
    const { data } = useContext(LocalStorageContext)

    const count = (uniqueReg) => {
        return data.regs.filter((reg) => reg.text === uniqueReg).length
    }

    const rows = uniqueRegs.map((reg) => {
        return ({ id: reg, count: count(reg) })
    })

    const handleRowClick = (params) => {
        navigate(`/name/${params.row.id}`)
    }

    return (
        <Box sx={{ width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 100,
                        },
                    },
                }}
                pageSizeOptions={[100]}
                onRowClick={handleRowClick}
                disableRowSelectionOnClick
            />
        </Box>
    );
}

