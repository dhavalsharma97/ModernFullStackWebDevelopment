var contentnode = document.getElementById('contents');
const ProductRow = (props) => (
    <tr>
        <td>{props.product.product}</td>
        <td>${props.product.price}</td>
        <td>{props.product.category}</td>
        <td><a href={props.product.image} target="blank">View</a></td>
    </tr>
)


class ProductAdd extends React.Component 
{
    constructor() 
    {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) 
    {
        e.preventDefault();
        var form = document.forms.ProductAdd;
        this.props.createProduct({
            product: form.product.value,
            price: form.price.value.slice(1),
            category: form.category.value,
            image: form.image.value,
        });
        // clearing the form for next inout
        form.price.value = "$";
        form.product.value = "";
        form.image.value = "";
    }

    render() 
    {
        return (
            <div>
                <form name="ProductAdd" onSubmit={this.handleSubmit}>
                    <div>
                        <label >Category </label>
                        <select name="category">
                            <option value="Shirts">Shirts</option>
                            <option value="Jeans">Jeans</option>
                            <option value="Jackets">Jackets</option>
                            <option value="Sweaters">Sweaters</option>
                            <option value="Accessories">Accessories</option>
                        </select><br />
                        <label>Price Per Unit </label>
                        <input type="text" name="price" /><br />
                    </div>
                    <div>
                        <label>Product Name</label>
                        <input type="text" name="product" /><br />
                        <label>Image URL</label>
                        <input type="text" name="image" /><br />
                    </div>
                    <button>Add Product</button>
                </form>
            </div>
        );
    }
}


function ProductTable(props) 
{
    const productRows = props.products.map(product => <ProductRow key={product.id} product={product} />);
    return (
        <table className="bordered-table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Image</th>
                </tr>
            </thead>
            <tbody>
                {productRows}
            </tbody>
        </table>
    );
}


class ProductList extends React.Component 
{
    constructor() 
    {
        super();
        this.state = { products: [] };
        this.createProduct = this.createProduct.bind(this);
    }

    componentDidMount() 
    {
        document.forms.ProductAdd.price.value = '$';
    }

    createProduct(newProduct) 
    {
        const newProducts = this.state.products.slice();
        newProduct.id = this.state.products.length + 1;
        newProducts.push(newProduct);
        this.setState({ products: newProducts });
    }

    render() 
    {
        return (
            <div>
                <h1>My Company Inventory</h1>
                <div>Showing all available products</div>
                <hr /><br />
                <ProductTable products={this.state.products} />
                <br />
                <div>Add a new product to inventory</div>
                <hr /><br />
                <ProductAdd createProduct={this.createProduct} />
            </div>
        );
    }
}


ReactDOM.render(<ProductList />, contentnode);