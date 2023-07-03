import { images } from '../constants';

const Footer = () => {
  return (
    <section className="bg-dark-hard">
      <footer className="container mx-auto grid grid-cols-10 gap-x-5 gap-y-10 px-5 py-10 md:grid-cols-12 md:pt-20 lg:grid-cols-10 lg:gap-x-10">
        {/* Proje alanı */}
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="font-bold text-dark-light md:text-lg">Proje </h3>
          <ul className="mt-5 space-y-4 text-sm text-[#959EAD] md:text-base">
            <li>
              <a href="/">Anasayfa</a>
            </li>
            <li>
              <a href="/blogs">Makaleler</a>
            </li>
            <li>
              <a href="/about-us">Hakkımızda</a>
            </li>
          </ul>
        </div>

        {/* Servisler alanı */}
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="font-bold text-dark-light md:text-lg">Servisler </h3>
          <ul className="mt-5 space-y-4 text-sm text-[#959EAD]">
            <li>
              <a href="/">Dökümantasyon</a>
            </li>
            <li>
              <a href="/">Dizayn</a>
            </li>
            <li>
              <a href="/">Temalar</a>
            </li>
            <li>
              <a href="/">İllüstrasyonlar</a>
            </li>
          </ul>
        </div>

        {/* Şirket alanı */}
        <div className="col-span-5 md:col-span-4 md:col-start-5 lg:col-span-2 lg:col-start-auto">
          <h3 className="font-bold text-dark-light md:text-lg">Şirket </h3>
          <ul className="mt-5 space-y-4 text-sm text-[#959EAD]">
            <li>
              <a href="/">Hakkımızda</a>
            </li>
            <li>
              <a href="/">Koşullar</a>
            </li>
            <li>
              <a href="/">Gizlilik Sözleşmesi</a>
            </li>
            <li>
              <a href="/">Kariyer</a>
            </li>
          </ul>
        </div>

        {/* Daha fazla alanı */}
        <div className="col-span-5 md:col-span-4 lg:col-span-2">
          <h3 className="font-bold text-dark-light md:text-lg">Daha Fazla </h3>
          <ul className="mt-5 space-y-4 text-sm text-[#959EAD]">
            <li>
              <a href="/">Dökümantasyon</a>
            </li>
            <li>
              <a href="/">Lisans</a>
            </li>
            <li>
              <a href="/">Changelog</a>
            </li>
          </ul>
        </div>

        <div className="col-span-10 md:order-first md:col-span-4 lg:col-span-2">
          <img src={images.Logo} className="mx-auto brightness-0 invert md:mx-0" alt="LOGO" />
          <p className="mt-4 text-center text-sm text-dark-light md:text-left md:text-base">
            Bu proje Aslı Ünver ve Emil Naghizade tarafından Tasarım Projesi için tasarlanmıştır
          </p>
        </div>
      </footer>
    </section>
  );
};
export default Footer;
