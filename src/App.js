import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Image } from 'react-bootstrap';
import ProductList from './components/productList/ProductList';
import SearchBar from './components/search/SearchBar';
import logo from './assets/img/logo.png';

const queryClient = new QueryClient();

function App() {
  const [search, setSearch] = useState('');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="app-container">
        <div className="header">
          <div className="logo-container">
            <div className="logo-icon-container">
              <Image src={logo} alt="logo" />
            </div>
            <div className="logo-text">ShopOnline</div>
          </div>

          <div className="search-container">
            <SearchBar search={search} setSearch={setSearch} />
          </div>
        </div>
        <main>
          <ProductList search={search} />
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
