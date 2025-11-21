import { Navigate, Route, Routes } from 'react-router-dom';
import ShareView from './views/ShareView';

function App() {
  return (
    <Routes>
      <Route path="/share/:token" element={<ShareView />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;

