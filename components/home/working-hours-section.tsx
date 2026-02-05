'use client'

import { cn } from '@/lib/utils'
import { SectionAnimator } from '@/components/section-animator'

const workingHours = [
  { day: 'Pazartesi', hours: '09:00 - 18:00', dayIndex: 1 },
  { day: 'Salı', hours: '09:00 - 18:00', dayIndex: 2 },
  { day: 'Çarşamba', hours: '09:00 - 18:00', dayIndex: 3 },
  { day: 'Perşembe', hours: '09:00 - 18:00', dayIndex: 4 },
  { day: 'Cuma', hours: '09:00 - 18:00', dayIndex: 5 },
  { day: 'Cumartesi', hours: '10:00 - 14:00', dayIndex: 6 },
  { day: 'Pazar', hours: 'Kapalı', dayIndex: 0 },
]

export function WorkingHoursSection() {
  const today = new Date().getDay()

  return (
    <section className="relative py-20 bg-gradient-to-b from-secondary via-[#cdd9e2] to-[#f0efeb]">
        {/* Alt kısım yumuşak geçiş */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f0efeb] to-transparent" />
      <div className="container mx-auto px-4">
        <SectionAnimator animation="fade-up" className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Çalışma Saatleri
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hafta içi ve hafta sonu çalışma saatlerimiz aşağıdaki gibidir.
          </p>
        </SectionAnimator>

        {/* Mobile: Vertical List */}
        <div className="md:hidden space-y-3">
          {workingHours.map((item) => (
            <div
              key={item.day}
              className={cn(
                'flex justify-between items-center p-4 rounded-lg',
                today === item.dayIndex
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card'
              )}
            >
              <span className="font-medium">{item.day}</span>
              <span>{item.hours}</span>
            </div>
          ))}
        </div>

        {/* Desktop: Horizontal Table */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                {workingHours.map((item) => (
                  <th
                    key={item.day}
                    className={cn(
                      'px-4 py-3 text-center font-semibold rounded-t-lg',
                      today === item.dayIndex
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card text-foreground'
                    )}
                  >
                    {item.day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {workingHours.map((item) => (
                  <td
                    key={item.day}
                    className={cn(
                      'px-4 py-4 text-center rounded-b-lg',
                      today === item.dayIndex
                        ? 'bg-primary/90 text-primary-foreground'
                        : 'bg-card text-muted-foreground'
                    )}
                  >
                    {item.hours}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
