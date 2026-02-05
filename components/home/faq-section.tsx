'use client'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { HelpCircle } from 'lucide-react'
import { SectionAnimator } from '@/components/section-animator'

const faqs = [
  {
    question: 'Hizmetleriniz hangi bölgeleri kapsıyor?',
    answer:
      'İzmir merkez ve tüm ilçelerine ek olarak Aydın, Manisa ve Denizli başta olmak üzere çevre illere profesyonel tıkanıklık açma ve kanalizasyon hizmetleri sunuyoruz.',
    detailed:
      'İzmir’in Bornova, Karşıyaka, Buca, Konak, Bayraklı, Gaziemir, Menemen ve Karabağlar gibi tüm ilçelerine hızlı ulaşım sağlıyoruz. Ayrıca çevre illerde mobil ekiplerimizle yerinde müdahale gerçekleştiriyoruz. Bölgesel altyapıya hâkim olmamız sayesinde sorunlara kalıcı ve nokta atışı çözümler üretiyoruz.',
  },
  {
    question: 'Acil tıkanıklık durumunda ne kadar sürede geliyorsunuz?',
    answer:
      'Acil tıkanıklık açma taleplerinde ortalama 30–60 dakika içerisinde adrese ulaşmayı hedefliyoruz.',
    detailed:
      'Yoğunluk ve mesafeye bağlı olarak süre değişebilse de acil ekiplerimiz öncelikli yönlendirilir. Gece, hafta sonu ve resmi tatillerde de aktif olan 7/24 acil servisimizle su taşması ve geri tepme gibi acil durumlara hızlı müdahale sağlıyoruz.',
  },
  {
    question: 'Hangi tıkanıklık açma yöntemlerini kullanıyorsunuz?',
    answer:
      'Spiral makineler, robotlu kanal açma cihazları ve kameralı görüntüleme sistemleri kullanıyoruz.',
    detailed:
      'Lavabo ve banyo giderleri için spiral makineler, ana hat ve kanalizasyon tıkanıklıkları için robotlu sistemler tercih edilir. Kameralı tespit ile sorunun kaynağı netleştirilir ve gereksiz kırma-dökme işlemlerinden kaçınılır.',
  },
  {
    question: 'Kırma-dökme yapılır mı, evime zarar gelir mi?',
    answer:
      'Çoğu durumda kırma-dökme yapılmadan, boru içinden müdahale ile sorun çözülür.',
    detailed:
      'Kameralı tespit ve modern ekipmanlar sayesinde tıkanıklıkların büyük bölümü zarar vermeden açılır. Ancak eski veya hasarlı tesisatlarda sınırlı onarım gerekirse, işlem öncesinde detaylı bilgilendirme yapılır.',
  },
  {
    question: 'Kameralı tespit hizmeti sunuyor musunuz?',
    answer:
      'Evet, kameralı gider ve kanalizasyon görüntüleme hizmeti sunuyoruz.',
    detailed:
      'Kameralı sistemlerle boru içi görüntüleme yaparak tıkanıklığın yeri, nedeni ve müdahale şekli netleştirilir. Bu yöntem hem maliyeti düşürür hem de işlemin hızlı ve doğru yapılmasını sağlar.',
  },
  {
    question: 'Tıkanıklık açma işlemi ne kadar sürer?',
    answer:
      'İşlemler genellikle 30 dakika ile 2 saat arasında tamamlanır.',
    detailed:
      'Basit gider tıkanıklıkları kısa sürede çözülürken, ana hat ve kanalizasyon tıkanıklıkları daha uzun sürebilir. Kameralı ön inceleme ile süre ve müdahale planı netleştirilir.',
  },
  {
    question: 'Fiyatlandırma nasıl yapılıyor?',
    answer:
      'Fiyatlar tıkanıklığın türüne, yerine ve kullanılan ekipmana göre belirlenir.',
    detailed:
      'Telefonla ön bilgi alındıktan sonra yerinde inceleme yapılarak net fiyat sunulur. Acil servis veya gece müdahalelerinde ek ücretlendirme olması durumunda müşteri önceden bilgilendirilir.',
  },
  {
    question: 'Tekrar tıkanma olursa ne yapıyorsunuz?',
    answer:
      'İşlem sonrası garanti kapsamında kontrol ve destek hizmeti sağlıyoruz.',
    detailed:
      'Doğru yöntemle açılan tıkanıklıklarda tekrar riski düşüktür. Kullanım veya altyapı kaynaklı tekrarlar için garanti şartları dahilinde ücretsiz kontrol yapılır.',
  },
  {
    question: 'Ödeme seçenekleri nelerdir?',
    answer:
      'Nakit, kredi kartı, banka kartı ve kurumsal faturalandırma seçenekleri sunuyoruz.',
    detailed:
      'Bireysel ve kurumsal müşteriler için esnek ödeme çözümleri sağlıyoruz. Faturalı ve sözleşmeli hizmet taleplerine uygundur.',
  },
  {
    question: 'Çevreye ve hijyene nasıl dikkat ediyorsunuz?',
    answer:
      'Çalışma sonrası alan temizliği ve hijyen kurallarına tam uyum sağlanır.',
    detailed:
      'Atıklar çevre mevzuatına uygun şekilde bertaraf edilir. Ekiplerimiz koruyucu ekipman kullanır ve işlem sonrası ortam temiz bırakılır.',
  },
]

export function FAQSection() {
  return (
    <section className="relative z-10 py-20 bg-gradient-to-b from-secondary via-[#cdd9e2] to-[#2a3a4a]">

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#1a2a3a] to-transparent pointer-events-none" />


      <div className="container mx-auto px-4">
        <SectionAnimator animation="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Sıkça Sorulan Sorular
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kanalizasyon ve tıkanıklık açma hizmetlerimiz hakkında en çok merak edilen sorular.
          </p>
        </SectionAnimator>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={`faq-${index}`}
                value={`item-${index}`}
                className="bg-card rounded-lg px-6 border"
              >
                <AccordionTrigger className="hover:no-underline py-4">
                  <div className="flex items-center gap-3 text-left w-full">
                    <HelpCircle className="w-5 h-5 text-primary shrink-0" />
                    <span className="font-medium">{faq.question}</span>
                  </div>
                </AccordionTrigger>

                <AccordionContent className="text-muted-foreground pl-8 space-y-2">
                  <p>{faq.answer}</p>
                  <p className="text-sm">{faq.detailed}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
