'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { X } from 'lucide-react'
import { SectionAnimator } from '@/components/section-animator'

const services = [
	{
		title: 'Kanalizasyon Tıkanıklığı Açma',
		description:
			'Ana gider hatlarındaki kanalizasyon tıkanıklıklarını endüstriyel makinelerle açıyoruz.',
		detailedDescription:
			'Kanalizasyon altyapısı, binalarda oluşan atık ve pis suların sağlıklı bir şekilde tahliye edilmesini sağlayan hayati bir sistemdir. Bu sistemde meydana gelen tıkanmalar, kısa sürede ciddi hijyen sorunlarına yol açabilir. Özellikle ana hatlarda oluşan kanalizasyon tıkanıklıkları, birden fazla daireyi aynı anda etkileyerek tuvaletlerin ve giderlerin kullanılamaz hale gelmesine neden olur. Böyle durumlarda hızlı ve etkili bir kanalizasyon açma işlemi zorunlu hale gelir. Ev içerisinde sıkça karşılaşılan lavabo ve gider tıkanmaları, çoğu zaman marketlerde satılan kimyasal ürünlerle çözülemez. Geçici açılmalar yaşansa bile sorun kısa sürede tekrar eder. Ayrıca bu tür kimyasallar, uzun vadede boru yapısına zarar verebilir. Bu nedenle kalıcı sonuç almak için profesyonel kanal açma hizmetleri tercih edilmelidir. Gelişen teknolojiyle birlikte kameralı kanal açma sistemleri ve robotlu cihazlar sayesinde tıkanıklıkların yeri ve nedeni nokta atışıyla tespit edilebilmektedir. Boru içinden alınan görüntüler sayesinde soruna doğrudan müdahale edilir ve gereksiz kırma dökme işlemlerinin önüne geçilir. Eski binalarda, zamanla kanalizasyon hatlarının ve rögar noktalarının yeri bilinmez hale gelebilir. Bu gibi durumlarda kullanılan sonda verici ve dedektör sistemleri, hattın güzergâhını ve tıkanıklık noktasını yüksek hassasiyetle belirler. Robot cihaz boru içinde ilerlerken, dedektör yardımıyla sinyaller takip edilerek sorunlu bölge kısa sürede tespit edilir. Bu yöntem, hem işçilik süresini kısaltır hem de maliyet avantajı sağlar. Kameralı sistemlerle gerçekleştirilen kanal açma işlemlerinde, tıkanıklığın sebebi net şekilde ortaya konur ve en uygun müdahale yöntemi belirlenir. Bu işlemlerin uzman ekipler tarafından yapılması, sorunun kalıcı olarak çözülmesi açısından büyük önem taşır. Güvenilir ve uzun ömürlü bir çözüm için alanında profesyonel destek alınması önerilir.',
		image: '/images/kanalizasyon.jpg',
	},
	{
		title: 'İzmir ve Çevre İllere Hizmet',
		description:
			'İzmir’in tüm ilçelerine ve çevre illere profesyonel tıkanıklık açma hizmeti veriyoruz.',
		detailedDescription:
			'Firmamız, İzmir merkez başta olmak üzere çevre il ve ilçelere profesyonel kanalizasyon ve gider açma hizmetleri sunmaktadır. Geniş hizmet ağımız sayesinde bireysel konutlardan apartmanlara, sitelerden iş yerlerine kadar farklı yapı türlerinde yaşanan altyapı sorunlarına hızlı ve etkili çözümler üretmekteyiz. İzmir kanal açma hizmetleri kapsamında, acil durumlara kısa sürede müdahale ederek müşterilerimizin mağduriyet yaşamasını önlemeyi hedefliyoruz. İzmir’in Karşıyaka, Bornova, Buca, Konak, Bayraklı, Çiğli, Gaziemir, Menemen, Torbalı, Karabağlar ve Balçova gibi tüm merkez ilçelerinin yanı sıra; Manisa, Aydın, Balıkesir ve çevre bölgelerde de aktif olarak hizmet vermekteyiz. Bölgeye hâkim ekiplerimiz, altyapı yapısını iyi analiz ederek sorunun kaynağına en kısa sürede ulaşır ve kalıcı çözümler sunar. Hizmet sürecinde kameralı kanal görüntüleme, robotlu kanal açma, sonda verici ve dedektör sistemleri gibi modern teknolojiler kullanılır. Bu sayede tıkanıklığın yeri ve nedeni net bir şekilde belirlenir; gereksiz kazı, kırma veya duvar hasarları oluşmadan müdahale gerçekleştirilir. Özellikle apartman ve site gibi ortak kullanım alanlarında meydana gelen kanalizasyon problemlerinde, bu yöntemler büyük avantaj sağlar. İzmir ve çevre illerde sunduğumuz hizmetlerde hijyen, hız ve kalıcılık önceliğimizdir. Yapılan her işlem sonrası sistem kontrol edilerek tıkanıklığın tamamen giderildiğinden emin olunur. Tekrarlayan sorunların önüne geçmek için gerekli bilgilendirmeler müşterilerimizle paylaşılır. Deneyimli ekibimiz, hem eski yapılarda hem de yeni binalarda karşılaşılan kanalizasyon ve gider problemlerine uygun çözüm yöntemlerini belirleyerek çalışır. Profesyonel ekipman, uzman kadro ve müşteri memnuniyeti odaklı yaklaşım ile İzmir ve çevre illerde güvenilir bir hizmet sunmayı amaçlıyoruz. İzmir’de ve yakın bölgelerde yaşadığınız kanalizasyon tıkanıklığı, lavabo gideri problemi veya ana hat tıkanmaları için hızlı, garantili ve profesyonel bir çözüm arıyorsanız, doğru adrestesiniz',
		image: '/images/araba.jpg',
	},
	{
		title: 'Acil Tıkanıklık Açma',
		description:
			'İzmir’de 7/24 acil tıkanıklık açma hizmetiyle en hızlı şekilde yanınızdayız.',
		detailedDescription:
			'Beklenmedik anlarda meydana gelen kanalizasyon, lavabo ve gider tıkanıklıkları, günlük yaşamı ciddi şekilde aksatabilir. Özellikle pis suların geri tepmesi, kötü koku oluşumu ve tuvaletlerin kullanılamaz hale gelmesi gibi durumlar acil müdahale gerektirir. Firmamız, bu tür durumlar için acil tıkanıklık açma hizmeti sunarak soruna en kısa sürede çözüm üretmektedir. Acil durumlarda hızlı hareket eden ekiplerimiz, ihbar alındıktan sonra vakit kaybetmeden adrese yönlendirilir. Acil kanal açma hizmetleri kapsamında, sorunun büyümesini engellemek ve oluşabilecek maddi hasarların önüne geçmek hedeflenir. Gerek tek dairelerde gerekse apartman ve site gibi ortak kullanım alanlarında yaşanan tıkanıklıklara profesyonel müdahale sağlanır. Hızlı müdahalenin yanı sıra kalıcı çözüm de büyük önem taşır. Bu nedenle acil tıkanıklık açma işlemlerinde kameralı görüntüleme sistemleri ve robotlu cihazlar kullanılarak tıkanıklığın yeri ve nedeni net şekilde belirlenir. Bu sayede soruna doğrudan müdahale edilir, geçici çözümlerle zaman kaybedilmez ve tekrar eden tıkanıklıkların önüne geçilir. Acil durumlarda evde kullanılan kimyasal ürünler çoğu zaman yeterli olmaz ve durumu daha da kötüleştirebilir. Profesyonel ekipmanlarla yapılan müdahaleler, boru yapısına zarar vermeden güvenli bir şekilde gerçekleştirilir. İşlem sonrasında gider hattı kontrol edilerek sistemin sorunsuz çalıştığından emin olunur. Firmamız, 7/24 acil tıkanıklık açma hizmeti anlayışıyla hareket ederek, gece ya da gündüz fark etmeksizin hızlı destek sağlar. Deneyimli personelimiz, farklı yapı tiplerinde karşılaşılan acil kanalizasyon problemlerine uygun yöntemleri uygulayarak etkili sonuçler elde eder. Ani gelişen kanalizasyon tıkanıklığı, lavabo gideri dolması, tuvalet taşması ve ana hat tıkanmaları gibi durumlarda, vakit kaybetmeden profesyonel destek almak hem hijyen hem de güvenlik açısından büyük önem taşır. Acil tıkanıklık açma hizmetlerimizle, sorunlarınızı kısa sürede ve kalıcı şekilde çözüme kavuşturuyoruz.',
		image: '/images/acil.jpg',
	},
	{
		title: 'Tuvalet Gideri Tıkanıklığı Açma',
		description: 'Tuvalet tıkanıklıklarını hijyenik şekilde açıyoruz.',
		detailedDescription:
			'Tuvalet gideri tıkanıklığı, ev ve iş yerlerinde en sık karşılaşılan ve en rahatsız edici tesisat sorunlarından biridir. Su taşması, kötü koku yayılması ve tuvaletin tamamen kullanılamaz hale gelmesi gibi problemler, hızlı ve doğru müdahale gerektirir. Bu tür durumlarda yapılan bilinçsiz müdahaleler sorunu daha da büyütebilir. Kalıcı çözüm için profesyonel tuvalet gideri tıkanıklığı açma hizmeti büyük önem taşır. Tuvalet giderlerinde oluşan tıkanıklıklar genellikle yabancı cisimler, yoğun kullanım, yanlış atık atımı veya ana hatta bağlı problemlerden kaynaklanır. Evde kullanılan pompa ya da kimyasal ürünler çoğu zaman geçici sonuç verir ve boru yapısına zarar verebilir. Bu nedenle tıkanıklığın kaynağını doğru şekilde tespit etmek gerekir. Firmamız, kameralı tuvalet gideri açma sistemleri kullanarak tıkanıklığın yerini ve nedenini net biçimde belirler. Boru içinden alınan görüntüler sayesinde gereksiz kırma ve dökme işlemleri yapılmadan doğrudan sorunun olduğu noktaya müdahale edilir. Robotlu cihazlarla gerçekleştirilen işlemler, kısa sürede etkili sonuç sağlar. Tuvalet gideri tıkanıklığı açma işlemi sonrasında hat kontrol edilerek su akışının sorunsuz olduğu teyit edilir. Böylece tekrar eden tıkanıklık riskleri en aza indirilir. Özellikle apartman ve site gibi ortak kullanım alanlarında yaşanan tuvalet gideri problemlerinde, bu profesyonel yöntemler büyük avantaj sağlar. Deneyimli ekiplerimiz, hem eski hem de yeni yapılarda karşılaşılan tuvalet gideri tıkanıklıklarına uygun çözüm yöntemlerini uygular. Hijyen kurallarına uygun, hızlı ve kalıcı çözümler sunarak yaşam alanlarınızın güvenle kullanılmasını sağlıyoruz. Tuvalet taşması, suyun geri gelmesi veya kötü koku gibi sorunlarla karşılaştığınızda vakit kaybetmeden tuvalet gideri tıkanıklığı açma hizmeti almanız, daha büyük tesisat problemlerinin önüne geçer.',
		image: '/images/tuvalet.jpg',
	},
	{
		title: 'Banyo Gideri Temizliği',
		description:
			'Banyo giderlerinde oluşan tıkanıklıkları profesyonel cihazlarla açıyoruz.',
		detailedDescription:
			'Banyo giderleri, günlük kullanım nedeniyle en hızlı kirlenen ve tıkanmaya en yatkın tesisat hatları arasında yer alır. Saç, sabun kalıntıları, kireç birikintileri ve temizlik ürünlerinin oluşturduğu tortular zamanla gider borularında daralmaya yol açabilir. Düzenli yapılmayan temizlik işlemleri, suyun yavaş akmasına, kötü kokuların oluşmasına ve ilerleyen süreçte tamamen tıkanıklığa neden olabilir. Bu nedenle banyo gideri temizliği, hem hijyen hem de tesisat sağlığı açısından büyük önem taşır. Banyo giderlerinde oluşan kirlenmeler genellikle gözle fark edilmeden ilerler. Su tahliyesinin yavaşlaması, giderden gelen kötü kokular ve su birikmesi gibi belirtiler, gider hattında temizlik yapılması gerektiğini gösterir. Evde uygulanan yüzeysel temizlik yöntemleri çoğu zaman boru içerisindeki birikintileri tamamen temizleyemez. Bu noktada profesyonel gider temizliği hizmeti devreye girer. Firmamız, banyo giderlerinde oluşan kir ve tortuları temizlemek için modern ekipmanlar kullanmaktadır. Gerekli durumlarda kameralı görüntüleme sistemleri ile boru içi kontrol edilerek gider hattının durumu detaylı şekilde analiz edilir. Bu yöntem sayesinde tıkanıklığa neden olabilecek birikintiler erken aşamada tespit edilerek giderilir. Böylece ileride oluşabilecek büyük tesisat sorunlarının önüne geçilir. Profesyonel banyo gideri temizliği işlemlerinde, borulara zarar vermeden etkili temizlik sağlanır. Özel cihazlar yardımıyla gider hattında biriken saç, sabun artıkları ve tortular tamamen temizlenerek suyun rahat akışı sağlanır. İşlem sonrasında sistem kontrol edilerek gider hattının sorunsuz çalıştığından emin olunur. Düzenli yapılan banyo gideri temizliği, kötü koku oluşumunu önler, tesisat ömrünü uzatır ve ani tıkanıklık riskini azaltır. Özellikle yoğun kullanılan banyolarda periyodik bakım yapılması, ileride oluşabilecek masraflı onarımların önüne geçer. Banyonuzda suyun yavaş akması, giderden koku gelmesi veya su birikmesi gibi sorunlar yaşıyorsanız, profesyonel banyo gideri temizliği hizmeti alarak tesisatınızı güvenli ve hijyenik şekilde kullanmaya devam edebilirsiniz.',
		image: '/images/banyo.jpg',
	},
	{
		title: 'Kameralı Tıkanıklık Tespiti',
		description:
			'Kameralı sistemlerle boru içini görüntüleyerek tıkanıklığı nokta atışı tespit ediyoruz.',
		detailedDescription:
			'Kameralı tıkanıklık tespiti, gider ve kanalizasyon hatlarında oluşan sorunların kırma dökme işlemi yapılmadan belirlenmesini sağlayan modern ve etkili bir yöntemdir. Geleneksel yöntemlerde tahmine dayalı müdahaleler yapılırken, kameralı sistemler sayesinde tıkanıklığın yeri, nedeni ve boyutu net bir şekilde tespit edilir. Bu yöntem, hem zamandan tasarruf sağlar hem de gereksiz maliyetlerin önüne geçer. Gider borularında meydana gelen tıkanıklıklar; saç, sabun kalıntıları, yağ birikintileri, yabancı cisimler veya hat eğimi problemleri gibi birçok farklı nedenden kaynaklanabilir. Kameralı gider görüntüleme sistemleri, boru içerisine ilerletilen özel kameralar aracılığıyla hattın iç yapısını ayrıntılı şekilde görüntüler. Alınan görüntüler sayesinde sorunun kaynağı doğru şekilde analiz edilir ve en uygun müdahale yöntemi belirlenir. Kameralı tıkanıklık tespiti özellikle sık tekrar eden gider problemlerinde büyük avantaj sağlar. Aynı noktada sürekli yaşanan tıkanıklıkların nedeni, bu sistemle net olarak ortaya konur. Böylece geçici çözümler yerine kalıcı ve doğru müdahaleler yapılır. Ayrıca apartman, site ve iş yerlerinde ortak kullanım alanlarında yaşanan gider sorunlarında da bu yöntem etkili sonuç verir. Bu sistem sayesinde yalnızca tıkanıklıklar değil, boru hattındaki çatlaklar, kırıklar, eğim bozuklukları ve daralmalar da tespit edilebilir. Müdahale edilecek noktanın net olarak belirlenmesi, işlem süresini kısaltır ve çevreye verilen zararı minimum seviyede tutar. Kameralı tıkanıklık tespiti, tesisat altyapısının genel durumu hakkında da önemli bilgiler sunar. Firmamız tarafından uygulanan kameralı tespit işlemleri, uzman ekipler ve profesyonel ekipmanlar eşliğinde gerçekleştirilir. İşlem sonrası elde edilen veriler değerlendirilerek müşteriye detaylı bilgi verilir ve en uygun çözüm planı oluşturulur. Sık yaşanan gider tıkanıklıkları, kötü koku problemleri veya nedeni belirlenemeyen su geri taşmaları gibi durumlarda kameralı tıkanıklık tespiti hizmeti, doğru ve güvenilir bir çözüm sunar. Kırmadan, hızlı ve net sonuç almak isteyenler için en etkili yöntemlerden biridir.',
		image: '/images/kamera.jpg',
	},
]

