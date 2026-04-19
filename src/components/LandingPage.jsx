import React from 'react';

const MAP_OPTIONS = [
  { id: 'india', name: 'India Political', description: 'Complete map of India with states and union territories.', active: true },
  { id: 'andaman-nicobar', name: 'Andaman & Nicobar Islands', description: 'District-wise map of Andaman & Nicobar Islands.', active: true },
  { id: 'andhra-pradesh', name: 'Andhra Pradesh', description: 'District-wise map of Andhra Pradesh.', active: true },
  { id: 'arunachal-pradesh', name: 'Arunachal Pradesh', description: 'District-wise map of Arunachal Pradesh.', active: true },
  { id: 'assam', name: 'Assam', description: 'District-wise map of Assam.', active: true },
  { id: 'bihar', name: 'Bihar', description: 'District-wise map of Bihar.', active: true },
  { id: 'chandigarh', name: 'Chandigarh', description: 'Map of Chandigarh.', active: true },
  { id: 'chhattisgarh', name: 'Chhattisgarh', description: 'District-wise map of Chhattisgarh.', active: true },
  { id: 'dnh-and-dd', name: 'Dadra & Nagar Haveli and Daman & Diu', description: 'District-wise map of DNH and DD.', active: true },
  { id: 'delhi', name: 'Delhi', description: 'District-wise map of Delhi.', active: true },
  { id: 'goa', name: 'Goa', description: 'District-wise map of Goa.', active: true },
  { id: 'gujarat', name: 'Gujarat', description: 'District-wise map of Gujarat.', active: true },
  { id: 'haryana', name: 'Haryana', description: 'District-wise map of Haryana.', active: true },
  { id: 'himachal-pradesh', name: 'Himachal Pradesh', description: 'District-wise map of Himachal Pradesh.', active: true },
  { id: 'jammu-kashmir', name: 'Jammu & Kashmir', description: 'District-wise map of Jammu & Kashmir.', active: true },
  { id: 'jharkhand', name: 'Jharkhand', description: 'District-wise map of Jharkhand.', active: true },
  { id: 'karnataka', name: 'Karnataka', description: 'District-wise map of Karnataka.', active: true },
  { id: 'kerala', name: 'Kerala', description: 'District-wise map of Kerala.', active: true },
  { id: 'ladakh', name: 'Ladakh', description: 'District-wise map of Ladakh.', active: true },
  { id: 'lakshadweep', name: 'Lakshadweep', description: 'Map of Lakshadweep.', active: true },
  { id: 'madhya-pradesh', name: 'Madhya Pradesh', description: 'District-wise map of Madhya Pradesh.', active: true },
  { id: 'maharashtra', name: 'Maharashtra', description: 'District-wise map of Maharashtra.', active: true },
  { id: 'manipur', name: 'Manipur', description: 'District-wise map of Manipur.', active: true },
  { id: 'meghalaya', name: 'Meghalaya', description: 'District-wise map of Meghalaya.', active: true },
  { id: 'mizoram', name: 'Mizoram', description: 'District-wise map of Mizoram.', active: true },
  { id: 'nagaland', name: 'Nagaland', description: 'District-wise map of Nagaland.', active: true },
  { id: 'odisha', name: 'Odisha', description: 'District-wise map of Odisha.', active: true },
  { id: 'puducherry', name: 'Puducherry', description: 'District-wise map of Puducherry.', active: true },
  { id: 'punjab', name: 'Punjab', description: 'District-wise map of Punjab.', active: true },
  { id: 'rajasthan', name: 'Rajasthan', description: 'District-wise map of Rajasthan.', active: true },
  { id: 'sikkim', name: 'Sikkim', description: 'District-wise map of Sikkim.', active: true },
  { id: 'tamil-nadu', name: 'Tamil Nadu', description: 'District-wise map of Tamil Nadu.', active: true },
  { id: 'telangana', name: 'Telangana', description: 'District-wise map of Telangana.', active: true },
  { id: 'tripura', name: 'Tripura', description: 'District-wise map of Tripura.', active: true },
  { id: 'uttar-pradesh', name: 'Uttar Pradesh', description: 'District-wise map of Uttar Pradesh.', active: true },
  { id: 'uttarakhand', name: 'Uttarakhand', description: 'District-wise map of Uttarakhand.', active: true },
  { id: 'west-bengal', name: 'West Bengal', description: 'District-wise map of West Bengal.', active: true },
];

export default function LandingPage({ onSelectMap }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Header */}
      <header className="py-10 px-8 text-center bg-white border-b border-gray-100">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-3">
          Indi Maps
        </h1>
        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
          Create beautiful, customizable, and high-resolution map infographics in seconds.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {MAP_OPTIONS.map((option) => (
            <div 
              key={option.id}
              onClick={() => option.active && onSelectMap(option.id)}
              className={`group relative p-8 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 ${
                option.active 
                ? 'cursor-pointer hover:shadow-xl hover:border-indigo-200 hover:-translate-y-1' 
                : 'opacity-60 cursor-not-allowed bg-gray-50'
              }`}
            >
              {!option.active && (
                <span className="absolute top-4 right-4 bg-gray-200 text-gray-500 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                  Coming Soon
                </span>
              )}
              
              <div className={`w-12 h-12 rounded-xl mb-6 flex items-center justify-center transition-colors ${
                option.active ? 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white' : 'bg-gray-100 text-gray-400'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              </div>

              <h3 className={`text-xl font-bold mb-2 transition-colors ${
                option.active ? 'text-gray-900 group-hover:text-indigo-600' : 'text-gray-500'
              }`}>
                {option.name}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {option.description}
              </p>

              {option.active && (
                <div className="mt-8 flex items-center text-indigo-600 font-bold text-sm">
                  Launch Editor
                  <svg className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="py-8 px-6 text-center text-gray-400 text-sm border-t border-gray-100">
        <p>&copy; {new Date().getFullYear()} Indi Maps. All rights reserved.</p>
      </footer>
    </div>
  );
}
