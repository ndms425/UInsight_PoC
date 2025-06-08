// The exported code uses Tailwind CSS. Install Tailwind CSS in your dev environment to ensure all styles work.
import React, { useState } from 'react';

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);

  const tableData = [
    {
      id: 'PA-01-01',
      name: '시스템메인',
      url: '/admin/exam/view/010',
      checkDate: '2025-06-07 14:30',
      type: 'Main',
      accessPath: ['설정', '대시보드'],
      relatedScreens: ['서브1', '서브2', '팝업1'],
      automation: 'ON'
    },
    {
      id: 'PA-01-04-01',
      name: '[관리자>프로젝트관리]',
      url: '/admin/exam/view/009', 
      checkDate: '2025-06-07 14:30',
      type: 'Sub',
      accessPath: ['설정'],
      relatedScreens: ['화면4, 서브1'],
      automation: 'ERROR'
    },
    {
      id: 'PA-01-04',
      name: '[관리] 특정 이니셔티브2 조회 페이지',
      url: '/admin/exam/view/008',
      checkDate: '2025-06-07 14:30', 
      type: 'Popup',
      accessPath: ['설정', '관리'],
      relatedScreens: ['화면5', '화면6'],
      automation: 'OFF'
    }
  ];

  const filteredData = tableData.filter(item =>
    item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.url.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < Math.ceil(filteredData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch(type) {
      case 'Main': return 'bg-blue-100 text-blue-800';
      case 'Sub': return 'bg-purple-100 text-purple-800';
      case 'Popup': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAutomationIcon = (status: string) => {
    switch(status) {
      case 'ON': return <i className="fas fa-circle text-green-500"></i>;
      case 'OFF': return <i className="fas fa-circle text-gray-400"></i>;
      case 'ERROR': return <i className="fas fa-circle text-red-500"></i>;
      default: return <i className="fas fa-circle text-gray-400"></i>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h1 className="text-xl font-medium mb-6">점검대상 화면관리</h1>
          <div className="mb-6">
            <div className="relative w-64">
              <input
                type="text"
                placeholder="화면ID로 검색할 검색"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                <i className="fas fa-search"></i>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">화면ID</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">화면명</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">화면유형</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">URL</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">접근경로</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">테스트자동화</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">점검일시</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">작업</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentItems.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.id}</td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{item.name}</div>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {item.relatedScreens.map((screen, idx) => (
                          <span key={idx} className="inline-flex items-center text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                            #{screen}
                            {screen === '서브1' && (
                              <i className="fas fa-exclamation-triangle text-yellow-500 ml-1"></i>
                            )}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTypeBadgeColor(item.type)}`}>
                        {item.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600">{item.url}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="text-gray-600 hover:text-gray-900">
                        <i className="fas fa-cog mr-1"></i>
                        설정
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getAutomationIcon(item.automation)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.checkDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button className="bg-purple-700 text-white px-3 py-1 rounded text-xs !rounded-button whitespace-nowrap cursor-pointer">
                        점검 수행
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between mt-6 border-t border-gray-200 pt-4">
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2">표시할 수 :</span>
              <div className="relative">
                <select
                  className="appearance-none border rounded-md px-3 py-1 pr-8 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                >
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <i className="fas fa-chevron-down text-gray-400 text-xs"></i>
                </div>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={goToPreviousPage}
                className="p-2 border border-gray-300 rounded-l-md cursor-pointer hover:bg-gray-50"
                disabled={currentPage === 1}
              >
                <i className="fas fa-chevron-left text-gray-500"></i>
              </button>
              <div className="px-4 py-2 border-t border-b border-gray-300 bg-white">
                <input
                  type="text"
                  className="w-8 text-center border-none focus:outline-none"
                  value={currentPage}
                  onChange={(e) => {
                    const page = parseInt(e.target.value);
                    if (!isNaN(page) && page > 0 && page <= Math.ceil(filteredData.length / itemsPerPage)) {
                      setCurrentPage(page);
                    }
                  }}
                />
              </div>
              <button
                onClick={goToNextPage}
                className="p-2 border border-gray-300 rounded-r-md cursor-pointer hover:bg-gray-50"
                disabled={currentPage === Math.ceil(filteredData.length / itemsPerPage)}
              >
                <i className="fas fa-chevron-right text-gray-500"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App