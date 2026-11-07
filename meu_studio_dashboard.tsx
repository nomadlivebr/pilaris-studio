import React from 'react';

// --- Icon Components (Inline SVGs for standalone reliability) ---
const IconLogo = () => (
  <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M50 15C30 15 15 30 15 50C15 70 30 85 50 85C70 85 85 70 85 50" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
    <path d="M35 65L50 35L65 65" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="50" cy="25" r="4" fill="#8B5CF6" />
    <path d="M25 50H75" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

const IconHome = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;
const IconCalendar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const IconUsers = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;
const IconBriefcase = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>;
const IconUserCircle = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const IconStore = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>; // reusing home for store for simplicity
const IconStar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;
const IconDollar = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>;
const IconBarChart = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>;
const IconSettings = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;
const IconLogOut = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;
const IconMoon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>;
const IconBell = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>;
const IconCreditCard = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>;
const IconAlertCircle = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>;
const IconTrendingUp = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>;
const IconChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>;
const IconCheckCircle = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;
const IconArrowRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>;

// --- Components ---

const SidebarItem = ({ icon, label, active }) => (
  <div className={`flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors ${active ? 'bg-[#7C3AED] text-white rounded-r-3xl mr-4' : 'text-gray-400 hover:text-white hover:bg-white/5 rounded-r-3xl mr-4'}`}>
    {icon}
    <span className="font-medium text-sm">{label}</span>
  </div>
);

const TopCard = ({ title, value, icon, gradient, change, changeUp }) => (
  <div className={`rounded-2xl p-6 text-white relative overflow-hidden flex items-center justify-between shadow-lg bg-gradient-to-r ${gradient}`}>
    {/* Decorative Wave Background (Simplified) */}
    <div className="absolute inset-0 opacity-20 pointer-events-none">
       <svg viewBox="0 0 400 150" preserveAspectRatio="none" className="w-full h-full">
         <path d="M0,50 C150,150 250,0 400,50 L400,150 L0,150 Z" fill="white" />
       </svg>
    </div>
    
    <div className="flex items-center gap-4 relative z-10">
      <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
        {icon}
      </div>
      <div>
        <h3 className="text-3xl font-bold">{value}</h3>
        <p className="text-sm font-medium opacity-90">{title}</p>
      </div>
    </div>
    <div className="relative z-10 self-start mt-1">
      <span className="text-xs font-semibold bg-white/20 px-2 py-1 rounded-full flex items-center gap-1 backdrop-blur-sm">
        {changeUp ? '↑' : '↓'} {change}
      </span>
    </div>
  </div>
);

const FinanceItem = ({ icon, label, value, iconColor, bgColor, badge, badgeColor }) => (
  <div className="flex flex-col gap-2">
    <div className="flex items-center gap-3">
      <div className={`p-3 rounded-full ${bgColor} ${iconColor}`}>
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold text-[#1E1B4B]">{value}</h4>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
      </div>
    </div>
    {badge && (
      <div className={`mt-1 inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold w-max ${badgeColor}`}>
        {badge}
      </div>
    )}
  </div>
);

const ScheduleItem = ({ time, title, students, maxStudents, status }) => {
  const statusStyles = {
    'Confirmada': 'bg-green-100 text-green-600',
    'Lotada': 'bg-purple-100 text-purple-600',
    'Disponível': 'bg-blue-100 text-blue-600',
  };

  const lineColors = {
    'Confirmada': 'bg-green-500',
    'Lotada': 'bg-orange-500',
    'Disponível': 'bg-blue-500',
  };

  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <span className="text-sm font-bold text-gray-600 w-12">{time}</span>
        <div className={`w-1 h-10 rounded-full ${lineColors[status] || 'bg-gray-300'}`}></div>
        <div>
          <h5 className="font-bold text-[#1E1B4B] text-sm">{title}</h5>
          <p className="text-xs text-gray-500">{students} / {maxStudents} alunos</p>
        </div>
      </div>
      <span className={`text-[10px] font-bold px-3 py-1 rounded-full ${statusStyles[status]}`}>
        {status}
      </span>
    </div>
  );
};

const QuickActionButton = ({ icon, label, iconColor, bgColor }) => (
  <button className="flex flex-col items-center justify-center gap-2 p-4 bg-[#F8F9FE] hover:bg-gray-100 transition-colors rounded-2xl">
    <div className={`p-3 rounded-xl ${bgColor} ${iconColor}`}>
      {icon}
    </div>
    <span className="text-xs font-semibold text-gray-600">{label}</span>
  </button>
);

export default function App() {
  return (
    <div className="flex h-screen bg-[#F4F5FB] font-sans overflow-hidden text-gray-800">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#231743] flex flex-col justify-between relative overflow-hidden shrink-0 z-20">
        <div>
          {/* Logo Section */}
          <div className="p-8 flex flex-col items-center justify-center">
            <IconLogo />
            <h1 className="text-white text-xl font-bold mt-2 tracking-wide">Meu Studio</h1>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 mt-4">
            <SidebarItem icon={<IconHome />} label="Início" active={true} />
            <SidebarItem icon={<IconCalendar />} label="Agenda" />
            <SidebarItem icon={<IconUsers />} label="Alunos" />
            <SidebarItem icon={<IconBriefcase />} label="Colaboradores" />
            <SidebarItem icon={<IconUserCircle />} label="Usuários" />
            <SidebarItem icon={<IconStore />} label="Studios" />
            <SidebarItem icon={<IconStar />} label="Avaliações" />
            <SidebarItem icon={<IconDollar />} label="Financeiro" />
            <SidebarItem icon={<IconBarChart />} label="Relatórios" />
            <SidebarItem icon={<IconSettings />} label="Configurações" />
          </nav>
        </div>

        {/* Logout & Decorative Waves */}
        <div className="pb-8 relative">
          <div className="absolute bottom-0 left-0 w-full h-48 pointer-events-none opacity-40">
             {/* Decorative abstract waves for bottom of sidebar */}
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-purple-500 fill-current">
                <path d="M43.5,-74.5C56.8,-66.4,68.4,-54.6,76.5,-41C84.6,-27.4,89.2,-11.9,86.9,2.8C84.6,17.4,75.4,31.2,64.2,42.4C53,53.7,39.8,62.5,25.3,69.1C10.8,75.7,-5,80.1,-20.3,77.7C-35.6,75.2,-50.4,65.9,-61.7,53.2C-73,40.4,-80.7,24.2,-83.4,7.2C-86.1,-9.8,-83.8,-27.6,-74.6,-41.8C-65.4,-56,-49.3,-66.6,-34,-74.1C-18.7,-81.6,-4.1,-86,10.6,-84.9C25.3,-83.8,40.6,-77.2,43.5,-74.5Z" transform="translate(100 100) scale(1.2)" fillOpacity="0.2" />
                <path d="M37.8,-61.1C50.2,-52.1,62.4,-42.6,69.5,-30C76.5,-17.4,78.3,-1.7,73.4,11.8C68.5,25.3,56.9,36.5,44.7,46C32.5,55.5,19.7,63.3,4.9,67.6C-9.9,71.9,-26.8,72.7,-40.7,65.6C-54.6,58.5,-65.4,43.5,-71.4,27.1C-77.4,10.7,-78.6,-7.1,-72.2,-22.1C-65.7,-37.1,-51.7,-49.3,-37.2,-57.8C-22.7,-66.2,-7.7,-70.9,5.7,-71C19.1,-71.1,38.2,-66.6,37.8,-61.1Z" transform="translate(50 150) scale(1.1)" fillOpacity="0.3" />
             </svg>
          </div>
          <div className="flex items-center gap-3 px-6 py-3 cursor-pointer text-gray-400 hover:text-white transition-colors relative z-10">
            <IconLogOut />
            <span className="font-medium text-sm">Logout</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto">
        
        {/* Header Background Image (Simulated with gradient/color for reliability, assuming image might not load in sandbox) */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#E6E1F9] to-transparent z-0 pointer-events-none opacity-60">
            {/* You would normally put <img src="image_e5b01f.jpg" ... /> here with object-cover and mask-image */}
        </div>

        <div className="p-8 pb-4 relative z-10 flex-1 max-w-[1400px] mx-auto w-full">
          
          {/* Header */}
          <header className="flex justify-between items-start mb-8">
            <div>
              <h2 className="text-[32px] font-extrabold text-[#1E1B4B] flex items-center gap-2">
                Olá, Admin! <span className="text-2xl">👋</span>
              </h2>
              <p className="text-gray-500 text-sm mt-1">Bem-vindo ao Meu Studio. Aqui está um resumo das atividades do seu estúdio.</p>
            </div>
            
            <div className="flex items-center gap-5">
              <button className="text-gray-600 hover:text-purple-600 transition-colors">
                <IconMoon />
              </button>
              <div className="relative cursor-pointer text-gray-600 hover:text-purple-600 transition-colors">
                <IconBell />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#F4F5FB]">3</span>
              </div>
              <div className="flex items-center gap-2 cursor-pointer bg-white px-3 py-1.5 rounded-full shadow-sm">
                <div className="w-8 h-8 rounded-full bg-[#1E1B4B] text-white flex items-center justify-center font-bold text-xs">AD</div>
                <IconChevronDown />
              </div>
            </div>
          </header>

          {/* Top Cards Grid */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <TopCard 
              title="Alunos Ativos" value="124" 
              icon={<IconUsers />} 
              gradient="from-[#9333EA] to-[#6366F1]" 
              change="8%" changeUp={true} 
            />
            <TopCard 
              title="Aulas Hoje" value="18" 
              icon={<IconCalendar />} 
              gradient="from-[#4F46E5] to-[#3B82F6]" 
              change="0%" changeUp={true} 
            />
            <TopCard 
              title="Colaboradores" value="6" 
              icon={<IconUsers />} 
              gradient="from-[#14B8A6] to-[#10B981]" 
              change="0%" changeUp={true} 
            />
            <TopCard 
              title="Studios" value="2" 
              icon={<IconStore />} 
              gradient="from-[#F59E0B] to-[#F97316]" 
              change="0%" changeUp={true} 
            />
          </div>

          {/* Middle Section: Finance & Schedule */}
          <div className="grid grid-cols-12 gap-6 mb-6">
            
            {/* Left Column (Finance - spans 7 cols) */}
            <div className="col-span-12 lg:col-span-7 flex flex-col gap-6">
              
              {/* Financeiro Summary Card */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] relative">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-[#1E1B4B] flex items-center gap-2">
                    <IconTrendingUp className="text-purple-600" /> Financeiro
                  </h3>
                  <button className="text-sm font-semibold text-purple-600 flex items-center gap-1 hover:underline">
                    Ver detalhes <IconArrowRight />
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <FinanceItem 
                    icon={<IconDollar />} label="Receita do Mês" value="R$ 24.850,50" 
                    iconColor="text-purple-600" bgColor="bg-purple-100"
                    badge="↑ 12%" badgeColor="bg-green-100 text-green-700"
                  />
                  <div className="hidden md:block w-px bg-gray-100 h-16 self-center justify-self-center"></div>
                  <FinanceItem 
                    icon={<IconCreditCard />} label="Mensalidades Pendentes" value="R$ 3.420,00" 
                    iconColor="text-orange-500" bgColor="bg-orange-100"
                  />
                  <div className="hidden md:block w-px bg-gray-100 h-16 self-center justify-self-center"></div>
                  <FinanceItem 
                    icon={<IconAlertCircle />} label="Pagamentos Atrasados" value="R$ 1.250,00" 
                    iconColor="text-red-500" bgColor="bg-red-100"
                  />
                </div>
              </div>

              {/* Evolução Financeira Chart Card */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex-1">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-[#1E1B4B] flex items-center gap-2">
                    <IconTrendingUp className="text-purple-600" /> Evolução Financeira
                  </h3>
                  <button className="text-xs font-semibold text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200 flex items-center gap-2">
                    Últimos 6 meses <IconChevronDown />
                  </button>
                </div>
                
                {/* Custom SVG Chart to match the image exactly without external libraries */}
                <div className="relative h-64 w-full pt-4">
                  <svg viewBox="0 0 800 250" preserveAspectRatio="none" className="w-full h-full overflow-visible">
                    <defs>
                      <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#7C3AED" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>
                    
                    {/* Grid lines */}
                    {[0, 50, 100, 150, 200].map((y, i) => (
                      <g key={`grid-${i}`}>
                        <line x1="40" y1={y} x2="780" y2={y} stroke="#E5E7EB" strokeWidth="1" />
                        <text x="30" y={y + 4} fill="#9CA3AF" fontSize="12" textAnchor="end" fontWeight="500">
                           {['20k', '15k', '10k', '5k', '0'][i]}
                        </text>
                      </g>
                    ))}

                    {/* Chart Area */}
                    <path d="M 40 120 C 150 90, 250 110, 350 120 C 450 130, 550 90, 650 110 C 700 120, 750 100, 780 70 L 780 200 L 40 200 Z" fill="url(#chartGradient)" />
                    
                    {/* Chart Line */}
                    <path d="M 40 120 C 150 90, 250 110, 350 120 C 450 130, 550 90, 650 110 C 700 120, 750 100, 780 70" fill="none" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                    {/* Data Points */}
                    <circle cx="40" cy="120" r="4" fill="#7C3AED" />
                    <circle cx="188" cy="100" r="4" fill="#7C3AED" />
                    <circle cx="336" cy="115" r="4" fill="#7C3AED" />
                    <circle cx="484" cy="95" r="4" fill="#7C3AED" />
                    <circle cx="632" cy="105" r="4" fill="#7C3AED" />
                    <circle cx="780" cy="70" r="5" fill="#7C3AED" stroke="white" strokeWidth="2" />

                    {/* Tooltip on last point */}
                    <g transform="translate(680, 40)">
                      <rect x="0" y="0" width="100" height="30" rx="15" fill="#7C3AED" />
                      <text x="50" y="20" fill="white" fontSize="12" fontWeight="bold" textAnchor="middle">R$ 24.850,50</text>
                    </g>

                    {/* X Axis Labels */}
                    {['Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'].map((label, i) => (
                      <text key={`label-${i}`} x={40 + (i * 148)} y="230" fill="#9CA3AF" fontSize="12" textAnchor="middle" fontWeight="500">
                        {label}
                      </text>
                    ))}
                  </svg>
                </div>
              </div>
            </div>

            {/* Right Column (Schedule & Quick Actions - spans 5 cols) */}
            <div className="col-span-12 lg:col-span-5 flex flex-col gap-6">
              
              {/* Agenda de Hoje */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex-1">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold text-[#1E1B4B] flex items-center gap-2">
                    <IconCalendar className="text-purple-600" /> Agenda de Hoje
                  </h3>
                  <button className="text-sm font-semibold text-purple-600 flex items-center gap-1 hover:underline">
                    Ver todas <IconArrowRight />
                  </button>
                </div>
                
                <div className="flex flex-col divide-y divide-gray-50">
                  <ScheduleItem time="07:00" title="Pilates Solo" students="8" maxStudents="10" status="Confirmada" />
                  <ScheduleItem time="08:00" title="Pilates Solo" students="10" maxStudents="10" status="Lotada" />
                  <ScheduleItem time="09:00" title="Pilates Solo" students="7" maxStudents="10" status="Confirmada" />
                  <ScheduleItem time="10:00" title="Pilates Solo" students="6" maxStudents="10" status="Disponível" />
                </div>
              </div>

              {/* Ações Rápidas */}
              <div className="bg-white rounded-3xl p-6 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]">
                <h3 className="text-lg font-bold text-[#1E1B4B] flex items-center gap-2 mb-6">
                  <span className="text-purple-600 font-extrabold text-xl">⚡</span> Ações Rápidas
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <QuickActionButton icon={<IconCalendar />} label="Agenda" bgColor="bg-purple-100" iconColor="text-purple-600" />
                  <QuickActionButton icon={<IconUsers />} label="Alunos" bgColor="bg-blue-100" iconColor="text-blue-600" />
                  <QuickActionButton icon={<IconBriefcase />} label="Colaboradores" bgColor="bg-green-100" iconColor="text-green-600" />
                  <QuickActionButton icon={<IconStore />} label="Studios" bgColor="bg-orange-100" iconColor="text-orange-500" />
                  <QuickActionButton icon={<IconStar />} label="Avaliações" bgColor="bg-indigo-100" iconColor="text-indigo-600" />
                  <QuickActionButton icon={<IconDollar />} label="Financeiro" bgColor="bg-pink-100" iconColor="text-pink-600" />
                </div>
              </div>

            </div>
          </div>

          {/* Bottom Section */}
          <div className="grid grid-cols-3 gap-6">
             
             {/* Novos Alunos */}
             <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-purple-100 p-3 rounded-full text-purple-600">
                    <IconStar />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Novos Alunos</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-[#1E1B4B]">+12</span>
                      <span className="text-xs text-gray-400">este mês</span>
                    </div>
                  </div>
                </div>
                {/* Mini Bar Chart */}
                <div className="flex items-end gap-1 h-8">
                  <div className="w-1.5 bg-purple-200 rounded-t-sm h-3"></div>
                  <div className="w-1.5 bg-purple-200 rounded-t-sm h-5"></div>
                  <div className="w-1.5 bg-purple-300 rounded-t-sm h-4"></div>
                  <div className="w-1.5 bg-purple-400 rounded-t-sm h-6"></div>
                  <div className="w-1.5 bg-purple-500 rounded-t-sm h-8"></div>
                </div>
             </div>

             {/* Avaliações Pendentes */}
             <div className="bg-white rounded-2xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <IconCheckCircle />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-500">Avaliações Pendentes</p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-[#1E1B4B]">8</span>
                      <span className="text-xs text-gray-400">para responder</span>
                    </div>
                  </div>
                </div>
                 {/* Mini Bar Chart */}
                 <div className="flex items-end gap-1 h-8">
                  <div className="w-1.5 bg-green-200 rounded-t-sm h-4"></div>
                  <div className="w-1.5 bg-green-300 rounded-t-sm h-2"></div>
                  <div className="w-1.5 bg-green-300 rounded-t-sm h-5"></div>
                  <div className="w-1.5 bg-green-400 rounded-t-sm h-7"></div>
                  <div className="w-1.5 bg-green-500 rounded-t-sm h-8"></div>
                </div>
             </div>

             {/* Inspirational Card */}
             <div className="bg-gradient-to-r from-[#F0E6FF] to-[#FDF4FF] rounded-2xl p-5 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] relative overflow-hidden flex items-center justify-between">
                <div className="relative z-10">
                  <h4 className="font-bold text-[#1E1B4B] text-sm">Cuide do corpo, fortaleça a mente!</h4>
                  <p className="text-xs text-gray-500 mt-1">Seu estúdio cada vez mais completo.</p>
                </div>
                {/* Decorative Lotus Flower Icon */}
                <div className="relative z-10 text-purple-300">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" opacity="0.6">
                    <path d="M12 2C12 2 15 7 15 11C15 15 12 18 12 18C12 18 9 15 9 11C9 7 12 2 12 2ZM12 22C12 22 17 19 19 15C21 11 20 7 20 7C20 7 18 10 15 11C12 12 12 18 12 18ZM12 22C12 22 7 19 5 15C3 11 4 7 4 7C4 7 6 10 9 11C12 12 12 18 12 18Z" />
                  </svg>
                </div>
                {/* Decorative Background Blob */}
                <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/40 rounded-full blur-xl -mr-10 -mb-10"></div>
             </div>

          </div>

        </div>
      </main>
    </div>
  );
}