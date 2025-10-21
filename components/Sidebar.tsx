'use client';

import React from 'react';
import {
  TrendingUp,
  LayoutDashboard,
  DollarSign,
  Users,
  Receipt,
  Globe,
  ArrowLeftRight,
  Earth,
  Baby,
  Leaf,
  GraduationCap,
  Scale,
  Plane,
  Heart,
  Palmtree,
  Search,
} from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

const sections = [
  { id: 'overview', name: 'Overview', Icon: LayoutDashboard },
  { id: 'data-explorer', name: 'Interactive Explorer', Icon: Search },
  { id: 'finance', name: 'Money & Finance', Icon: DollarSign },
  { id: 'gdp', name: 'GDP & National Accounts', Icon: TrendingUp },
  { id: 'labor', name: 'Labor Markets', Icon: Users },
  { id: 'prices', name: 'Prices & Inflation', Icon: Receipt },
  { id: 'trade', name: 'International Trade', Icon: Globe },
  { id: 'exchange', name: 'Exchange Rates', Icon: ArrowLeftRight },
  { id: 'world', name: 'World Development', Icon: Earth },
  { id: 'demographics', name: 'Demographics', Icon: Baby },
  { id: 'environment', name: 'Environment', Icon: Leaf },
  { id: 'education', name: 'Education', Icon: GraduationCap },
  { id: 'gender', name: 'Gender Equality', Icon: Scale },
  { id: 'migration', name: 'Migration', Icon: Plane },
  { id: 'health-energy', name: 'Health & Energy', Icon: Heart },
  { id: 'tourism', name: 'Tourism', Icon: Palmtree },
];

export default function Sidebar({ activeSection, onSectionChange, isCollapsed = false, onToggleCollapse }: SidebarProps) {
  return (
    <aside className={`fixed left-0 top-0 h-screen bg-gradient-to-b from-blue-600 via-blue-700 to-indigo-700 text-white shadow-2xl z-40 transition-all duration-300 flex flex-col ${
      isCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Logo */}
      <div className="p-6 border-b border-blue-500 flex-shrink-0">
        <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'}`}>
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm">
            <TrendingUp className="h-8 w-8" strokeWidth={2.5} />
          </div>
          {!isCollapsed && (
            <div>
              <h1 className="text-xl font-bold tracking-tight">Econo World</h1>
              <p className="text-xs text-blue-200">Global Data Insights</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items - Scrollable */}
      <nav className="p-4 space-y-1 flex-1 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-blue-400 scrollbar-track-blue-800">
        {sections.map((section) => {
          const Icon = section.Icon;
          const isActive = activeSection === section.id;

          return (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              title={isCollapsed ? section.name : undefined}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-white/20 text-white shadow-lg backdrop-blur-sm'
                  : 'text-blue-50 hover:bg-white/10 hover:text-white'
              }`}
            >
              <Icon
                className={`h-5 w-5 flex-shrink-0 transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'group-hover:scale-110'
                }`}
                strokeWidth={2}
              />
              {!isCollapsed && (
                <>
                  <span className="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
                    {section.name}
                  </span>
                  {isActive && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full flex-shrink-0" />
                  )}
                </>
              )}
              {isCollapsed && isActive && (
                <div className="absolute right-2 w-1 h-8 bg-white rounded-full" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Clickable Edge to Toggle Sidebar */}
      {onToggleCollapse && (
        <div
          onClick={onToggleCollapse}
          className="absolute top-0 right-0 h-full w-1 cursor-col-resize hover:w-2 bg-transparent hover:bg-blue-400/30 transition-all duration-200"
          aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={isCollapsed ? 'Click to expand' : 'Click to collapse'}
        />
      )}
    </aside>
  );
}
