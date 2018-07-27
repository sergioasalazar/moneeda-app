import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar';

const Price = props => {
  return (
    <div>
      { props.product ? (
        <Card>
          <CardHeader title={props.product.product}
            avatar={
              <Avatar aria-label={props.product.exchange} className="orangeAvatar">
                {props.product.exchange}
              </Avatar>
            }
          />
          <CardContent>
            <Typography gutterBottom variant="subheading" component="h3">
              Price: {props.product.prices.price}
            </Typography>
            <Typography component="p">
              <span className="High-price">High: {props.product.prices.high}</span>
            </Typography>
            <Typography component="p" className="Low-price">
            <span className="Low-price">Low: {props.product.prices.low}</span>
            </Typography>
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
};

export default Price;