import React from 'react';
import { useEffect } from 'react';
import { X, BarChart3, Plus, ShoppingCart } from 'lucide-react';
import TradingViewWidget from './TradingViewWidget';

interface ChartModalProps {
  isOpen: boolean;
  onClose: () => void;
  stockSymbol: string;
  stockName: string;
}

const ChartModal: React.FC<ChartModalProps> = ({ isOpen, onClose, stockSymbol, stockName }) => {
  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (isOpen) {
      // 현재 스크롤 위치 저장
      const scrollY = window.scrollY;
      
      // body에 스크롤 방지 클래스 추가
      document.body.classList.add('modal-open');
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        // 모달이 닫힐 때 원래 상태로 복원
        document.body.classList.remove('modal-open');
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        
        // 원래 스크롤 위치로 복원
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // 한국 주식 심볼을 트레이딩뷰 형식으로 변환
  const getTradingViewSymbol = (symbol: string) => {
    // 한국 주식의 경우 KRX: 접두사 추가
    if (symbol.match(/^\d{6}$/)) {
      return `KRX:${symbol}`;
    }
    // 기타 경우는 그대로 사용
    return symbol;
  };

  const tradingViewSymbol = getTradingViewSymbol(stockSymbol);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-2 sm:p-4">
      {/* 강화된 배경 오버레이 */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
        onClick={onClose}
        style={{ zIndex: -1 }}
      />
      
      {/* 메인 모달 컨테이너 */}
      <div className="relative w-full max-w-7xl h-[95vh] flex flex-col bg-gray-900 rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
        {/* 컴팩트한 헤더 */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-white/10 bg-gray-900 flex-shrink-0 relative z-10">
          <div className="flex items-center gap-2 sm:gap-3">
            <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-white">{stockName}</h2>
              <p className="text-gray-400 text-xs sm:text-sm">{stockSymbol}</p>
            </div>
          </div>
          
          {/* 헤더 액션 버튼들 */}
          <div className="flex items-center gap-2">
            <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              관심종목
            </button>
            <button className="hidden sm:flex items-center gap-1 px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">
              <ShoppingCart className="w-4 h-4" />
              매수
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-gray-300" />
            </button>
          </div>
        </div>

        {/* 차트 영역 - 완전히 채우기 */}
        <div className="flex-1 bg-gray-900 relative overflow-hidden" style={{ backgroundColor: "#111827" }}>
          {/* 추가 배경 레이어 */}
          <div className="absolute inset-0 bg-gray-900 z-0" style={{ backgroundColor: "#111827" }}></div>
          
          {/* TradingView 위젯 컨테이너 */}
          <div className="relative z-10 w-full h-full bg-gray-900" style={{ backgroundColor: "#111827" }}>
            <TradingViewWidget symbol={tradingViewSymbol} />
          </div>
        </div>

        {/* 모바일용 하단 액션 바 */}
        <div className="sm:hidden p-3 border-t border-white/10 bg-gray-900 flex-shrink-0 relative z-10">
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg transition-colors">
              <Plus className="w-4 h-4" />
              관심종목
            </button>
            <button className="flex-1 flex items-center justify-center gap-1 py-2 bg-green-600 hover:bg-green-700 text-white text-sm rounded-lg transition-colors">
              <ShoppingCart className="w-4 h-4" />
              매수
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartModal;