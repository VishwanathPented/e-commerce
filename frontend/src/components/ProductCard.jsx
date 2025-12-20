import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { user } = useAuth();
    const { fetchCartCount } = useCart();
    const navigate = useNavigate();
    const [adding, setAdding] = useState(false);

    // Fallback image logic
    const handleImageError = (e) => {
        e.target.src = 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'; // Generic placeholder
    };

    const handleAddToCart = async () => {
        if (!user) {
            navigate('/login');
            return;
        }

        setAdding(true);
        try {
            await api.post('/cart/add', null, {
                params: {
                    productId: product.id,
                    quantity: 1
                }
            });
            await fetchCartCount();
            toast.success('Added to cart successfully!');
        } catch (error) {
            console.error("Failed to add to cart", error);
            toast.error('Failed to add to cart: ' + (error.response?.data?.message || error.message));
        } finally {
            setAdding(false);
        }
    };

    return (
        <div className="group bg-white dark:bg-gray-800 overflow-hidden shadow-sm rounded-xl hover:shadow-xl hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-700">
            <Link to={`/products/${product.id}`} className="block h-48 overflow-hidden relative">
                <img
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    src={product.imageUrl || 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'}
                    alt={product.name}
                    onError={handleImageError}
                />
            </Link>
            <div className="p-4 flex flex-col flex-1">
                <Link to={`/products/${product.id}`} className="block">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white truncate hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{product.name}</h3>
                </Link>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 flex-1">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                    <div className="flex space-x-2">
                        {/* Wishlist Button */}
                        <button
                            onClick={async () => {
                                if (!user) {
                                    navigate('/login');
                                    return;
                                }
                                try {
                                    await api.post(`/wishlist/add/${product.id}`);
                                    toast.success('Added to wishlist!');
                                } catch (error) {
                                    console.error("Failed to add to wishlist", error);
                                    toast.error('Failed to add to wishlist');
                                }
                            }}
                            className="text-gray-400 hover:text-red-500 transition-colors p-2"
                            title="Add to Wishlist"
                        >
                            <Heart size={20} />
                        </button>
                        <button
                            onClick={handleAddToCart}
                            disabled={adding}
                            className={`text-sm font-medium px-4 py-2 rounded-md transition-colors ${adding
                                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                                : 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/50'
                                }`}
                        >
                            {adding ? 'Adding...' : 'Add to Cart'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
