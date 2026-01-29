import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PEOPLE_DATA = [
  {
    id: 1,
    name: "Анна Смирнова",
    role: "UI/UX Дизайнер",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    portfolio: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
    socials: { instagram: "@anna.design", telegram: "@annasmirn", linkedin: "anna-smirnova" },
    bio: "Создаю интерфейсы, которые работают",
    isPro: true
  },
  {
    id: 2,
    name: "Дмитрий Волков",
    role: "Фотограф",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    portfolio: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400"],
    socials: { instagram: "@dmitry.photo", telegram: "@dvolkov", linkedin: "dmitry-volkov" },
    bio: "Ловлю моменты в путешествиях",
    isPro: false
  },
  {
    id: 3,
    name: "Мария Петрова",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    portfolio: ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400"],
    socials: { instagram: "@maria_codes", telegram: "@mpetro", linkedin: "maria-petrova" },
    bio: "Код и дизайн в одном флаконе",
    isPro: true
  },
  {
    id: 4,
    name: "Алексей Иванов",
    role: "3D Artist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    portfolio: ["https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400", "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400"],
    socials: { instagram: "@alex.3d", telegram: "@alexivanov", linkedin: "aleksey-ivanov" },
    bio: "Оживляю идеи в 3D",
    isPro: false
  },
  {
    id: 5,
    name: "Екатерина Новикова",
    role: "Иллюстратор",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    portfolio: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400", "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400"],
    socials: { instagram: "@kate.illustrates", telegram: "@katenovik", linkedin: "ekaterina-novikova" },
    bio: "Рисую истории и персонажей",
    isPro: true
  },
  {
    id: 6,
    name: "Игорь Соколов",
    role: "Motion Designer",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    portfolio: ["https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400", "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400"],
    socials: { instagram: "@igor.motion", telegram: "@isokolov", linkedin: "igor-sokolov" },
    bio: "Всё в движении: графика и анимация",
    isPro: false
  }
];

