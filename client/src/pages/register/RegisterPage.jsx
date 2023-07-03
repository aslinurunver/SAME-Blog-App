import toast from 'react-hot-toast';
import { useEffect } from 'react';
import MainLayout from '../../components/MainLayout';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { signup } from '../../services/index/users';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../store/reducers/userReducer';

const RegisterPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ name, email, password }) => {
      return signup({ name, email, password });
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account', JSON.stringify(data));
    }
  });

  useEffect(() => {
    if (userState.userInfo) {
      if (userState.userInfo.token) {
        navigate('/');
      }
    }
  }, [navigate, userState.userInfo]);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  });

  const sumbitHandler = (data) => {
    const { name, email, password } = data;
    mutate({ name, email, password });
  };

  const password = watch('password');
  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="mb-8 text-center text-2xl font-bold text-dark-hard">Kayıt ol</h1>
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
                placeholder="İsminizi giriniz"
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
                    message: 'Geçersiz email address'
                  },
                  required: {
                    value: true,
                    message: 'Email zoruludur'
                  }
                })}
                placeholder="Email giriniz"
              />
              {errors.email?.message && <p className="mt-1 text-xs text-red-500">{errors.email?.message}</p>}
            </div>
            {/* Password */}
            <div className="mb-6 flex w-full flex-col">
              <label htmlFor="password" className="block font-semibold text-[#5a7184]">
                Şifre
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
                    message: 'Şifre en az 6 karakter olmalıdr'
                  },
                  required: {
                    value: true,
                    message: 'Şifre zorunludur'
                  }
                })}
                placeholder="Şifre giriniz"
              />
              {errors.password?.message && <p className="mt-1 text-xs text-red-500">{errors.password?.message}</p>}
            </div>
            {/* Confirm Password */}
            <div className="mb-3 flex w-full flex-col">
              <label htmlFor="confirmPassword" className="block font-semibold text-[#5a7184]">
                Şifreyi Onaylayın
              </label>
              <input
                type="password"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${
                  errors.confirmPassword ? 'border-red-500' : 'border-[#c3cad9]'
                }`}
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: {
                    value: true,
                    message: 'Şifre onaylama gereklidir'
                  },
                  validate: (value) => {
                    if (value !== password) {
                      return 'Şifreler uyuşmuyor';
                    }
                  }
                })}
                placeholder="Şifreyi onaylayın"
              />
              {errors.confirmPassword?.message && (
                <p className="mt-1 text-xs text-red-500">{errors.confirmPassword?.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`my-6 w-full rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white ${
                isValid ? '' : 'cursor-not-allowed opacity-50'
              } `}
            >
              Kayıt Ol
            </button>
            <p className="text-sm font-semibold text-[#5a7184]">
              Hesabınız var mı?{' '}
              <Link to="/login" className="text-primary">
                Giriş yap
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};
export default RegisterPage;
