export const lessons = [
  {
    id: 'os',
    title: 'İşletim Sistemi Yapıları',
    description: 'Çekirdek, sistem çağrıları ve işletim sistemi mimarileri',
    icon: '💻',
    sections: [
      {
        title: 'İşletim Sistemi Nedir?',
        summary: 'İşletim sisteminin ne olduğunu, temel görevlerini ve yaygın örneklerini keşfedeceksin.',
        blocks: [
          {
            type: 'paragraph',
            text: 'İşletim sistemi (Operating System - OS), bilgisayar donanımı ile kullanıcı arasında köprü görevi gören temel yazılımdır. Donanım kaynaklarını (işlemci, bellek, disk, giriş/çıkış aygıtları) yönetir ve uygulamaların çalışması için gerekli ortamı sağlar.',
          },
          {
            type: 'callout',
            icon: '🔑',
            label: 'Anahtar Kavram',
            variant: 'key',
            text: 'İşletim sistemi = donanım ile yazılım arasındaki köprü. Onsuz hiçbir uygulama çalışamaz.',
          },
          {
            type: 'list',
            label: 'Temel Görevler',
            items: [
              'Süreç yönetimi',
              'Bellek yönetimi',
              'Dosya sistemi yönetimi',
              'Giriş / Çıkış yönetimi',
              'Güvenlik',
            ],
          },
          {
            type: 'callout',
            icon: '💡',
            label: 'Yaygın Örnekler',
            variant: 'tip',
            text: 'Masaüstü: Windows, macOS, Linux\nMobil: Android, iOS',
          },
        ],
      },
      {
        title: 'Çekirdek (Kernel)',
        summary: 'Çekirdeğin işletim sistemindeki rolünü ve neden her zaman bellekte kaldığını anlayacaksın.',
        blocks: [
          {
            type: 'paragraph',
            text: 'Çekirdek (kernel), işletim sisteminin kalbidir ve en temel işlevleri yürütür. Bilgisayar açıldığında belleğe yüklenen ilk bileşendir ve sistem kapanana kadar bellekte kalır.',
          },
          {
            type: 'list',
            label: 'Çekirdeğin Görevleri',
            items: [
              'İşlemci zamanını süreçler arasında paylaştırmak (zamanlama)',
              'Belleği yönetmek',
              'Donanım aygıtlarıyla iletişim kurmak (sürücüler aracılığıyla)',
              'Sistem çağrılarını işlemek',
            ],
          },
          {
            type: 'callout',
            icon: '⚠️',
            label: 'Dikkat',
            variant: 'warning',
            text: 'Çekirdek "kernel space" adlı korumalı bir bellek alanında çalışır. Kullanıcı programları buraya doğrudan erişemez; aksi hâlde sisteme zarar verebilirlerdi.',
          },
        ],
      },
      {
        title: 'Kullanıcı Modu ve Çekirdek Modu',
        summary: 'İki çalışma modunun neden ayrı olduğunu ve aralarındaki kritik farkı kavrayacaksın.',
        blocks: [
          {
            type: 'callout',
            icon: '🔑',
            label: 'Temel Ayrım',
            variant: 'key',
            text: 'Modern işlemciler iki mod sunar: Çekirdek Modu (sınırsız erişim) ve Kullanıcı Modu (kısıtlı). Bu ayrım sistem güvenliği için kritiktir.',
          },
          {
            type: 'list',
            label: 'Çekirdek Modu',
            items: [
              'Tüm donanıma sınırsız erişim',
              'Kritik komutları çalıştırabilir',
              'İşletim sistemi çekirdeği bu modda çalışır',
            ],
          },
          {
            type: 'list',
            label: 'Kullanıcı Modu',
            items: [
              'Doğrudan donanıma erişemez',
              'Kritik komutlar çalıştırılamaz',
              'Kullanıcı uygulamaları bu modda çalışır',
            ],
          },
          {
            type: 'highlight',
            text: 'Kullanıcı modu → Çekirdek moduna geçiş yalnızca sistem çağrıları ile yapılır.',
          },
        ],
      },
      {
        title: 'Sistem Çağrıları (System Calls)',
        summary: 'Sistem çağrısının ne olduğunu ve programların neden buna ihtiyaç duyduğunu öğreneceksin.',
        blocks: [
          {
            type: 'paragraph',
            text: 'Sistem çağrısı, kullanıcı programlarının işletim sistemi çekirdeğinden hizmet talep etme yöntemidir. Bir program dosya açmak, bellek ayırmak veya ağ üzerinden veri göndermek istediğinde sistem çağrısı kullanır.',
          },
          {
            type: 'list',
            label: 'Sistem Çağrısı Kategorileri',
            items: [
              'Süreç kontrolü — program çalıştırma, sonlandırma',
              'Dosya yönetimi — açma, okuma, yazma, kapatma',
              'Aygıt yönetimi',
              'Bilgi alma',
              'İletişim — süreçler arası haberleşme',
            ],
          },
          {
            type: 'callout',
            icon: '💡',
            label: 'İpucu',
            variant: 'tip',
            text: 'Programcılar sistem çağrılarını genellikle doğrudan kullanmaz. C standart kütüphanesi gibi kütüphaneler bu çağrıları soyutlayarak daha kolay kullanılır hale getirir.',
          },
        ],
      },
      {
        title: 'İşletim Sistemi Mimarileri',
        summary: 'Monolitik, mikroçekirdek ve hibrit mimarilerin farkını kavrayacaksın.',
        blocks: [
          {
            type: 'paragraph',
            text: 'İşletim sistemleri farklı mimari yaklaşımlarla tasarlanabilir. Her yaklaşımın kendine özgü avantaj ve dezavantajları vardır.',
          },
          {
            type: 'callout',
            icon: '🧱',
            label: 'Monolitik Çekirdek',
            variant: 'note',
            text: 'Tüm hizmetler tek bir büyük çekirdekte çalışır. Hızlıdır çünkü bileşenler doğrudan iletişim kurar; ancak bir hata tüm sistemi etkileyebilir.\nÖrnek: Linux',
          },
          {
            type: 'callout',
            icon: '🔬',
            label: 'Mikroçekirdek',
            variant: 'key',
            text: 'Çekirdek mümkün olduğunca küçük tutulur; diğer hizmetler kullanıcı alanında çalışır. Daha güvenli ve kararlıdır, ancak bileşenler arası iletişim yüzünden biraz daha yavaş olabilir.',
          },
          {
            type: 'callout',
            icon: '🔀',
            label: 'Hibrit Çekirdek',
            variant: 'tip',
            text: 'Monolitik ve mikroçekirdek yaklaşımlarını birleştirir; hız ile güvenlik dengesi kurar.\nÖrnekler: Windows, macOS',
          },
        ],
      },
    ],
    quiz: [
      {
        question: 'İşletim sisteminin temel görevi aşağıdakilerden hangisidir?',
        options: [
          'Sadece oyun çalıştırmak',
          'Donanım kaynaklarını yönetmek ve uygulamalara ortam sağlamak',
          'İnternet sağlamak',
          'Sadece dosya silmek',
        ],
        correctIndex: 1,
        explanation: 'İşletim sistemi, CPU, bellek ve disk gibi donanımları yöneterek uygulamaların çalışabileceği ortamı hazırlar. Olmadan hiçbir program çalışamaz.',
      },
      {
        question: 'Çekirdek (kernel) ne zaman belleğe yüklenir?',
        options: [
          'Her uygulama açıldığında',
          'Bilgisayar açıldığında ve sistem kapanana kadar bellekte kalır',
          'Sadece internet kullanılırken',
          'Hiçbir zaman bellekte kalmaz',
        ],
        correctIndex: 1,
        explanation: 'Çekirdek, bilgisayar açılırken BIOS/UEFI tarafından belleğe yüklenir ve sistem kapanana kadar orada kalır; bu sayede sürekli hizmet verebilir.',
      },
      {
        question: 'Kullanıcı modunda çalışan bir program donanıma nasıl erişir?',
        options: [
          'Doğrudan donanıma erişir',
          'Hiçbir şekilde erişemez',
          'Sistem çağrıları aracılığıyla çekirdekten izin isteyerek',
          'Bilgisayarı yeniden başlatarak',
        ],
        correctIndex: 2,
        explanation: 'Kullanıcı modu kısıtlıdır; sistem çağrısı bir köprü görevi görerek işlemin çekirdeğin güvenli ortamında gerçekleşmesini sağlar.',
      },
      {
        question: 'Sistem çağrısı (system call) nedir?',
        options: [
          'Kullanıcı programlarının çekirdekten hizmet talep etme yöntemi',
          'Bir telefon görüşmesi türü',
          'Donanım arızası bildirimi',
          'İnternet protokolü',
        ],
        correctIndex: 0,
        explanation: 'Uygulamalar sistem çağrısı ile çekirdeğe "benim adıma şu işi yap" der; dosya okuma, bellek ayırma gibi işlemler bu şekilde gerçekleşir.',
      },
      {
        question: 'Monolitik çekirdek mimarisinin özelliği nedir?',
        options: [
          'Tüm hizmetler kullanıcı alanında çalışır',
          'Çekirdek çok küçüktür',
          'Tüm hizmetler tek bir büyük çekirdek içinde çalışır',
          'İnternet olmadan çalışmaz',
        ],
        correctIndex: 2,
        explanation: 'Monolitik çekirdekte bileşenler doğrudan iletişim kurduğundan hızlıdır; ancak bir sürücü hatası tüm çekirdeği çökertebilir.',
      },
      {
        question: 'Hangi işletim sistemi monolitik çekirdek kullanır?',
        options: ['Windows', 'macOS', 'Linux', 'Hiçbiri'],
        correctIndex: 2,
        explanation: 'Linux, Linus Torvalds tarafından monolitik çekirdek üzerine tasarlandı. Windows ve macOS ise hibrit (karma) mimari kullanır.',
      },
      {
        question: 'Çekirdek modu (kernel mode) ile kullanıcı modu (user mode) ayrımının amacı nedir?',
        options: [
          'Bilgisayarı yavaşlatmak',
          'Sistem güvenliği ve kararlılığını sağlamak',
          'Daha fazla reklam göstermek',
          'Pil tüketimini artırmak',
        ],
        correctIndex: 1,
        explanation: 'Bu iki mod ayrımı donanım desteğiyle sağlanır; kullanıcı programları yanlışlıkla kritik belleği değiştiremez ve sistemi çökertme riski azalır.',
      },
      {
        question: 'Aşağıdakilerden hangisi bir işletim sistemi DEĞİLDİR?',
        options: ['Linux', 'macOS', 'Microsoft Word', 'Android'],
        correctIndex: 2,
        explanation: 'Microsoft Word bir kelime işlemci uygulamasıdır; işletim sistemi değildir. Hatta çalışabilmek için bir işletim sistemine ihtiyaç duyar.',
      },
      {
        question: 'Bir uygulama dosya okumak istediğinde aşağıdakilerden hangisi gerçekleşir?',
        options: [
          'Uygulama doğrudan diske erişir',
          'Sistem çağrısı yaparak çekirdekten yardım ister',
          'Bilgisayar yeniden başlatılır',
          'Hiçbir şey olmaz',
        ],
        correctIndex: 1,
        explanation: 'read() gibi sistem çağrıları, uygulamanın çekirdekten "bu dosyayı bana oku" diye istemesini sağlar; disk erişimi doğrudan yapılamaz.',
      },
      {
        question: 'Mikroçekirdek (microkernel) mimarisinin monolitik çekirdeğe göre avantajı nedir?',
        options: [
          'Her zaman daha hızlıdır',
          'Daha güvenli ve kararlıdır',
          'Daha az bellek kullanır her zaman',
          'İnternet gerektirmez',
        ],
        correctIndex: 1,
        explanation: 'Mikroçekirdeğin çekirdeği küçük olduğundan hata yüzeyi de küçüktür; sorunlu bir servis tüm sistemi çöküşe sürükleyemez.',
      },
    ],
  },
  {
    id: '5g',
    title: '5G Teknolojisi',
    description: 'Yeni nesil mobil ağlar, mimari ve kullanım alanları',
    icon: '📡',
    sections: [
      {
        title: '5G Nedir?',
        summary: '5G\'nin ne olduğunu, önceki nesillerden farkını ve neden bu kadar önemli olduğunu keşfedeceksin.',
        blocks: [
          {
            type: 'paragraph',
            text: '5G, beşinci nesil mobil iletişim teknolojisidir ve 4G/LTE\'nin yerini alan yeni nesil kablosuz ağ standardıdır. "5G"deki "G", İngilizce "Generation" (nesil) kelimesinden gelir.',
          },
          {
            type: 'callout',
            icon: '🔑',
            label: 'Anahtar Fark',
            variant: 'key',
            text: '5G, 4G\'ye kıyasla teorik olarak 10–100 kat daha hızlı veri aktarımı ve 1 ms\'ye kadar düşen gecikme süresi sunar.',
          },
          {
            type: 'callout',
            icon: '💡',
            label: '5G Sadece Hız Değil',
            variant: 'tip',
            text: 'Otonom araçlar, akıllı şehirler, nesnelerin interneti (IoT) ve uzaktan cerrahi gibi teknolojilerin altyapısıdır.',
          },
        ],
      },
      {
        title: '5G\'nin Temel Özellikleri',
        summary: '5G\'nin üç ana kullanım senaryosunu ve her birinin hangi alanlara hizmet ettiğini öğreneceksin.',
        blocks: [
          {
            type: 'paragraph',
            text: '5G teknolojisi üç temel kullanım senaryosu etrafında tasarlanmıştır:',
          },
          {
            type: 'callout',
            icon: '📶',
            label: 'eMBB — Gelişmiş Mobil Geniş Bant',
            variant: 'key',
            text: 'Çok yüksek veri hızları sunar. 4K/8K video akışı, sanal gerçeklik (VR) ve artırılmış gerçeklik (AR) uygulamaları için idealdir.',
          },
          {
            type: 'callout',
            icon: '⚡',
            label: 'URLLC — Ultra Güvenilir Düşük Gecikmeli İletişim',
            variant: 'warning',
            text: '1 ms\'ye kadar gecikme ve yüksek güvenilirlik sağlar. Otonom araçlar ve uzaktan cerrahi için kritiktir.',
          },
          {
            type: 'callout',
            icon: '📡',
            label: 'mMTC — Yoğun Makine Tipi İletişim',
            variant: 'tip',
            text: 'Km² başına 1 milyon cihaza kadar bağlantı. Nesnelerin interneti (IoT) için tasarlanmıştır.',
          },
        ],
      },
      {
        title: 'Gecikme Süresi (Latency)',
        summary: 'Gecikme süresinin ne olduğunu ve 5G\'nin bunu nasıl dramatik biçimde düşürdüğünü anlayacaksın.',
        blocks: [
          {
            type: 'paragraph',
            text: 'Gecikme süresi (latency), bir verinin gönderildiği andan alıcıya ulaştığı ana kadar geçen süredir. Düşük gecikme, gerçek zamanlı uygulamalar için hayati önem taşır.',
          },
          {
            type: 'highlight',
            text: '4G: ~30–50 ms gecikme   →   5G: 1 ms gecikmeye kadar',
          },
          {
            type: 'callout',
            icon: '🚗',
            label: 'Otonom Araç',
            variant: 'warning',
            text: 'Önündeki engele milisaniyeler içinde tepki vermek zorundadır. 50 ms\'lik bir gecikme bile ölümcül sonuçlara yol açabilir.',
          },
          {
            type: 'callout',
            icon: '🏥',
            label: 'Uzaktan Cerrahi',
            variant: 'key',
            text: 'Cerrahın hareketleri ile robotun tepkisi arasındaki gecikme sıfıra yakın olmalıdır. 5G bunu gerçeğe dönüştürür.',
          },
        ],
      },
      {
        title: '5G Frekans Bantları',
        summary: '5G\'nin üç frekans bandını, avantajlarını ve kullanım bağlamlarını öğreneceksin.',
        blocks: [
          {
            type: 'paragraph',
            text: '5G farklı frekans bantlarında çalışır. Her bandın kapsama alanı ve hız performansı farklıdır:',
          },
          {
            type: 'callout',
            icon: '🌍',
            label: 'Düşük Bant (< 1 GHz)',
            variant: 'tip',
            text: 'Geniş kapsama alanı, binalara kolay nüfuz. Hız artışı sınırlı; 4G\'ye benzer hızlar sunar.',
          },
          {
            type: 'callout',
            icon: '⚖️',
            label: 'Orta Bant (1–6 GHz)',
            variant: 'key',
            text: 'Hız ve kapsama dengesi. Çoğu ülkede 5G\'nin temel taşıyıcısıdır.',
          },
          {
            type: 'callout',
            icon: '🚀',
            label: 'Yüksek Bant / mmWave (> 24 GHz)',
            variant: 'warning',
            text: 'En yüksek hızlar (birkaç Gbps). Ancak menzil çok kısadır; duvar, ağaç, hatta yoğun yağmur sinyali kolayca keser.',
          },
        ],
      },
      {
        title: '5G Kullanım Alanları',
        summary: '5G\'nin hangi sektörleri ve uygulamaları dönüştüreceğini keşfedeceksin.',
        blocks: [
          {
            type: 'paragraph',
            text: '5G\'nin yüksek hız, düşük gecikme ve yoğun cihaz desteği birçok yeni uygulama alanının önünü açar:',
          },
          {
            type: 'list',
            items: [
              '🏙️ Akıllı Şehirler — trafik, aydınlatma, atık ve güvenlik sistemleri',
              '🚗 Otonom Araçlar — araç-araç ve araç-altyapı anlık iletişimi',
              '🏥 e-Sağlık — uzaktan cerrahi, hasta takibi, telemedicine',
              '🏭 Endüstri 4.0 — robot koordinasyonu ve akıllı üretim',
              '📱 IoT — milyarlarca sensör ve cihazın birbirine bağlanması',
            ],
          },
          {
            type: 'callout',
            icon: '💡',
            label: 'Büyük Resim',
            variant: 'tip',
            text: '5G tek başına bir teknoloji değil; yapay zeka, robotik ve IoT gibi diğer teknolojilerin potansiyelini gerçeğe dönüştüren bir altyapıdır.',
          },
        ],
      },
    ],
    quiz: [
      {
        question: '5G ifadesindeki "G" harfi neyi temsil eder?',
        options: ['Gigabyte', 'Generation (Nesil)', 'Google', 'Gateway'],
        correctIndex: 1,
        explanation: '"G", Generation (nesil) anlamına gelir. 1G\'den bugüne her nesil, bir öncekine göre daha yüksek hız ve yeni özellikler getirdi.',
      },
      {
        question: '5G, 4G\'ye kıyasla teorik olarak ne kadar daha hızlı veri aktarımı yapabilir?',
        options: ['2 kat', '10 ila 100 kat', 'Aynı hızda', '5 kat'],
        correctIndex: 1,
        explanation: 'mmWave bantlarında teorik olarak 20 Gbps\'e ulaşılabilir. Gerçek dünya koşullarında ortalama 10-20 kat iyileşme beklenir.',
      },
      {
        question: 'URLLC kullanım senaryosu hangi özelliği vurgular?',
        options: [
          'Çok yüksek veri hızı',
          'Ultra güvenilir düşük gecikmeli iletişim',
          'Çok sayıda cihaz bağlantısı',
          'Ucuz internet',
        ],
        correctIndex: 1,
        explanation: 'URLLC, otonom araç ve uzaktan cerrahi gibi anlık tepki gerektiren uygulamalar için tasarlanmıştır; 1 ms gecikme hedeflenir.',
      },
      {
        question: '5G ağlarında gecikme süresi en düşük ne kadara inebilir?',
        options: ['1 milisaniye', '50 milisaniye', '1 saniye', '100 milisaniye'],
        correctIndex: 0,
        explanation: '4G\'de 30-50 ms olan gecikme, 5G ile 1 ms\'ye düşer. Bu fark otonom araç güvenliği ve uzaktan ameliyat için kritik öneme sahiptir.',
      },
      {
        question: 'mMTC kullanım senaryosu kilometrekare başına yaklaşık kaç cihaz destekleyebilir?',
        options: ['100 cihaz', '1.000 cihaz', '10.000 cihaz', '1 milyon cihaz'],
        correctIndex: 3,
        explanation: 'IoT dünyasında milyarlarca küçük sensör ve cihaz vardır. mMTC bu cihazların düşük güçle bağlantı kurmasını sağlar.',
      },
      {
        question: 'Milimetre dalga (mmWave) yüksek bandının dezavantajı nedir?',
        options: [
          'Çok yavaştır',
          'Menzili kısadır ve engellerden kolayca etkilenir',
          'Hiç çalışmaz',
          'Sadece gece çalışır',
        ],
        correctIndex: 1,
        explanation: 'Yüksek frekans sinyaller çok kısa mesafede zayıflar; duvar, ağaç, hatta yoğun yağmur bile sinyali bloke edebilir.',
      },
      {
        question: 'Aşağıdakilerden hangisi 5G\'nin kullanım alanlarından biri DEĞİLDİR?',
        options: [
          'Otonom araçlar',
          'Akıllı şehirler',
          'Uzaktan cerrahi',
          'Daktilo ile yazı yazma',
        ],
        correctIndex: 3,
        explanation: 'Daktilo tamamen mekanik bir cihazdır ve 5G ile hiçbir ilgisi yoktur. Diğer seçeneklerin hepsi 5G ile doğrudan ilişkilidir.',
      },
      {
        question: '5G\'nin "eMBB" kullanım senaryosu hangi uygulamalar için idealdir?',
        options: [
          '4K/8K video, VR, AR uygulamaları',
          'Sadece SMS gönderme',
          'Sadece sesli arama',
          'Faks çekme',
        ],
        correctIndex: 0,
        explanation: 'eMBB, yüksek bant genişliği gerektiren medya uygulamaları için optimize edilmiştir; akıllı gözlüklerle VR/AR deneyimi 5G ile mümkün hale gelir.',
      },
      {
        question: 'Düşük bant (low-band) frekansların temel avantajı nedir?',
        options: [
          'En yüksek hızı sunar',
          'Geniş kapsama alanı ve binalara nüfuz edebilme',
          'Hiçbir avantajı yoktur',
          'Sadece kırsalda çalışır',
        ],
        correctIndex: 1,
        explanation: '700 MHz gibi düşük frekanslar binaları rahatça deler ve onlarca km\'ye ulaşır; bu yüzden 5G\'nin ilk yaygınlaşmasında düşük bant kullanıldı.',
      },
      {
        question: '5G\'nin Endüstri 4.0\'a katkısı nedir?',
        options: [
          'Fabrikalardaki makineleri yavaşlatır',
          'Üretimi durdurur',
          'Fabrikalarda makinelerin kablosuz koordinasyonunu ve robotik otomasyonu mümkün kılar',
          'Sadece ofislerde işe yarar',
        ],
        correctIndex: 2,
        explanation: '5G\'nin düşük gecikmesi ve yüksek güvenilirliği, fabrikadaki robotların esnek konumlandırılmasını ve gerçek zamanlı koordinasyonunu sağlar.',
      },
    ],
  },
];

export function getLessonById(id) {
  return lessons.find((lesson) => lesson.id === id);
}
