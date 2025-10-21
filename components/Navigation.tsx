'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  Menu,
  X,
  LayoutDashboard,
  DollarSign,
  Users,
  Receipt,
  Globe,
  ArrowLeftRight,
  Search,
  Earth,
  Baby,
  Leaf,
} from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'overview', name: 'Overview', Icon: LayoutDashboard },
  { id: 'finance', name: 'Money & Finance', Icon: DollarSign },
  { id: 'gdp', name: 'GDP & National Accounts', Icon: TrendingUp },
  { id: 'labor', name: 'Labor Markets', Icon: Users },
  { id: 'prices', name: 'Prices & Inflation', Icon: Receipt },
  { id: 'trade', name: 'International Trade', Icon: Globe },
  { id: 'exchange', name: 'Exchange Rates', Icon: ArrowLeftRight },
  { id: 'world', name: 'World Development', Icon: Earth },
  { id: 'demographics', name: 'Demographics', Icon: Baby },
  { id: 'environment', name: 'Environment', Icon: Leaf },
  { id: 'search', name: 'Search Series', Icon: Search },
];

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white shadow-xl border-b border-blue-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
              <TrendingUp className="h-10 w-10" strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Econo World</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-1">
              {sections.map((section) => {
                const Icon = section.Icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => onSectionChange(section.id)}
                    className={`group relative px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                        : 'text-blue-50 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-1">
                      <Icon
                        className={`h-6 w-6 transition-transform duration-200 ${
                          isActive ? 'scale-110' : 'group-hover:scale-110'
                        }`}
                        strokeWidth={2}
                      />
                      <span className="text-xs whitespace-nowrap">{section.name}</span>
                    </div>
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-white rounded-t-full" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-3 rounded-xl text-blue-100 hover:text-white hover:bg-white/10 transition-all duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="h-7 w-7" strokeWidth={2.5} />
              ) : (
                <Menu className="h-7 w-7" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-blue-500 bg-blue-700/50 backdrop-blur-lg">
          <div className="px-4 pt-4 pb-4 space-y-2">
            {sections.map((section) => {
              const Icon = section.Icon;
              const isActive = activeSection === section.id;

              return (
                <button
                  key={section.id}
                  onClick={() => {
                    onSectionChange(section.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center space-x-4 px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-white/20 text-white shadow-lg'
                      : 'text-blue-50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="h-6 w-6" strokeWidth={2} />
                  <span className="text-base">{section.name}</span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
