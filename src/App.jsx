import React, { useState, useEffect } from 'react';

// ==========================================
// أيقونات SVG مدمجة بالكامل (لا تحتاج تثبيت أي مكتبات)
// ==========================================
const Icons = {
  Wallet: () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
  Dashboard: () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  Cart: () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  Users: () => <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
  Trash: () => <svg className="w-4 h-4 inline-block text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>,
  Plus: () => <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>,
  Check: () => <svg className="w-4 h-4 inline-block text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>,
  Undo: () => <svg className="w-4 h-4 inline-block text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a5 5 0 015 5v2m-15-7l4-4m-4 4l4 4" /></svg>,
  Edit: () => <svg className="w-4 h-4 inline-block text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
};

export default function FamilyBudgetApp() {
  // 1. إدارة المحافظ
  const [wallets, setWallets] = useState(() => {
    const saved = localStorage.getItem('fb_wallets_v2');
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

  const [activeWalletId, setActiveWalletId] = useState(() => localStorage.getItem('fb_active_wallet_v2') || 'w-main');
  const [currentUser, setCurrentUser] = useState(() => localStorage.getItem('fb_current_user_v2') || 'u1');

  // 2. الحركات المالية
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('fb_transactions_v2');
    return saved ? JSON.parse(saved) : [
      { id: 't-1', walletId: 'w-main', title: 'راتب شهري أساسي', amount: 600.0, type: 'income', category: 'راتب', date: '2026-10-20', addedBy: 'أحمد' },
      { id: 't-2', walletId: 'w-main', title: 'مواد تموينية وبقالة', amount: 45.5, type: 'expense', category: 'بقالة', date: '2026-10-20', addedBy: 'الزوجة' }
    ];
  });

  // 3. قائمة التسوق التفاعلية
  const [shoppingItems, setShoppingItems] = useState(() => {
    const saved = localStorage.getItem('fb_shopping_v2');
    return saved ? JSON.parse(saved) : [
      { id: 's-1', walletId: 'w-main', name: 'زيت زيتون 4 لتر', estimatedCost: 28.0, actualCost: 0, status: 'pending', category: 'تموين' },
      { id: 's-2', walletId: 'w-main', name: 'خضار وفواكه أسبوعية', estimatedCost: 15.0, actualCost: 0, status: 'pending', category: 'خضار' },
      { id: 's-3', walletId: 'w-main', name: 'حليب بودرة (400غ)', estimatedCost: 5.0, actualCost: 5.0, status: 'bought', category: 'ألبان' }
    ];
  });

  // التبويبات
  const [currentTab, setCurrentTab] = useState('shopping'); // الافتراضي هو قائمة التسوق
  const [shoppingSubTab, setShoppingSubTab] = useState('pending'); // 'pending' أو 'bought'

  // النوافذ المنبثقة
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
  const [newItemCategory, setNewItemCategory] = useState('عام');

  // ==========================================
  // الحفظ الدائم في ذاكرة الهاتف (LocalStorage)
  // ==========================================
  useEffect(() => {
    localStorage.setItem('fb_wallets_v2', JSON.stringify(wallets));
  }, [wallets]);

  useEffect(() => {
    localStorage.setItem('fb_transactions_v2', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('fb_shopping_v2', JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  useEffect(() => {
    localStorage.setItem('fb_active_wallet_v2', activeWalletId);
  }, [activeWalletId]);

  useEffect(() => {
    localStorage.setItem('fb_current_user_v2', currentUser);
  }, [currentUser]);

  // الحسابات المالية للمحفظة النشطة
  const currentWallet = wallets.find(w => w.id === activeWalletId) || wallets[0];
  const walletTransactions = transactions.filter(t => t.walletId === activeWalletId);
  
  const totalIncome = walletTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const totalExpense = walletTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Number(t.amount), 0);

  const balance = totalIncome - totalExpense;

  // عناصر التسوق للمحفظة النشطة
  const currentShopping = shoppingItems.filter(s => s.walletId === activeWalletId);
  const pendingItems = currentShopping.filter(s => s.status === 'pending');
  const boughtItems = currentShopping.filter(s => s.status === 'bought');
  const totalBoughtCost = boughtItems.reduce((sum, s) => sum + Number(s.actualCost || 0), 0);

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
      addedBy: userObj ? userObj.name : 'أحد الأفراد'
    };

    setTransactions([newTx, ...transactions]);
    setTxTitle('');
    setTxAmount('');
    setShowAddTxModal(false);
  };

  // حذف حركة مالية
  const handleDeleteTx = (id) => {
    if (window.confirm('هل تريد حذف هذه العملية المالية بالتأكيد؟')) {
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
      members: [{ id: 'u1', name: 'أحمد', role: 'admin', title: 'المشرف الرئيسي' }]
    };

    setWallets([...wallets, createdWallet]);
    setActiveWalletId(newId);
    setNewWalletName('');
    setShowAddWalletModal(false);
  };

  // حذف محفظة
  const handleDeleteWallet = (walletId) => {
    if (wallets.length <= 1) {
      alert('يجب أن تبقى محفظة واحدة نشطة على الأقل.');
      return;
    }
    if (window.confirm('هل أنت متأكد من حذف هذه المحفظة وجميع حركاتها وقوائمها؟')) {
      const remaining = wallets.filter(w => w.id !== walletId);
      setWallets(remaining);
      setTransactions(transactions.filter(t => t.walletId !== walletId));
      setShoppingItems(shoppingItems.filter(s => s.walletId !== walletId));
      setActiveWalletId(remaining[0].id);
    }
  };

  // إضافة فرد للمحفظة
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
      alert('لا يمكن حذف الفرد الوحيد في المحفظة.');
      return;
    }
    if (window.confirm('هل تريد بالتأكيد إزالة هذا الفرد من المحفظة؟')) {
      const updatedWallets = wallets.map(w => {
        if (w.id === activeWalletId) {
          return { ...w, members: w.members.filter(m => m.id !== memberId) };
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
      status: 'pending',
      category: newItemCategory
    };

    setShoppingItems([...shoppingItems, item]);
    setNewItemName('');
    setNewItemCost('');
  };

  // 1. شراء الصنف وإدخال القيمة الفعلية وتخصيمها من الرصيد
  const handleBuyItem = (item) => {
    const inputVal = prompt(`أدخل التكلفة الفعلية لشراء "${item.name}" (د.أ):`, item.estimatedCost || '0');
    if (inputVal === null) return;
    const finalCost = parseFloat(inputVal) || 0;

    // تحويل الحالة إلى 'bought'
    setShoppingItems(shoppingItems.map(s => s.id === item.id ? { ...s, status: 'bought', actualCost: finalCost } : s));

    // تسجيل مصروف وتخصيمه تلقائياً من الرصيد
    if (finalCost > 0) {
      const tx = {
        id: 'tx-shop-' + item.id,
        walletId: activeWalletId,
        title: `شراء من القائمة: ${item.name}`,
        amount: finalCost,
        type: 'expense',
        category: 'تسوق منزل',
        date: new Date().toISOString().split('T')[0],
        addedBy: currentWallet?.members.find(m => m.id === currentUser)?.name || 'أحد الأفراد'
      };
      setTransactions(prev => [tx, ...prev]);
    }
  };

  // 2. إلغاء الشراء واسترجاع المنتج والمبلغ بالكامل للرصيد
  const handleRevertItem = (item) => {
    if (window.confirm(`هل تريد إرجاع "${item.name}" إلى قائمة النواقص واسترداد مبلغ (${item.actualCost.toFixed(2)} د.أ) إلى الرصيد؟`)) {
      // إرجاع الصنف إلى pending
      setShoppingItems(shoppingItems.map(s => s.id === item.id ? { ...s, status: 'pending', actualCost: 0 } : s));

      // حذف حركة المصروف المرتبطة به لاستعادة الرصيد فوراً
      setTransactions(prev => prev.filter(t => t.id !== ('tx-shop-' + item.id) && t.title !== `شراء من القائمة: ${item.name}`));
    }
  };

  // 3. تعديل السعر الفعلي وتسوية فرق الرصيد تلقائياً
  const handleEditPrice = (item) => {
    const inputVal = prompt(`تعديل سعر شراء "${item.name}" (د.أ):`, item.actualCost);
    if (inputVal === null) return;
    const newPrice = parseFloat(inputVal) || 0;

    // تحديث سعر الصنف
    setShoppingItems(shoppingItems.map(s => s.id === item.id ? { ...s, actualCost: newPrice } : s));

    // تحديث حركة المصروف المرتبطة به لتسوية الرصيد
    setTransactions(prev => prev.map(t => {
      if (t.id === ('tx-shop-' + item.id) || t.title === `شراء من القائمة: ${item.name}`) {
        return { ...t, amount: newPrice };
      }
      return t;
    }));
  };

  // 4. حذف الصنف
  const handleDeleteShoppingItem = (item) => {
    if (window.confirm(`هل أنت متأكد من حذف "${item.name}" نهائياً؟`)) {
      setShoppingItems(shoppingItems.filter(s => s.id !== item.id));
      // إذا كان مشترى، يتم مسح المصروف وإعادة المبلغ للرصيد
      if (item.status === 'bought') {
        setTransactions(prev => prev.filter(t => t.id !== ('tx-shop-' + item.id) && t.title !== `شراء من القائمة: ${item.name}`));
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center pb-24 select-none">
      <div className="w-full max-w-md px-4 pt-5">

        {/* شارة التحقق من وصول التحديث */}
        <div className="flex justify-between items-center mb-4 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl">
          <span className="text-[11px] font-bold text-emerald-400">✓ [الإصدار 2.5 المنشور]</span>
          <span className="text-[10px] text-slate-400">محفوظ محلياً</span>
        </div>

        {/* رأس التطبيق */}
        <header className="text-center mb-5">
          <h1 className="text-2xl font-black text-white tracking-tight">ميزانية العائلة</h1>
          <p className="text-xs text-slate-400 font-medium mt-0.5">دينار أردني (JOD) • إدارة تسوق ومصاريف المنزل</p>
        </header>

        {/* محدد المحفظة والحساب */}
        <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800">
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
            <label className="block text-[10px] text-slate-400 mb-1 font-semibold pr-1">الفرد الحالي:</label>
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

        {/* شريط التبويبات الرئيسي الثلاثي */}
        <nav className="grid grid-cols-3 gap-1.5 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 mb-5 shadow-lg">
          <button
            onClick={() => setCurrentTab('shopping')}
            className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              currentTab === 'shopping' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icons.Cart /> قائمة التسوق
          </button>
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              currentTab === 'dashboard' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icons.Dashboard /> المصروفات
          </button>
          <button
            onClick={() => setCurrentTab('wallets')}
            className={`py-2 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all ${
              currentTab === 'wallets' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icons.Users /> المحافظ
          </button>
        </nav>

        {/* ==================================================== */}
        {/* التبويب الأول: قائمة التسوق بالتبويبين المنفصلين      */}
        {/* ==================================================== */}
        {currentTab === 'shopping' && (
          <div className="space-y-4">
            
            {/* التبويبان الفرعيان لقائمة التسوق */}
            <div className="grid grid-cols-2 gap-2 bg-slate-900/60 p-1.5 rounded-2xl border border-slate-800">
              <button
                onClick={() => setShoppingSubTab('pending')}
                className={`py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 ${
                  shoppingSubTab === 'pending'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>🛒 قبل الشراء (النواقص)</span>
                <span className="bg-amber-500/30 text-amber-300 px-2 py-0.5 rounded-full text-[10px]">
                  {pendingItems.length}
                </span>
              </button>
              <button
                onClick={() => setShoppingSubTab('bought')}
                className={`py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-2 ${
                  shoppingSubTab === 'bought'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>✓ بعد الشراء (المكتملة)</span>
                <span className="bg-emerald-500/30 text-emerald-300 px-2 py-0.5 rounded-full text-[10px]">
                  {boughtItems.length}
                </span>
              </button>
            </div>

            {/* نموذج إضافة صنف جديد (يظهر فقط في تبويب قبل الشراء) */}
            {shoppingSubTab === 'pending' && (
              <form onSubmit={handleAddShoppingItem} className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl space-y-2.5">
                <div className="text-xs font-bold text-slate-300">إضافة نواقص جديدة للمنزل:</div>
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="اسم الصنف (مثلاً: زيت، أرز)"
                    value={newItemName}
                    onChange={(e) => setNewItemName(e.target.value)}
                    className="col-span-2 bg-slate-800 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white outline-none"
                  />
                  <input
                    type="number"
                    step="0.1"
                    placeholder="سعر تقديري"
                    value={newItemCost}
                    onChange={(e) => setNewItemCost(e.target.value)}
                    className="col-span-1 bg-slate-800 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1 shadow-md shadow-amber-900/20"
                >
                  <Icons.Plus /> إضافة لقائمة النواقص
                </button>
              </form>
            )}

            {/* عرض تبويب 1: المنتجات قبل الشراء (النواقص مع الترقيم) */}
            {shoppingSubTab === 'pending' && (
              <div className="space-y-2">
                <div className="flex justify-between items-center px-1">
                  <h3 className="text-xs font-bold text-amber-400">الأغراض المطلوب شراؤها من السوق:</h3>
                  <span className="text-[10px] text-slate-400">{pendingItems.length} صنف</span>
                </div>

                {pendingItems.length === 0 ? (
                  <div className="text-center py-10 bg-slate-900/40 rounded-2xl border border-slate-800/60 text-slate-500 text-xs">
                    القائمة فارغة تماماً! لا توجد نواقص مسجلة حالياً.
                  </div>
                ) : (
                  pendingItems.map((item, index) => (
                    <div key={item.id} className="bg-slate-900 border border-slate-800 p-3.5 rounded-2xl flex items-center justify-between hover:border-slate-700 transition-all">
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 text-amber-400 text-xs font-black flex items-center justify-center">
                          #{index + 1}
                        </span>
                        <div>
                          <div className="text-xs font-bold text-white">{item.name}</div>
                          <div className="text-[10px] text-slate-400">
                            التقديري: {item.estimatedCost > 0 ? `${item.estimatedCost.toFixed(2)} د.أ` : 'غير محدد'}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleBuyItem(item)}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold rounded-xl flex items-center gap-1 shadow-md shadow-emerald-900/30 active:scale-95 transition-all"
                        >
                          <Icons.Check /> تم الشراء
                        </button>
                        <button
                          onClick={() => handleDeleteShoppingItem(item)}
                          className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-rose-400"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* عرض تبويب 2: المنتجات بعد الشراء (المكتملة مع الإرجاع وتعديل السعر) */}
            {shoppingSubTab === 'bought' && (
              <div className="space-y-3">
                {/* ملخص المشتريات الإجمالي */}
                <div className="bg-emerald-950/30 border border-emerald-500/30 p-3 rounded-2xl flex justify-between items-center">
                  <span className="text-xs text-emerald-300 font-bold">إجمالي ما تم شراؤه وخصمه:</span>
                  <span className="text-sm font-black text-emerald-400">-{totalBoughtCost.toFixed(2)} د.أ</span>
                </div>

                {boughtItems.length === 0 ? (
                  <div className="text-center py-10 bg-slate-900/40 rounded-2xl border border-slate-800/60 text-slate-500 text-xs">
                    لم تقم بشراء أي غرض بعد من القائمة.
                  </div>
                ) : (
                  boughtItems.map((item, index) => (
                    <div key={item.id} className="bg-slate-900 border border-slate-800/80 p-3.5 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-black flex items-center justify-center">
                          ✓
                        </span>
                        <div>
                          <div className="text-xs font-bold text-slate-200 line-through">{item.name}</div>
                          <div className="text-[11px] font-black text-rose-400">
                            -{item.actualCost.toFixed(2)} د.أ
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        {/* زر تعديل السعر الفعلي */}
                        <button
                          onClick={() => handleEditPrice(item)}
                          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-cyan-400"
                          title="تعديل السعر وتسوية الرصيد"
                        >
                          <Icons.Edit />
                        </button>

                        {/* زر إرجاع المنتج واسترداد المبلغ للرصيد */}
                        <button
                          onClick={() => handleRevertItem(item)}
                          className="px-2.5 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-[10px] font-bold flex items-center gap-1"
                          title="إلغاء الشراء واسترداد المبلغ"
                        >
                          <Icons.Undo /> استرجاع
                        </button>

                        {/* زر الحذف النهائي */}
                        <button
                          onClick={() => handleDeleteShoppingItem(item)}
                          className="p-2 hover:bg-slate-800 rounded-lg text-slate-500 hover:text-rose-400"
                          title="حذف نهائي"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

          </div>
        )}

        {/* ==================================================== */}
        {/* التبويب الثاني: لوحة المصروفات والرصيد العام          */}
        {/* ==================================================== */}
        {currentTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl shadow-xl text-center">
              <div className="text-xs text-slate-400 font-semibold mb-1">الرصيد الصافي المتاح</div>
              <div className={`text-4xl font-black mb-4 ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {balance.toFixed(2)} <span className="text-lg font-medium text-slate-300">د.أ</span>
              </div>
              
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80">
                <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800/50">
                  <div className="text-[10px] text-slate-400">إجمالي المدخولات</div>
                  <div className="text-sm font-bold text-emerald-400">+{totalIncome.toFixed(2)} د.أ</div>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-2xl border border-slate-800/50">
                  <div className="text-[10px] text-slate-400">إجمالي المصروفات</div>
                  <div className="text-sm font-bold text-rose-400">-{totalExpense.toFixed(2)} د.أ</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAddTxModal(true)}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Icons.Plus /> إضافة حركة مالية يدوية
            </button>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 pr-1">سجل الحركات:</h3>
              {walletTransactions.map(t => (
                <div key={t.id} className="bg-slate-900 border border-slate-800 p-3 rounded-2xl flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">{t.title}</div>
                    <div className="text-[10px] text-slate-400">{t.date} • {t.addedBy}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-black ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {t.type === 'income' ? '+' : '-'}{t.amount.toFixed(2)} د.أ
                    </span>
                    <button onClick={() => handleDeleteTx(t.id)} className="p-1 text-slate-500 hover:text-rose-400">
                      <Icons.Trash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ==================================================== */}
        {/* التبويب الثالث: إدارة المحافظ والأعضاء                */}
        {/* ==================================================== */}
        {currentTab === 'wallets' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowAddWalletModal(true)}
                className="py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-md"
              >
                <Icons.Plus /> محفظة جديدة
              </button>
              <button
                onClick={() => setShowInviteModal(true)}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-md"
              >
                <Icons.Users /> إضافة فرد
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 pr-1">المحافظ المسجلة:</h3>
              {wallets.map(w => {
                const isSelected = w.id === activeWalletId;
                return (
                  <div key={w.id} className={`p-3.5 rounded-2xl border flex items-center justify-between ${isSelected ? 'bg-cyan-950/40 border-cyan-500/60' : 'bg-slate-900 border-slate-800'}`}>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-1.5">
                        <span>📁 {w.name}</span>
                        {isSelected && <span className="text-[10px] bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded-full font-bold">النشطة</span>}
                      </div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{w.members.length} أفراد</div>
                    </div>
                    <div className="flex gap-2">
                      {!isSelected && (
                        <button onClick={() => setActiveWalletId(w.id)} className="px-3 py-1 bg-slate-800 text-xs font-bold rounded-xl text-white">
                          تفعيل
                        </button>
                      )}
                      <button onClick={() => handleDeleteWallet(w.id)} className="p-1.5 text-slate-500 hover:text-rose-400">
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-2.5">
              <h3 className="text-xs font-bold text-cyan-400">أفراد محفظة ({currentWallet?.name}):</h3>
              {currentWallet?.members.map(member => (
                <div key={member.id} className="bg-slate-950 p-2.5 rounded-xl border border-slate-800 flex justify-between items-center">
                  <div className="text-xs font-bold text-white flex items-center gap-2">
                    <span>{member.role === 'admin' ? '👑' : '👤'}</span>
                    <span>{member.name} ({member.title})</span>
                  </div>
                  <button onClick={() => handleDeleteMember(member.id)} className="text-[11px] text-rose-400 hover:underline">
                    حذف
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* النوافذ المنبثقة: 1. إضافة معاملة */}
        {showAddTxModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl">
              <h2 className="text-xs font-bold text-white mb-3">إضافة حركة مالية جديدة</h2>
              <form onSubmit={handleAddTransaction} className="space-y-3">
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-950 rounded-xl">
                  <button type="button" onClick={() => setTxType('expense')} className={`py-1.5 text-xs font-bold rounded-lg ${txType === 'expense' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>مصروف (-)</button>
                  <button type="button" onClick={() => setTxType('income')} className={`py-1.5 text-xs font-bold rounded-lg ${txType === 'income' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}>دخل (+)</button>
                </div>
                <input type="text" required placeholder="بيان الحركة" value={txTitle} onChange={e => setTxTitle(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none" />
                <input type="number" step="0.01" required placeholder="المبلغ (د.أ)" value={txAmount} onChange={e => setTxAmount(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none font-bold" />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl">حفظ</button>
                  <button type="button" onClick={() => setShowAddTxModal(false)} className="flex-1 py-2 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl">إلغاء</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* النوافذ المنبثقة: 2. إنشاء محفظة */}
        {showAddWalletModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl">
              <h2 className="text-xs font-bold text-white mb-3">إنشاء محفظة جديدة</h2>
              <form onSubmit={handleAddWallet} className="space-y-3">
                <input type="text" required placeholder="اسم المحفظة (مثلاً: مصاريف السيارة)" value={newWalletName} onChange={e => setNewWalletName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none" />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 py-2 bg-cyan-600 text-white text-xs font-bold rounded-xl">إنشاء</button>
                  <button type="button" onClick={() => setShowAddWalletModal(false)} className="flex-1 py-2 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl">إلغاء</button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* النوافذ المنبثقة: 3. إضافة فرد */}
        {showInviteModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl">
              <h2 className="text-xs font-bold text-white mb-3">إضافة فرد للمحفظة</h2>
              <form onSubmit={handleAddMember} className="space-y-3">
                <input type="text" required placeholder="اسم الشخص (مثلاً: أم عبد الله)" value={newMemberName} onChange={e => setNewMemberName(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none" />
                <select value={newMemberRole} onChange={e => setNewMemberRole(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none">
                  <option value="member">فرد بالعائلة</option>
                  <option value="admin">مشرف</option>
                </select>
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl">إضافة</button>
                  <button type="button" onClick={() => setShowInviteModal(false)} className="flex-1 py-2 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl">إلغاء</button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
