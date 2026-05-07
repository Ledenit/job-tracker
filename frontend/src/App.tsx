import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Toaster } from 'react-hot-toast';
import { Dashboard } from './pages/Dashboard';
import { KanbanBoard } from './pages/KanbanBoard';

function App() {
  return (
    <Router>
      <Layout>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/board" element={<KanbanBoard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;