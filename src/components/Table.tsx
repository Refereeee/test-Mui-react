import * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowParams } from '@mui/x-data-grid';
import ModalPrimer from './ModalPrimer';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { changeSelectedRow, selectTable } from '../redux/slice/tableSlice';

export default function DataGridDemo() {
  const dispatch = useAppDispatch()
  const {selectedRow} = useAppSelector(selectTable)

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: 'ID',
      width: 90,
      type: 'string',
      headerClassName: 'custom-header'
    },
    {
      field: 'name',
      headerName: 'name',
      width: 150,
      headerClassName: 'custom-header2'
    },
    {
      field: 'image',
      headerName: 'image',
      width: 300,
      renderCell: (params: GridRenderCellParams) => (
        <ModalPrimer src={params.row.image} />
      ),
      headerClassName: 'custom-header3'
    },
    {
      field: 'date',
      headerName: 'date',
      width: 150,
      headerClassName: 'custom-header4'
    }
  ];
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='
  const [cocktails, setCocktails] = useState([])
  const fetchDrinks = useCallback(async () => {
    try {
      const response = await fetch(`${url}`)
      const data = await response.json()
      console.log(data);
      const {drinks} = data
      if (drinks) {
        const newCocktails = drinks.map((item:any) => {
          const {
            idDrink,
            strDrink,
            strDrinkThumb,
            dateModified,
          } = item

          return {
            id: idDrink,
            name: strDrink,
            image: strDrinkThumb,
            date: dateModified,
          }
        })
        setCocktails(newCocktails)
      } else {
        setCocktails([])
      }
    } catch (error) {
      console.log(error)
    }
  }, [])
  useEffect(() => {
    fetchDrinks()
  }, [ fetchDrinks])

  function generateRandom() {
    var length = 8,
      charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
      retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  }

  const handleRowClick = (params: GridRowParams) => {
    dispatch(changeSelectedRow(params.row.image));
  };


  return (
    <Box sx={{height: 400, width: '100%'}}>
      <DataGrid
        rows={cocktails}
        columns={columns}
        getRowId={(row: any) =>  generateRandom()}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        autoHeight
        pageSizeOptions={[5]}
        checkboxSelection
        rowHeight={200}
        onRowClick={handleRowClick}
      />
      <ModalPrimer src={selectedRow} />
    </Box>
  );
}
