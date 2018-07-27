import React from 'react';
import Typography from '@material-ui/core/Typography';

const WelcomeMessage = () => {
  return (
    <div className="Welcome-message">
      <Typography variant="title" component="p" gutterBottom>
        Welcome to Moneeda Application. Select a product to see prices in BNB, BTS and BFX
      </Typography>
    </div>
  );
};

export default WelcomeMessage;