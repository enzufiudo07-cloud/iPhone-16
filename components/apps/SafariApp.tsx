import React, { useState } from 'react';
import { useOS } from '../../context/OSContext';

const SafariApp: React.FC = () => {
  const { closeApp, addNotification } = useOS();
  const [url, setUrl] = useState('google.com');
  const [view, setView] = useState<'search' | 'results' | 'login' | 'inbox'>('search');
  const [searchInput, setSearchInput] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView('results');
      setUrl(`google.com/search?q=${searchInput}`);
    }, 800);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setView('inbox');
      setUrl('mail.google.com/inbox');
      addNotification('Segurança', 'Novo login detectado no Safari.', 'Settings');
    }, 1500);
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex items-center justify-center h-full">
           <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      );
    }

    switch (view) {
      case 'search':
        return (
          <div className="flex flex-col items-center justify-center h-full px-6">
            <h1 className="text-5xl font-bold text-gray-700 mb-8"><span className="text-blue-500">G</span><span className="text-red-500">o</span><span className="text-yellow-500">o</span><span className="text-blue-500">g</span><span className="text-green-500">l</span><span className="text-red-500">e</span></h1>
            <form onSubmit={handleSearch} className="w-full">
              <input 
                type="text" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Pesquise ou digite uma URL"
                className="w-full p-4 rounded-full border border-gray-300 shadow-sm focus:shadow-md focus:border-blue-500 outline-none text-gray-700 bg-white"
              />
              <div className="mt-6 flex justify-center gap-4">
                 <button type="submit" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm">Pesquisa Google</button>
                 <button type="button" onClick={() => { setView('login'); setUrl('accounts.google.com'); }} className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm">Fazer Login</button>
              </div>
            </form>
          </div>
        );
      case 'results':
        return (
          <div className="p-4">
             <div className="mb-4">
                <p className="text-xs text-gray-500">Cerca de 1.200.000 resultados (0,42 segundos)</p>
             </div>
             <div className="space-y-6">
                <div onClick={() => { setView('login'); setUrl('accounts.google.com'); }} className="cursor-pointer group">
                   <p className="text-xs text-gray-800">https://accounts.google.com</p>
                   <h3 className="text-xl text-blue-800 group-hover:underline">Fazer login nas Contas do Google</h3>
                   <p className="text-sm text-gray-600">Use sua Conta do Google. E-mail ou telefone. Esqueceu seu e-mail?</p>
                </div>
                <div>
                   <p className="text-xs text-gray-800">https://pt.wikipedia.org</p>
                   <h3 className="text-xl text-blue-800 hover:underline">{searchInput} - Wikipédia</h3>
                   <p className="text-sm text-gray-600">Informações detalhadas sobre {searchInput} na enciclopédia livre.</p>
                </div>
             </div>
          </div>
        );
      case 'login':
        return (
          <div className="flex flex-col items-center justify-center h-full px-6">
             <div className="w-full max-w-sm border border-gray-200 rounded-xl p-8 bg-white shadow-sm">
                 <div className="flex justify-center mb-6">
                    <span className="text-2xl font-bold text-gray-700">Google</span>
                 </div>
                 <h2 className="text-center text-xl font-medium mb-2 text-gray-800">Fazer login</h2>
                 <p className="text-center text-sm text-gray-600 mb-8">Use sua Conta do Google</p>
                 
                 <form onSubmit={handleLogin} className="space-y-4">
                    <input 
                      type="email" 
                      placeholder="E-mail ou telefone" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 outline-none"
                    />
                     <input 
                      type="password" 
                      placeholder="Digite sua senha" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:border-blue-500 outline-none"
                    />
                    <div className="flex justify-between items-center pt-4">
                       <button type="button" className="text-blue-600 text-sm font-medium">Criar conta</button>
                       <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-full font-medium hover:bg-blue-700">Próxima</button>
                    </div>
                 </form>
             </div>
          </div>
        );
      case 'inbox':
        return (
          <div className="bg-white h-full">
             <div className="border-b px-4 py-3 flex justify-between items-center bg-gray-50">
                <span className="text-lg font-medium text-gray-700">Caixa de Entrada</span>
                <span className="text-xs bg-gray-200 px-2 py-1 rounded-full text-gray-600">{email || 'usuario@gmail.com'}</span>
             </div>
             <div className="divide-y">
                <div className="p-4 flex gap-3 hover:bg-gray-50">
                   <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">A</div>
                   <div>
                      <h4 className="font-bold text-gray-900 text-sm">Alerta de Segurança</h4>
                      <p className="text-xs text-gray-600">Novo login detectado no iPhone 16 Simulator.</p>
                   </div>
                   <span className="ml-auto text-xs text-gray-400">Agora</span>
                </div>
                 <div className="p-4 flex gap-3 hover:bg-gray-50">
                   <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">G</div>
                   <div>
                      <h4 className="font-bold text-gray-900 text-sm">Equipe Google</h4>
                      <p className="text-xs text-gray-600">Bem-vindo à sua nova conta. Comece agora.</p>
                   </div>
                   <span className="ml-auto text-xs text-gray-400">10:00</span>
                </div>
             </div>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col h-full bg-white text-black">
        {/* Safari Top Bar Simulation */}
        <div className="pt-12 pb-2 px-4 bg-gray-50 border-b flex justify-between items-center">
            <button onClick={() => view !== 'search' ? setView('search') : closeApp()} className="text-blue-500">
               {view !== 'search' ? (
                   <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                   </svg>
               ) : 'Início'}
            </button>
            <div className="flex-1 mx-4 bg-gray-200 rounded-lg px-3 py-1.5 flex items-center gap-2 text-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs text-black font-normal truncate max-w-[150px]">{url}</span>
            </div>
             <button onClick={() => setView('search')} className="text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
            </button>
        </div>
        
        <div className="flex-1 overflow-y-auto no-scrollbar">
            {renderContent()}
        </div>

        {/* Bottom Bar */}
        <div className="h-12 bg-gray-50 border-t flex justify-around items-center text-blue-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
             </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
             </svg>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
             </svg>
             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
             </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
             </svg>
        </div>
    </div>
  );
};

export default SafariApp;