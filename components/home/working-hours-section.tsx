'use client'

import { cn } from '@/lib/utils'
import { SectionAnimator } from '@/components/section-animator'
import { Clock } from 'lucide-react' // Lucide-react kullandığını varsayıyorum

export function WorkingHoursSection() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-secondary via-[#cdd9e2] to-[#f0efeb] overflow-hidden">
      {/* Alt kısım yumuşak geçiş */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f0efeb] to-transparent" />

      <div className="container mx-auto px-4 relative z-10">
        <SectionAnimator animation="fade-up" className="text-center">
          
          {/* 7/24 Rozeti */}
          <div className="inline-flex items-center justify-center bg-primary/10 text-primary border border-primary/20 rounded-full px-6 py-2 mb-8 animate-pulse">
            <span className="relative flex h-3 w-3 mr-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
            <span className="font-bold tracking-wider uppercase text-sm">Şu an bizi arayabilirsiniz.</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 tracking-tight">
            Acil Tıkanıklıklarınız İçin <br className="md:hidden" /> Hemen iletişime Geçebilirsiniz.
          </h2>
          
          <div className="flex flex-col items-center justify-center space-y-4">
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
               Haftanın her günü, günün her saati hizmetinizdeyiz.
            </p>
            
            <div className="mt-8 p-8 bg-white/50 backdrop-blur-sm rounded-3xl border border-white shadow-xl inline-flex items-center gap-6">
               <div className="bg-primary text-white p-4 rounded-2xl shadow-lg shadow-primary/30">
                  <Clock size={40} strokeWidth={2.5} />
               </div>
               <div className="text-left">
                  <div className="text-4xl font-bold text-primary">7/24</div>
                  
               </div>
            </div>
          </div>

        </SectionAnimator>
      </div>
    </section>
  )
}