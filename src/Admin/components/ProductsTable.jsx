import React, { useEffect } from 'react';
import {
  Avatar,
  Button,
  Card,
  CardHeader,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Pagination,
  Stack
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
// These actions are correctly imported to be used in the component
import { deleteProduct, findProducts } from '../../State/Product/Action';

const ProductsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { product } = useSelector(store => store);

  const searchParams = new URLSearchParams(location.search);
  const pageNumber = parseInt(searchParams.get("page")) || 1;

  // STEP 2: This function is called when the delete button is clicked.
  // It dispatches the 'deleteProduct' action with the product's ID.
  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

  // STEP 3: This useEffect hook listens for changes. When 'product.deletedProduct'
  // is updated in the Redux store (after a successful deletion), this hook
  // re-runs and calls 'findProducts' to refresh the table data.
  useEffect(() => {
    const data = {
      category: "",
      colors: [],
      sizes: [],
      minPrice: 0,
      maxPrice: 1000000,
      minDiscount: 0,
      sort: "price_low",
      pageNumber: pageNumber - 1,
      pageSize: 10,
      stock: "",
    };
    dispatch(findProducts(data));
  }, [pageNumber, product.deletedProduct, dispatch]);

  const tableCellStyles = {
    color: 'white',
    borderColor: 'rgba(255, 255, 255, 0.12)'
  };

  return (
    <div className="p-5" style={{ backgroundColor: 'black', color: 'white' }}>
      <Card className="mt-2" sx={{ bgcolor: '#212121', color: 'white' }}>
        <CardHeader title="All Products" sx={{ '& .MuiCardHeader-title': { color: 'white' } }} />
        
        <TableContainer component={Paper} sx={{ bgcolor: 'inherit' }}>
          {product.loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
              <CircularProgress sx={{ color: 'white' }} />
            </div>
          ) : product.error ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <Typography color="error">
                Failed to load products. Error: {product.error}
              </Typography>
            </div>
          ) : (
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={tableCellStyles}>Image</TableCell>
                  <TableCell align="left" sx={tableCellStyles}>Title</TableCell>
                  <TableCell align="left" sx={tableCellStyles}>Product ID</TableCell>
                  <TableCell align="left" sx={tableCellStyles}>Category</TableCell>
                  <TableCell align="left" sx={tableCellStyles}>Price</TableCell>
                  <TableCell align="left" sx={tableCellStyles}>Quantity</TableCell>
                  <TableCell align="left" sx={tableCellStyles}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {product.products?.content?.length > 0 ? (
                  product.products.content.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ 
                        "&:last-child td, &:last-child th": { border: 0 },
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          cursor: 'pointer',
                        },
                      }}
                    >
                      <TableCell sx={tableCellStyles}>
                        <Avatar src={item.imageUrl}></Avatar>
                      </TableCell>
                      <TableCell component="th" scope="row" sx={tableCellStyles}>
                        {item.title}
                      </TableCell>
                      <TableCell align="left" sx={tableCellStyles}>{item.id}</TableCell>
                      <TableCell align="left" sx={tableCellStyles}>{item.category?.name}</TableCell>
                      <TableCell align="left" sx={tableCellStyles}>₹{item.price}</TableCell>
                      <TableCell align="left" sx={tableCellStyles}>{item.quantity}</TableCell>
                      <TableCell align="left" sx={tableCellStyles}>
                        {/* STEP 1: The onClick event starts the deletion process */}
                        <Button onClick={() => handleProductDelete(item.id)} variant="contained" color="error">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center" sx={tableCellStyles}>
                      No products found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Card>

      {product.products?.totalPages > 1 && (
        <section className="w-full px-4 py-5 flex justify-center">
          <Stack spacing={2}>
            <Pagination
              count={product.products?.totalPages}
              color="primary"
              onChange={handlePaginationChange}
              page={pageNumber}
              sx={{
                '& .MuiPaginationItem-root': {
                  color: 'white',
                },
                '& .Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                },
              }}
            />
          </Stack>
        </section>
      )}
    </div>
  );
};

export default ProductsTable;