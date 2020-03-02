var contentnode = document.getElementById('contents');

const ProductRow = props => React.createElement(
    "tr",
    null,
    React.createElement(
        "td",
        null,
        props.product.Name
    ),
    React.createElement(
        "td",
        null,
        "$",
        props.product.Price
    ),
    React.createElement(
        "td",
        null,
        props.product.Category
    ),
    React.createElement(
        "td",
        null,
        React.createElement(
            "a",
            { href: props.product.Image, target: "blank" },
            "View"
        )
    )
);

class ProductAdd extends React.Component {
    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var form = document.forms.ProductAdd;
        this.props.createProduct({
            Name: form.product.value,
            Price: form.price.value.slice(1),
            Category: form.category.value,
            Image: form.image.value
        });
        // clearing the form for next input
        form.price.value = "$";
        form.product.value = "";
        form.image.value = "";
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "form",
                { name: "ProductAdd", onSubmit: this.handleSubmit },
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Category "
                    ),
                    React.createElement(
                        "select",
                        { name: "category" },
                        React.createElement(
                            "option",
                            { value: "shirt" },
                            "Shirts"
                        ),
                        React.createElement(
                            "option",
                            { value: "jeans" },
                            "Jeans"
                        ),
                        React.createElement(
                            "option",
                            { value: "jacket" },
                            "Jackets"
                        ),
                        React.createElement(
                            "option",
                            { value: "sweater" },
                            "Sweaters"
                        ),
                        React.createElement(
                            "option",
                            { value: "accessories" },
                            "Accessories"
                        )
                    ),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        null,
                        "Price Per Unit "
                    ),
                    React.createElement("input", { type: "text", name: "price" }),
                    React.createElement("br", null)
                ),
                React.createElement(
                    "div",
                    null,
                    React.createElement(
                        "label",
                        null,
                        "Product"
                    ),
                    React.createElement("input", { type: "text", name: "product" }),
                    React.createElement("br", null),
                    React.createElement(
                        "label",
                        null,
                        "image "
                    ),
                    React.createElement("input", { type: "text", name: "image" }),
                    React.createElement("br", null)
                ),
                React.createElement(
                    "button",
                    null,
                    "Add Product"
                )
            )
        );
    }
}

function ProductTable(props) {
    const productRows = props.products.map(product => React.createElement(ProductRow, { key: product.id, product: product }));
    return React.createElement(
        "table",
        { className: "bordered-table" },
        React.createElement(
            "thead",
            null,
            React.createElement(
                "tr",
                null,
                React.createElement(
                    "th",
                    null,
                    "Product Name"
                ),
                React.createElement(
                    "th",
                    null,
                    "Price"
                ),
                React.createElement(
                    "th",
                    null,
                    "Category"
                ),
                React.createElement(
                    "th",
                    null,
                    "Image"
                )
            )
        ),
        React.createElement(
            "tbody",
            null,
            productRows
        )
    );
}

class ProductList extends React.Component {
    constructor() {
        super();
        this.state = { products: [] };
        this.createProduct = this.createProduct.bind(this);
    }

    componentDidMount() {
        document.forms.ProductAdd.price.value = '$';
        this.loadData();
    }

    async loadData() {
        const query = `query{
            productList{
                id Name Price Image Category
            }
        }`;

        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        const result = await response.json();
        this.setState({ products: result.data.productList });
    }

    async createProduct(newProduct) {
        const newProducts = this.state.products.slice();
        newProduct.id = this.state.products.length + 1;
        newProducts.push(newProduct);
        this.setState({ products: newProducts });
        const query = `mutation {
            productAdd(product:{
              Name: "${newProduct.Name}",
              Price: ${newProduct.Price},
              Image: "${newProduct.Image}",
              Category: ${newProduct.Category},
            }) {
              id
            }
          }`;
        const response = await fetch('/graphql', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query })
        });
        this.loadData();
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "h1",
                null,
                "My Company Inventory"
            ),
            React.createElement(
                "div",
                null,
                "Showing all available products"
            ),
            React.createElement("hr", null),
            React.createElement("br", null),
            React.createElement(ProductTable, { products: this.state.products }),
            React.createElement("br", null),
            React.createElement(
                "div",
                null,
                "Add a new product to inventory"
            ),
            React.createElement("hr", null),
            React.createElement("br", null),
            React.createElement(ProductAdd, { createProduct: this.createProduct })
        );
    }
}

ReactDOM.render(React.createElement(ProductList, null), contentnode);