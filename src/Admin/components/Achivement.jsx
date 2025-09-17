import { Button, Card, CardContent, styled, Typography } from '@mui/material';
import React from 'react';
import Trophy from '../../assests/trophy.png';

const TriangleImage = styled("img")({
    right: 0,
    bottom: 0,
    height: 170,
    position: "absolute"
});

const TrophyImage = styled("img")({
    right: 20,
    bottom: 10,
    height: 170,
    width: 150,
    position: "absolute",
    backgroundColor: '#5A5A5A',
    borderRadius: '8px',
});

const Achievement = () => {
  return (
    <Card sx={{ 
        position: "relative",
        backgroundColor: '#242424',
        color: 'white',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: 8,
            cursor: 'pointer',
        }
    }}>
      <CardContent>
        <Typography variant='h6' sx={{ letterSpacing: ".25px", fontWeight: 600, fontSize: "1.3rem" }}>
          Shop with Parth 😎
        </Typography>
        <Typography variant='body2'>Congratulations 🥳</Typography>
        <Typography variant='h5' sx={{ my: 3.1 }} >1000.0k 💵</Typography>

        <Button size='small' variant='contained'>View Sales</Button>
        
        {/*
          This is the line that caused the error.
          I have removed it to fix the issue.
          <TriangleImage src="" /> 
        */}

        <TrophyImage src={Trophy} />
      </CardContent>
    </Card>
  );
}

export default Achievement;