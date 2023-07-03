import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { getAllPosts } from '../services/index/posts';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';

const Search = () => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const debouncedSearch = debounce(async (value) => {
    try {
      const posts = await getAllPosts(value);
      setSearchResults(posts);
    } catch (error) {
      console.error(error);
    }
  }, 300); // 300 milisaniye gecikme süresi

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value.trim() !== '') {
      debouncedSearch(value);
    } else {
      setSearchResults([]);
    }
  };



  return (
    <form >
      <div className="relative ">
        <FiSearch className="absolute left-3 top-1/2 h-6 w-6 -translate-y-1/2 text-[#959EAD]" />
        <input
          className="w-full rounded-lg py-3 pl-12 pr-3 font-semibold text-dark-soft shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] placeholder:font-bold placeholder:text-[#959EAD] focus:outline-none md:py-4"
          type="text"
          placeholder="Makale araştırın"
          value={searchValue}
          onChange={handleSearchChange}
        />
      </div>
      { searchValue.trim() !== '' && (
        <div className="w-full rounded-lg py-3 px-3 font-semibold text-white bg-dark-soft    max-h-72 overflow-y-auto">
          {searchResults?.posts?.map((post) => (
            <div className="px-4 py-2 border-b">
              <Link to={`/blog/${post.slug}`} key={post.id} >
                {post.title}
              </Link>
            </div>
          ))}

        </div>
      )}
    </form>
  );
};
export default Search;
