import { Link } from 'react-router-dom';

import { images } from '../constants';

const WrongRoute = () => {
  return (
    <div className="container mx-auto flex flex-col text-center">
      <img src={images.NotFound} alt="NotFoundImage" style={{ height: '500px', width: '100%' }} />
      <h3 className="mt-5 text-3xl">Yanlış sayfa! Bu sayfaya erişim izniniz yoktur</h3>
      <p className="mt-5 text-2xl"> Anasayfaya dönebilirsiniz</p>
      <Link
        className="mx-auto mt-5 flex items-center gap-x-2 rounded-lg border-2 border-primary px-6 py-3 font-bold text-primary transition-all duration-200 hover:border-white hover:bg-primary hover:text-white"
        to="/"
      >
        Anasayfa
      </Link>
    </div>
  );
};

export default WrongRoute;
