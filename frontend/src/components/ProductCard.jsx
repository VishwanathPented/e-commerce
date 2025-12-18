import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow duration-300">
            <Link to={`/products/${product.id}`}>
                <img
                    className="h-48 w-full object-cover"
                    src={product.imageUrl || 'https://via.placeholder.com/300'}
                    alt={product.name}
                />
            </Link>
            <div className="p-4">
                <Link to={`/products/${product.id}`}>
                    <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
                </Link>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
                    <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
