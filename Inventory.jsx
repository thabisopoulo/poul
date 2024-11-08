import React, { useState } from 'react';

const Inventory = ({ products, setProducts }) => {
    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [editMode, setEditMode] = useState({ active: false, productId: null });

    const addProduct = () => {
        if (!productName || !description || !category || price < 0 || quantity < 0) return;
        const newProduct = { id: Date.now(), name: productName, description, category, price, quantity };
        setProducts([...products, newProduct]);
        clearFields();
    };

    const updateProduct = () => {
        if (!productName || !description || !category || price < 0 || quantity < 0) return;
        setProducts(products.map(product => 
            product.id === editMode.productId ? { ...product, name: productName, description, category, price, quantity } : product
        ));
        clearFields();
    };

    const deleteProduct = (id) => {
        setProducts(products.filter(product => product.id !== id));
    };

    const editProduct = (product) => {
        setProductName(product.name);
        setDescription(product.description);
        setCategory(product.category);
        setPrice(product.price);
        setQuantity(product.quantity);
        setEditMode({ active: true, productId: product.id });
    };

    const clearFields = () => {
        setProductName('');
        setDescription('');
        setCategory('');
        setPrice(0);
        setQuantity(0);
        setEditMode({ active: false, productId: null });
    };

    return (
        <div>
            <h1>Product Management</h1>
            <div>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <button onClick={editMode.active ? updateProduct : addProduct}>
                    {editMode.active ? 'Update Product' : 'Add Product'}
                </button>
                {editMode.active && <button onClick={clearFields}>Cancel</button>}
            </div>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>Category: {product.category}</p>
                        <p>Price: M{product.price.toFixed(2)}</p>
                        <p>Quantity: {product.quantity}</p>
                        <button onClick={() => editProduct(product)}>Edit</button>
                        <button onClick={() => deleteProduct(product.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Inventory;
