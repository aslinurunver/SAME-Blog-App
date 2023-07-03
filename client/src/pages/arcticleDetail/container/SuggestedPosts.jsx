import { Link } from 'react-router-dom';
import { images, stables } from '../../../constants';

const SuggestedPosts = ({ className, header, posts = [], tags }) => {
  return (
    <div className={`w-full rounded-lg p-4 shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] ${className}`}>
      <h2 className="font-medium text-dark-hard md:text-xl">{header}</h2>
      <div className="mt-5 grid gap-y-5 md:grid-cols-2 md:gap-x-5 lg:grid-cols-1">
        {posts?.posts?.map((item) => (
          <div key={item._id} className="flex flex-nowrap items-center space-x-3">
            <img
              src={item?.photo !== '' ? stables.UPLOAD_FOLDER_BASE_URL + item?.photo : images.samplePostImage}
              alt={item.title}
              className="aspect-square w-1/5 rounded-lg object-cover"
            />
            <div className="text-sm font-medium text-dark-hard">
              <h3 className="text-xs font-medium text-dark-hard md:text-base lg:text-lg">
                <Link to={`/blog/${item.slug}`}>{item.title}</Link>
              </h3>
              <span className="text-xs opacity-60">
                {new Date(item.createdAt).toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="mt-8 font-medium text-dark-hard md:text-xl">Etiketler</h2>
      {tags.length === 0 ? (
        <p className="mt-2 text-xs text-slate-500">Bu yazıya ait bir etiket bulunamadı.</p>
      ) : (
        <div className="mt-4 flex flex-wrap gap-x-2 gap-y-2">
          {tags.map((item, index) => (
            <Link
              to="/"
              key={index}
              className="inline-block rounded-md bg-primary px-3 py-1.5 text-xs text-white md:text-sm "
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
export default SuggestedPosts;
