import React, { useState, useMemo } from 'react';
import { Search, MapPin, Phone, Mail, Globe, Info, CheckCircle2, ExternalLink } from 'lucide-react';
import { countriesData, nigerianMissionsData, CountryData, MissionType, Region } from './data';

const ALL_MISSIONS = 'All missions';
const ALL_REGIONS = 'All regions';

const MISSION_TYPES = [
  ALL_MISSIONS,
  'Embassies',
  'High Commissions',
  'Consulates',
  'Honorary',
  'No mission in Nigeria'
];

const REGIONS = [
  ALL_REGIONS,
  'Africa',
  'Americas',
  'Asia',
  'Europe',
  'Oceania'
];

export default function App() {
  const [viewMode, setViewMode] = useState<'foreign' | 'nigerian'>('foreign');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMissionType, setSelectedMissionType] = useState<string>(ALL_MISSIONS);
  const [selectedRegion, setSelectedRegion] = useState<string>(ALL_REGIONS);

  const activeData = viewMode === 'foreign' ? countriesData : nigerianMissionsData;

  const filteredCountries = useMemo(() => {
    return activeData.filter((country) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        country.name.toLowerCase().includes(searchLower) ||
        country.missions.some(m => 
          m.city.toLowerCase().includes(searchLower) || 
          m.address.toLowerCase().includes(searchLower)
        ) ||
        (country.visaProcessing && country.visaProcessing.toLowerCase().includes(searchLower)) ||
        (country.whereToApply && country.whereToApply.some(w => w.toLowerCase().includes(searchLower)));

      // Region filter
      const matchesRegion = selectedRegion === ALL_REGIONS || country.region === selectedRegion;

      // Mission type filter
      let matchesMissionType = true;
      if (selectedMissionType !== ALL_MISSIONS) {
        if (selectedMissionType === 'No mission in Nigeria') {
          matchesMissionType = country.missions.length === 0;
        } else if (selectedMissionType === 'Embassies') {
          matchesMissionType = country.missions.some(m => m.type === 'Embassy');
        } else if (selectedMissionType === 'High Commissions') {
          matchesMissionType = country.missions.some(m => m.type === 'High Commission' || m.type === 'Deputy High Commission');
        } else if (selectedMissionType === 'Consulates') {
          matchesMissionType = country.missions.some(m => m.type === 'Consulate' || m.type === 'Consulate General');
        } else if (selectedMissionType === 'Honorary') {
          matchesMissionType = country.missions.some(m => m.type === 'Honorary');
        }
      }

      return matchesSearch && matchesRegion && matchesMissionType;
    });
  }, [searchQuery, selectedMissionType, selectedRegion, activeData]);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-900 font-sans selection:bg-blue-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-2 leading-tight">
            Nigeria Embassy <br className="sm:hidden" />
            & Consular Finder
          </h1>
          <p className="text-gray-600 max-w-2xl text-sm sm:text-base leading-relaxed mb-6">
            {viewMode === 'foreign' 
              ? 'Find foreign embassies, consulates, and visa processing centers located in Nigeria.' 
              : 'Find Nigerian embassies, high commissions, and consulates located around the world.'}
          </p>

          {/* View Mode Toggle */}
          <div className="flex">
            <div className="inline-flex bg-gray-100/80 backdrop-blur-sm p-1 rounded-xl w-full sm:w-auto">
              <button
                onClick={() => {
                  setViewMode('foreign');
                  setSearchQuery('');
                  setSelectedMissionType(ALL_MISSIONS);
                  setSelectedRegion(ALL_REGIONS);
                }}
                className={`flex-1 sm:flex-none px-2 sm:px-6 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                  viewMode === 'foreign' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="hidden sm:inline">Foreign Missions in Nigeria</span>
                <span className="sm:hidden">Foreign in Nigeria</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('nigerian');
                  setSearchQuery('');
                  setSelectedMissionType(ALL_MISSIONS);
                  setSelectedRegion(ALL_REGIONS);
                }}
                className={`flex-1 sm:flex-none px-2 sm:px-6 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-200 ${
                  viewMode === 'nigerian' 
                    ? 'bg-white text-gray-900 shadow-sm' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                <span className="hidden sm:inline">Nigerian Missions Abroad</span>
                <span className="sm:hidden">Nigerian Abroad</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6 mb-8">
          <div className="flex flex-col space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-shadow"
                placeholder="Search by country, city, address, or visa center..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm text-gray-400 hover:text-gray-600"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Pills */}
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 overflow-hidden">
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Mission Type</h3>
                <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap gap-2 scrollbar-hide">
                  {MISSION_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => setSelectedMissionType(type)}
                      className={`whitespace-nowrap px-4 py-2 sm:px-3 sm:py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedMissionType === type 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Region</h3>
                <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 sm:flex-wrap gap-2 scrollbar-hide">
                  {REGIONS.map(region => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`whitespace-nowrap px-4 py-2 sm:px-3 sm:py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        selectedRegion === region 
                          ? 'bg-gray-900 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {region}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            Directory <span className="text-gray-500 font-normal text-sm ml-2">{filteredCountries.length} countries</span>
          </h2>
          <div className="text-sm text-gray-500 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1.5 text-green-600 shrink-0" />
            Updated 2026-03-13
          </div>
        </div>

        {/* Country List */}
        <div className="space-y-6">
          {filteredCountries.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <p className="text-gray-500">No countries found matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setSelectedMissionType(ALL_MISSIONS);
                  setSelectedRegion(ALL_REGIONS);
                }}
                className="mt-4 text-blue-600 hover:text-blue-800 font-medium text-sm"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredCountries.map((country) => (
              <CountryCard key={country.name} country={country} />
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-gray-200 text-center pb-12">
          <div className="bg-blue-50 rounded-2xl p-6 max-w-2xl mx-auto mb-8">
            <h3 className="font-semibold text-blue-900 mb-2">
              {viewMode === 'foreign' ? 'Countries without a mission in Nigeria' : 'Countries without a Nigerian mission'}
            </h3>
            <p className="text-blue-800 text-sm mb-4">
              {viewMode === 'foreign' 
                ? 'Use the "No mission in Nigeria" filter to see accredited embassies or visa centers for Nigerians.'
                : 'Some countries are covered by Nigerian missions in neighboring nations (concurrent accreditation).'}
            </p>
            <p className="text-blue-700 text-xs font-medium uppercase tracking-wider">
              Coming next: Accredited missions and "Where to apply" for every country.
            </p>
          </div>
          <p className="text-gray-500 text-sm">
            Made by <span className="font-medium text-gray-900">Tomi Abe Studio</span>
          </p>
        </footer>
      </main>
    </div>
  );
}

function CountryCard({ country }: { country: CountryData }) {
  // Get unique mission types for the tags
  const missionTypes = Array.from(new Set(country.missions.map(m => m.type)));

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden transition-shadow hover:shadow-md">
      {/* Card Header */}
      <div className="px-4 py-4 sm:px-6 sm:py-5 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div className="flex items-center gap-3">
          <span className="text-4xl leading-none flag-emoji" aria-hidden="true">{country.flag}</span>
          <div>
            <h2 className="text-xl font-bold text-gray-900">{country.name}</h2>
            <p className="text-sm text-gray-500">{country.region}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {missionTypes.map(type => (
            <span key={type} className="inline-flex items-center px-2.5 py-1 sm:py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Missions List */}
          <div className="lg:col-span-2 space-y-6">
            {country.missions.map((mission, idx) => (
              <div key={idx} className="relative pl-4 border-l-2 border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center">
                  {mission.type} <span className="mx-2 text-gray-300">·</span> {mission.city}
                </h3>
                <div className="space-y-2.5 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 text-gray-400 shrink-0" />
                    <span>{mission.address}</span>
                  </div>
                  {mission.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                      <a href={`tel:${mission.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-blue-600 transition-colors">{mission.phone}</a>
                    </div>
                  )}
                  {mission.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400 shrink-0" />
                      <a href={`mailto:${mission.email}`} className="hover:text-blue-600 transition-colors">{mission.email}</a>
                    </div>
                  )}
                  {mission.website && (
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400 shrink-0" />
                      <span className="text-gray-900 font-medium">{mission.website}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Visa & Additional Info */}
          <div className="space-y-6 pt-6 border-t border-gray-100 lg:pt-0 lg:border-t-0 lg:border-l lg:pl-8">
            {country.visaProcessing && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-blue-500" />
                  Visa processing
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {country.visaProcessing}
                </p>
              </div>
            )}

            {country.whereToApply && country.whereToApply.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-900 mb-2">Where to apply</h4>
                <ul className="space-y-1.5">
                  {country.whereToApply.map((loc, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0" />
                      <span>{loc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="pt-4 border-t border-gray-100">
              <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Sources</h4>
              <ul className="space-y-1.5 mb-4">
                {country.sources.map((source, idx) => (
                  <li key={idx} className="text-xs text-gray-500 flex items-center gap-1">
                    <ExternalLink className="w-3 h-3" />
                    {source}
                  </li>
                ))}
              </ul>
              <div className="text-xs text-gray-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                Last verified: {country.lastVerified}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
