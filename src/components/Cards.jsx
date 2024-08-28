import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Cards({ item }) {
  return (
    <Card className="col-span-3" sx={{ maxWidth: 345 }}>
      <img
        src={item.images[0]}
        alt={item.title}
        onError={(e) => e.target.src = 'https://placehold.co/600x400?text=Not+Found'}
        style={{ height: 300, width: '100%', objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {item.title}
        </Typography>
        <Typography className="line-clamp-3" variant="body2" sx={{ color: 'text.secondary' }}>
          {item.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}