import { Phone, Mail, MapPin, Facebook } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const contactInfo = [
    {
      icon: Phone,
      label: "ტელეფონი",
      value: "032 219 78 98",
      href: "tel:+995322197898",
    },
    {
      icon: Mail,
      label: "ელ-ფოსტა",
      value: "redaxgroupsales@gmail.com",
      href: "mailto:redaxgroupsales@gmail.com",
    },
    {
      icon: MapPin,
      label: "მისამართი",
      value: "თბილისი, საქართველო",
      href: "https://maps.google.com",
    },
  ];

  const services = [
    "ინტერიერის დიზაინი",
    "სარემონტო მომსახურება",
    "ავეჯის დამზადება",
  ];

  return (
    <footer className="bg-[#28292c] text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-white text-2xl font-bold  mb-4">RedaxGroup</h3>
            <p className="text-sm leading-relaxed">
              საიმედო სარემონტო მომსახურება თბილისში. ჩვენ ვქმნით სივრცეებს,
              რომლებიც ასახავს თქვენს ხედვას და სტილს.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 ">
              სერვისები
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <a
                    href="#services"
                    className="text-sm hover:text-white transition-colors duration-300"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 ">
              სწრაფი ბმულები
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#about"
                  className="text-sm hover:text-white transition-colors duration-300"
                >
                  ჩვენ შესახებ
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="text-sm hover:text-white transition-colors duration-300"
                >
                  პროექტები
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="text-sm hover:text-white transition-colors duration-300"
                >
                  კონტაქტი
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4 ">კონტაქტი</h4>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <a
                      href={item.href}
                      target={item.icon === MapPin ? "_blank" : undefined}
                      rel={
                        item.icon === MapPin ? "noopener noreferrer" : undefined
                      }
                      className="flex items-start gap-3 text-sm hover:text-white transition-colors duration-300 group"
                    >
                      <Icon className="w-5 h-5 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">
                          {item.label}
                        </div>
                        <div>{item.value}</div>
                      </div>
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* Social Links */}
            <div className="mt-6 flex flex-col gap-2">
              {/* WhatsApp */}
              <a
                href="https://wa.me/995322197898"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-gray-700 hover:bg-[#25D366] text-gray-300 hover:text-white px-4 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium w-full"
              >
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                WhatsApp
              </a>
              {/* Facebook */}
              <a
                href="https://www.facebook.com/profile.php?id=61556843705444"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-gray-700 hover:bg-[#1877F2] text-gray-300 hover:text-white px-4 py-2.5 rounded-lg transition-all duration-300 text-sm font-medium w-full"
              >
                <Facebook className="w-4 h-4 flex-shrink-0" />
                Facebook
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>© {currentYear} RedaxGroup. ყველა უფლება დაცულია.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
