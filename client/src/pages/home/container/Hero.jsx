import Search from '../../../components/Search';

import { images } from '../../../constants';

const Hero = () => {
  return (
    <section className="container ms-auto flex flex-col px-5 py-5 lg:flex-row">
      <div className="mt-10 lg:w-1/2">
        <h1 className="text-center font-rubik text-3xl font-bold text-dark-soft md:text-5xl lg:max-w-[540px] lg:text-left lg:text-4xl xl:text-5xl">
          En ilginç makaleleri okuyun.
        </h1>
        <p className="mt-4 text-center text-dark-light md:text-xl lg:text-left lg:text-base xl:text-xl">
          Keşfetmek, öğrenmek ve ilham almak için mükemmel bir yer arıyorsanız, doğru adrestesiniz! Hoş geldiniz!
          Burada, hayatın her alanına dair bilgilendirici, eğlenceli ve ilgi çekici makaleler bulacaksınız.
        </p>
        <div className="relative mt-10 flex flex-col gap-y-2.5 lg:mt-6 xl:mt-10">
          <Search />
        </div>
        <div className="mt-4 flex flex-col lg:mt-7  lg:flex-row lg:flex-nowrap lg:gap-x-4">
          <span className="mt-2 font-semibold italic text-dark-light lg:mt-4 lg:text-sm xl:text-base">
            Popüler Etiketler:
          </span>
          <ul className="mt-3 flex flex-wrap gap-x-2.5 gap-y-2.5 lg:text-sm xl:text-base">
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">Dizayn</li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
              Kullanıcı Deneyimi
            </li>
            <li className="rounded-lg bg-primary bg-opacity-10 px-3 py-1.5 font-semibold text-primary">
              Kullanıcı Arayüzü
            </li>
          </ul>
        </div>
      </div>
      <div className="lg:1/2 hidden lg:block">
        <img className="ml-7 mt-7 w-full" src={images.HeroImage2} alt="users are reading articles" />
      </div>
    </section>
  );
};
export default Hero;
