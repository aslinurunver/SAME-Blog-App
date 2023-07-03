import { useMutation } from '@tanstack/react-query';
import { createPost } from '../../../../services/index/posts';
import toast from 'react-hot-toast';
import TextEditor from './TextEditor';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useSelector } from 'react-redux';
//import { WithContext as ReactTags } from 'react-tag-input';

const NewPost = () => {
  const [desc, setDesc] = useState('');

  const userState = useSelector((state) => state.user);

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ title, caption, body, tags, token }) => {
      return createPost({ title, caption, body, token });
    },
    onSuccess: () => {
      toast.success('Makaleniz başarıyla oluşturuldu');
    },
    onError: (error) => {
      toast.error(error.message);
      console.log(error);
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      title: '',
      caption: '',
      body: '',
      tags: ''
    },
    mode: 'onChange'
  });

  const pull_data = (data) => {
    setDesc(data);
  };

  const sumbitHandler = (data) => {
    const { title, caption } = data;
    mutate({ title, caption, body: desc, token: userState.userInfo.token });
  };

  return (
    <section className="container mx-auto px-5 py-10">
      <div className="mx-auto  w-full">
        <h1 className="mb-8 text-center text-2xl font-bold text-dark-hard">Yeni makale oluştur</h1>
        <form onSubmit={handleSubmit(sumbitHandler)}>
          <div className="mb-6 flex w-full flex-col">
            {/* Title */}
            <div className="mb-6 flex w-full flex-col">
              <label htmlFor="title" className="block font-semibold text-[#5a7184]">
                Başlık
              </label>
              <input
                type="text"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${
                  errors.title ? 'border-red-500' : 'border-[#c3cad9]'
                }`}
                id="title"
                {...register('title', {
                  minLength: {
                    value: 5,
                    message: 'Başlık en az 5 karakter olmalıdır'
                  },
                  required: {
                    value: true,
                    message: 'Başlık zorunludur'
                  }
                })}
                placeholder="Makale başlığını giriniz"
              />
              {errors.title?.message && <p className="mt-1 text-xs text-red-500">{errors.title?.message}</p>}
            </div>

            {/* Caption */}
            <div className="mb-6 flex w-full flex-col">
              <label htmlFor="caption" className="block font-semibold text-[#5a7184]">
                Açıklama
              </label>
              <input
                type="text"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${
                  errors.caption ? 'border-red-500' : 'border-[#c3cad9]'
                }`}
                id="caption"
                {...register('caption', {
                  minLength: {
                    value: 5,
                    message: 'Açıklama en az 5 karakter olmalıdır'
                  },
                  required: {
                    value: true,
                    message: 'Açıklama zorunludur'
                  }
                })}
                placeholder="Makale açıklamasını giriniz"
              />
              {errors.caption?.message && <p className="mt-1 text-xs text-red-500">{errors.caption?.message}</p>}
            </div>

            <div className="mb-6 flex w-full flex-col">
              <div className="mb-6 flex w-full flex-col  border ">
                <label htmlFor="caption" className="block font-semibold text-[#5a7184]">
                  Gövde
                </label>
                <TextEditor desc={pull_data} />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isValid || isLoading}
              className={`my-6 w-full rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white ${
                isValid ? '' : 'cursor-not-allowed opacity-50'
              } `}
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};
export default NewPost;
