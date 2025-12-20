import React, { useState, useEffect } from 'react';
import api from '../services/api';
import {
    LayoutDashboard,
    ShoppingCart,
    Users,
    Package,
    Plus,
    Search,
    Edit2,
    Trash2,
    CheckCircle,
    XCircle,
    Truck,
    Clock
} from 'lucide-react';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState({ totalRevenue: 0, totalOrders: 0, totalProducts: 0, totalUsers: 0 });
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    // Form states for Product
    const [showProductForm, setShowProductForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [productFormData, setProductFormData] = useState({
        name: '', description: '', price: '', stockQuantity: '', category: '', imageUrl: ''
    });

    useEffect(() => {
        loadData();
    }, [activeTab]);

    const loadData = async () => {
        setLoading(true);
        try {
            if (activeTab === 'overview') {
                const res = await api.get('/admin/stats');
                setStats(res.data);
            } else if (activeTab === 'products') {
                const res = await api.get('/products');
                setProducts(res.data);
            } else if (activeTab === 'orders') {
                const res = await api.get('/orders/all');
                setOrders(res.data);
            } else if (activeTab === 'users') {
                const res = await api.get('/users');
                setUsers(res.data);
            }
        } catch (error) {
            console.error("Failed to load data", error);
        } finally {
            setLoading(false);
        }
    };

    // Product Handlers
    const handleProductSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingProduct) {
                await api.put(`/products/${editingProduct.id}`, productFormData);
            } else {
                await api.post('/products', productFormData);
            }
            setShowProductForm(false);
            setEditingProduct(null);
            setProductFormData({ name: '', description: '', price: '', stockQuantity: '', category: '', imageUrl: '' });
            loadData();
        } catch (error) {
            console.error("Error saving product", error);
            alert("Failed to save product");
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setProductFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            stockQuantity: product.stockQuantity,
            category: product.category,
            imageUrl: product.imageUrl || ''
        });
        setShowProductForm(true);
    };

    const handleDeleteProduct = async (id) => {
        if (window.confirm("Are you sure you want to delete this product?")) {
            try {
                await api.delete(`/products/${id}`);
                loadData();
            } catch (error) {
                console.error("Error deleting product", error);
            }
        }
    };

    // Order Handlers
    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            await api.put(`/orders/${orderId}/status`, null, { params: { status: newStatus } });
            loadData(); // Refresh to see update
        } catch (error) {
            console.error("Failed to update status", error);
            alert("Failed to update status");
        }
    };

    const StatusBadge = ({ status }) => {
        let colorClass = "bg-gray-100 text-gray-800";
        let icon = <Clock size={14} className="mr-1" />;

        if (status === 'COMPLETED' || status === 'DELIVERED') {
            colorClass = "bg-green-100 text-green-800";
            icon = <CheckCircle size={14} className="mr-1" />;
        } else if (status === 'SHIPPED') {
            colorClass = "bg-blue-100 text-blue-800";
            icon = <Truck size={14} className="mr-1" />;
        } else if (status === 'CANCELLED') {
            colorClass = "bg-red-100 text-red-800";
            icon = <XCircle size={14} className="mr-1" />;
        }

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>
                {icon}
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 flex font-sans">
            {/* Sidebar */}
            <div className="w-64 bg-slate-900 text-white min-h-screen flex flex-col shadow-xl">
                <div className="p-6 border-b border-slate-800">
                    <h1 className="text-2xl font-bold tracking-tight">Admin<span className="text-indigo-400">Portal</span></h1>
                </div>
                <nav className="mt-6 flex-1 px-4 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${activeTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <LayoutDashboard size={20} className="mr-3" />
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('products')}
                        className={`w-full flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${activeTab === 'products' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <Package size={20} className="mr-3" />
                        Products
                    </button>
                    <button
                        onClick={() => setActiveTab('orders')}
                        className={`w-full flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${activeTab === 'orders' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <ShoppingCart size={20} className="mr-3" />
                        Orders
                    </button>
                    <button
                        onClick={() => setActiveTab('users')}
                        className={`w-full flex items-center py-3 px-4 rounded-lg transition-all duration-200 ${activeTab === 'users' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                        <Users size={20} className="mr-3" />
                        Users
                    </button>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 overflow-auto">
                {/* Stats Overview */}
                {activeTab === 'overview' && (
                    <div className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                                <div className="p-4 bg-indigo-50 rounded-full text-indigo-600 mr-4">
                                    <ShoppingCart size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
                                    <h3 className="text-2xl font-bold text-gray-900">₹{stats.totalRevenue ? stats.totalRevenue.toLocaleString() : '0'}</h3>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                                <div className="p-4 bg-blue-50 rounded-full text-blue-600 mr-4">
                                    <Package size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Total Orders</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.totalOrders}</h3>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                                <div className="p-4 bg-green-50 rounded-full text-green-600 mr-4">
                                    <Users size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Active Users</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.totalUsers}</h3>
                                </div>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center">
                                <div className="p-4 bg-purple-50 rounded-full text-purple-600 mr-4">
                                    <LayoutDashboard size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 font-medium">Products</p>
                                    <h3 className="text-2xl font-bold text-gray-900">{stats.totalProducts}</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Products Management */}
                {activeTab === 'products' && (
                    <div className="animate-fade-in-up">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-3xl font-bold text-gray-800">Products</h2>
                            <button
                                onClick={() => {
                                    setEditingProduct(null);
                                    setProductFormData({ name: '', description: '', price: '', stockQuantity: '', category: '', imageUrl: '' });
                                    setShowProductForm(true)
                                }}
                                className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg hover:bg-indigo-700 shadow-md flex items-center font-medium transition-colors"
                            >
                                <Plus size={18} className="mr-2" />
                                Add Product
                            </button>
                        </div>

                        {showProductForm && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 animate-fade-in">
                                <div className="bg-white rounded-xl shadow-2xl p-8 max-w-2xl w-full">
                                    <h3 className="text-2xl font-bold mb-6 text-gray-800">{editingProduct ? 'Edit Product' : 'Add New Product'}</h3>
                                    <form onSubmit={handleProductSubmit} className="grid grid-cols-2 gap-6">
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
                                            <input className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" value={productFormData.name} onChange={e => setProductFormData({ ...productFormData, name: e.target.value })} required />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                            <input className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" value={productFormData.category} onChange={e => setProductFormData({ ...productFormData, category: e.target.value })} required />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                                            <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" value={productFormData.price} onChange={e => setProductFormData({ ...productFormData, price: e.target.value })} required />
                                        </div>
                                        <div className="col-span-1">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                                            <input type="number" className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" value={productFormData.stockQuantity} onChange={e => setProductFormData({ ...productFormData, stockQuantity: e.target.value })} required />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                            <input className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" value={productFormData.imageUrl} onChange={e => setProductFormData({ ...productFormData, imageUrl: e.target.value })} />
                                        </div>
                                        <div className="col-span-2">
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                            <textarea rows="4" className="w-full border border-gray-300 p-2.5 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500" value={productFormData.description} onChange={e => setProductFormData({ ...productFormData, description: e.target.value })} required />
                                        </div>
                                        <div className="col-span-2 flex justify-end space-x-3 mt-4">
                                            <button type="button" onClick={() => setShowProductForm(false)} className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">Cancel</button>
                                            <button type="submit" className="px-5 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium shadow-md shadow-indigo-500/30">{editingProduct ? 'Update Product' : 'Create Product'}</button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}

                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Product</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Stock</th>
                                        <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {products.map(product => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-10 w-10 rounded-full object-cover border border-gray-200" src={product.imageUrl || 'https://via.placeholder.com/40'} alt="" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{product.category}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{product.price}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${product.stockQuantity > 10 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                                    {product.stockQuantity} in stock
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button onClick={() => handleEditProduct(product)} className="text-indigo-600 hover:text-indigo-900 mr-4 transition-colors"><Edit2 size={18} /></button>
                                                <button onClick={() => handleDeleteProduct(product.id)} className="text-red-500 hover:text-red-700 transition-colors"><Trash2 size={18} /></button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Orders Management */}
                {activeTab === 'orders' && (
                    <div className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Manage Orders</h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Order ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Total Amount</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Update Status</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {orders.map(order => (
                                        <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900">#{order.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.user ? order.user.email : 'Unknown'}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{order.totalAmount}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <StatusBadge status={order.status} />
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                                    className="block w-full pl-3 pr-10 py-1.5 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                                >
                                                    <option value="PENDING">PENDING</option>
                                                    <option value="SHIPPED">SHIPPED</option>
                                                    <option value="DELIVERED">DELIVERED</option>
                                                    <option value="CANCELLED">CANCELLED</option>
                                                </select>
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="px-6 py-10 text-center text-gray-500">No orders found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* User Stats */}
                {activeTab === 'users' && (
                    <div className="animate-fade-in-up">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8">Registered Users</h2>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">User ID</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Full Name</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Joined Date</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {users.map(u => (
                                        <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">#{u.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{u.fullName}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{u.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${u.role === 'ROLE_ADMIN' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'}`}>
                                                    {u.role.replace('ROLE_', '')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
