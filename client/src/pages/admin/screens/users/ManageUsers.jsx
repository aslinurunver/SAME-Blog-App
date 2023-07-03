import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { deleteUser, getAllUsers, verifyUser } from '../../../../services/index/users';
import { toast } from 'react-hot-toast';

const ManageUsers = () => {
  const userState = useSelector((state) => state.user); //
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryFn: () => getAllUsers(),
    queryKey: ['users']
  });

  const { mutate: mutateVerifyUser } = useMutation({
    mutationFn: ({ token, userId }) => {
      return verifyUser({ token, userId });
    },
    onSuccess: () => {
      toast.success('Kullanıcı başarıyla doğrulandı.');
      queryClient.invalidateQueries(['users']);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    }
  });

  const { mutate: mutateDeleteUser } = useMutation({
    mutationFn: ({ token, userId }) => {
      return deleteUser({ token, userId });
    },
    onSuccess: () => {
      toast.success('Kullanıcı başarıyla silindi.');
      queryClient.invalidateQueries(['users']);
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    }
  });

  const verifyUserHandler = (userId) => {
    mutateVerifyUser({ token: userState.userInfo.token, userId });
  };

  const deleteUserHandler = (userId) => {
    mutateDeleteUser({ token: userState.userInfo.token, userId });
  };

  if (!userState.userInfo.admin) {
    return (
      <div className="flex h-screen flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">Bu sayfaya sadece adminlerin yetkisi vardır</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-4xl font-bold">Kullanıcıları Yönet</h1>
        </div>
        <div className="flex flex-col items-center justify-center ">
          <table className="table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Kullanıcı Adı</th>
                <th className="px-4 py-2">E-mail</th>
                <th className="px-4 py-2">Admin</th>
                <th className="px-4 py-2">Doğrulandı mı?</th>
                <th className="px-4 py-2">Doğrula</th>
                <th className="px-4 py-2">Sil</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((user) => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.name}</td>
                  <td className="border px-4 py-2">{user.email}</td>

                  <td className="border px-4 py-2">
                    {user.admin ? (
                      <span className="text-green-500">Admin</span>
                    ) : (
                      <span className="text-red-500">Kullanıcı</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {user.verified ? (
                      <span className="text-green-500">Doğrulandı</span>
                    ) : (
                      <span className="text-red-500">Doğrulanmadı</span>
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700"
                      disabled={user.verified === true}
                      onClick={() => verifyUserHandler(user._id)}
                    >
                      Doğrula
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
                      onClick={() => deleteUserHandler(user._id)}
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
};
export default ManageUsers;
