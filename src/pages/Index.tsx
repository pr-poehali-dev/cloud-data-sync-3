import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Card } from "@/components/ui/card";

const PEOPLE_DATA = [
  {
    id: 1,
    name: "Анна Смирнова",
    role: "UI/UX Дизайнер",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    portfolio: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400", "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400"],
    socials: { instagram: "@anna.design", telegram: "@annasmirn", linkedin: "anna-smirnova" },
    bio: "Создаю интерфейсы, которые работают"
  },
  {
    id: 2,
    name: "Дмитрий Волков",
    role: "Фотограф",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    portfolio: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400", "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400"],
    socials: { instagram: "@dmitry.photo", telegram: "@dvolkov", linkedin: "dmitry-volkov" },
    bio: "Ловлю моменты в путешествиях"
  },
  {
    id: 3,
    name: "Мария Петрова",
    role: "Frontend Developer",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    portfolio: ["https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400", "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400"],
    socials: { instagram: "@maria_codes", telegram: "@mpetro", linkedin: "maria-petrova" },
    bio: "Код и дизайн в одном флаконе"
  },
  {
    id: 4,
    name: "Алексей Иванов",
    role: "3D Artist",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    portfolio: ["https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400", "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400"],
    socials: { instagram: "@alex.3d", telegram: "@alexivanov", linkedin: "aleksey-ivanov" },
    bio: "Оживляю идеи в 3D"
  },
  {
    id: 5,
    name: "Екатерина Новикова",
    role: "Иллюстратор",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    portfolio: ["https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400", "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400"],
    socials: { instagram: "@kate.illustrates", telegram: "@katenovik", linkedin: "ekaterina-novikova" },
    bio: "Рисую истории и персонажей"
  },
  {
    id: 6,
    name: "Игорь Соколов",
    role: "Motion Designer",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop",
    portfolio: ["https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=400", "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400"],
    socials: { instagram: "@igor.motion", telegram: "@isokolov", linkedin: "igor-sokolov" },
    bio: "Всё в движении: графика и анимация"
  }
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPerson, setSelectedPerson] = useState<typeof PEOPLE_DATA[0] | null>(null);

  const filteredPeople = PEOPLE_DATA.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            FindMe
          </h1>
          <nav className="flex gap-6">
            <a href="#search" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
              Поиск
            </a>
            <a href="#about" className="text-gray-600 hover:text-indigo-600 transition-colors font-medium">
              О проекте
            </a>
          </nav>
        </div>
      </header>

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Найди своих людей
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Платформа, где креативщики делятся своими работами, контактами и находят единомышленников
          </p>
          
          <div className="max-w-2xl mx-auto relative">
            <Icon name="Search" size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Поиск по имени или профессии..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-indigo-500 shadow-lg"
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
                className="overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                onClick={() => setSelectedPerson(person)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={person.avatar}
                    alt={person.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{person.name}</h3>
                    <p className="text-sm opacity-90">{person.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{person.bio}</p>
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
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          onClick={() => setSelectedPerson(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-80 overflow-hidden">
              <img
                src={selectedPerson.avatar}
                alt={selectedPerson.name}
                className="w-full h-full object-cover"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/90 hover:bg-white rounded-full"
                onClick={() => setSelectedPerson(null)}
              >
                <Icon name="X" size={24} />
              </Button>
            </div>
            
            <div className="p-8">
              <h2 className="text-4xl font-bold mb-2">{selectedPerson.name}</h2>
              <p className="text-xl text-indigo-600 mb-4">{selectedPerson.role}</p>
              <p className="text-gray-600 mb-8">{selectedPerson.bio}</p>

              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                  <Icon name="Globe" size={20} />
                  Соцсети
                </h3>
                <div className="flex gap-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <Icon name="Instagram" size={18} />
                    {selectedPerson.socials.instagram}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Icon name="Send" size={18} />
                    {selectedPerson.socials.telegram}
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
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

      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">О FindMe</h2>
          <p className="text-lg text-gray-600 mb-8">
            Мы создали платформу, где творческие люди могут показать себя миру. 
            Здесь ты найдёшь дизайнеров, разработчиков, фотографов, художников и многих других. 
            Смотри их работы, узнавай больше через соцсети, находи вдохновение и связи.
          </p>
          <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-full px-8 py-6 text-lg">
            Добавить своё портфолио
          </Button>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            FindMe
          </h3>
          <p className="text-gray-400 mb-6">Твоя цифровая визитка в одном месте</p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Icon name="Instagram" size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Icon name="Send" size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Icon name="Linkedin" size={24} />
            </a>
          </div>
          <p className="text-gray-500 mt-8 text-sm">{new Date().getFullYear()} FindMe. Все права защищены.</p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