export function ServicesSection() {
	const [visibleCards, setVisibleCards] = useState<number[]>([])
	const [selectedService, setSelectedService] = useState<number | null>(null)
	const sectionRef = useRef<HTMLElement>(null)
	const panelRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = Number(entry.target.getAttribute('data-index'))
						if (!visibleCards.includes(index)) {
							setVisibleCards((prev) => [...prev, index])
						}
					}
				})
			},
			{ threshold: 0.1 }
		)

		const cards = sectionRef.current?.querySelectorAll('[data-index]')
		cards?.forEach((card) => observer.observe(card))

		return () => observer.disconnect()
	}, [visibleCards])

	// Panel açıkken body scroll'u engelle
	useEffect(() => {
		if (selectedService !== null) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [selectedService])

	// ESC tuşu ile panel kapatma
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && selectedService !== null) {
				setSelectedService(null)
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		return () => window.removeEventListener('keydown', handleKeyDown)
	}, [selectedService])

	const closePanel = useCallback(() => {
		setSelectedService(null)
	}, [])

	return (
		<>
			<section
				ref={sectionRef}
				id="services-section"
				className="relative py-20 bg-gradient-to-b from-[#d6e2e9] via-[#e3eaef] to-[#d6e2e9]"
			>
				{/* Alt kısım yumuşak geçiş */}
				<div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-secondary to-transparent" />
				<div className="container mx-auto px-4">
					<SectionAnimator animation="fade-up" className="text-center mb-12">
						<h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-balance">
							Hizmetlerimiz
						</h2>
						<p className="text-muted-foreground max-w-2xl mx-auto text-pretty">
							Size en iyi hizmeti sunmak için buradayız. Profesyonel ekibimizle
							tüm ihtiyaçlarınızı karşılıyoruz.
						</p>
					</SectionAnimator>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{services.map((service, index) => (
							<Card
								key={`${service.title}-${index}`}
								data-index={index}
								className={cn(
									'group overflow-hidden transition-all duration-500 cursor-pointer border-0 shadow-md bg-card',
									'hover:shadow-xl hover:shadow-primary/10 hover:scale-[1.02]',
									visibleCards.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
								)}
								style={{ transitionDelay: `${index * 100}ms` }}
							>
								{/* Fotoğraf */}
								<div className="relative h-64 overflow-hidden">
									<Image
										src={service.image || '/placeholder.svg'}
										alt={service.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-110"
									/>
									<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
								</div>

								{/* İçerik */}
								<CardContent className="p-6">
									{/* Başlık */}
									<h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
										{service.title}
									</h3>

									{/* Açıklama */}
									<p className="text-muted-foreground mb-4 line-clamp-2">{service.description}</p>

									{/* Daha Fazla Butonu */}
									<Button
										variant="outline"
										className="relative overflow-hidden group/btn border-primary/30 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300 bg-transparent"
										onClick={() => setSelectedService(index)}
										aria-label={`${service.title} hakkında daha fazla bilgi`}
									>
										<span className="relative z-10">Daha Fazla</span>
										<span className="absolute inset-0 bg-primary scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left" />
									</Button>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Modal Panel */}
			{selectedService !== null && (
				<div
					className="fixed inset-0 z-[60] flex items-center justify-center p-4"
					role="dialog"
					aria-modal="true"
					aria-labelledby="service-panel-title"
				>
					{/* Overlay - sayfa soluklaştırma */}
					<div
						className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
						onClick={closePanel}
						aria-hidden="true"
					/>

					{/* Panel içeriği */}
					<div
						ref={panelRef}
						className={cn(
							'relative z-10 w-full max-w-2xl max-h-[90vh] bg-card rounded-xl shadow-2xl overflow-hidden',
							'animate-in zoom-in-95 fade-in duration-300'
						)}
					>
						{/* Kapatma butonu */}
						<button
							type="button"
							onClick={closePanel}
							className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors duration-200"
							aria-label="Paneli kapat"
						>
							<X className="w-5 h-5" />
						</button>

						{/* Panel görseli */}
						<div className="relative h-48 sm:h-64">
							<Image
								src={services[selectedService].image || '/placeholder.svg'}
								alt={services[selectedService].title}
								fill
								className="object-cover"
							/>
							<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
							<h3 id="service-panel-title" className="absolute bottom-4 left-6 text-2xl sm:text-3xl font-bold text-white">
								{services[selectedService].title}
							</h3>
						</div>

						{/* Panel içeriği - Metin scroll ve sabit WhatsApp butonu */}
						<div className="relative flex flex-col h-[calc(90vh-16rem)]">
							{/* Scroll olan yazı alanı */}
							<div
								className="
									flex-1 
									overflow-y-auto 
									p-6 
									space-y-4
									scrollbar-thin
									scrollbar-thumb-primary/40
									scrollbar-track-muted
								"
							>
								<div className="space-y-4">
									{services[selectedService].detailedDescription
										.split('. ')
										.filter(Boolean)
										.map((sentence, i) => {
											const text = sentence.trim()
											// Eğer metin zaten noktayla bitmişse tekrar nokta eklemeyelim
											const withDot = text.endsWith('.') ? text : `${text}.`
											return (
												<p key={i} className="text-foreground leading-relaxed text-[15px]">
													{withDot}
												</p>
											)
										})}
								</div>
							</div>

							{/* SABİT WhatsApp alanı */}
							<div className="sticky bottom-0 p-4 bg-card border-t border-border">
								<a
									href="https://wa.me/905551231234"
									target="_blank"
									rel="noopener noreferrer"
									className="
										flex items-center justify-center gap-2
										bg-[#25D366]
										text-white
										px-6 py-2
										rounded-lg
										hover:bg-[#20BA58]
										transition-colors
										duration-300
										w-full sm:w-auto
										shadow-lg
									"
								>
									<svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
										<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
									</svg>
									<span className="relative z-10 font-medium">WhatsApp ile İletişime Geç</span>
								</a>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
