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
// Make sure this path is correct after moving the State folder inside src
import { deleteProduct, findProducts } from '../../State/Product/Action';

const ProductsTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // This is a cleaner way to select state and avoids potential warnings
  const { product } = useSelector(store => store);

  const searchParams = new URLSearchParams(location.search);
  const pageNumber = parseInt(searchParams.get("page")) || 1;

  const handleProductDelete = (productId) => {
    dispatch(deleteProduct(productId));
  };

  const handlePaginationChange = (event, value) => {
    searchParams.set("page", value);
    const query = searchParams.toString();
    navigate({ search: `?${query}` });
  };

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

  return (
    <div className="p-5">
      <Card className="mt-2">
        <CardHeader title="All Products" />
        <TableContainer component={Paper}>
          {product.loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '5rem' }}>
              <CircularProgress />
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
                  <TableCell>Image</TableCell>
                  <TableCell align="left">Title</TableCell>
                  <TableCell align="left">Category</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="left">Quantity</TableCell>
                  <TableCell align="left">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/*
                  THE FIX FOR THE CRASH:
                  We check if product.products.content is an array with items (.length > 0)
                  BEFORE we try to call .map() on it. This prevents the crash on the initial render.
                */}
                {product.products?.content?.length > 0 ? (
                  product.products.content.map((item) => (
                    <TableRow
                      key={item.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell>
                        <Avatar src={item.imageUrl}></Avatar>
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {item.title}
                      </TableCell>
                      <TableCell align="left">{item.category?.name}</TableCell>
                      <TableCell align="left">₹{item.price}</TableCell>
                      <TableCell align="left">{item.quantity}</TableCell>
                      <TableCell align="left">
                        <Button onClick={() => handleProductDelete(item.id)} variant="outlined" color="error">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
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
            />
          </Stack>
        </section>
      )}
    </div>
  );
};

export default ProductsTable;