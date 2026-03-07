import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";

export default function Contact() {
  const contactDetails = [
    {
      icon: Phone,
      label: "ტელეფონი",
      value: "032 219 78 98",
      href: "tel:+995322197898",
      target: undefined as string | undefined,
    },
    {
      icon: Mail,
      label: "ელ-ფოსტა",
      value: "redaxgroupsales@gmail.com",
      href: "mailto:redaxgroupsales@gmail.com",
      target: undefined as string | undefined,
    },
    {
      icon: MapPin,
      label: "მისამართი",
      value: "თბილისი, საქართველო",
      href: "https://maps.google.com",
      target: "_blank",
    },
    {
      icon: Clock,
      label: "სამუშაო საათები",
      value: "ორ–შაბ: 09:00–19:00",
      href: null,
      target: undefined as string | undefined,
    },
  ];

  const trustBadges = ["ხელშეკრულება", "ფიქსირებული ფასი", "გარანტია"];

  return (
    <section
      id="contact"
      className="py-16 md:py-24 bg-white relative overflow-hidden"
    >
      {/* Subtle background accent */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(40,41,44,0.04)_0%,_transparent_60%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 lg:px-24 relative">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
            კონტაქტი
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#28292c] mb-4">
            დაგვიკავშირდით
          </h2>
          <div className="w-12 h-[3px] bg-[#28292c] mx-auto mb-5 rounded-full" />
          <p className="text-base md:text-lg text-gray-500 max-w-lg mx-auto leading-relaxed">
            გვითხარით რა გჭირდებათ - ჩვენი გუნდი მზად არის დაგეხმაროთ
          </p>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-5 items-stretch">
          {/* Left: Contact Info List */}
          <div className="flex flex-col gap-3">
            {contactDetails.map((item, index) => {
              const Icon = item.icon;
              const isLink = !!item.href;

              const inner = (
                <div className="group flex items-center gap-5 bg-gray-50 hover:bg-[#28292c] border border-gray-100 hover:border-[#28292c] rounded-2xl px-6 py-5 transition-all duration-300 cursor-pointer">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-white group-hover:bg-white/10 border border-gray-100 group-hover:border-white/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 shadow-sm">
                    <Icon className="w-5 h-5 text-[#28292c] group-hover:text-white transition-colors duration-300" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 group-hover:text-white/50 mb-0.5 transition-colors duration-300">
                      {item.label}
                    </p>
                    <p className="text-[#28292c] group-hover:text-white font-semibold text-sm md:text-base truncate transition-colors duration-300">
                      {item.value}
                    </p>
                  </div>

                  {/* Arrow for links */}
                  {isLink && (
                    <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-white/60 flex-shrink-0 transition-all duration-300 group-hover:translate-x-0.5" />
                  )}
                </div>
              );

              return item.href ? (
                <a
                  key={index}
                  href={item.href}
                  target={item.target}
                  rel={
                    item.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                  className="block"
                >
                  {inner}
                </a>
              ) : (
                <div key={index}>{inner}</div>
              );
            })}
          </div>

          {/* Right: CTA Panel */}
          <div className="bg-gradient-to-br from-[#28292c] to-[#3c3e44] rounded-2xl p-8 md:p-10 flex flex-col justify-between gap-8 relative overflow-hidden">
            {/* Decorative ring */}
            <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute -top-4 -right-4 w-32 h-32 rounded-full border border-white/5 pointer-events-none" />

            {/* Top content */}
            <div className="relative">
              <h3 className="text-white text-2xl md:text-3xl font-bold mb-3 leading-tight">
                მზად ვართ <br className="hidden md:block" />
                დაგეხმაროთ
              </h3>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-6">
                დაგვიკავშირდით ნებისმიერი კითხვით - შევადგენთ სავარაუდო
                ხარჯთაღრიცხვას და განვიხილავთ თქვენს პროექტს.
              </p>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-2">
                {trustBadges.map((badge) => (
                  <span
                    key={badge}
                    className="inline-flex items-center gap-1.5 bg-white/8 border border-white/10 text-white/70 text-xs font-medium px-3 py-1.5 rounded-full"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0" />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-white/10 relative" />

            {/* CTA Buttons */}
            <div className="flex flex-col gap-3 relative">
              {/* WhatsApp */}
              <a
                href="https://wa.me/995322197898"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 bg-[#25D366] hover:bg-[#20BA5A] text-white px-6 py-4 rounded-xl transition-all duration-300 font-semibold"
              >
                <div className="w-10 h-10 bg-black/15 group-hover:bg-black/20 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white/60 mb-0.5">
                    პირდაპირი კავშირი
                  </div>
                  <div className="text-base">კონსულტაცია WhatsApp-ით</div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/50 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* Phone */}
              <a
                href="tel:+995322197898"
                className="group flex items-center gap-4 bg-white/8 hover:bg-white/14 border border-white/10 hover:border-white/20 text-white px-6 py-4 rounded-xl transition-all duration-300 font-semibold"
              >
                <div className="w-10 h-10 bg-white/10 group-hover:bg-white/15 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white/60 mb-0.5">
                    სატელეფონო ზარი
                  </div>
                  <div className="text-base">032 219 78 98</div>
                </div>
                <ArrowRight className="w-4 h-4 text-white/30 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