const PRICING_PLANS = [
  {
    name: "Basic",
    price: 0,
    period: "навсегда",
    features: ["Базовый профиль", "До 3 работ в портфолио", "Ссылки на соцсети", "Поиск по платформе"],
    color: "from-gray-600 to-gray-800"
  },
  {
    name: "PRO",
    price: 499,
    period: "в месяц",
    features: ["Приоритет в поиске", "Неограниченное портфолио", "Аналитика просмотров", "Значок PRO", "Кастомный URL", "Без рекламы"],
    color: "from-purple-600 to-indigo-600",
    popular: true
  },
  {
    name: "Business",
    price: 1499,
    period: "в месяц",
    features: ["Всё из PRO", "Команда до 10 человек", "Брендирование профиля", "API доступ", "Приоритетная поддержка"],
    color: "from-amber-600 to-orange-600"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<typeof PEOPLE_DATA[0] | null>(null);
  const [showPricing, setShowPricing] = useState(false);

  const filteredPeople = PEOPLE_DATA.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubscribe = async (planName: string, price: number) => {
    if (price === 0) {
      alert("Бесплатный план уже активен!");
      return;
    }

    const confirmed = confirm(`Оформить подписку ${planName} за ${price}₽/месяц?`);
    if (confirmed) {
      try {
        const response = await fetch('https://functions.poehali.dev/dcac3a2d-68f1-41a9-986e-93f4913e665f', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            plan_name: planName,
            price: price
          })
        });

        const data = await response.json();
        
        if (data.checkout_url) {
          window.location.href = data.checkout_url;
        } else {
          alert(`Ошибка: ${data.error || 'Не удалось создать сессию оплаты'}`);
        }
      } catch (error) {
        alert('Ошибка соединения с сервером');
      }
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            FindMe
          </h1>
          <nav className="flex gap-6 items-center">
            <a href="#search" className="text-gray-300 hover:text-white transition-colors font-medium">
              Поиск
            </a>
            <button
              onClick={() => setShowPricing(true)}
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              PRO
            </button>
            <a href="#download" className="text-gray-300 hover:text-white transition-colors font-medium">
              Скачать
            </a>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-indigo-400 to-pink-400 bg-clip-text text-transparent">
            Найди своих людей
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Платформа, где креативщики делятся своими работами, контактами и находят единомышленников
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <Input
              type="text"
              placeholder="Поиск по имени или профессии..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg rounded-full bg-gray-900 border-gray-800 focus:border-purple-500 shadow-lg text-white placeholder:text-gray-500"
            />
          </div>
        </div>
      </section>

      <section id="search" className="pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPeople.map((person) => (
              <Card
                key={person.id}
                className="overflow-hidden cursor-pointer bg-gray-900 border-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
                onClick={() => setSelectedPerson(person)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                  {person.isPro && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 border-0">
                      PRO
                    </Badge>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{person.name}</h3>
                    <p className="text-sm opacity-90">{person.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-400 mb-4">{person.bio}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {person.portfolio.slice(0, 2).map((img, idx) => (
                      <div key={idx} className="aspect-square rounded-lg overflow-hidden">
                        <img src={img} alt="" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {selectedPerson && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedPerson(null)}
        >
          <div
            className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={selectedPerson.avatar}
                alt={selectedPerson.name}
                className="w-full h-full object-cover"
              />
              {selectedPerson.isPro && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-purple-600 to-indigo-600 border-0 text-lg px-4 py-2">
                  PRO
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-gray-900/90 hover:bg-gray-800 rounded-full text-white"
                onClick={() => setSelectedPerson(null)}
              >
                <Icon name="X" size={24} />
              </Button>
            </div>
            
            <div className="p-8">
              <h2 className="text-4xl font-bold mb-2">{selectedPerson.name}</h2>
              <p className="text-xl text-purple-400 mb-4">{selectedPerson.role}</p>
              <p className="text-gray-400 mb-8">{selectedPerson.bio}</p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Globe" size={20} />
                  Соцсети
                </h3>
                <div className="flex gap-4 flex-wrap">
                  <Button variant="outline" className="flex items-center gap-2 bg-gray-800 border-gray-700 hover:bg-gray-700">
                    <Icon name="Instagram" size={18} />
                    {selectedPerson.socials.instagram}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-gray-800 border-gray-700 hover:bg-gray-700">
                    <Icon name="Send" size={18} />
                    {selectedPerson.socials.telegram}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2 bg-gray-800 border-gray-700 hover:bg-gray-700">
                    <Icon name="Linkedin" size={18} />
                    {selectedPerson.socials.linkedin}
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Briefcase" size={20} />
                  Портфолио
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {selectedPerson.portfolio.map((img, idx) => (
                    <div key={idx} className="aspect-video rounded-lg overflow-hidden shadow-lg">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showPricing && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setShowPricing(false)}
        >
          <div
            className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-4xl font-bold">Выбери свой план</h2>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-gray-800 rounded-full"
                onClick={() => setShowPricing(false)}
              >
                <Icon name="X" size={24} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRICING_PLANS.map((plan) => (
                <Card
                  key={plan.name}
                  className={`relative overflow-hidden bg-gray-800 border-gray-700 p-6 ${
                    plan.popular ? "ring-2 ring-purple-500" : ""
                  }`}
                >
                  {plan.popular && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 border-0">
                      Популярный
                    </Badge>
                  )}
                  
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} mb-4 flex items-center justify-center`}>
                    <Icon name={plan.name === "PRO" ? "Zap" : plan.name === "Business" ? "Briefcase" : "User"} size={32} className="text-white" />
                  </div>

                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price === 0 ? "Бесплатно" : `${plan.price}₽`}</span>
                    {plan.price > 0 && <span className="text-gray-400 ml-2">{plan.period}</span>}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Icon name="Check" size={20} className="text-green-500 mt-0.5 shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}
                    onClick={() => handleSubscribe(plan.name, plan.price)}
                  >
                    {plan.price === 0 ? "Текущий план" : "Оформить подписку"}
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      <section id="download" className="py-20 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Скачай приложение</h2>
          <p className="text-lg text-gray-400 mb-12">
            Все контакты креативщиков всегда под рукой. Доступно на всех платформах.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-6 text-lg flex items-center gap-3">
              <Icon name="Apple" size={24} />
              App Store
            </Button>
            <Button size="lg" className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-6 text-lg flex items-center gap-3">
              <Icon name="Smartphone" size={24} />
              Google Play
            </Button>
            <Button size="lg" className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-6 text-lg flex items-center gap-3">
              <Icon name="Monitor" size={24} />
              Windows / Mac
            </Button>
          </div>

          <div className="mt-12 p-6 bg-gray-800 rounded-2xl border border-gray-700">
            <h3 className="text-xl font-semibold mb-4 flex items-center justify-center gap-2">
              <Icon name="Sparkles" size={24} className="text-purple-400" />
              PRO функции в приложении
            </h3>
            <p className="text-gray-400">
              Аналитика просмотров профиля, push-уведомления о новых подписчиках, 
              офлайн-доступ к избранным портфолио и эксклюзивные темы оформления.
            </p>
          </div>
        </div>
      </section>

      <footer className="bg-gray-950 border-t border-gray-800 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            FindMe
          </h3>
          <p className="text-gray-500 mb-6">Твоя цифровая визитка в одном месте</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Icon name="Instagram" size={24} />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Icon name="Send" size={24} />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Icon name="Linkedin" size={24} />
            </a>
          </div>
          <p className="text-gray-600 mt-8 text-sm">{new Date().getFullYear()} FindMe. Все права защищены.</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;