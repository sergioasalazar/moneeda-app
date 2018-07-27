import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import Select from 'react-select';
import Price from '../components/Price';

class PricesList extends Component {
  state = {
    products: [],
    selectedOption: null,
    isLoading: true,
    prices: null,
    price: null,
    loading: false,
  };

  constructor() {
    super();
    this.getProducts();
  }

  getProducts = () => {
    fetch('/products')
      .then(res => res.json())
      .then(products => {
        let options = Array.from(products.map(product => {
          return {value: product.id, label: product.id}
        }));
        this.setState({ products: options, isLoading: false});
      })
      .catch(error => {
        console.log(`Error occured while fetching data: ${error}`);
      });
  }

  onHandleChange = selectedOption => {
    this.setState({ selectedOption, loading: true });
    fetch(`/products/${selectedOption.value}/prices`)
      .then(res => res.json())
      .then(prices => this.setState({ prices, loading: false }));
  };

  render() {
    return (
      <div>
        <div className="search-product">
          <Select value={this.state.selectedOption}
            onChange={this.onHandleChange}
            options={this.state.products}
            placeholder="Select a product..."
            isLoading={this.state.isLoading}
            />
        </div>
        <div>
          {this.state.loading ? (
            <div>
              <CircularProgress color="primary" className="loader" />
            </div>
          ) : (
            this.state.prices ?
              (
                <Grid container justify="center" spacing={24} style={{padding: 24}}>
                  {this.state.prices.map((currentProduct, idx) => {
                    return (
                      <Grid key={currentProduct.exchange} item xs={12} sm={6} lg={4} xl={3} style={{padding: 16, minWidth: 210}}>
                        <Price product={currentProduct} />
                      </Grid>
                    );
                  })}
                </Grid>
              ) : null
          )}
        </div>
      </div>
    );
  }
}

export default PricesList;