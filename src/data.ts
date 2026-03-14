export type MissionType = 'Embassy' | 'High Commission' | 'Consulate' | 'Consulate General' | 'Deputy High Commission' | 'Honorary' | 'No mission in Nigeria';
export type Region = 'Africa' | 'Americas' | 'Asia' | 'Europe' | 'Oceania';

export interface Mission {
  type: MissionType;
  city: string;
  address: string;
  phone?: string;
  email?: string;
  website?: string;
}

export interface CountryData {
  name: string;
  flag: string;
  region: Region;
  missions: Mission[];
  visaProcessing?: string;
  whereToApply?: string[];
  sources: string[];
  lastVerified: string;
}

export const countriesData: CountryData[] = [
  {
    name: 'Canada',
    flag: '🇨🇦',
    region: 'Americas',
    missions: [
      {
        type: 'High Commission',
        city: 'Abuja',
        address: '13010G, Palm Close, Diplomatic Drive, Central Business District, Abuja, Nigeria',
        website: 'Canada and Nigeria',
      },
      {
        type: 'Deputy High Commission',
        city: 'Lagos',
        address: '4 Anifowoshe Street, Victoria Island, Lagos, Nigeria',
        website: 'Canada and Nigeria',
      },
      {
        type: 'Consulate',
        city: 'Port Harcourt',
        address: '15 Ahoada Street, Rumuibekwe Housing Estate, Port Harcourt, Nigeria',
        website: 'Canada and Nigeria',
      }
    ],
    sources: ['Canada and Nigeria (Government of Canada)'],
    lastVerified: '2026-03-13'
  },
  {
    name: 'United States',
    flag: '🇺🇸',
    region: 'Americas',
    missions: [
      {
        type: 'Embassy',
        city: 'Abuja',
        address: '1075 Diplomatic Drive, Central District Area, Abuja, Nigeria',
        phone: '+234 (9) 461-4176',
        email: 'Consularabuja@state.gov',
        website: 'U.S. Embassy Abuja',
      },
      {
        type: 'Consulate General',
        city: 'Lagos',
        address: '2 Walter Carrington Crescent, Victoria Island, Lagos, Nigeria',
        phone: '+234 (1) 460-3400',
        website: 'U.S. Missions in Nigeria',
      }
    ],
    visaProcessing: 'U.S. Embassy Abuja and U.S. Consulate General Lagos handle consular services in Nigeria. Use the official mission websites for appointment and visa instructions.',
    whereToApply: ['Embassy: Abuja', 'Consulate General: Lagos'],
    sources: ['U.S. Embassy Abuja (Travel.State.Gov)', 'U.S. Consulate General Lagos address (Travel.State.Gov)'],
    lastVerified: '2026-03-13'
  },
  {
    name: 'China',
    flag: '🇨🇳',
    region: 'Asia',
    missions: [
      {
        type: 'Embassy',
        city: 'Abuja',
        address: 'Plot 302-303, A.O. Central Area, Abuja, Nigeria',
        phone: '+234 (9) 4618661, 4618662, 4618664',
        email: 'chinaemb_ng@mfa.gov.cn',
        website: 'Embassy of China in Nigeria',
      }
    ],
    visaProcessing: 'Embassy of the People’s Republic of China in Abuja handles consular and visa services in Nigeria. Use the embassy website for visa requirements and appointments.',
    whereToApply: ['Embassy: Abuja'],
    sources: ['Chinese Embassy in Nigeria (MFA China)'],
    lastVerified: '2026-03-13'
  },
  {
    name: 'India',
    flag: '🇮🇳',
    region: 'Asia',
    missions: [
      {
        type: 'High Commission',
        city: 'Abuja',
        address: 'Plot 364, Cadastral Zone, Off Constitution Avenue, Central Business District, Abuja, Nigeria',
        phone: '+234 (0)708 062 2800-04',
        email: 'couns.abuja@mea.gov.in',
        website: 'High Commission of India, Abuja',
      }
    ],
    visaProcessing: 'High Commission of India, Abuja handles consular and visa services in Nigeria. Official application guidance is provided via the High Commission’s website.',
    whereToApply: ['High Commission: Abuja'],
    sources: ['High Commission of India, Abuja (IGOD)'],
    lastVerified: '2026-03-13'
  },
  {
    name: 'United Arab Emirates',
    flag: '🇦🇪',
    region: 'Asia',
    missions: [
      {
        type: 'Embassy',
        city: 'Abuja',
        address: '17 Kainji Crescent, Off Lake Chad Crescent, Maitama, Abuja',
        phone: '+234 809 900 9003',
        email: 'Abuja@mofa.gov.ae',
        website: 'UAE Embassy Abuja',
      }
    ],
    visaProcessing: 'Embassy of the United Arab Emirates in Abuja handles consular services in Nigeria. Use the official embassy website for visa and service guidance.',
    whereToApply: ['Embassy: Abuja'],
    sources: ['UAE Embassy Abuja (UAE MoFA)'],
    lastVerified: '2026-03-13'
  },
  {
    name: 'France',
    flag: '🇫🇷',
    region: 'Europe',
    missions: [
      {
        type: 'Embassy',
        city: 'Abuja',
        address: 'European Union Crescent, off Constitution Avenue, Central Business District, Abuja, Nigeria',
        phone: '020 94 60 28 00',
        email: 'admin-francais.abuja-amba@diplomatie.gouv.fr',
        website: 'Embassy of France in Nigeria',
      },
      {
        type: 'Consulate General',
        city: 'Lagos',
        address: 'Ikoyi Island, 1 Oyinkan Abayomi Drive, 12665 Lagos, Nigeria',
        phone: '+234 20 134 38 939',
        email: 'adfr.lagos-cslt@diplomatie.gouv.fr',
        website: 'Consulate General of France Lagos',
      }
    ],
    visaProcessing: 'Consular section of the Embassy in Abuja or the Consulate General in Lagos. Administrative procedures are handled by the consular section in Abuja or the Lagos consulate.',
    whereToApply: ['Consular Section: Abuja', 'Consulate General: Lagos'],
    sources: ['French Embassy Abuja address (Service-Public.fr)', 'French Consulate Lagos address (Service-Public.fr)'],
    lastVerified: '2026-03-13'
  },
  {
    name: 'Germany',
    flag: '🇩🇪',
    region: 'Europe',
    missions: [
      {
        type: 'Embassy',
        city: 'Abuja',
        address: '9, Lake Maracaibo Close, off Amazon Street, Maitama, Abuja',
        phone: '+234 (0) 915-451-74-01/02/03/04',
        website: 'German Embassy Abuja',
      },
      {
        type: 'Consulate General',
        city: 'Lagos',
        address: '15, Walter Carrington Crescent, Victoria Island, Lagos',
        phone: '+234 (0)201 4621 820',
        website: 'German Consulate General Lagos',
      }
    ],
    visaProcessing: 'German Consulate General Lagos handles visa applications for Nigeria; Abuja processes only limited cases. Applicants outside the limited Abuja exceptions should apply in Lagos.',
    whereToApply: ['Consulate General: Lagos'],
    sources: ['German Embassy Abuja address + visa limitation (Federal Foreign Office)', 'German Consulate General Lagos address (Federal Foreign Office)'],
    lastVerified: '2026-03-13'
  },
  {
    name: 'Italy',
    flag: '🇮🇹',
    region: 'Europe',
    missions: [
      {
        type: 'Embassy',
        city: 'Abuja',
        address: 'European Union Crescent, CBD, Garki, Abuja, Nigeria',
        phone: '+234 (0)2094 602 970 / +234 (0)2094 602 971 / +234 (0)2094 602 972',
        website: 'Embassy of Italy in Abuja',
      }
    ],
    sources: ['Embassy of Italy in Abuja (MAECI)'],
    lastVerified: '2026-03-13'
  },
  {
    name: 'United Kingdom',
    flag: '🇬🇧',
    region: 'Europe',
    missions: [
      {
        type: 'High Commission',
        city: 'Abuja',
        address: 'Plot 1137, Diplomatic Drive, Central Business District, Abuja, FCT, Nigeria',
        phone: '+234 (0)20 12770780',
        website: 'British High Commission Abuja',
      }
    ],
    visaProcessing: 'UK Visas and Immigration (UKVI) via VFS Global Visa Application Centres in Nigeria. Appointments for UK visa submissions are booked through VFS Global’s Nigeria portal.',
    whereToApply: ['VFS Global VAC: Nigeria (multiple centers)'],
    sources: ['British High Commission Abuja address (GOV.UK)', 'VFS Global UK visa centres in Nigeria (VFS Global media release)'],
    lastVerified: '2026-03-13'
  },
  {
    name: 'Australia',
    flag: '🇦🇺',
    region: 'Oceania',
    missions: [
      {
        type: 'High Commission',
        city: 'Abuja',
        address: 'PMB 5152, Wuse Post Office, Abuja 00009, Nigeria',
        phone: '+234 (0) 9460 6960',
        email: 'ahc.abuja@dfat.gov.au',
        website: 'Australian High Commission Nigeria',
      }
    ],
    sources: ['Australian High Commission, Nigeria (DFAT)'],
    lastVerified: '2026-03-13'
  }
];
