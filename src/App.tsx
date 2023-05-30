import Search from './components/Search';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Search />
    </QueryClientProvider>
  );
}

export default App;
