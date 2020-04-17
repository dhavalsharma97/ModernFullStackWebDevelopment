var contentnode = document.getElementById('contents');

const ProductRow = props => React.createElement("tr", null, React.createElement("td", null, props.product.product), React.createElement("td", null, "$", props.product.price), React.createElement("td", null, props.product.category), React.createElement("td", null, React.createElement("a", {
  href: props.product.image,
  target: "blank"
}, "View")));

class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    var form = document.forms.ProductAdd;
    this.props.createProduct({
      product: form.product.value,
      price: form.price.value.slice(1),
      category: form.category.value,
      image: form.image.value
    }); // clearing the form for next inout

    form.price.value = "$";
    form.product.value = "";
    form.image.value = "";
  }

  render() {
    return React.createElement("div", null, React.createElement("form", {
      name: "ProductAdd",
      onSubmit: this.handleSubmit
    }, React.createElement("div", null, React.createElement("label", null, "Category "), React.createElement("select", {
      name: "category"
    }, React.createElement("option", {
      value: "Shirts"
    }, "Shirts"), React.createElement("option", {
      value: "Jeans"
    }, "Jeans"), React.createElement("option", {
      value: "Jackets"
    }, "Jackets"), React.createElement("option", {
      value: "Sweaters"
    }, "Sweaters"), React.createElement("option", {
      value: "Accessories"
    }, "Accessories")), React.createElement("br", null), React.createElement("label", null, "Price Per Unit "), React.createElement("input", {
      type: "text",
      name: "price"
    }), React.createElement("br", null)), React.createElement("div", null, React.createElement("label", null, "Product Name"), React.createElement("input", {
      type: "text",
      name: "product"
    }), React.createElement("br", null), React.createElement("label", null, "Image URL"), React.createElement("input", {
      type: "text",
      name: "image"
    }), React.createElement("br", null)), React.createElement("button", null, "Add Product")));
  }

}

function ProductTable(props) {
  const productRows = props.products.map(product => React.createElement(ProductRow, {
    key: product.id,
    product: product
  }));
  return React.createElement("table", {
    className: "bordered-table"
  }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null, "Product Name"), React.createElement("th", null, "Price"), React.createElement("th", null, "Category"), React.createElement("th", null, "Image"))), React.createElement("tbody", null, productRows));
}

class ProductList extends React.Component {
  constructor() {
    super();
    this.state = {
      products: []
    };
    this.createProduct = this.createProduct.bind(this);
  }

  componentDidMount() {
    document.forms.ProductAdd.price.value = '$';
  }

  createProduct(newProduct) {
    const newProducts = this.state.products.slice();
    newProduct.id = this.state.products.length + 1;
    newProducts.push(newProduct);
    this.setState({
      products: newProducts
    });
  }

  render() {
    return React.createElement("div", null, React.createElement("h1", null, "My Company Inventory"), React.createElement("div", null, "Showing all available products"), React.createElement("hr", null), React.createElement("br", null), React.createElement(ProductTable, {
      products: this.state.products
    }), React.createElement("br", null), React.createElement("div", null, "Add a new product to inventory"), React.createElement("hr", null), React.createElement("br", null), React.createElement(ProductAdd, {
      createProduct: this.createProduct
    }));
  }

}

ReactDOM.render(React.createElement(ProductList, null), contentnode);