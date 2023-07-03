import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import BreadCrumbs from '../../components/BreadCrumb';
import CommentsContainer from '../../components/comments/CommentsContainer';
import MainLayout from '../../components/MainLayout';
import { images, stables } from '../../constants';
import SuggestedPosts from './container/SuggestedPosts';
import { useQuery } from '@tanstack/react-query';
import { getAllPosts, getSinglePost } from '../../services/index/posts';
import ArticleDetailSkeleton from './components/ArticleDetailSkeleton';
import ErrorMessage from '../../components/ErrorMessage';
import { useSelector } from 'react-redux';

const ArticleDetailPage = () => {
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);
  const [breadCrumbsData, setbreadCrumbsData] = useState([]);
  const [body, setBody] = useState(null);

  const { data, isLoading, isError } = useQuery({
    queryFn: () => getSinglePost({ slug }),
    queryKey: ['blog', slug],
    onSuccess: (data) => {
      setbreadCrumbsData([
        { name: 'Anasayfa', link: '/' },
        { name: 'Makaleler', link: '/blogs' },
        { name: `${data.title}`, link: `/blog/${data.slug}` }
      ]);
      setBody(parse(JSON.stringify(data?.body?.content)));
    }
  });

  const { data: postsData } = useQuery({
    queryFn: () => getAllPosts(),
    queryKey: ['posts']
  });

  return (
    <MainLayout>
      {isLoading ? (
        <ArticleDetailSkeleton />
      ) : isError ? (
        <ErrorMessage message="Couldn't fetch the post detail" />
      ) : (
        <section className="container mx-auto flex max-w-5xl flex-col px-5 py-5 lg:flex-row lg:items-start lg:gap-x-5">
          <article className="flex-1">
            <BreadCrumbs data={breadCrumbsData} />
            <img
              className="w-full rounded-xl"
              src={data?.photo ? stables.UPLOAD_FOLDER_BASE_URL + data?.photo : images.samplePostImage}
              alt={data?.title}
            />
            <div className="mt-4 flex gap-2">
              {data?.categories?.map((category) => (
                <Link
                  to={`/blog?category=${category.name}`}
                  className="font-roboto inline-block text-sm text-primary md:text-base"
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <h1 className="font-roboto mt-4 text-xl font-medium text-dark-hard md:text-[26px]">{data?.title}</h1>
            <div className="prose-sm prose mt-4 sm:prose-base">{body}</div>
            <CommentsContainer
              comments={data?.comments}
              className="mt-10"
              logginedUserId={userState?.userInfo?._id}
              postSlug={slug}
            />
          </article>
          <div>
            <SuggestedPosts
              header="En son yazılar"
              posts={postsData}
              tags={data?.tags}
              className="mt-8 lg:mt-0 lg:max-w-xs"
            />
          </div>
        </section>
      )}
    </MainLayout>
  );
};

export default ArticleDetailPage;
