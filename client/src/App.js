import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import './App.css';
import HomePage from './pages/home/HomePage';
import ArticleDetailPage from './pages/arcticleDetail/ArticleDetailPage';
import RegisterPage from './pages/register/RegisterPage';
import LoginPage from './pages/login/LoginPage';
import ProfilePage from './pages/profile/ProfilePage';
import AdminLayout from './pages/admin/AdminLayout';
import Admin from './pages/admin/screens/Admin';
import Comments from './pages/admin/screens/comments/Comments';
import NewPost from './pages/admin/screens/posts/NewPost';
import ManagePosts from './pages/admin/screens/posts/ManagePosts';
import Blogs from './pages/blogs/Blogs';
import AboutUs from './pages/other/AboutUs';
import ProtectedRoute from './components/ProtectedRoute';
import WrongRoute from './components/WrongRoute';
import ManageUsers from './pages/admin/screens/users/ManageUsers';
function App() {
  return (
    <div className="App font-rubik">
      <Routes>
        <Route index path="/" element={<HomePage />}></Route>
        <Route path="/blog/:slug" element={<ArticleDetailPage />}></Route>
        <Route path="/blogs" element={<Blogs />}></Route>
        <Route path="/about-us" element={<AboutUs />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/profile" element={<ProfilePage />}></Route>
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Admin />} />
          <Route path="comments" element={<Comments />} />
          <Route path="posts/new" element={<NewPost />} />
          <Route path="posts/manage" element={<ManagePosts />} />
          <Route path="users" element={<ManageUsers />} />
        </Route>
        <Route path="*" element={<WrongRoute />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
