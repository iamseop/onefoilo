import React, { useState } from 'react';
import { Bell, Settings, User, LogOut, Calculator, Brain, Bookmark, TrendingUp } from 'lucide-react';
import Modal from './Modal';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifications = [
    { id: 1, message: '삼성전자가 2.5% 상승했습니다', time: '5분 전' },
    { id: 2, message: '포트폴리오 월간 리포트가 준비되었습니다', time: '1시간 전' },
    { id: 3, message: 'SK하이닉스 실적 발표 예정', time: '2시간 전' }
  ];

  const tabs = [
    { id: 'portfolio', label: '포트폴리오', icon: null },
    { id: 'watchlist', label: '관심 종목', icon: Bookmark },
    { id: 'simulation', label: '모의투자', icon: TrendingUp },
    { id: 'calculator', label: '계산기', icon: Calculator },
    { id: 'personality', label: '투자 성향', icon: Brain }
  ];

  return (
    <>
      <header className="relative top-0 left-0 right-0 glass-card backdrop-blur-xl border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => onTabChange('portfolio')}
                className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <span className="text-white font-bold text-sm">P</span>
              </button>
              
              <nav className="flex gap-1">
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => onTabChange(tab.id)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-300 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {IconComponent && <IconComponent className="w-4 h-4" />}
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setShowNotifications(true)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors relative"
              >
                <Bell className="w-5 h-5 text-gray-300" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => setShowSettings(true)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-300" />
              </button>
              <button 
                onClick={() => setShowProfile(true)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <User className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <Modal
        isOpen={showNotifications}
        onClose={() => setShowNotifications(false)}
        title="알림"
      >
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="p-4 bg-gray-800 rounded-lg">
              <p className="text-white text-sm">{notification.message}</p>
              <p className="text-gray-400 text-xs mt-1">{notification.time}</p>
            </div>
          ))}
        </div>
      </Modal>

      <Modal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        title="설정"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <span className="text-white">다크 모드</span>
            <input type="checkbox" defaultChecked className="toggle" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <span className="text-white">알림 설정</span>
            <input type="checkbox" defaultChecked className="toggle" />
          </div>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <span className="text-white">자동 새로고침</span>
            <input type="checkbox" className="toggle" />
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
        title="프로필"
      >
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <User className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg">김투자</h3>
            <p className="text-gray-400">investor@example.com</p>
          </div>
          <div className="space-y-2">
            <button className="w-full p-3 text-left hover:bg-white/5 rounded-lg transition-colors text-white">
              계정 설정
            </button>
            <button className="w-full p-3 text-left hover:bg-white/5 rounded-lg transition-colors text-white">
              투자 성향 설정
            </button>
            <button className="w-full p-3 text-left hover:bg-white/5 rounded-lg transition-colors text-red-400 flex items-center gap-2">
              <LogOut className="w-4 h-4" />
              로그아웃
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Header;