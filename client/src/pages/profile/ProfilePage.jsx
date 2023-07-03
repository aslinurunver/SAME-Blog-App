import { useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { userActions } from '../../store/reducers/userReducer';
import toast from 'react-hot-toast';
import { getUserProfile, updateProfile } from '../../services/index/users';
import ProfilePicture from '../../components/ProfilePicture';

const ProfilePage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const { data: profileData, isLoading: profileIsLoading } = useQuery({
    queryFn: () => {
      return getUserProfile({ token: userState.userInfo.token });
    },
    queryKey: ['profile']
  });

  const { mutate, isLoading: updateProfileIsLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return updateProfile({
        token: userState.userInfo.token,
        userData: { name, email, password }
      });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account', JSON.stringify(data));
      queryClient.invalidateQueries(['profile']);
      toast.success('Profil başarıyla güncellendi');
    }
  });

  useEffect(() => {
    if (!userState.userInfo) {
      navigate('/');
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: ''
    },
    values: {
      name: profileIsLoading ? '' : profileData.name,
      email: profileIsLoading ? '' : profileData.email
    },
    mode: 'onChange'
  });

  const sumbitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  return (
    <MainLayout>
      <section className="container relative mx-auto px-5 py-10">
        <div className="mx-auto w-full max-w-sm">
          <ProfilePicture avatar={profileData?.avatar} />
          <form onSubmit={handleSubmit(sumbitHandler)}>
            {/* Name */}
            <div className="mb-6 flex w-full flex-col">
              <label htmlFor="name" className="block font-semibold text-[#5a7184]">
                İsim
              </label>
              <input
                type="text"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${
                  errors.name ? 'border-red-500' : 'border-[#c3cad9]'
                }`}
                id="name"
                {...register('name', {
                  minLength: {
                    value: 1,
                    message: 'İsim en az 1 karakter olmalıdır'
                  },
                  required: {
                    value: true,
                    message: 'İsim zorunludur'
                  }
                })}
                placeholder="İsim giriniz"
              />
              {errors.name?.message && <p className="mt-1 text-xs text-red-500">{errors.name?.message}</p>}
            </div>
            {/* Email */}
            <div className="mb-6 flex w-full flex-col">
              <label htmlFor="email" className="block font-semibold text-[#5a7184]">
                Email
              </label>
              <input
                type="text"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${
                  errors.email ? 'border-red-500' : 'border-[#c3cad9]'
                }`}
                id="email"
                {...register('email', {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Yanlış email'
                  },
                  required: {
                    value: true,
                    message: 'Email zorunludur'
                  }
                })}
                placeholder="Email giriniz"
              />
              {errors.email?.message && <p className="mt-1 text-xs text-red-500">{errors.email?.message}</p>}
            </div>
            {/* Password */}
            <div className="mb-6 flex w-full flex-col">
              <label htmlFor="password" className="block font-semibold text-[#5a7184]">
                Yeni parola (opsiyonel)
              </label>
              <input
                type="password"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${
                  errors.password ? 'border-red-500' : 'border-[#c3cad9]'
                }`}
                id="password"
                {...register('password', {
                  minLength: {
                    value: 6,
                    message: 'Parola en az 6 karakter olmalıdır'
                  }
                })}
                placeholder="Yeni parolanızı giriniz"
              />
              {errors.password?.message && <p className="mt-1 text-xs text-red-500">{errors.password?.message}</p>}
            </div>

            <button
              type="submit"
              disabled={!isValid || profileIsLoading || updateProfileIsLoading}
              className={`my-6 w-full rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white ${
                isValid ? '' : 'cursor-not-allowed opacity-50'
              } `}
            >
              Güncelle
            </button>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};
export default ProfilePage;
