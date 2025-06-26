import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ADRList from './components/ADRList';
import ADRDetail from './components/ADRDetail';
import ADRForm from './components/ADRForm';
import './App.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-background">
          <div className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Navigate to="/adrs" replace />} />
              <Route path="/adrs" element={<ADRList />} />
              <Route path="/adrs/new" element={<ADRForm />} />
              <Route path="/adrs/:id" element={<ADRDetail />} />
              <Route path="/adrs/:id/edit" element={<ADRForm />} />
            </Routes>
          </div>
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

