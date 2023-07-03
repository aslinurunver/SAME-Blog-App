import MainLayout from '../../components/MainLayout';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../../services/index/posts';
import ArticleCardSkeleton from '../../components/ArticleCardSkeleton';
import ErrorMessage from '../../components/ErrorMessage';
import ArticleCard from '../../components/ArticleCard';
import { useState } from 'react';

const Blogs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError } = useQuery(['posts', currentPage], () =>
    getAllPosts('', currentPage)
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <MainLayout>
      <div className="container mx-auto flex flex-col px-5 py-10">
        <div className="flex flex-row items-center justify-between">
          <h1 className="mb-4 text-center text-3xl font-bold">Makaleler</h1>
          <span className="text-lg text-dark-light">{data?.totalPages} sayfa</span>
        </div>
        <div className="flex flex-wrap gap-y-5 pb-10 md:gap-x-5">
          {isLoading ? (
            [...Array(3)].map((item, index) => (
              <ArticleCardSkeleton key={index} className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]" />
            ))
          ) : isError ? (
            <ErrorMessage message="Makaleler alınamadı" />
          ) : (
            data?.posts.map((post) => (
              <ArticleCard
                key={post._id}
                post={post}
                className="w-full md:w-[calc(50%-20px)] lg:w-[calc(33.33%-21px)]"
              />
            ))
          )}
        </div>
        <div className="flex justify-center">
          {data && (
            <div className="flex">
              {Array.from({ length: data.totalPages }, (_, index) => (
                <button
                  key={index}
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-2 py-1 mx-1 rounded-md focus:outline-none ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'
                    }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Blogs;