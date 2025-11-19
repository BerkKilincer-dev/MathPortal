import React, { useState, useEffect } from 'react';
import { Lock, Unlock, ArrowRight, Calculator } from 'lucide-react';

interface LoginScreenProps {
  onLogin: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [pin, setPin] = useState('');
  const [storedPin, setStoredPin] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const [mode, setMode] = useState<'LOGIN' | 'CREATE'>('LOGIN');

  useEffect(() => {
    const saved = localStorage.getItem('mathtutor_auth_pin');
    if (saved) {
      setStoredPin(saved);
      setMode('LOGIN');
    } else {
      setMode('CREATE');
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'CREATE') {
      if (pin.length < 4) {
        setError(true);
        return;
      }
      localStorage.setItem('mathtutor_auth_pin', pin);
      onLogin();
    } else {
      if (pin === storedPin) {
        onLogin();
      } else {
        setError(true);
        setPin('');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-indigo-600 p-8 text-center">
          <div className="w-16 h-16 bg-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-wide">Matematik Asistanı</h1>
          <p className="text-indigo-200 text-sm mt-2">Özel Ders Yönetim Sistemi</p>
        </div>

        <div className="p-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-slate-100 text-slate-600 mb-4">
              {mode === 'CREATE' ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
            </div>
            <h2 className="text-xl font-bold text-slate-800">
              {mode === 'CREATE' ? 'Hoş Geldiniz' : 'Tekrar Hoş Geldiniz'}
            </h2>
            <p className="text-slate-500 text-sm mt-1">
              {mode === 'CREATE' 
                ? 'Uygulamayı korumak için bir giriş şifresi belirleyin.' 
                : 'Devam etmek için şifrenizi girin.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                inputMode="numeric"
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value);
                  setError(false);
                }}
                placeholder="Şifre"
                className={`w-full text-center text-2xl tracking-widest p-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all ${
                  error 
                    ? 'border-red-300 bg-red-50 focus:ring-red-200 text-red-600 placeholder-red-300' 
                    : 'border-slate-200 bg-slate-50 focus:ring-indigo-200 focus:border-indigo-500 text-slate-800'
                }`}
                autoFocus
              />
              {error && (
                <p className="text-red-500 text-xs text-center mt-2 font-medium animate-pulse">
                  {mode === 'CREATE' ? 'Şifre en az 4 karakter olmalıdır.' : 'Hatalı şifre, tekrar deneyin.'}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 active:bg-indigo-800 transition-colors flex items-center justify-center gap-2 group"
            >
              {mode === 'CREATE' ? 'Şifre Oluştur ve Başla' : 'Giriş Yap'}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          
          {mode === 'LOGIN' && (
            <p className="text-center mt-6 text-xs text-slate-400">
              Bu şifre sadece bu cihazda saklanır.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};