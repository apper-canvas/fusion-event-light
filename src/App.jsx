import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 overflow-hidden">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="!bg-purple-800/90 !text-white !backdrop-blur-lg"
        progressClassName="!bg-primary"
      />
    </div>
  )
}

export default App