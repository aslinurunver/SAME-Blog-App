import MainLayout from '../../components/MainLayout';
import { images } from '../../constants';

const AboutUs = () => {
  return (
    <MainLayout>
      <div className="container mx-auto flex flex-col  px-5 py-10">
        <div className="flex flex-row items-center justify-center">
          <h1 className="mb-4 text-center text-3xl font-bold">Hakkımızda</h1>
        </div>
        <div className="flex flex-row gap-x-5">
          <div
            className={`w-full overflow-hidden rounded-xl  shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px] `}
            style={{ minWidth: '350px', minHeight: '467px' }}
          >
            <img
              src={images.AsliPhoto}
              alt="post 1"
              style={{ minWidth: '350px', minHeight: '467px' }}
              className="h-100 w-full object-cover  object-center "
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl">Aslı Nur Ünver</h1>
            <p>
              Merhaba, Ben Aslı! Üniversite hayatım boyunca, Bilgisayar Mühendisliği bölümünde aldığım dersler ve proje çalışmalarıyla
              sağlam bir temel oluşturdum. Programlama dilleri, veri yapıları, algoritmalar, yazılım mühendisliği
              prensipleri gibi konularda derinlemesine bilgi sahibi oldum. Bu bilgilerimi <b> web ön yüzü geliştirme</b>{' '}
              alanında kullanmayı seçtim, çünkü kullanıcı arayüzleri oluşturarak insanların dijital deneyimlerini
              geliştirmek beni heyecanlandırıyor. Bilgisayar Topluluğu yönetim kurulunda görev almak, üniversitemizdeki
              öğrenci arkadaşlarımın teknolojiye olan ilgisini artırmak ve bilgi paylaşımını teşvik etmek için harika
              bir fırsat oldu. Birçok seminer ve söyleşi düzenledik, bu etkinliklerde hem öğrencilere yönelik eğitimler
              verdik hem de sektörden uzmanları ağırlayarak öğrencilere ilham kaynağı olduk. Bu deneyimler, iletişim ve
              liderlik becerilerimi geliştirmeme yardımcı oldu ve teknik bilgilerimi paylaşma konusunda daha kendinden
              emin oldum. Staj deneyimim ise Kiba Yazılım Bilişim A.Ş'de gerçekleşti ve benim için çok değerli bir
              deneyimdi. Şirketin yazılım geliştirme süreçlerine doğrudan dahil oldum ve birçok projede aktif rol aldım.
              Bu süreçte, gerçek dünyadaki yazılım geliştirme süreçlerini ve projelerin yönetimini daha yakından
              gözlemleme fırsatım oldu. <i>Takım çalışması, zaman yönetimi ve sorun çözme becerilerimi geliştirdim</i>.
              Gelecekteki kariyer hedeflerim doğrultusunda, web ön yüzü geliştirme alanında uzmanlaşmak istiyorum.
              Teknolojinin hızla geliştiği bir çağda, kullanıcıların modern, etkileşimli ve kullanımı kolay web
              uygulamalarına ihtiyaç duyduğunu görüyorum. Bu nedenle, kullanıcı deneyimini ön planda tutan ve estetik
              açıdan etkileyici arayüzler oluşturmayı hedefliyorum. Ayrıca, güncel web teknolojilerini takip ederek
              kendimi sürekli olarak geliştirmek ve yenilikleri projelerime entegre etmek istiyorum
            </p>
          </div>
        </div>

        <div className="mt-7 flex flex-row gap-x-5">
          <div
            className={`overflow-hidden rounded-xl shadow-[rgba(7,_65,_210,_0.1)_0px_9px_30px]  `}
            style={{ minWidth: '350px', minHeight: '467px' }}
          >
            <img
              src={images.EmilPhoto}
              alt="post 1"
              className="object-cover object-center  "
              style={{ minWidth: '350px', minHeight: '467px' }}
            />
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl">Emil Naghizade</h1>
            <p>
              Merhaba! Benim adım Emil, Ben Süleyman Demirel Üniversitesi Bilgisayar Mühendisliği 4. sınıf öğrencisiyim.
              Öğrenci numaram ise 1921012311. Bilgisayar mühendisliği eğitimim boyunca{' '}
              <b>front-end, back-end ve tasarım</b> konularına büyük ilgi duydum. Özellikle web tasarımı ve kullanıcı
              deneyimi geliştirme konularında kendimi sürekli geliştirmeye çalışıyorum.Tasarım dersi için MERN yapısını
              kullanarak bir blog sitesi geliştirdim ve bu süreçte{' '}
              <i>HTML, CSS, Tailwind, React, MongoDB ve Express.js</i> gibi teknolojilere hakimiyetimi artırdım. Ayrıca
              daha önce Angular ve React ile projeler geliştirmiş olmam da deneyimimi zenginleştirdi.Staj yapmış olduğum
              ITSM şirketi olan ServiceCore'da da çalışma fırsatım oldu. Bu deneyim, gerçek dünya projelerinde yer
              alarak yazılım becerilerimi pekiştirmeme ve iş dünyasının dinamiklerini anlamama yardımcı oldu.İlgi
              alanlarım arasında kullanıcı dostu arayüz tasarımı, etkileyici kullanıcı deneyimi yaratma ve verimli
              back-end çözümleri geliştirme yer alıyor. Aynı zamanda yeni teknolojileri takip ederek kendimi sürekli
              güncel tutmaya özen gösteriyorum.Gelecekteki hedefim, yazılım alanında uzmanlaşarak ilham verici
              projelerde yer almak ve kullanıcıların hayatını kolaylaştıran çözümler sunmaktır. Sürekli öğrenmeyi ve
              kendimi geliştirmeyi önemsiyorum. Benimle ilgili daha fazla bilgi edinmek veya projelerimi incelemek
              isterseniz, size daha detaylı bilgi ve portfolyo linklerini paylaşabilirim.Umarım bu yazı, benim hakkımda
              biraz bilgi sahibi olmanızı sağlamıştır. Herhangi bir sorunuz veya projelerimle ilgili daha fazla bilgi
              isteğiniz olursa, lütfen bana bildirin. Size yardımcı olmaktan mutluluk duyarım!
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
export default AboutUs;
