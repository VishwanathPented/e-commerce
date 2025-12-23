import React from 'react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ error, errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                    <div className="max-w-md w-full bg-white dark:bg-gray-800 shadow-xl rounded-lg p-6 border border-red-200 dark:border-red-900">
                        <h1 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">Something went wrong.</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                            We're sorry, but the application has encountered an unexpected error.
                        </p>
                        <details className="whitespace-pre-wrap text-xs text-gray-500 bg-gray-100 dark:bg-gray-900 p-4 rounded mb-4 overflow-auto max-h-48">
                            {this.state.error && this.state.error.toString()}
                            <br />
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </details>
                        <button
                            onClick={() => window.location.href = '/'}
                            className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition"
                        >
                            Go to Home
                        </button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
