import { Avatar, Box, Grid } from '@mui/material'
import { Rating } from '@mui/material'
import React from 'react'

const ProductReviewCard = () => {
  return (
    <div>
        <Grid container spacing={2}gap={3}>
            <Grid item xs={1}>
                <Box>
                    <Avatar className='text-white' sx={{width:56,height:56,bgcolor:'red'}}>R</Avatar>
                </Box>

            </Grid>
            <Grid item xs={9}>
                <div className='space-y-2'>
                    <div>
                        <p className='font-semibold text-lg'> Ram Divekar </p>
                        <p className='opacity-70'> April 11, 2025</p>
                    </div>

                </div>

                <Rating value={4.5} name="half-rating" readOnly  precision={0.5}></Rating>
                <p> The product is very Satifying and used a good fabrric.
                </p>

            </Grid>
            
        </Grid>
    </div>
  )
}

export default ProductReviewCard