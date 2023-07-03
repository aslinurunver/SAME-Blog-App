import { useSelector } from 'react-redux';

const Admin = () => {
  const userState = useSelector((state) => state.user); //
  if (!userState.userInfo.admin) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Bu sayfaya sadece adminlerin yetkisi vardır</h1>
      </div>
    );
  } else {
    return (
      <>
        <h1>Gösterge paneli</h1>
      </>
    );
  }
};
export default Admin;
