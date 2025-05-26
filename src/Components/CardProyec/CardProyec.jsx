import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import { Link } from 'react-router-dom';
import './CardProyec.css';

const CardProyect =({proyecto})=> {
  console.log(proyecto);
  return (
    <Card sx={{
        width: 400,
        height: 200,
        margin: 2,
        borderRadius: 3,
        boxShadow: 5,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        transition: 'transform 0.3s ease-in-out',
        '&:hover': {
          transform: 'scale(1.03)',
        },
      }} >
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" sx={{
            color: '#000000', fontSize: 20, fontWeight: 'bold', textAlign: 'center'
            }}>
            {proyecto.titulo}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button variant="contained" 
          color="primary" 
          component={Link} 
          to={`/estudiante/compartir/${proyecto.id}`} className='card-boton'> 
          <Link to={`/estudiante/compartir/${proyecto.id}`} className='card-link'> Informate
          </Link>
        </Button>
      </CardActions>
    </Card>
  );
}

export default CardProyect
