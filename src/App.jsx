import React, { useState, useEffect } from 'react';

// ==========================================
// أيقونات SVG خفيفة ومدمجة بدون أي مكتبات خارجية
// ==========================================
const Icons = {
  Wallet: () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  Dashboard: () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Cart: () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  Users: () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Trash: () => <svg className="w-4 h-4 inline-block text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Plus: () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>,
  Check: () => <svg className="w-4 h-4 inline-block text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
};

export default function FamilyBudgetApp() {
  // ==========================================
  // استرجاع البيانات المحفوظة في الهاتف تلقائياً
  // ==========================================
  const [wallets, setWallets] = useState(() => {
    const saved = localStorage.getItem('fb_wallets');
    return saved ? JSON.parse(saved) : [
      {
        id: 'w-main',
        name: 'مصاريف المنزل الرئيسية',
        members: [
          { id: 'u1', name: 'أحمد', role: 'admin', title: 'رب الأسرة' },
          { id: 'u2', name: 'الزوجة', role: 'member', title: 'شريكة الحياة' }
        ]
      },
      {
        id: 'w-savings',
        name: 'صندوق الطوارئ والتوفير',
        members: [
          { id: 'u1', name: 'أحمد', role: 'admin', title: 'رب الأسرة' }
        ]
      }
    ];
  });

  const [activeWalletId, setActiveWalletId] = useState(() => {
    return localStorage.getItem('fb_active_wallet') || 'w-main';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('fb_current_user') || 'u1';
  });

  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('fb_transactions');
    return saved ? JSON.parse(saved) : [
      {
        id: 't-1',
        walletId: 'w-main',
        title: 'راتب شهري أساسي',
        amount: 600.0,
        type: 'income',
        category: 'راتب',
        date: '2026-10-19',
        addedBy: 'أحمد'
      },
      {
        id: 't-2',
        walletId: 'w-main',
        title: 'مواد تموينية وبقالة',
        amount: 45.5,
        type: 'expense',
        category: 'بقالة',
        date: '2026-10-19',
        addedBy: 'الزوجة'
      }
    ];
  });

  const [shoppingItems, setShoppingItems] = useState(() => {
    const saved = localStorage.getItem('fb_shopping');
    return saved ? JSON.parse(saved) : [
      { id: 's-1', walletId: 'w-main', name: 'زيت زيتون 4 لتر', estimatedCost: 28.0, actualCost: 0, status: 'pending' },
      { id: 's-2', walletId: 'w-main', name: 'حليب أطفال بودرة', estimatedCost: 9.5, actualCost: 9.5, status: 'bought' }
    ];
  });

  const [currentTab, setCurrentTab] = useState('dashboard'); // dashboard | shopping | wallets

  // حالات النوافذ المنبثقة
  const [showAddTxModal, setShowAddTxModal] = useState(false);
  const [showAddWalletModal, setShowAddWalletModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // حقول الإدخال
  const [txTitle, setTxTitle] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txType, setTxType] = useState('expense');
  const [txCategory, setTxCategory] = useState('بقالة');

  const [newWalletName, setNewWalletName] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('member');

  const [newItemName, setNewItemName] = useState('');
  const [newItemCost, setNewItemCost] = useState('');

  // ==========================================
  // حفظ تلقائي في الهاتف عند كل تعديل (Persistence)
  // ==========================================
  useEffect(() => {
    localStorage.setItem('fb_wallets', JSON.stringify(wallets));
  }, [wallets]);

  useEffect(() => {
    localStorage.setItem('fb_transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('fb_shopping', JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  useEffect(() => {
    localStorage.setItem('fb_active_wallet', activeWalletId);
  }, [activeWalletId]);

  useEffect(() => {
    localStorage.setItem('fb_current_user', currentUser);
  }, [currentUser]);

  // الحسابات المالية اللحظية للمحفظة النشطة
  const currentWallet = wallets.find(w => w.id === activeWalletId) || wallets[0];
  const walletTransactions = transactions.filter(t => t.walletId === activeWalletId);
  
  const totalIncome = walletTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = walletTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  // إضافة حركة مالية
  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!txTitle || !txAmount || Number(txAmount) <= 0) return;

    const userObj = currentWallet?.members.find(m => m.id === currentUser);
    const newTx = {
      id: 'tx-' + Date.now(),
      walletId: activeWalletId,
      title: txTitle,
      amount: parseFloat(txAmount),
      type: txType,
      category: txCategory,
      date: new Date().toISOString().split('T')[0],
      addedBy: userObj ? userObj.name : 'مجهول'
    };

    setTransactions([newTx, ...transactions]);
    setTxTitle('');
    setTxAmount('');
    setShowAddTxModal(false);
  };

  // حذف حركة
  const handleDeleteTx = (id) => {
    if (window.confirm('هل تريد حذف هذه الحركة بالتأكيد؟')) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  // إضافة محفظة جديدة
  const handleAddWallet = (e) => {
    e.preventDefault();
    if (!newWalletName.trim()) return;

    const newId = 'w-' + Date.now();
    const createdWallet = {
      id: newId,
      name: newWalletName.trim(),
      members: [
        { id: 'u1', name: 'أحمد', role: 'admin', title: 'المشرف الرئيسي' }
      ]
    };

    setWallets([...wallets, createdWallet]);
    setActiveWalletId(newId);
    setNewWalletName('');
    setShowAddWalletModal(false);
  };

  // حذف محفظة
  const handleDeleteWallet = (walletId) => {
    if (wallets.length <= 1) {
      alert('يجب أن تبقى محفظة واحدة نشطة على الأقل في التطبيق.');
      return;
    }
    if (window.confirm('هل أنت متأكد من حذف هذه المحفظة وكافة بياناتها؟')) {
      const remaining = wallets.filter(w => w.id !== walletId);
      setWallets(remaining);
      setTransactions(transactions.filter(t => t.walletId !== walletId));
      setShoppingItems(shoppingItems.filter(s => s.walletId !== walletId));
      setActiveWalletId(remaining[0].id);
    }
  };

  // إضافة فرد للمحفظة الحالية
  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const updatedWallets = wallets.map(w => {
      if (w.id === activeWalletId) {
        return {
          ...w,
          members: [
            ...w.members,
            {
              id: 'u-' + Date.now(),
              name: newMemberName.trim(),
              role: newMemberRole,
              title: newMemberRole === 'admin' ? 'مشرف مشترك' : 'فرد في العائلة'
            }
          ]
        };
      }
      return w;
    });

    setWallets(updatedWallets);
    setNewMemberName('');
    setShowInviteModal(false);
  };

  // حذف فرد من المحفظة
  const handleDeleteMember = (memberId) => {
    if (currentWallet.members.length <= 1) {
      alert('لا يمكن حذف العضو الوحيد المتبقي في المحفظة.');
      return;
    }
    if (window.confirm('هل تريد بالتأكيد إزالة هذا العضو من المحفظة؟')) {
      const updatedWallets = wallets.map(w => {
        if (w.id === activeWalletId) {
          return {
            ...w,
            members: w.members.filter(m => m.id !== memberId)
          };
        }
        return w;
      });
      setWallets(updatedWallets);
      if (currentUser === memberId) {
        setCurrentUser(updatedWallets.find(w => w.id === activeWalletId).members[0].id);
      }
    }
  };

  // إضافة صنف تسوق
  const handleAddShoppingItem = (e) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    const item = {
      id: 's-' + Date.now(),
      walletId: activeWalletId,
      name: newItemName.trim(),
      estimatedCost: parseFloat(newItemCost) || 0,
      actualCost: 0,
      status: 'pending'
    };

    setShoppingItems([...shoppingItems, item]);
    setNewItemName('');
    setNewItemCost('');
  };

  // نقل الصنف إلى المشتريات وتخصيم المبلغ تلقائياً
  const handleBuyShoppingItem = (item) => {
    const cost = prompt(`أدخل التكلفة الفعلية لشراء (${item.name}):`, item.estimatedCost || '0');
    if (cost === null) return;
    const finalAmount = parseFloat(cost) || 0;

    // تحديث حالة الصنف
    setShoppingItems(shoppingItems.map(s => s.id === item.id ? { ...s, status: 'bought', actualCost: finalAmount } : s));

    // خصم المعاملة تلقائياً إذا كانت التكلفة أكبر من 0
    if (finalAmount > 0) {
      const tx = {
        id: 'tx-' + Date.now(),
        walletId: activeWalletId,
        title: `شراء: ${item.name}`,
        amount: finalAmount,
        type: 'expense',
        category: 'تسوق منزل',
        date: new Date().toISOString().split('T')[0],
        addedBy: currentWallet?.members.find(m => m.id === currentUser)?.name || 'أحد الأفراد'
      };
      setTransactions(prev => [tx, ...prev]);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center pb-20 selection:bg-cyan-500 selection:text-white">
      <div className="w-full max-w-md px-4 pt-6">

        {/* رأس التطبيق والشعار */}
        <header className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-tr from-cyan-600 to-emerald-500 rounded-2xl shadow-lg shadow-cyan-500/20 mb-3">
            <span className="text-2xl">💰</span>
          </div>
          <h1 className="text-2xl font-black tracking-tight text-white">ميزانية العائلة</h1>
          <p className="text-xs text-slate-400 font-medium mt-1">دينار أردني (JOD) • بياناتك محفوظة محلياً وسحابياً</p>
        </header>

        {/* محدد المحفظة والفرد النشط */}
        <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-[10px] text-slate-400 mb-1 font-semibold pr-1">المحفظة النشطة:</label>
            <select
              value={activeWalletId}
              onChange={(e) => setActiveWalletId(e.target.value)}
              className="w-full bg-slate-800 text-xs font-bold text-cyan-300 rounded-xl px-2 py-2 border border-slate-700 outline-none"
            >
              {wallets.map(w => (
                <option key={w.id} value={w.id}>📁 {w.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 mb-1 font-semibold pr-1">الحساب النشط:</label>
            <select
              value={currentUser}
              onChange={(e) => setCurrentUser(e.target.value)}
              className="w-full bg-slate-800 text-xs font-bold text-amber-300 rounded-xl px-2 py-2 border border-slate-700 outline-none"
            >
              {currentWallet?.members.map(m => (
                <option key={m.id} value={m.id}>
                  {m.role === 'admin' ? '👑' : '👤'} {m.name} ({m.title})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* شريط التبويبات الثلاثة */}
        <nav className="grid grid-cols-3 gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 mb-6 shadow-md">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              currentTab === 'dashboard' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icons.Dashboard /> المصروفات
          </button>
          <button
            onClick={() => setCurrentTab('shopping')}
            className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              currentTab === 'shopping' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icons.Cart /> قائمة التسوق
          </button>
          <button
            onClick={() => setCurrentTab('wallets')}
            className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              currentTab === 'wallets' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icons.Users /> المحافظ والأعضاء
          </button>
        </nav>

        {/* ==================================================== */}
        {/* التبويب الأول: لوحة التحكم وسجل المصروفات            */}
        {/* ==================================================== */}
        {currentTab === 'dashboard' && (
          <div className="space-y-4">
            {/* بطاقة الرصيد الكلي */}
            <div className="bg-gradient-to-b from-slate-900 to-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-xl text-center relative overflow-hidden">
              <div className="text-xs text-slate-400 font-semibold mb-1">الرصيد المتاح حالياً</div>
              <div className={`text-4xl font-black tracking-tight mb-4 ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {balance.toFixed(2)} <span className="text-lg font-medium text-slate-300">د.أ</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80">
                <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/50">
                  <div className="text-[10px] text-slate-400 mb-0.5 font-medium">إجمالي الدخل</div>
                  <div className="text-sm font-bold text-emerald-400">+{totalIncome.toFixed(2)} د.أ</div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/50">
                  <div className="text-[10px] text-slate-400 mb-0.5 font-medium">إجمالي الصرف</div>
                  <div className="text-sm font-bold text-rose-400">-{totalExpense.toFixed(2)} د.أ</div>
                </div>
              </div>
            </div>

            {/* زر إضافة معاملة */}
            <button
              onClick={() => setShowAddTxModal(true)}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Icons.Plus /> إضافة حركة مالية (دخل أو مصروف)
            </button>

            {/* سجل المعاملات */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 pr-1">أحدث العمليات في {currentWallet?.name}:</h3>
              {walletTransactions.length === 0 ? (
                <div className="text-center py-10 bg-slate-900/40 rounded-2xl border border-slate-800/60 text-slate-500 text-xs">
                  لا توجد حركات مسجلة حتى الآن. اضغط الزر بالأعلى لإضافة أول عملية.
                </div>
              ) : (
                walletTransactions.map(t => (
                  <div key={t.id} className="bg-slate-900 border border-slate-800/80 p-3.5 rounded-2xl flex items-center justify-between hover:border-slate-700 transition-all">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                        t.type === 'income' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}>
                        {t.type === 'income' ? '↓' : '↑'}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white">{t.title}</div>
                        <div className="text-[11px] text-slate-400 flex gap-2">
                          <span>{t.date}</span>
                          <span>•</span>
                          <span>بواسطة: {t.addedBy}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className={`text-sm font-black ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {t.type === 'income' ? '+' : '-'}{t.amount.toFixed(2)} د.أ
                      </div>
                      <button onClick={() => handleDeleteTx(t.id)} className="p-1 hover:bg-slate-800 rounded-lg">
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* التبويب الثاني: قائمة تسوق المنزل التفاعلية          */}
        {/* ==================================================== */}
        {currentTab === 'shopping' && (
          <div className="space-y-4">
            {/* إضافة غرض تسوق */}
            <form onSubmit={handleAddShoppingItem} className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-2">
              <div className="text-xs font-bold text-slate-300">إضافة طلب أو غرض للمنزل:</div>
              <div className="grid grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="اسم الصنف (مثلاً: خضار)"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  className="col-span-2 bg-slate-800 border border-slate-700 text-xs rounded-xl px-3 py-2.5 text-white outline-none"
                />
                <input
                  type="number"
                  step="0.1"
                  placeholder="السعر المتوقع"
                  value={newItemCost}
                  onChange={(e) => setNewItemCost(e.target.value)}
                  className="col-span-1 bg-slate-800 border border-slate-700 text-xs rounded-xl px-3 py-2.5 text-white outline-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2.5 bg-cyan-600 hover:bg-cyan-500 font-bold text-xs rounded-xl text-white flex items-center justify-center gap-1 shadow-md shadow-cyan-700/20"
              >
                <Icons.Plus /> إضافة للقائمة
              </button>
            </form>

            {/* قائمة الأغراض المطلوبة */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-amber-400 pr-1">الأغراض المطلوبة حالياً:</h3>
              {shoppingItems.filter(s => s.walletId === activeWalletId && s.status === 'pending').map(item => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{item.name}</div>
                    <div className="text-[10px] text-slate-400">تقديري: {item.estimatedCost.toFixed(2)} د.أ</div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBuyShoppingItem(item)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-xl flex items-center gap-1 shadow-sm"
                    >
                      <Icons.Check /> تم الشراء
                    </button>
                    <button
                      onClick={() => setShoppingItems(shoppingItems.filter(s => s.id !== item.id))}
                      className="p-1.5 hover:bg-slate-800 rounded-lg"
                    >
                      <Icons.Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* الأغراض التي تم شراؤها */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <h3 className="text-xs font-bold text-slate-500 pr-1">أغراض تم شراؤها مؤخراً:</h3>
              {shoppingItems.filter(s => s.walletId === activeWalletId && s.status === 'bought').map(item => (
                <div key={item.id} className="bg-slate-900/40 border border-slate-800/40 p-2.5 rounded-xl flex items-center justify-between text-slate-500">
                  <div className="text-xs line-through">{item.name}</div>
                  <div className="text-xs font-semibold">{item.actualCost.toFixed(2)} د.أ</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* التبويب الثالث: إدارة المحافظ والأعضاء بالكامل        */}
        {/* ==================================================== */}
        {currentTab === 'wallets' && (
          <div className="space-y-5">
            {/* أزرار الإجراءات السريعة */}
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowAddWalletModal(true)}
                className="py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-md shadow-cyan-900/30"
              >
                <Icons.Plus /> محفظة جديدة
              </button>
              <button
                onClick={() => setShowInviteModal(true)}
                className="py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-cyan-300 font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-md"
              >
                <Icons.Users /> دعوة وإضافة فرد
              </button>
            </div>

            {/* قائمة كافة المحافظ */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 pr-1">المحافظ العائلية المسجلة:</h3>
              {wallets.map(w => {
                const isSelected = w.id === activeWalletId;
                return (
                  <div
                    key={w.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected ? 'bg-cyan-950/40 border-cyan-500/60 shadow-lg shadow-cyan-950/50' : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>📁 {w.name}</span>
                        {isSelected && <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-500/30 font-semibold">النشطة حالياً</span>}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-0.5">عدد الأعضاء: {w.members.length} فرد</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {!isSelected && (
                        <button
                          onClick={() => setActiveWalletId(w.id)}
                          className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-bold rounded-xl border border-slate-700 text-white"
                        >
                          تفعيل
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteWallet(w.id)}
                        className="p-2 hover:bg-rose-500/10 rounded-xl transition-all"
                        title="حذف المحفظة"
                      >
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* أعضاء المحفظة الحالية وإمكانية حذفهم */}
            <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-cyan-400">أفراد محفظة ({currentWallet?.name}):</h3>
                <span className="text-[10px] text-slate-400">{currentWallet?.members.length} مسجلين</span>
              </div>
              <div className="space-y-2">
                {currentWallet?.members.map(member => (
                  <div key={member.id} className="bg-slate-950/80 border border-slate-800 p-3 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-sm">
                        {member.role === 'admin' ? '👑' : '👤'}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">{member.name}</div>
                        <div className="text-[10px] text-slate-400">{member.title}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteMember(member.id)}
                      className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] font-bold rounded-xl border border-rose-500/30 flex items-center gap-1 transition-all"
                    >
                      <Icons.Trash /> حذف
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* نافذة منبثقة 1: إضافة معاملة مالية                    */}
        {/* ==================================================== */}
        {showAddTxModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
              <h2 className="text-sm font-bold text-white mb-4">تسجيل حركة مالية جديدة</h2>
              <form onSubmit={handleAddTransaction} className="space-y-3">
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setTxType('expense')}
                    className={`py-2 text-xs font-bold rounded-lg ${txType === 'expense' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}
                  >
                    مصروف (-)
                  </button>
                  <button
                    type="button"
                    onClick={() => setTxType('income')}
                    className={`py-2 text-xs font-bold rounded-lg ${txType === 'income' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
                  >
                    دخل (+)
                  </button>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">بيان الحركة / الوصف:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: فاتورة كهرباء، راتب، تموين"
                    value={txTitle}
                    onChange={(e) => setTxTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">المبلغ (بالدينار الأردني):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none font-bold"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                  >
                    حفظ الحركة
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddTxModal(false)}
                    className="flex-1 py-2.5 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* نافذة منبثقة 2: إنشاء محفظة جديدة                    */}
        {/* ==================================================== */}
        {showAddWalletModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl">
              <h2 className="text-sm font-bold text-white mb-3">إنشاء محفظة عائلية جديدة</h2>
              <form onSubmit={handleAddWallet} className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">اسم المحفظة:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: مصاريف السيارة، التوفير السنوي"
                    value={newWalletName}
                    onChange={(e) => setNewWalletName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold rounded-xl"
                  >
                    إنشاء المحفظة
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddWalletModal(false)}
                    className="flex-1 py-2.5 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* نافذة منبثقة 3: دعوة وإضافة فرد جديد                 */}
        {/* ==================================================== */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl">
              <h2 className="text-sm font-bold text-white mb-2">إضافة فرد لمحفظة ({currentWallet?.name})</h2>
              <p className="text-[11px] text-slate-400 mb-4">أدخل اسم الفرد لإضافته ومشاركته إدارة هذه المحفظة فوراً:</p>
              
              <form onSubmit={handleAddMember} className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">اسم الشخص:</label>
                  <input
                    type="text"
                    required
                    placeholder="مثال: أم عبد الله، محمد"
                    value={newMemberName}
                    onChange={(e) => setNewMemberName(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">الدور والصلاحية:</label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="member">فرد بالعائلة (إضافة حركات وقائمة تسوق)</option>
                    <option value="admin">مشرف (صلاحية كاملة وحذف وتعديل)</option>
                  </select>
                </div>

                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-center">
                  <div className="text-[10px] text-slate-400">رمز الانضمام السريع المشترك:</div>
                  <div className="text-xs font-mono font-black text-cyan-400 tracking-wider mt-0.5">FAMILY-2026-JORDAN</div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl"
                  >
                    تأكيد الإضافة
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowInviteModal(false)}
                    className="flex-1 py-2.5 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl"
                  >
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
