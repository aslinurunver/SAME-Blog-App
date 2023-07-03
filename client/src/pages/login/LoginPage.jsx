import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';

import MainLayout from '../../components/MainLayout';
import { login } from '../../services/index/users';
import { userActions } from '../../store/reducers/userReducer';

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ email, password }) => {
      return login({ email, password });
    },
    onSuccess: (data) => {
      dispatch(userActions.setUserInfo(data));
      localStorage.setItem('account', JSON.stringify(data));
    },
    onError: (error) => {
      
      toast.error(error.message.toString()); 
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
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  });

  const submitHandler = (data) => {
    const { email, password } = data;
    mutate({ email, password });
  };

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="font-roboto mb-8 text-center text-2xl font-bold text-dark-hard">Giriş Yap</h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-6 flex w-full flex-col">
              <label htmlFor="email" className="block font-semibold text-[#5a7184]">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Geçerli bir email girin'
                  },
                  required: {
                    value: true,
                    message: 'Email zorunludur'
                  }
                })}
                placeholder="Email girin"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.email ? 'border-red-500' : 'border-[#c3cad9]'
                  }`}
              />
              {errors.email?.message && <p className="mt-1 text-xs text-red-500">{errors.email?.message}</p>}
            </div>
            <div className="mb-6 flex w-full flex-col">
              <label htmlFor="password" className="block font-semibold text-[#5a7184]">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Şifre zorunludur'
                  },
                  minLength: {
                    value: 6,
                    message: 'Şifre en az 6 karakter olmalıdır'
                  }
                })}
                placeholder="Şifre girin"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.password ? 'border-red-500' : 'border-[#c3cad9]'
                  }`}
              />
              {errors.password?.message && <p className="mt-1 text-xs text-red-500">{errors.password?.message}</p>}
            </div>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="my-6 w-full rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              Giriş Yap
            </button>
            <p className="text-sm font-semibold text-[#5a7184] " style={{ marginBottom: "49px" }}>
              Hesabınız yok mu?{' '}
              <Link to="/register" className="text-primary">
                Kayıt ol
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  );
};

export default LoginPage;
