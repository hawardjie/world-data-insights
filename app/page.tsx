'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import OverviewPanel from '@/components/sections/OverviewPanel';
import MoneyFinancePanel from '@/components/sections/MoneyFinancePanel';
import GDPPanel from '@/components/sections/GDPPanel';
import LaborPanel from '@/components/sections/LaborPanel';
import PricesPanel from '@/components/sections/PricesPanel';
import ExchangeRatesPanel from '@/components/sections/ExchangeRatesPanel';
import TradePanel from '@/components/sections/TradePanel';
import WorldDevelopmentPanel from '@/components/sections/WorldDevelopmentPanel';
import DemographicsPanel from '@/components/sections/DemographicsPanel';
import EnvironmentPanel from '@/components/sections/EnvironmentPanel';
import EducationPanel from '@/components/sections/EducationPanel';
import GenderEqualityPanel from '@/components/sections/GenderEqualityPanel';
import MigrationPanel from '@/components/sections/MigrationPanel';
import HealthEnergyPanel from '@/components/sections/HealthEnergyPanel';
import TourismPanel from '@/components/sections/TourismPanel';
import InteractiveDataExplorer from '@/components/sections/InteractiveDataExplorer';
import SearchPanel from '@/components/sections/SearchPanel';

export default function Home() {
  const [activeSection, setActiveSection] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setActiveSection('search');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewPanel onSectionChange={setActiveSection} />;
      case 'finance':
        return <MoneyFinancePanel />;
      case 'gdp':
        return <GDPPanel />;
      case 'labor':
        return <LaborPanel />;
      case 'prices':
        return <PricesPanel />;
      case 'exchange':
        return <ExchangeRatesPanel />;
      case 'trade':
        return <TradePanel />;
      case 'world':
        return <WorldDevelopmentPanel />;
      case 'demographics':
        return <DemographicsPanel />;
      case 'environment':
        return <EnvironmentPanel />;
      case 'education':
        return <EducationPanel />;
      case 'gender':
        return <GenderEqualityPanel />;
      case 'migration':
        return <MigrationPanel />;
      case 'health-energy':
        return <HealthEnergyPanel />;
      case 'tourism':
        return <TourismPanel />;
      case 'data-explorer':
        return <InteractiveDataExplorer />;
      case 'search':
        return <SearchPanel searchQuery={searchQuery} />;
      default:
        return <OverviewPanel onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar Navigation */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={toggleSidebar}
      />

      {/* Header with Search */}
      <Header onSearch={handleSearch} />

      {/* Main Content Area */}
      <main className={`mt-16 px-8 py-8 min-h-screen transition-all duration-300 ${
        sidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        <div className="max-w-7xl mx-auto">
          {renderSection()}
        </div>
      </main>

      <footer className={`bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12 transition-all duration-300 ${
        sidebarCollapsed ? 'ml-20' : 'ml-64'
      }`}>
        <div className="max-w-7xl mx-auto px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                About This Platform
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Comprehensive global economic data visualization platform combining FRED
                (800,000+ series) and World Bank indicators (16,000+ development indicators)
                for in-depth analysis of worldwide economic trends.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Key Data Categories
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• Money, Banking & Finance (FRED)</li>
                <li>• GDP & National Accounts (FRED)</li>
                <li>• World Development (World Bank)</li>
                <li>• Demographics & Vital Stats (World Bank)</li>
                <li>• Environment & Climate (World Bank)</li>
                <li>• Labor, Trade & Exchange Rates (FRED)</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Primary Data Sources
              </h3>
              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <li>• FRED (Federal Reserve)</li>
                <li>• World Bank WDI Database</li>
                <li>• UN Population Division</li>
                <li>• International Monetary Fund</li>
                <li>• OECD & Eurostat</li>
                <li>• Central Banks & National Agencies</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © 2025/2026 Econo World - Global Data Insights
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
