import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import MyRoutes from './routes';

function App() {
    
    const isDarkMode = useSelector((state) => state.darkMode);

    return (
        <div data-theme={isDarkMode.theme ? 'dark' : ''}>
            <MyRoutes />
            <ToastContainer />
        </div>

    );
}

export default App;
