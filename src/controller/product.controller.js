import Product from "../models/product.model.js";

// GET [/api/products]
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find() // Lấy tất cả sản phẩm trong database
        console.log('Products:', products);
        return res.status(200).json({ products: products });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// POST [/api/products/create]
export const createProduct = async (req, res) => {
    const { name, description, images, brand, category, price, discount, stock, tags, ratings } = req.body;
    try {
        if (!name || !description || !images || !brand || !category || !price || !stock) {
            return res.status(400).json({ message: 'Missing required fields' });
        }
        // Thêm sản phẩm vào database
        const newProduct = new Product({
            name,
            description,
            images,
            brand,
            category,
            price,
            discount,
            stock,
            tags,
            ratings,
            createdBy: req.user.userId // req.user được gán trong middleware verifyToken
        })
        await newProduct.save();
        return res.status(201).json({ message: 'Product created successfully', data: newProduct });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// GET [/api/products/:id]
export const getProductById = async (req, res) => {
    const { id } = req.params;

    try {
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        return res.status(200).json({ product: product });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// DELETE [/api/products/:id]
export const deleteProductById = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByIdAndDelete(id)
        console.log('Deleted Product:', product);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

// PUT [/api/products/:id]
export const updateProductById = async (req, res) => {
    const { id } = req.params;
    console.log('Update Product ID:', id);
    try {
        const { name, description, images, brand, category, price, discount, stock, tags, ratings } = req.body;
        const updateProductById = await Product.findByIdAndUpdate(id, {
            name, description, images, brand, category, price, discount, stock, tags, ratings, updatedBy: req.user.userId
        },
            {
                new: true
            }
        )
        // new: true để trả về document đã được cập nhật
        if (!updateProductById) {
            return res.status(404).json({ message: 'Product not found' });
        }
        return res.status(200).json({ message: 'Product updated successfully', success: true, product: updateProductById });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}