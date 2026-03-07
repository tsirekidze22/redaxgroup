import Image from "next/image";

export default function Services() {
  const services = [
    {
      icon: "/assets/icons/interior-design.png",
      title: "ინტერიერის დიზაინი",
      description:
        "სივრცის დაგეგმარება და 3D ვიზუალიზაცია. ჩვენ ვქმნით ესთეტიკურ და ფუნქციურ გარემოს, რომელიც თქვენს ინდივიდუალიზმს ასახავს.",
    },
    {
      icon: "/assets/icons/renovation.png",
      title: "რემონტი",
      description:
        "სრული სარემონტო მომსახურება. ჩვენი გუნდი უზრუნველყოფს ყველა ეტაპის შესრულებას - შავი კარკასიდან გასაღების ჩაბარებამდე.",
    },
    {
      icon: "/assets/icons/furniture.png",
      title: "ავეჯი",
      description:
        "ნებისმიერი სირთულის საყოფაცხოვრებო ავეჯის დამზადება. ხარისხიანი მასალები და თანამედროვე დიზაინი თქვენი კომფორტისთვის.",
    },
  ];
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#28292c] mb-12 md:mb-16 text-center ">
          სერვისები
        </h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  service,
}: {
  service: {
    icon: string;
    title: string;
    description: string;
  };
}) {
  return (
    <div
      id="services"
      className="group p-8 scroll-mt-50 rounded-lg text-center cursor-pointer transition-all duration-300"
    >
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 md:w-20 md:h-20 relative transition-all duration-500 ease-out group-hover:scale-110 group-hover:-translate-y-2">
          <Image
            src={service.icon}
            fill
            className="object-contain"
            alt={service.title}
          />
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-bold text-[#28292c] mb-4  transition-colors duration-300 group-hover:text-[#52555a]">
        {service.title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base text-gray-600 leading-relaxed transition-all duration-300 group-hover:text-gray-800">
        {service.description}
      </p>
    </div>
  );
}
