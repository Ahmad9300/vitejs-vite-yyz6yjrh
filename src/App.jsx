import React, { useState, useEffect, useMemo, useCallback } from 'react';

const Icons = {
  Wallet: () => (
    <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
  ),
  Dashboard: () => (
    <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
    </svg>
  ),
  Cart: () => (
    <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
  ),
  Users: () => (
    <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  Report: () => (
    <svg className="w-5 h-5 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  Trash: () => (
    <svg className="w-4 h-4 inline-block text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
    </svg>
  ),
  Plus: () => (
    <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4 inline-block text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Undo: () => (
    <svg className="w-4 h-4 inline-block text-amber-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h10a5 5 0 015 5v2m0 0l-4-4m4 4l4-4" />
    </svg>
  ),
  Edit: () => (
    <svg className="w-4 h-4 inline-block text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  CheckSquare: () => (
    <svg className="w-5 h-5 inline-block text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  Square: () => (
    <svg className="w-5 h-5 inline-block text-slate-500 hover:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" strokeWidth="2" />
    </svg>
  )
};

const CATEGORIES = {
  'ألبان وأجبان': { icon: '🥛', color: 'bg-sky-500/15 text-sky-300 border-sky-500/30' },
  'مواد تموينية وبقالة': { icon: '🥫', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  'خضار وفواكه': { icon: '🥦', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  'لحوم ودواجن': { icon: '🥩', color: 'bg-rose-500/15 text-rose-300 border-rose-500/30' },
  'منظفات ومستلزمات منزلية': { icon: '🧼', color: 'bg-teal-500/15 text-teal-300 border-teal-500/30' },
  'مخبوزات ومعجنات': { icon: '🥖', color: 'bg-orange-500/15 text-orange-300 border-orange-500/30' },
  'صيدلية وعناية': { icon: '💊', color: 'bg-purple-500/15 text-purple-300 border-purple-500/30' },
  'أخرى ومستلزمات': { icon: '📦', color: 'bg-slate-500/15 text-slate-300 border-slate-500/30' }
};

export default function App() {
  // تحميل تنسيقات Tailwind والخط العربي تلقائياً لضمان عمل الواجهة الفاخرة حتى لو لم يتغير index.html
  useEffect(() => {
    if (!document.getElementById('tailwind-cdn-script')) {
      const script = document.createElement('script');
      script.id = 'tailwind-cdn-script';
      script.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(script);
    }
    if (!document.getElementById('tajawal-font-link')) {
      const link = document.createElement('link');
      link.id = 'tajawal-font-link';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Tajawal:wght@400;500;700;800;900&display=swap';
      document.head.appendChild(link);
    }
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    document.body.style.backgroundColor = '#020617';
    document.body.style.color = '#f8fafc';
    document.body.style.fontFamily = "'Tajawal', sans-serif";
  }, []);

  const [wallets, setWallets] = useState(() => {
    try {
      const saved = localStorage.getItem('fb_wallets');
      return saved ? JSON.parse(saved) : [
        {
          id: 'w-main',
          name: 'مصاريف المنزل الرئيسية',
          members: [
            { id: 'u1', name: 'أحمد', role: 'admin', title: 'رب الأسرة' },
            { id: 'u2', name: 'فاطمة', role: 'member', title: 'الأم' }
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
    } catch {
      return [
        {
          id: 'w-main',
          name: 'مصاريف المنزل الرئيسية',
          members: [{ id: 'u1', name: 'أحمد', role: 'admin', title: 'رب الأسرة' }]
        }
      ];
    }
  });

  const [activeWalletId, setActiveWalletId] = useState(() => {
    return localStorage.getItem('fb_active_wallet') || 'w-main';
  });

  const [currentUser, setCurrentUser] = useState(() => {
    return localStorage.getItem('fb_current_user') || 'u1';
  });

  const [transactions, setTransactions] = useState(() => {
    try {
      const saved = localStorage.getItem('fb_transactions');
      return saved ? JSON.parse(saved) : [
        {
          id: 't-init',
          walletId: 'w-main',
          title: 'الراتب الشهري والدخل الأساسي',
          amount: 500.0,
          type: 'income',
          category: 'راتب ودخل',
          date: '2026-10-20',
          addedBy: 'أحمد'
        }
      ];
    } catch {
      return [];
    }
  });

  const [shoppingItems, setShoppingItems] = useState(() => {
    try {
      const saved = localStorage.getItem('fb_shopping');
      if (!saved) {
        return [
          {
            id: 's-1',
            walletId: 'w-main',
            title: 'حليب بودرة (٤٠٠ غ)',
            quantity: 'عبوة واحدة',
            category: 'ألبان وأجبان',
            notes: 'النوع قليل الدسم',
            actualPrice: null,
            transactionId: null,
            status: 'PENDING',
            addedBy: 'فاطمة',
            purchasedBy: null
          },
          {
            id: 's-2',
            walletId: 'w-main',
            title: 'خبز طازج وجبنة نابلسية',
            quantity: '1 كغم جبنة + ربطة خبز',
            category: 'مخبوزات ومعجنات',
            notes: 'من مخبز البركة القريب',
            actualPrice: null,
            transactionId: null,
            status: 'PENDING',
            addedBy: 'فاطمة',
            purchasedBy: null
          }
        ];
      }

      const parsed = JSON.parse(saved);
      return parsed.map((item) => {
        const rawStatus = (item.status || 'PENDING').toString().toUpperCase();
        const isBought = rawStatus === 'PURCHASED' || rawStatus === 'BOUGHT';
        const finalPrice = item.actualPrice ?? (item.actualCost ? Number(item.actualCost) : (isBought ? Number(item.estimatedCost) || 0 : null));

        return {
          id: item.id || 's-' + Math.random().toString(36).substring(2, 7),
          walletId: item.walletId || 'w-main',
          title: item.title || item.name || 'غرض تسوق',
          quantity: item.quantity || '1',
          category: item.category || 'مواد تموينية وبقالة',
          notes: item.notes || '',
          actualPrice: finalPrice,
          transactionId: item.transactionId || null,
          status: isBought ? 'PURCHASED' : 'PENDING',
          addedBy: item.addedBy || 'الزوجة',
          purchasedBy: item.purchasedBy || (isBought ? 'أحد الأفراد' : null)
        };
      });
    } catch {
      return [];
    }
  });

  const [currentTab, setCurrentTab] = useState('shopping');
  const [shoppingSubTab, setShoppingSubTab] = useState('PENDING'); // PENDING | PURCHASED
  const [toastMessage, setToastMessage] = useState(null);

  // النوافذ المنبثقة المخصصة (بدون استخدام alert أو confirm التقليدية)
  const [showAddTxModal, setShowAddTxModal] = useState(false);
  const [showAddWalletModal, setShowAddWalletModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [purchasingItem, setPurchasingItem] = useState(null);
  const [editingPriceItem, setEditingPriceItem] = useState(null);
  const [editPriceInput, setEditPriceInput] = useState('');
  const [confirmDialog, setConfirmDialog] = useState(null);

  // حقول النماذج
  const [txTitle, setTxTitle] = useState('');
  const [txAmount, setTxAmount] = useState('');
  const [txType, setTxType] = useState('expense');
  const [txCategory, setTxCategory] = useState('مصاريف عامة');

  const [newWalletName, setNewWalletName] = useState('');
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRole, setNewMemberRole] = useState('member');

  const [newShopTitle, setNewShopTitle] = useState('');
  const [newShopQty, setNewShopQty] = useState('1');
  const [newShopCat, setNewShopCat] = useState('ألبان وأجبان');
  const [newShopNotes, setNewShopNotes] = useState('');

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

  const showToast = useCallback((msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const currentWallet = wallets.find((w) => w.id === activeWalletId) || wallets[0];
  const walletTransactions = useMemo(() => {
    return transactions.filter((t) => t.walletId === activeWalletId);
  }, [transactions, activeWalletId]);

  const totalIncome = useMemo(() => {
    return walletTransactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [walletTransactions]);

  const totalExpense = useMemo(() => {
    return walletTransactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + Number(t.amount), 0);
  }, [walletTransactions]);

  const balance = totalIncome - totalExpense;

  const pendingShopping = useMemo(() => {
    return shoppingItems.filter((s) => s.walletId === activeWalletId && s.status === 'PENDING');
  }, [shoppingItems, activeWalletId]);

  const purchasedShopping = useMemo(() => {
    return shoppingItems.filter((s) => s.walletId === activeWalletId && s.status === 'PURCHASED');
  }, [shoppingItems, activeWalletId]);

  const totalPurchasedSum = useMemo(() => {
    return purchasedShopping.reduce((sum, i) => sum + (Number(i.actualPrice) || 0), 0);
  }, [purchasedShopping]);

  const handleAddTransaction = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(txAmount);
    if (!txTitle || isNaN(parsedAmount) || parsedAmount <= 0) {
      showToast('يرجى كتابة بيان ومبلغ صحيح بالدينار', 'error');
      return;
    }

    const currentUserName = currentWallet?.members.find((m) => m.id === currentUser)?.name || 'أحد الأفراد';
    const newTx = {
      id: 'tx-' + Date.now(),
      walletId: activeWalletId,
      title: txTitle.trim(),
      amount: parsedAmount,
      type: txType,
      category: txCategory,
      date: new Date().toISOString().split('T')[0],
      addedBy: currentUserName
    };

    setTransactions([newTx, ...transactions]);
    setTxTitle('');
    setTxAmount('');
    setShowAddTxModal(false);
    showToast(`تم تسجيل ${txType === 'income' ? 'إيداع' : 'مصروف'} بقيمة ${parsedAmount.toFixed(2)} د.أ`);
  };

  const handleDeleteTx = (id) => {
    const tx = transactions.find((t) => t.id === id);
    setConfirmDialog({
      title: 'حذف الحركة المالية',
      message: `هل تريد حذف حركة "${tx?.title || ''}" وتحديث الرصيد بالتأكيد؟`,
      onConfirm: () => {
        setTransactions((prev) => prev.filter((t) => t.id !== id));
        if (tx) {
          setShoppingItems((prev) =>
            prev.map((item) =>
              item.transactionId === id
                ? { ...item, status: 'PENDING', actualPrice: null, transactionId: null, purchasedBy: null }
                : item
            )
          );
        }
        showToast('تم حذف الحركة وتحديث الرصيد');
        setConfirmDialog(null);
      }
    });
  };

  const handleAddShoppingItem = (e) => {
    e.preventDefault();
    if (!newShopTitle.trim()) return;

    const currentUserName = currentWallet?.members.find((m) => m.id === currentUser)?.name || 'الزوجة';
    const newItem = {
      id: 'shop-' + Date.now(),
      walletId: activeWalletId,
      title: newShopTitle.trim(),
      quantity: newShopQty.trim() || '1',
      category: newShopCat,
      notes: newShopNotes.trim(),
      actualPrice: null,
      transactionId: null,
      status: 'PENDING',
      addedBy: currentUserName,
      purchasedBy: null
    };

    setShoppingItems([newItem, ...shoppingItems]);
    setNewShopTitle('');
    setNewShopQty('1');
    setNewShopNotes('');
    showToast(`تمت إضافة "${newItem.title}" لقائمة النواقص`);
  };

  const handleConfirmPurchase = (e) => {
    e.preventDefault();
    if (!purchasingItem) return;

    const price = parseFloat(purchasingItem.tempPrice);
    if (isNaN(price) || price <= 0) {
      showToast('يرجى كتابة السعر الفعلي المدفوع بالسوق', 'error');
      return;
    }

    const currentUserName = currentWallet?.members.find((m) => m.id === currentUser)?.name || 'المشتري';
    const newTxId = 'tx-shop-' + Date.now();

    const newTx = {
      id: newTxId,
      walletId: activeWalletId,
      title: `شراء من قائمة التسوق: ${purchasingItem.title} (${purchasingItem.quantity})`,
      amount: price,
      type: 'expense',
      category: purchasingItem.category || 'بقالة ومواد تموينية',
      date: new Date().toISOString().split('T')[0],
      addedBy: currentUserName
    };

    setShoppingItems((prev) =>
      prev.map((item) =>
        item.id === purchasingItem.id
          ? {
              ...item,
              status: 'PURCHASED',
              actualPrice: price,
              transactionId: newTxId,
              purchasedBy: currentUserName
            }
          : item
      )
    );

    setTransactions((prev) => [newTx, ...prev]);
    setPurchasingItem(null);
    showToast(`تم الشراء ونقل الغرض لـ "تم الشراء" وخصم ${price.toFixed(2)} د.أ من الرصيد`);
  };

  const handleUncheckPurchasedItem = (item) => {
    const refundAmount = Number(item.actualPrice) || 0;

    setShoppingItems((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? {
              ...i,
              status: 'PENDING',
              actualPrice: null,
              transactionId: null,
              purchasedBy: null
            }
          : i
      )
    );

    if (item.transactionId) {
      setTransactions((prev) => prev.filter((t) => t.id !== item.transactionId));
    } else {
      setTransactions((prev) => {
        const idx = prev.findIndex(
          (t) => t.walletId === item.walletId && t.title.includes(item.title) && Number(t.amount) === refundAmount
        );
        if (idx !== -1) return prev.filter((_, i) => i !== idx);
        return prev;
      });
    }

    showToast(`تمت إعادة "${item.title}" لتبويب قبل الشراء واسترداد ${refundAmount.toFixed(2)} د.أ للمحفظة`);
  };

  const handleUpdatePurchasedPrice = (e) => {
    e.preventDefault();
    if (!editingPriceItem) return;

    const newPrice = parseFloat(editPriceInput);
    if (isNaN(newPrice) || newPrice <= 0) {
      showToast('يرجى إدخال سعر صحيح بالدينار', 'error');
      return;
    }

    const oldPrice = Number(editingPriceItem.actualPrice) || 0;
    const difference = newPrice - oldPrice;

    setShoppingItems((prev) =>
      prev.map((i) =>
        i.id === editingPriceItem.id ? { ...i, actualPrice: newPrice } : i
      )
    );

    if (editingPriceItem.transactionId) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === editingPriceItem.transactionId
            ? {
                ...t,
                amount: newPrice,
                title: `شراء من قائمة التسوق: ${editingPriceItem.title} (سعر معدل: ${newPrice.toFixed(2)} د.أ)`
              }
            : t
        )
      );
    }

    setEditingPriceItem(null);
    setEditPriceInput('');

    if (difference > 0) {
      showToast(`تم تعديل السعر وخصم فرق إضافي (${difference.toFixed(2)} د.أ) من الرصيد`);
    } else if (difference < 0) {
      showToast(`تم تعديل السعر واسترجاع فرق (${Math.abs(difference).toFixed(2)} د.أ) للرصيد المتاح`);
    } else {
      showToast('لم يطرأ أي تغيير على السعر');
    }
  };

  const handleDeleteShoppingItem = (item) => {
    setConfirmDialog({
      title: 'حذف غرض التسوق',
      message:
        item.status === 'PURCHASED'
          ? `هل أنت متأكد من حذف "${item.title}"؟ سيتم أيضاً استرداد مبلغه (${Number(item.actualPrice).toFixed(2)} د.أ) إلى رصيد المحفظة.`
          : `هل أنت متأكد من حذف "${item.title}" من قائمة النواقص؟`,
      onConfirm: () => {
        setShoppingItems((prev) => prev.filter((i) => i.id !== item.id));
        if (item.status === 'PURCHASED') {
          if (item.transactionId) {
            setTransactions((prev) => prev.filter((t) => t.id !== item.transactionId));
          } else {
            const refund = Number(item.actualPrice) || 0;
            setTransactions((prev) => {
              const idx = prev.findIndex(
                (t) => t.walletId === item.walletId && t.title.includes(item.title) && Number(t.amount) === refund
              );
              if (idx !== -1) return prev.filter((_, i) => i !== idx);
              return prev;
            });
          }
          showToast(`تم حذف الغرض واسترداد قيمته (${Number(item.actualPrice).toFixed(2)} د.أ) للمحفظة`);
        } else {
          showToast('تم حذف الغرض من القائمة');
        }
        setConfirmDialog(null);
      }
    });
  };

  const handleAddWallet = (e) => {
    e.preventDefault();
    if (!newWalletName.trim()) return;

    const newId = 'w-' + Date.now();
    const createdWallet = {
      id: newId,
      name: newWalletName.trim(),
      members: [
        { id: 'u1', name: 'أحمد', role: 'admin', title: 'المشرف' },
        { id: 'u2', name: 'فاطمة', role: 'member', title: 'عضو' }
      ]
    };

    setWallets([...wallets, createdWallet]);
    setActiveWalletId(newId);
    setNewWalletName('');
    setShowAddWalletModal(false);
    showToast(`تم إنشاء محفظة "${createdWallet.name}" بنجاح`);
  };

  const handleDeleteWallet = (walletId) => {
    if (wallets.length <= 1) {
      showToast('يجب أن تبقى محفظة واحدة نشطة على الأقل في التطبيق', 'error');
      return;
    }
    const target = wallets.find((w) => w.id === walletId);
    setConfirmDialog({
      title: 'حذف المحفظة',
      message: `هل أنت متأكد من حذف محفظة "${target?.name}" وكافة حركاتها وقائمة تسوقها؟`,
      onConfirm: () => {
        const remaining = wallets.filter((w) => w.id !== walletId);
        setWallets(remaining);
        setTransactions((prev) => prev.filter((t) => t.walletId !== walletId));
        setShoppingItems((prev) => prev.filter((s) => s.walletId !== walletId));
        setActiveWalletId(remaining[0].id);
        showToast(`تم حذف محفظة "${target?.name}"`);
        setConfirmDialog(null);
      }
    });
  };

  const handleAddMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    const newMem = {
      id: 'u-' + Date.now(),
      name: newMemberName.trim(),
      role: newMemberRole,
      title: newMemberRole === 'admin' ? 'مشرف مشترك' : 'فرد في العائلة'
    };

    setWallets((prev) =>
      prev.map((w) => (w.id === activeWalletId ? { ...w, members: [...w.members, newMem] } : w))
    );

    setNewMemberName('');
    setShowInviteModal(false);
    showToast(`تمت إضافة ${newMem.name} إلى محفظة "${currentWallet?.name}"`);
  };

  const handleDeleteMember = (memberId) => {
    if (currentWallet.members.length <= 1) {
      showToast('لا يمكن حذف العضو الوحيد المتبقي في المحفظة', 'error');
      return;
    }
    const mem = currentWallet.members.find((m) => m.id === memberId);
    setConfirmDialog({
      title: 'إزالة عضو من المحفظة',
      message: `هل أنت متأكد من إزالة "${mem?.name}" من هذه المحفظة؟`,
      onConfirm: () => {
        setWallets((prev) =>
          prev.map((w) =>
            w.id === activeWalletId ? { ...w, members: w.members.filter((m) => m.id !== memberId) } : w
          )
        );
        if (currentUser === memberId) {
          const remaining = currentWallet.members.filter((m) => m.id !== memberId);
          setCurrentUser(remaining[0].id);
        }
        showToast(`تمت إزالة ${mem?.name} من المحفظة`);
        setConfirmDialog(null);
      }
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex justify-center pb-24 selection:bg-teal-500 selection:text-white" dir="rtl">
      <div className="w-full max-w-md px-4 pt-5">

        {/* إشعار عائم منبثق (Toast) */}
        {toastMessage && (
          <div className={`fixed top-4 left-4 right-4 z-50 p-3.5 rounded-2xl shadow-2xl text-xs font-bold flex items-center justify-between border ${
            toastMessage.type === 'error' ? 'bg-rose-950 border-rose-800 text-rose-200' : 'bg-emerald-950 border-emerald-700 text-emerald-200'
          }`}>
            <span>{toastMessage.msg}</span>
            <button onClick={() => setToastMessage(null)} className="text-sm font-bold opacity-75">✕</button>
          </div>
        )}

        {/* ترويسة التطبيق مع شارة الإصدار للتحقق الفوري */}
        <header className="text-center mb-4">
          <div className="inline-flex items-center justify-center p-2.5 bg-gradient-to-tr from-teal-500 to-emerald-400 rounded-2xl shadow-lg shadow-teal-500/20 mb-2">
            <span className="text-2xl">💰</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white">ميزانية العائلة</h1>
            <span className="text-[10px] bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
              الإصدار 3.0 الكامل
            </span>
          </div>
          <p className="text-xs text-slate-400 font-medium mt-1">دينار أردني (JOD) • تبويبان للتسوق مع استرداد الرصيد تلقائياً</p>
        </header>

        {/* محدد المحفظة والحساب النشط */}
        <div className="grid grid-cols-2 gap-2 mb-4 bg-slate-900/90 p-2.5 rounded-2xl border border-slate-800 shadow-md">
          <div>
            <label className="block text-[10px] text-slate-400 mb-1 font-bold pr-1">المحفظة النشطة:</label>
            <select
              value={activeWalletId}
              onChange={(e) => setActiveWalletId(e.target.value)}
              className="w-full bg-slate-800 text-xs font-bold text-teal-300 rounded-xl px-2.5 py-2 border border-slate-700 outline-none cursor-pointer"
            >
              {wallets.map((w) => (
                <option key={w.id} value={w.id}>📁 {w.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] text-slate-400 mb-1 font-bold pr-1">الحساب النشط:</label>
            <select
              value={currentUser}
              onChange={(e) => setCurrentUser(e.target.value)}
              className="w-full bg-slate-800 text-xs font-bold text-amber-300 rounded-xl px-2.5 py-2 border border-slate-700 outline-none cursor-pointer"
            >
              {currentWallet?.members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.role === 'admin' ? '👑' : '👤'} {m.name} ({m.title})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* شريط التبويبات الأربعة الرئيسية */}
        <nav className="grid grid-cols-4 gap-1 bg-slate-900 p-1.5 rounded-2xl border border-slate-800 mb-5 shadow-md text-center">
          <button
            onClick={() => setCurrentTab('shopping')}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center justify-center gap-1 transition-all relative ${
              currentTab === 'shopping' ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icons.Cart />
            <span>قائمة التسوق</span>
            {pendingShopping.length > 0 && (
              <span className="absolute top-1 right-2 bg-rose-500 text-white text-[9px] font-black px-1.5 py-0.2 rounded-full">
                {pendingShopping.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
              currentTab === 'dashboard' ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icons.Dashboard />
            <span>المصروفات</span>
          </button>
          <button
            onClick={() => setCurrentTab('wallets')}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
              currentTab === 'wallets' ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icons.Users />
            <span>المحافظ</span>
          </button>
          <button
            onClick={() => setCurrentTab('reports')}
            className={`py-2 text-[11px] font-bold rounded-xl flex flex-col items-center justify-center gap-1 transition-all ${
              currentTab === 'reports' ? 'bg-teal-600 text-white shadow-md shadow-teal-600/30' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Icons.Report />
            <span>التقارير</span>
          </button>
        </nav>

        {currentTab === 'shopping' && (
          <div className="space-y-4">
            {/* بطاقة إضافة غرض جديد للنواقص */}
            <form onSubmit={handleAddShoppingItem} className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-3 shadow-md">
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Icons.Cart />
                <span>إضافة طلب جديد لقائمة تسوق "{currentWallet?.name}":</span>
              </div>
              <input
                type="text"
                required
                placeholder="اسم الغرض (مثال: حليب، خضار ولحوم، خبز)"
                value={newShopTitle}
                onChange={(e) => setNewShopTitle(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-xs rounded-xl px-3 py-2.5 text-white outline-none focus:border-teal-500"
              />
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="text"
                  placeholder="الكمية (مثال: 2 كغم، عبوة)"
                  value={newShopQty}
                  onChange={(e) => setNewShopQty(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white outline-none"
                />
                <select
                  value={newShopCat}
                  onChange={(e) => setNewShopCat(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-xs rounded-xl px-2 py-2 text-white outline-none cursor-pointer"
                >
                  {Object.keys(CATEGORIES).map((c) => (
                    <option key={c} value={c}>{CATEGORIES[c].icon} {c}</option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                placeholder="ملاحظة إضافية (الماركة أو المكان - اختياري)"
                value={newShopNotes}
                onChange={(e) => setNewShopNotes(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-xs rounded-xl px-3 py-2 text-white outline-none"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-teal-600 hover:bg-teal-500 font-bold text-xs rounded-xl text-white flex items-center justify-center gap-1.5 shadow-md shadow-teal-700/20"
              >
                <Icons.Plus /> إضافة لتبويب النواقص (يُحدد السعر بالسوق)
              </button>
            </form>

            {/* التبويبان المستقلان: قبل الشراء / بعد الشراء */}
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setShoppingSubTab('PENDING')}
                className={`p-3 rounded-2xl border text-right transition-all flex items-center justify-between ${
                  shoppingSubTab === 'PENDING'
                    ? 'bg-amber-500/15 border-amber-500/60 shadow-md shadow-amber-500/10'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white block">المنتجات قبل الشراء</div>
                  <div className="text-[10px] text-slate-400">نواقص بانتظار التسعير</div>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950">
                  {pendingShopping.length}
                </span>
              </button>

              <button
                onClick={() => setShoppingSubTab('PURCHASED')}
                className={`p-3 rounded-2xl border text-right transition-all flex items-center justify-between ${
                  shoppingSubTab === 'PURCHASED'
                    ? 'bg-rose-950/40 border-rose-600 shadow-md shadow-rose-950/20'
                    : 'bg-slate-900 border-slate-800 text-slate-400'
                }`}
              >
                <div>
                  <div className="text-xs font-bold text-white block">المنتجات بعد الشراء</div>
                  <div className="text-[10px] text-rose-300">مكتملة ومخصومة</div>
                </div>
                <div className="text-left">
                  <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-rose-500 text-white block mb-0.5">
                    {purchasedShopping.length}
                  </span>
                  <span className="text-[9px] font-mono font-bold text-rose-300">
                    -{totalPurchasedSum.toFixed(2)} د.أ
                  </span>
                </div>
              </button>
            </div>

            {/* قائمة العناصر في التبويب المختار */}
            <div className="space-y-2.5">
              {shoppingSubTab === 'PENDING' ? (
                pendingShopping.length === 0 ? (
                  <div className="text-center py-10 bg-slate-900/40 border border-slate-800 rounded-2xl text-xs text-slate-400">
                    لا توجد نواقص تسوق معلقة، تم شراء كافة الطلبات 🎉
                  </div>
                ) : (
                  pendingShopping.map((item, idx) => {
                    const catMeta = CATEGORIES[item.category] || { icon: '📦', color: 'bg-slate-800 text-slate-300' };
                    return (
                      <div key={item.id} className="p-3.5 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between gap-2.5">
                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                          <span className="w-6 h-6 rounded-lg bg-slate-800 text-teal-300 font-mono font-bold text-[11px] flex items-center justify-center shrink-0 border border-slate-700">
                            #{idx + 1}
                          </span>
                          <button
                            onClick={() => setPurchasingItem({ ...item, tempPrice: '' })}
                            title="تسجيل الشراء وإدخال القيمة"
                            className="shrink-0"
                          >
                            <Icons.Square />
                          </button>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <span className="text-xs font-bold text-white truncate">{item.title}</span>
                              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-teal-300 font-semibold">{item.quantity}</span>
                              <span className={`text-[10px] px-1.5 py-0.2 rounded border flex items-center gap-1 ${catMeta.color}`}>
                                <span>{catMeta.icon}</span>
                                <span>{item.category}</span>
                              </span>
                            </div>
                            {item.notes && <div className="text-[11px] text-slate-400 italic mt-0.5 truncate">📝 {item.notes}</div>}
                            <div className="text-[10px] text-slate-500 mt-0.5">كتبته: {item.addedBy}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => setPurchasingItem({ ...item, tempPrice: '' })}
                            className="text-[11px] font-bold text-emerald-400 bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-800/40 px-2.5 py-1.5 rounded-xl transition-all"
                          >
                            تم الشراء - إدخال القيمة
                          </button>
                          <button
                            onClick={() => handleDeleteShoppingItem(item)}
                            className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg"
                            title="حذف الطلب"
                          >
                            <Icons.Trash />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )
              ) : (
                purchasedShopping.length === 0 ? (
                  <div className="text-center py-10 bg-slate-900/40 border border-slate-800 rounded-2xl text-xs text-slate-400">
                    لا توجد مشتريات مسجلة بعد في تبويب "تم الشراء".
                  </div>
                ) : (
                  purchasedShopping.map((item, idx) => (
                    <div key={item.id} className="p-3.5 bg-rose-950/20 border border-rose-900/50 rounded-2xl flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5 flex-1 min-w-0">
                        <span className="w-6 h-6 rounded-lg bg-rose-950 text-rose-300 font-mono font-bold text-[11px] flex items-center justify-center shrink-0 border border-rose-800">
                          #{idx + 1}
                        </span>
                        <button
                          onClick={() => handleUncheckPurchasedItem(item)}
                          title="إلغاء الشراء واسترداد المبلغ للمحفظة فوراً"
                          className="shrink-0"
                        >
                          <Icons.CheckSquare />
                        </button>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs line-through text-rose-300 font-bold truncate">{item.title}</span>
                            <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-950/60 text-rose-300 border border-rose-800">{item.quantity}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            اشتراه: {item.purchasedBy || 'أحد الأفراد'}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className="font-mono text-xs font-black px-2 py-1 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-500/30">
                          {Number(item.actualPrice).toFixed(2)} د.أ
                        </span>
                        <button
                          onClick={() => {
                            setEditingPriceItem(item);
                            setEditPriceInput(Number(item.actualPrice).toString());
                          }}
                          className="p-1.5 text-amber-300 hover:bg-slate-800 rounded-lg"
                          title="تعديل السعر وتسوية فرق الرصيد"
                        >
                          <Icons.Edit />
                        </button>
                        <button
                          onClick={() => handleUncheckPurchasedItem(item)}
                          className="px-2 py-1 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 rounded-lg text-[10px] font-bold flex items-center gap-1"
                          title="إرجاع للنواقص واسترداد المبلغ للمحفظة"
                        >
                          <Icons.Undo />
                          <span>استرجاع</span>
                        </button>
                        <button
                          onClick={() => handleDeleteShoppingItem(item)}
                          className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg"
                          title="حذف نهائي واسترداد المبلغ"
                        >
                          <Icons.Trash />
                        </button>
                      </div>
                    </div>
                  ))
                )
              )}
            </div>
          </div>
        )}

        {currentTab === 'dashboard' && (
          <div className="space-y-4">
            <div className="bg-gradient-to-b from-slate-900 to-slate-900/90 border border-slate-800 p-5 rounded-3xl shadow-xl text-center">
              <div className="text-xs text-slate-400 font-semibold mb-1">الرصيد الصافي المتبقي المتاح</div>
              <div className={`text-4xl font-black tracking-tight mb-4 font-mono ${balance >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {balance.toFixed(2)} <span className="text-lg font-sans text-slate-300">د.أ</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-800/80">
                <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/60">
                  <div className="text-[10px] text-slate-400 mb-0.5 font-bold">إجمالي المدخولات</div>
                  <div className="text-sm font-bold text-emerald-400 font-mono">+{totalIncome.toFixed(2)} د.أ</div>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-2xl border border-slate-800/60">
                  <div className="text-[10px] text-slate-400 mb-0.5 font-bold">إجمالي المصروفات</div>
                  <div className="text-sm font-bold text-rose-400 font-mono">-{totalExpense.toFixed(2)} د.أ</div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowAddTxModal(true)}
              className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <Icons.Plus /> إضافة حركة مالية يدوية
            </button>

            <div className="space-y-2.5">
              <h3 className="text-xs font-bold text-slate-400 pr-1">سجل العمليات في {currentWallet?.name}:</h3>
              {walletTransactions.length === 0 ? (
                <div className="text-center py-10 bg-slate-900/40 rounded-2xl border border-slate-800/60 text-slate-500 text-xs">
                  لا توجد حركات مسجلة حتى الآن.
                </div>
              ) : (
                walletTransactions.map((t) => (
                  <div key={t.id} className="bg-slate-900 border border-slate-800/80 p-3.5 rounded-2xl flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-white">{t.title}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{t.category}</span>
                        <span>•</span>
                        <span>{t.date}</span>
                        <span>•</span>
                        <span>بواسطة: {t.addedBy}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-black font-mono ${t.type === 'income' ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {t.type === 'income' ? '+' : '-'}{Number(t.amount).toFixed(2)} د.أ
                      </span>
                      <button onClick={() => handleDeleteTx(t.id)} className="p-1.5 hover:bg-slate-800 rounded-lg">
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {currentTab === 'wallets' && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowAddWalletModal(true)}
                className="py-3 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-md shadow-teal-900/30"
              >
                <Icons.Plus /> محفظة جديدة
              </button>
              <button
                onClick={() => setShowInviteModal(true)}
                className="py-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-teal-300 font-bold text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-md"
              >
                <Icons.Users /> دعوة وإضافة فرد
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 pr-1">المحافظ المالية المسجلة:</h3>
              {wallets.map((w) => {
                const isSelected = w.id === activeWalletId;
                return (
                  <div
                    key={w.id}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center justify-between ${
                      isSelected ? 'bg-teal-950/40 border-teal-500/60 shadow-lg shadow-teal-950/50' : 'bg-slate-900 border-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>📁 {w.name}</span>
                        {isSelected && <span className="text-[10px] bg-teal-500/20 text-teal-300 px-2 py-0.5 rounded-full border border-teal-500/30 font-semibold">النشطة</span>}
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
                      <button onClick={() => handleDeleteWallet(w.id)} className="p-2 hover:bg-rose-500/10 rounded-xl">
                        <Icons.Trash />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="bg-slate-900 border border-slate-800 p-4 rounded-3xl space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-teal-400">أفراد محفظة ({currentWallet?.name}):</h3>
                <span className="text-[10px] text-slate-400">{currentWallet?.members.length} أفراد</span>
              </div>
              <div className="space-y-2">
                {currentWallet?.members.map((member) => (
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
                      className="px-2.5 py-1 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] font-bold rounded-xl border border-rose-500/30 flex items-center gap-1"
                    >
                      <Icons.Trash /> حذف
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {currentTab === 'reports' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 p-5 rounded-3xl space-y-4">
              <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
                <Icons.Report />
                <span>التقرير المالي الشهري وتصدير PDF</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                يحتوي التقرير على جدول الأرصدة المتبقية لكافة المحافظ، وسجل بكافة الحركات المالية ومشتريات قائمة التسوق المسجلة.
              </p>

              <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">المحفظة النشطة:</span>
                  <span className="font-bold text-white">{currentWallet?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">الرصيد المتبقي المتاح:</span>
                  <span className="font-mono font-bold text-teal-300">{balance.toFixed(2)} د.أ</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">عدد الحركات المسجلة:</span>
                  <span className="font-bold text-white">{walletTransactions.length} حركة</span>
                </div>
              </div>

              <button
                onClick={() => window.print()}
                className="w-full py-3 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-emerald-900/30 flex items-center justify-center gap-2"
              >
                <span>🖨️ طباعة أو حفظ التقرير كملف PDF</span>
              </button>
            </div>
          </div>
        )}

        {purchasingItem && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-3xl p-5 shadow-2xl">
              <h2 className="text-sm font-bold text-white mb-1">تسجيل سعر الشراء الفعلي بالسوق</h2>
              <p className="text-xs text-slate-400 mb-3">{purchasingItem.title} ({purchasingItem.quantity})</p>

              <form onSubmit={handleConfirmPurchase} className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">السعر المدفوع عند الكاشير (بالدينار JOD):</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    autoFocus
                    placeholder="مثال: 4.50"
                    value={purchasingItem.tempPrice}
                    onChange={(e) => setPurchasingItem({ ...purchasingItem, tempPrice: e.target.value })}
                    className="w-full bg-slate-800 border border-emerald-500/60 rounded-xl px-4 py-2.5 text-base font-mono font-bold text-white outline-none"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  سيتم نقل الصنف فوراً إلى تبويب "تم الشراء" وخصم المبلغ من رصيد المحفظة تلقائياً.
                </p>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md">
                    تأكيد الشراء والخصم
                  </button>
                  <button type="button" onClick={() => setPurchasingItem(null)} className="flex-1 py-2.5 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl">
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {editingPriceItem && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-3xl p-5 shadow-2xl">
              <h2 className="text-sm font-bold text-white mb-1">تعديل سعر المنتج وتسوية الفرق</h2>
              <p className="text-xs text-slate-400 mb-3">{editingPriceItem.title} (مسجل حالياً: {Number(editingPriceItem.actualPrice).toFixed(2)} د.أ)</p>

              <form onSubmit={handleUpdatePurchasedPrice} className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">السعر الصحيح الجديد (JOD):</label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.01"
                    required
                    autoFocus
                    value={editPriceInput}
                    onChange={(e) => setEditPriceInput(e.target.value)}
                    className="w-full bg-slate-800 border border-amber-500/60 rounded-xl px-4 py-2.5 text-base font-mono font-bold text-white outline-none"
                  />
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                  {(() => {
                    const parsed = parseFloat(editPriceInput);
                    if (isNaN(parsed) || parsed <= 0) return 'أدخل السعر الجديد لمعاينة فرق الحساب.';
                    const diff = parsed - Number(editingPriceItem.actualPrice);
                    if (diff > 0) return `سيتم خصم فرق إضافي (${diff.toFixed(2)} د.أ) من رصيد المحفظة.`;
                    if (diff < 0) return `سيتم استرجاع فرق (${Math.abs(diff).toFixed(2)} د.أ) إلى رصيد المحفظة.`;
                    return 'السعر مطابق، لا تغيير على الرصيد.';
                  })()}
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black rounded-xl">
                    تأكيد وتسوية الرصيد
                  </button>
                  <button type="button" onClick={() => setEditingPriceItem(null)} className="flex-1 py-2.5 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl">
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showAddTxModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl">
              <h2 className="text-sm font-bold text-white mb-3">تسجيل حركة مالية جديدة</h2>
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
                    placeholder="مثال: فاتورة كهرباء، راتب، بنزين"
                    value={txTitle}
                    onChange={(e) => setTxTitle(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">المبلغ (دينار أردني JOD):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="0.00"
                    value={txAmount}
                    onChange={(e) => setTxAmount(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none font-bold font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">التصنيف:</label>
                  <input
                    type="text"
                    value={txCategory}
                    onChange={(e) => setTxCategory(e.target.value)}
                    placeholder="مثال: بقالة، فواتير، صحة"
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  />
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl">
                    حفظ الحركة
                  </button>
                  <button type="button" onClick={() => setShowAddTxModal(false)} className="flex-1 py-2.5 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl">
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

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
                  <button type="submit" className="flex-1 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold rounded-xl">
                    إنشاء المحفظة
                  </button>
                  <button type="button" onClick={() => setShowAddWalletModal(false)} className="flex-1 py-2.5 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl">
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {showInviteModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-slate-800 w-full max-w-sm rounded-3xl p-5 shadow-2xl">
              <h2 className="text-sm font-bold text-white mb-2">إضافة فرد لمحفظة ({currentWallet?.name})</h2>
              <form onSubmit={handleAddMember} className="space-y-3">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-1">اسم الفرد:</label>
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
                  <label className="block text-[10px] text-slate-400 mb-1">الصلاحية:</label>
                  <select
                    value={newMemberRole}
                    onChange={(e) => setNewMemberRole(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white outline-none"
                  >
                    <option value="member">فرد بالعائلة (إضافة طلبات وحركات)</option>
                    <option value="admin">مشرف (صلاحية كاملة وحذف)</option>
                  </select>
                </div>
                <div className="flex gap-2 pt-2">
                  <button type="submit" className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl">
                    تأكيد الإضافة
                  </button>
                  <button type="button" onClick={() => setShowInviteModal(false)} className="flex-1 py-2.5 bg-slate-800 text-slate-400 text-xs font-bold rounded-xl">
                    إلغاء
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* نافذة تأكيد الحذف المخصصة */}
        {confirmDialog && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-slate-900 border border-rose-800/70 w-full max-w-sm rounded-3xl p-5 shadow-2xl space-y-3">
              <h2 className="text-sm font-bold text-rose-400">{confirmDialog.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{confirmDialog.message}</p>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={confirmDialog.onConfirm}
                  className="flex-1 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold rounded-xl shadow-md"
                >
                  نعم، تأكيد الحذف
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDialog(null)}
                  className="flex-1 py-2.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
