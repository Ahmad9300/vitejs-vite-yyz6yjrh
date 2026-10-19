import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  Users,
  ShieldCheck,
  Wifi,
  WifiOff,
  Plus,
  RefreshCw,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  SlidersHorizontal,
  Lock,
  Copy,
  Radio,
  Trash2,
  AlertTriangle,
  KeyRound,
  Sparkles,
  ShoppingCart,
  ShoppingBag,
  Square,
  CheckSquare,
  Edit3,
  X,
  FileDown,
  Calendar,
  BarChart3,
  PieChart,
  Download,
  Filter,
  UserX
} from 'lucide-react';

const USERS = [
  { id: 'user_1', name: 'أحمد (رب الأسرة)', email: 'ahmad@family.jo', role: 'ADMIN', avatar: '👨‍💼' },
  { id: 'user_2', name: 'فاطمة (الأم)', email: 'fatima@family.jo', role: 'MEMBER', avatar: '👩‍💼' },
  { id: 'user_3', name: 'عمر (الابن الجامعي)', email: 'omar@family.jo', role: 'MEMBER', avatar: '👨‍🎓' },
  { id: 'user_4', name: 'سارة (الابنة)', email: 'sara@family.jo', role: 'MEMBER', avatar: '👩‍🎓' }
];

const INITIAL_WALLETS = [
  {
    id: 'wallet_main',
    name: 'مصاريف المنزل الرئيسية',
    currency: 'JOD',
    createdBy: 'user_1',
    members: [
      { userId: 'user_1', role: 'ADMIN', permissions: { canViewBalance: true, canViewInflows: true, canViewOthersTx: true, canAddTx: true } },
      { userId: 'user_2', role: 'MEMBER', permissions: { canViewBalance: true, canViewInflows: true, canViewOthersTx: true, canAddTx: true } },
      { userId: 'user_3', role: 'MEMBER', permissions: { canViewBalance: false, canViewInflows: false, canViewOthersTx: false, canAddTx: true } },
      { userId: 'user_4', role: 'MEMBER', permissions: { canViewBalance: true, canViewInflows: false, canViewOthersTx: false, canAddTx: false } }
    ]
  },
  {
    id: 'wallet_savings',
    name: 'صندوق الطوارئ والتوفير',
    currency: 'JOD',
    createdBy: 'user_1',
    members: [
      { userId: 'user_1', role: 'ADMIN', permissions: { canViewBalance: true, canViewInflows: true, canViewOthersTx: true, canAddTx: true } },
      { userId: 'user_2', role: 'ADMIN', permissions: { canViewBalance: true, canViewInflows: true, canViewOthersTx: true, canAddTx: true } }
    ]
  },
  {
    id: 'wallet_work',
    name: 'العمل',
    currency: 'JOD',
    createdBy: 'user_1',
    members: [
      { userId: 'user_1', role: 'ADMIN', permissions: { canViewBalance: true, canViewInflows: true, canViewOthersTx: true, canAddTx: true } },
      { userId: 'user_2', role: 'MEMBER', permissions: { canViewBalance: true, canViewInflows: true, canViewOthersTx: true, canAddTx: true } }
    ]
  }
];

const INITIAL_TRANSACTIONS = [
  { id: 'tx_1', walletId: 'wallet_main', amount: 150000, category: 'راتب ودخل شهري', description: 'تحويل الراتب الشهري للحساب المنزلي', createdBy: 'user_1', date: '2026-10-01T08:30:00.000Z', syncStatus: 'SYNCED' },
  { id: 'tx_2', walletId: 'wallet_main', amount: -8550, category: 'بقالة ومواد تموينية', description: 'تسوق لحوم ومواد غذائية من كارفور', createdBy: 'user_2', date: '2026-10-04T14:15:00.000Z', syncStatus: 'SYNCED' },
  { id: 'tx_3', walletId: 'wallet_main', amount: -4500, category: 'فواتير وكهرباء وماء', description: 'سداد فاتورة الكهرباء الشهرية (إي فواتيركم)', createdBy: 'user_1', date: '2026-10-08T11:00:00.000Z', syncStatus: 'SYNCED' },
  { id: 'tx_4', walletId: 'wallet_main', amount: -2500, category: 'مواصلات ومحروقات', description: 'بنزين أوكتان 90 سيارة العائلة', createdBy: 'user_3', date: '2026-10-12T16:40:00.000Z', syncStatus: 'SYNCED' },
  { id: 'tx_sav_1', walletId: 'wallet_savings', amount: 25000, category: 'إيداع وتوفير شهري', description: 'استقطاع التوفير والادخار الشهري', createdBy: 'user_1', date: '2026-10-02T09:00:00.000Z', syncStatus: 'SYNCED' },
  { id: 'tx_sav_2', walletId: 'wallet_savings', amount: -7500, category: 'سحب طارئ', description: 'سحب طارئ لإصلاح عطل مفاجئ بالمنزل', createdBy: 'user_1', date: '2026-10-09T18:20:00.000Z', syncStatus: 'SYNCED' },
  { id: 'tx_work_1', walletId: 'wallet_work', amount: 120000, category: 'عائد مشروع واستشارات', description: 'دفعة مستحقات مشروع واستشارات برمجية', createdBy: 'user_1', date: '2026-10-05T12:00:00.000Z', syncStatus: 'SYNCED' },
  { id: 'tx_work_2', walletId: 'wallet_work', amount: -35000, category: 'مصاريف ونفقات عامة', description: 'شراء معدات ومستلزمات مكتبية للعمل', createdBy: 'user_1', date: '2026-10-11T15:30:00.000Z', syncStatus: 'SYNCED' }
];

const INITIAL_SHOPPING_ITEMS = [
  { id: 'shop_1', walletId: 'wallet_main', title: 'حليب طازج 2 لتر ولبن بلدي', category: 'ألبان وأجبان', quantity: '2 لتر + 1 كغم', actualPrice: null, status: 'PENDING', addedBy: 'user_2', assignedTo: 'user_1', notes: 'تأكد من تاريخ الإنتاج جديد', updatedAt: '2026-10-15T09:00:00.000Z' },
  { id: 'shop_2', walletId: 'wallet_main', title: 'خبز طازج وجبنة بيضاء نابلسية', category: 'مخبوزات ومعجنات', quantity: '1 كغم جبنة + ربطة خبز', actualPrice: null, status: 'PENDING', addedBy: 'user_2', assignedTo: 'user_1', notes: 'من مخبز البركة القريب', updatedAt: '2026-10-15T10:00:00.000Z' },
  { id: 'shop_3', walletId: 'wallet_main', title: 'مسحوق غسيل ومناديل مطبخ', category: 'منظفات ومستلزمات منزلية', quantity: 'عبوة عائلية', actualPrice: null, status: 'PENDING', addedBy: 'user_2', assignedTo: 'user_1', notes: 'عبوة توفير للمطبخ', updatedAt: '2026-10-15T11:30:00.000Z' }
];

const SHOPPING_CATEGORIES = {
  'ألبان وأجبان': { name: 'ألبان وأجبان', icon: '🥛', color: 'bg-sky-500/15 text-sky-300 border-sky-500/30' },
  'مواد تموينية وبقالة': { name: 'مواد تموينية وبقالة', icon: '🥫', color: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  'منظفات ومستلزمات منزلية': { name: 'منظفات ومستلزمات منزلية', icon: '🧼', color: 'bg-teal-500/15 text-teal-300 border-teal-500/30' },
  'مخبوزات ومعجنات': { name: 'مخبوزات ومعجنات', icon: '🥖', color: 'bg-orange-500/15 text-orange-300 border-orange-500/30' },
  'خضار وفواكه': { name: 'خضار وفواكه', icon: '🥦', color: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  'لحوم ودواجن': { name: 'لحوم ودواجن', icon: '🥩', color: 'bg-rose-500/15 text-rose-300 border-rose-500/30' },
  'صيدلية وعناية شخصية': { name: 'صيدلية وعناية شخصية', icon: '💊', color: 'bg-purple-500/15 text-purple-300 border-purple-500/30' },
  'أخرى ومستلزمات': { name: 'أخرى ومستلزمات', icon: '📦', color: 'bg-slate-500/15 text-slate-300 border-slate-500/30' }
};

const ARABIC_MONTH_NAMES = [
  'كانون الثاني (يناير)', 'شباط (فبراير)', 'آذار (مارس)', 'نيسان (أبريل)',
  'أيار (مايو)', 'حزيران (يونيو)', 'تموز (يوليو)', 'آب (أغسطس)',
  'أيلول (سبتمبر)', 'تشرين الأول (أكتوبر)', 'تشرين الثاني (نوفمبر)', 'كانون الأول (ديسمبر)'
];

// دالة حماية التقارير من شفرات الحقن الخبيث (XSS Protection)
const escapeHtml = (unsafe) => {
  if (unsafe === null || unsafe === undefined) return '';
  return String(unsafe).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
};

// دالة فحص وتدقيق المبالغ المالية (1 دينار = 100 قرش ومنع الأرقام السالبة أو الوهمية)
const sanitizeQirshAmount = (val, maxDinars = 100000) => {
  const parsed = parseFloat(val);
  if (isNaN(parsed) || !isFinite(parsed) || parsed <= 0) return null;
  if (parsed > maxDinars) return null;
  return Math.round(parsed * 100);
};

const formatJOD = (qirsh) => {
  if (qirsh === null || qirsh === undefined) return '0.00 د.أ';
  const dinars = qirsh / 100;
  return `${dinars.toLocaleString('ar-JO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} د.أ`;
};

const formatDate = (dateStr) => {
  try {
    return new Date(dateStr).toLocaleDateString('ar-JO', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  } catch { return dateStr; }
};

const formatShortDate = (dateStr) => {
  try {
    return new Date(dateStr).toLocaleDateString('ar-JO', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return dateStr; }
};

const generateSecureInviteCode = () => {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let res = 'FB-';
  for (let s = 0; s < 3; s++) {
    for (let i = 0; i < 4; i++) res += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    if (s < 2) res += '-';
  }
  return res;
};

export default function App() {
  const [currentUserId, setCurrentUserId] = useState('user_1');
  const [rawWallets, setRawWallets] = useState(INITIAL_WALLETS);
  const [activeWalletId, setActiveWalletId] = useState('wallet_main');
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [shoppingList, setShoppingList] = useState(INITIAL_SHOPPING_ITEMS);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isOnline, setIsOnline] = useState(true);
  const [shoppingTab, setShoppingTab] = useState('PENDING'); // PENDING (قبل الشراء) أو PURCHASED (تم الشراء)
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [groupByCategory, setGroupByCategory] = useState(true);
  const [savingsTxFilter, setSavingsTxFilter] = useState('MONTH');

  // حساب الرصيد الصافي المتاح تلقائياً (Single Source of Truth)
  const wallets = useMemo(() => {
    return rawWallets.map((w) => {
      const computedBalance = transactions
        .filter((t) => t.walletId === w.id)
        .reduce((acc, t) => acc + t.amount, 0);
      return { ...w, currentBalance: computedBalance };
    });
  }, [rawWallets, transactions]);

  // حماية من التخمين المتكرر لرموز الانضمام (Rate Limiting)
  const [failedRedeemAttempts, setFailedRedeemAttempts] = useState(0);
  const [lockoutTimestamp, setLockoutTimestamp] = useState(null);
  const [isExportingPdf, setIsExportingPdf] = useState(false);

  const currentUser = useMemo(() => USERS.find((u) => u.id === currentUserId) || USERS[0], [currentUserId]);
  const activeWallet = useMemo(() => {
    return (
      wallets.find((w) => w.id === activeWalletId && w.members.some((m) => m.userId === currentUserId)) ||
      wallets.find((w) => w.members.some((m) => m.userId === currentUserId)) ||
      wallets[0]
    );
  }, [wallets, activeWalletId, currentUserId]);

  const activeMembership = useMemo(() => activeWallet?.members.find((m) => m.userId === currentUserId), [activeWallet, currentUserId]);
  const isAdmin = activeMembership?.role === 'ADMIN';

  const userPerms = useMemo(() => {
    if (isAdmin) return { canViewBalance: true, canViewInflows: true, canViewOthersTx: true, canAddTx: true };
    return activeMembership?.permissions || { canViewBalance: true, canViewInflows: false, canViewOthersTx: true, canAddTx: true };
  }, [isAdmin, activeMembership]);

  const isEmergencyWallet = activeWallet?.id === 'wallet_savings' || activeWallet?.name === 'صندوق الطوارئ والتوفير';
  const isHouseholdWallet = activeWallet?.id === 'wallet_main';

  // نوافذ التطبيق المنبثقة
  const [isTxModalOpen, setIsTxModalOpen] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isRedeemModalOpen, setIsRedeemModalOpen] = useState(false);
  const [isShoppingModalOpen, setIsShoppingModalOpen] = useState(false);
  const [editingShoppingItem, setEditingShoppingItem] = useState(null);
  const [purchasingItem, setPurchasingItem] = useState(null);
  const [editingPriceItem, setEditingPriceItem] = useState(null);
  const [newPriceInput, setNewPriceInput] = useState('');
  const [memberToManage, setMemberToManage] = useState(null);
  const [walletToDelete, setWalletToDelete] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [generatedInviteCode, setGeneratedInviteCode] = useState(generateSecureInviteCode());
  const [activeInvites, setActiveInvites] = useState({});
  const [redeemCodeInput, setRedeemCodeInput] = useState('');
  const [liveBroadcastEvent, setLiveBroadcastEvent] = useState(null);

  const showToast = useCallback((msg, type = 'success') => {
    setToastMessage({ msg, type });
    setTimeout(() => setToastMessage(null), 3500);
  }, []);

  const triggerLiveBroadcast = useCallback((text) => {
    setLiveBroadcastEvent(text);
    setTimeout(() => setLiveBroadcastEvent(null), 4000);
  }, []);

  useEffect(() => {
    if (activeTab === 'reports' && !isAdmin) setActiveTab('dashboard');
    if (activeTab === 'shopping_list' && !isHouseholdWallet) setActiveTab('dashboard');
  }, [isAdmin, activeTab, isHouseholdWallet]);

  // تسجيل حركة يدوية
  const handleAddTransaction = (formData) => {
    if (!userPerms.canAddTx) {
      showToast('ليس لديك صلاحية لإضافة معاملات', 'error');
      return;
    }
    const qirsh = sanitizeQirshAmount(formData.get('amount'));
    if (!qirsh) {
      showToast('يرجى كتابة مبلغ صحيح وموجب بالدينار', 'error');
      return;
    }
    const isExpense = formData.get('type') === 'EXPENSE';
    const category = (formData.get('category') || 'أخرى').slice(0, 50);
    const rawDesc = formData.get('description')?.toString().trim() || '';
    const description = (rawDesc || (isEmergencyWallet ? (isExpense ? 'سحب طارئ' : 'إيداع وتوفير') : category)).slice(0, 150);

    const newTx = {
      id: `tx_${Date.now()}`,
      walletId: activeWallet.id,
      amount: isExpense ? -qirsh : qirsh,
      category,
      description,
      createdBy: currentUserId,
      date: new Date().toISOString(),
      syncStatus: isOnline ? 'SYNCED' : 'PENDING_INSERT'
    };

    setTransactions((prev) => [newTx, ...prev]);
    triggerLiveBroadcast(`${currentUser.name} أضاف حركة ${isExpense ? 'مصروف' : 'إيداع'} بقيمة ${formatJOD(qirsh)}`);
    showToast('تم حفظ المعاملة وتحديث الرصيد');
    setIsTxModalOpen(false);
  };

  // حذف حركة
  const handleDeleteTransaction = (txId) => {
    const tx = transactions.find((t) => t.id === txId);
    if (!tx) return;
    if (!isAdmin && tx.createdBy !== currentUserId) {
      showToast('غير مصرح لك بحذف معاملات الأعضاء الآخرين', 'error');
      return;
    }
    setTransactions((prev) => prev.filter((t) => t.id !== txId));
    triggerLiveBroadcast(`قام ${currentUser.name} بحذف حركة مالية`);
    showToast('تم حذف الحركة وتحديث الرصيد');
  };

  // إضافة وتعديل أغراض التسوق
  const handleSaveShoppingItem = (formData) => {
    const title = formData.get('title');
    const quantity = formData.get('quantity') || '1';
    const category = formData.get('category') || 'ألبان وأجبان';
    const notes = formData.get('notes') || '';
    const assignedTo = formData.get('assignedTo') || 'user_1';

    if (editingShoppingItem) {
      setShoppingList((prev) =>
        prev.map((item) =>
          item.id === editingShoppingItem.id
            ? { ...item, title, quantity, category, notes, assignedTo, updatedAt: new Date().toISOString() }
            : item
        )
      );
      showToast('تم تعديل غرض التسوق');
    } else {
      const newItem = {
        id: `shop_${Date.now()}`,
        walletId: activeWallet.id,
        title,
        quantity,
        actualPrice: null,
        category,
        notes,
        assignedTo,
        status: 'PENDING',
        addedBy: currentUserId,
        updatedAt: new Date().toISOString()
      };
      setShoppingList((prev) => [newItem, ...prev]);
      triggerLiveBroadcast(`أضافت ${currentUser.name} غرضاً جديداً لقائمة التسوق: "${title}"`);
      showToast('تمت إضافة الغرض للنواقص');
    }
    setIsShoppingModalOpen(false);
    setEditingShoppingItem(null);
  };

  // تأكيد الشراء ونقله لتبويب "تم الشراء" مع الخصم
  const handleConfirmPurchase = (item, actualDinars) => {
    const qirsh = sanitizeQirshAmount(actualDinars);
    if (!qirsh) {
      showToast('يرجى كتابة سعر الشراء الفعلي بشكل صحيح', 'error');
      return;
    }
    const newTxId = `tx_shop_${Date.now()}`;
    setShoppingList((prev) =>
      prev.map((i) =>
        i.id === item.id
          ? { ...i, status: 'PURCHASED', actualPrice: qirsh, transactionId: newTxId, purchasedBy: currentUserId, updatedAt: new Date().toISOString() }
          : i
      )
    );

    const newTx = {
      id: newTxId,
      walletId: item.walletId,
      amount: -qirsh,
      category: item.category || 'بقالة ومواد تموينية',
      description: `شراء من قائمة التسوق: ${item.title} (${item.quantity})`,
      createdBy: currentUserId,
      date: new Date().toISOString(),
      syncStatus: 'SYNCED'
    };
    setTransactions((prev) => [newTx, ...prev]);
    setPurchasingItem(null);
    triggerLiveBroadcast(`تم شراء [${item.title}] ونقله لتبويب "تم الشراء" بقيمة ${formatJOD(qirsh)}`);
    showToast(`تم تسجيل الشراء وخصم ${formatJOD(qirsh)} من الرصيد`);
  };

  // إلغاء إشارة الصح واسترجاع المبلغ كاملاً للمحفظة
  const handleUncheckPurchasedItem = (item) => {
    const refund = item.actualPrice || 0;
    setShoppingList((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, status: 'PENDING', actualPrice: null, transactionId: null, purchasedBy: null } : i))
    );
    if (refund > 0) {
      setTransactions((prev) => prev.filter((t) => t.id !== item.transactionId));
    }
    triggerLiveBroadcast(`تم إلغاء شراء [${item.title}] واسترجاع ${formatJOD(refund)} للمحفظة`);
    showToast(`تمت إعادة المنتج لتبويب "قبل الشراء" واسترداد ${formatJOD(refund)} للرصيد المتاح`);
  };

  // تعديل السعر وتسوية فرق المبلغ تلقائياً
  const handleUpdatePurchasedPrice = (item, newDinars) => {
    const newQirsh = sanitizeQirshAmount(newDinars);
    if (!newQirsh) {
      showToast('يرجى كتابة سعر صحيح', 'error');
      return;
    }
    const oldQirsh = item.actualPrice || 0;
    const delta = newQirsh - oldQirsh;

    setShoppingList((prev) =>
      prev.map((i) => (i.id === item.id ? { ...i, actualPrice: newQirsh, updatedAt: new Date().toISOString() } : i))
    );

    if (delta !== 0) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === item.transactionId
            ? { ...t, amount: -newQirsh, description: `شراء من قائمة التسوق: ${item.title} (معدل: ${formatJOD(newQirsh)})` }
            : t
        )
      );
    }
    setEditingPriceItem(null);
    setNewPriceInput('');
    if (delta > 0) showToast(`تم تعديل السعر وخصم فرق ${formatJOD(delta)} من الرصيد`);
    else if (delta < 0) showToast(`تم تعديل السعر واسترجاع فرق ${formatJOD(Math.abs(delta))} للرصيد المتاح`);
    else showToast('لم يطرأ أي تغيير على السعر');
  };

  // حذف محفظة بالكامل (خاص بالمسؤول)
  const handleDeleteWallet = (walletId) => {
    if (!isAdmin || walletId === 'wallet_main' || rawWallets.length <= 1) return;
    const target = rawWallets.find((w) => w.id === walletId);
    setRawWallets((prev) => prev.filter((w) => w.id !== walletId));
    setTransactions((prev) => prev.filter((t) => t.walletId !== walletId));
    setShoppingList((prev) => prev.filter((i) => i.walletId !== walletId));
    setActiveWalletId('wallet_main');
    setWalletToDelete(null);
    showToast(`تم حذف محفظة "${target?.name}" بنجاح`);
  };

  const visibleTransactions = useMemo(() => {
    return transactions.filter((t) => {
      if (t.walletId !== activeWallet.id) return false;
      if (!userPerms.canViewOthersTx && t.createdBy !== currentUserId) return false;
      return true;
    });
  }, [transactions, activeWallet.id, userPerms.canViewOthersTx, currentUserId]);

  const { totalInflows, totalOutflows } = useMemo(() => {
    let inf = 0, out = 0;
    transactions.filter((t) => t.walletId === activeWallet.id).forEach((t) => {
      if (t.amount > 0) inf += t.amount;
      else out += Math.abs(t.amount);
    });
    return { totalInflows: inf, totalOutflows: out };
  }, [transactions, activeWallet.id]);

  const pendingShopping = useMemo(() => shoppingList.filter((i) => i.walletId === activeWallet.id && i.status === 'PENDING'), [shoppingList, activeWallet.id]);
  const purchasedShopping = useMemo(() => shoppingList.filter((i) => i.walletId === activeWallet.id && i.status === 'PURCHASED'), [shoppingList, activeWallet.id]);

  // دالة طباعة وتصدير ملف الـ PDF الجاهز
  const handlePrintPdf = (title, filename, contentHtml) => {
    if (isExportingPdf) return;
    setIsExportingPdf(true);
    const win = window.open('', '_blank');
    if (!win) {
      setIsExportingPdf(false);
      showToast('يرجى السماح بالنوافذ المنبثقة للطباعة وحفظ PDF', 'error');
      return;
    }
    win.document.write(`
      <!DOCTYPE html>
      <html dir="rtl" lang="ar">
      <head>
        <meta charset="utf-8">
        <title>${escapeHtml(filename.replace('.pdf', ''))}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap');
          body { font-family: 'Cairo', Arial, sans-serif; padding: 25px; color: #0f172a; }
          .header { text-align: center; border-bottom: 2px solid #0d9488; padding-bottom: 10px; margin-bottom: 20px; }
          .header h1 { margin: 0; color: #0f766e; font-size: 20px; }
          table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 11px; }
          th { background: #f1f5f9; padding: 8px; border: 1px solid #cbd5e1; text-align: right; }
          td { padding: 7px 8px; border: 1px solid #e2e8f0; }
          .amount { font-family: monospace; font-weight: bold; }
          .text-green { color: #166534; }
          .text-red { color: #991b1b; }
          @media print { button { display: none; } }
        </style>
      </head>
      <body>
        <div style="text-align: left; margin-bottom: 15px;">
          <button onclick="window.print()" style="background:#0d9488; color:#fff; border:none; padding:8px 16px; border-radius:6px; font-family:'Cairo'; font-weight:bold; cursor:pointer;">🖨️ طباعة أو حفظ كملف PDF</button>
        </div>
        ${contentHtml}
        <script>
          document.title = "${escapeHtml(filename.replace('.pdf', ''))}";
          window.onload = function() { setTimeout(function(){ window.print(); }, 300); };
        <\/script>
      </body>
      </html>
    `);
    win.document.close();
    setIsExportingPdf(false);
    showToast(`تم فتح نافذة تصدير ملف: (${filename})`);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans" dir="rtl">
      {/* بث التحديث اللحظي */}
      {liveBroadcastEvent && (
        <div className="bg-emerald-600/90 text-white text-xs py-2 px-4 flex items-center justify-center gap-2 shadow-lg sticky top-0 z-50">
          <Radio className="w-4 h-4 animate-pulse text-emerald-200" />
          <span className="font-bold">بث مباشر لحظي:</span>
          <span>{liveBroadcastEvent}</span>
        </div>
      )}

      {/* التنبيهات العائمة */}
      {toastMessage && (
        <div className={`fixed bottom-5 left-5 z-50 py-3 px-5 rounded-2xl shadow-2xl text-xs font-bold flex items-center gap-2 border ${
          toastMessage.type === 'error' ? 'bg-rose-950 border-rose-700 text-rose-200' : 'bg-emerald-950 border-emerald-700 text-emerald-200'
        }`}>
          {toastMessage.type === 'error' ? <AlertTriangle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          <span>{toastMessage.msg}</span>
        </div>
      )}

      {/* الشريط العلوي الرئيسي */}
      <header className="bg-slate-900/80 border-b border-slate-800 sticky top-0 z-40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-teal-500 flex items-center justify-center text-slate-950 font-black shadow-lg">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-base sm:text-lg text-white">ميزانية العائلة</h1>
              <p className="text-[11px] text-slate-400">دينار أردني (JOD) • متزامن ومحمي</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <select
              value={activeWallet.id}
              onChange={(e) => setActiveWalletId(e.target.value)}
              className="bg-slate-800 border border-slate-700 text-xs font-bold text-white rounded-xl px-3 py-2 cursor-pointer"
            >
              {wallets.filter((w) => w.members.some((m) => m.userId === currentUserId)).map((w) => (
                <option key={w.id} value={w.id}>📁 {w.name}</option>
              ))}
            </select>

            <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 p-1 rounded-xl">
              <span className="text-sm px-1">{currentUser.avatar}</span>
              <select
                value={currentUserId}
                onChange={(e) => setCurrentUserId(e.target.value)}
                className="bg-transparent text-xs text-slate-200 font-bold cursor-pointer"
              >
                {USERS.map((u) => (
                  <option key={u.id} value={u.id} className="bg-slate-900 text-white">
                    {u.role === 'ADMIN' ? '👑 ' : '👤 '} {u.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* أزرار التنقل بين التبويبات */}
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-2 overflow-x-auto py-2 border-t border-slate-800">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
              activeTab === 'dashboard' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{isEmergencyWallet ? 'حركات وسجل الصندوق' : 'لوحة التحكم والمصروفات'}</span>
          </button>

          {isHouseholdWallet && (
            <button
              onClick={() => setActiveTab('shopping_list')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 relative ${
                activeTab === 'shopping_list' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
              }`}
            >
              <ShoppingCart className="w-3.5 h-3.5" />
              <span>قائمة تسوق المنزل</span>
              {pendingShopping.length > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.2 rounded-full">
                  {pendingShopping.length}
                </span>
              )}
            </button>
          )}

          {isAdmin && (
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border ${
                activeTab === 'reports' ? 'bg-emerald-500 text-slate-950 border-emerald-400' : 'text-emerald-400 border-emerald-500/30'
              }`}
            >
              <FileDown className="w-3.5 h-3.5" />
              <span>التقارير المالية وتصدير PDF</span>
            </button>
          )}

          <button
            onClick={() => setActiveTab('wallets')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 ${
              activeTab === 'wallets' ? 'bg-teal-500 text-slate-950' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>المحافظ والأعضاء</span>
          </button>
        </div>
      </header>

      {/* محتوى الشاشات */}
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1 w-full space-y-6">
        {/* شاشة لوحة التحكم */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            {!isEmergencyWallet ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* كرت الرصيد الصافي المتاح */}
                  <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
                    <span className="text-xs font-bold text-slate-400 block mb-2">الرصيد الكلي المتاح</span>
                    <h2 className="text-3xl font-black text-white font-mono">{formatJOD(activeWallet.currentBalance)}</h2>
                    <p className="text-[11px] text-teal-400 mt-2 font-bold">✓ الرصيد الصافي المتبقي المتاح</p>
                  </div>

                  {/* كرت إجمالي المدخولات */}
                  <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
                    <span className="text-xs font-bold text-slate-400 block mb-2">إجمالي المدخولات</span>
                    <h3 className="text-2xl font-black text-emerald-400 font-mono">+{formatJOD(totalInflows)}</h3>
                    <p className="text-[11px] text-slate-400 mt-2">شامل كافة الإيداعات والرواتب</p>
                  </div>

                  {/* كرت إجمالي المصروفات */}
                  <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
                    <span className="text-xs font-bold text-slate-400 block mb-2">إجمالي المصروفات والنفقات</span>
                    <h3 className="text-2xl font-black text-rose-400 font-mono">-{formatJOD(totalOutflows)}</h3>
                    <p className="text-[11px] text-slate-400 mt-2">شامل الفواتير والمشتريات</p>
                  </div>
                </div>

                {/* سجل العمليات والمعاملات */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                    <h3 className="font-bold text-sm text-white">سجل العمليات والمعاملات</h3>
                    {userPerms.canAddTx && (
                      <button
                        onClick={() => setIsTxModalOpen(true)}
                        className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold shadow-md"
                      >
                        <Plus className="w-4 h-4 font-bold" />
                        <span>معاملة يدوية</span>
                      </button>
                    )}
                  </div>

                  <div className="space-y-2.5">
                    {visibleTransactions.map((tx) => {
                      const isIncome = tx.amount > 0;
                      return (
                        <div key={tx.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-sm text-white">{tx.category}</span>
                              <span className="text-[10px] text-slate-400">{formatShortDate(tx.date)}</span>
                            </div>
                            <p className="text-xs text-slate-400 mt-0.5">{tx.description || '-'}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`font-mono text-base font-bold ${isIncome ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {isIncome ? '+' : ''}{formatJOD(tx.amount)}
                            </span>
                            {(isAdmin || tx.createdBy === currentUserId) && (
                              <button onClick={() => handleDeleteTransaction(tx.id)} className="p-1.5 text-slate-500 hover:text-rose-400">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            ) : (
              /* واجهة صندوق الطوارئ والتوفير */
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 rounded-3xl bg-slate-900 border border-emerald-700/60 shadow-xl">
                    <span className="text-xs font-bold text-emerald-300 block mb-2">المبلغ المتبقي بالصندوق (الرصيد الفعلي)</span>
                    <h2 className="text-3xl font-black text-white font-mono">{formatJOD(activeWallet.currentBalance)}</h2>
                    <p className="text-[11px] text-emerald-400 mt-2 font-bold">✓ الرصيد الاحتياطي الصافي المتبقي المتاح للطوارئ</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
                    <span className="text-xs font-bold text-slate-400 block mb-2">إجمالي الإيداعات</span>
                    <h3 className="text-2xl font-black text-emerald-400 font-mono">+{formatJOD(totalInflows)}</h3>
                    <p className="text-[11px] text-slate-400 mt-2">تغذية الصندوق والمدخرات</p>
                  </div>
                  <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
                    <span className="text-xs font-bold text-slate-400 block mb-2">إجمالي السحوبات</span>
                    <h3 className="text-2xl font-black text-rose-400 font-mono">-{formatJOD(totalOutflows)}</h3>
                    <p className="text-[11px] text-slate-400 mt-2">سحوبات الحالات الطارئة</p>
                  </div>
                </div>

                <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
                  <h3 className="font-bold text-sm text-white">سجل حركات صندوق الطوارئ والتوفير</h3>
                  <button
                    onClick={() => setIsTxModalOpen(true)}
                    className="flex items-center gap-1.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-3.5 py-2 rounded-xl text-xs font-bold"
                  >
                    <Plus className="w-4 h-4" />
                    <span>إيداع / سحب طارئ</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {visibleTransactions.map((tx) => (
                    <div key={tx.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-sm text-white">{tx.amount > 0 ? 'إيداع وتوفير' : 'سحب طارئ'}</span>
                        <span className="text-xs text-slate-400 block mt-0.5">{tx.category} • {formatShortDate(tx.date)}</span>
                      </div>
                      <span className={`font-mono text-base font-bold ${tx.amount > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {tx.amount > 0 ? '+' : ''}{formatJOD(tx.amount)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* شاشة قائمة تسوق المنزل */}
        {activeTab === 'shopping_list' && isHouseholdWallet && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-teal-400" />
                <span>قائمة تسوق "{activeWallet.name}"</span>
              </h2>
              <button
                onClick={() => { setEditingShoppingItem(null); setIsShoppingModalOpen(true); }}
                className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-slate-950 px-4 py-2 rounded-xl text-xs font-bold"
              >
                <Plus className="w-4 h-4" />
                <span>إضافة غرض جديد</span>
              </button>
            </div>

            {/* تبويبا: قبل الشراء وبعد الشراء */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setShoppingTab('PENDING')}
                className={`p-4 rounded-2xl border text-right flex items-center justify-between ${
                  shoppingTab === 'PENDING' ? 'bg-amber-500/15 border-amber-500/50' : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div>
                  <span className="font-bold text-sm block text-white">المنتجات قبل الشراء</span>
                  <span className="text-xs text-slate-400">نواقص بانتظار التسعير في السوق</span>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-amber-500 text-slate-950">{pendingShopping.length}</span>
              </button>

              <button
                onClick={() => setShoppingTab('PURCHASED')}
                className={`p-4 rounded-2xl border text-right flex items-center justify-between ${
                  shoppingTab === 'PURCHASED' ? 'bg-rose-950/40 border-rose-600' : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                <div>
                  <span className="font-bold text-sm block text-white">المنتجات بعد الشراء</span>
                  <span className="text-xs text-slate-400">مكتملة ومخصومة من الرصيد</span>
                </div>
                <span className="text-xs font-black px-2.5 py-1 rounded-xl bg-rose-500 text-white">{purchasedShopping.length}</span>
              </button>
            </div>

            {/* صفوف عناصر التسوق */}
            <div className="space-y-3">
              {(shoppingTab === 'PENDING' ? pendingShopping : purchasedShopping).map((item, idx) => {
                const isBought = item.status === 'PURCHASED';
                const cat = SHOPPING_CATEGORIES[item.category] || { icon: '📦', color: 'bg-slate-800 text-slate-300' };

                return (
                  <div key={item.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-800 text-teal-300 font-mono font-bold text-xs flex items-center justify-center border border-slate-700">
                        #{idx + 1}
                      </span>
                      <button
                        onClick={() => isBought ? handleUncheckPurchasedItem(item) : setPurchasingItem(item)}
                        className="text-slate-400 hover:text-white"
                        title={isBought ? "إلغاء الشراء واسترداد المبلغ" : "تسجيل الشراء وإدخال القيمة"}
                      >
                        {isBought ? <CheckSquare className="w-5 h-5 text-rose-500" /> : <Square className="w-5 h-5 text-slate-500" />}
                      </button>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${isBought ? 'line-through text-rose-300' : 'text-white'}`}>{item.title}</span>
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-teal-300">{item.quantity}</span>
                          <span className={`text-[10px] px-2 py-0.5 rounded-md border flex items-center gap-1 ${cat.color}`}>
                            <span>{cat.icon}</span>
                            <span>{item.category}</span>
                          </span>
                        </div>
                        {item.notes && <span className="text-xs text-slate-400 italic">📝 {item.notes}</span>}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {isBought ? (
                        <>
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded-xl bg-rose-500/15 text-rose-300 border border-rose-500/30">
                            {formatJOD(item.actualPrice)}
                          </span>
                          <button
                            onClick={() => { setEditingPriceItem(item); setNewPriceInput(((item.actualPrice || 0) / 100).toFixed(2)); }}
                            className="p-1.5 text-amber-400 hover:bg-slate-800 rounded-lg"
                            title="تعديل السعر وتسوية الفرق"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setPurchasingItem(item)}
                          className="text-xs font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-xl hover:bg-emerald-900/50"
                        >
                          تم الشراء - إدخال القيمة
                        </button>
                      )}
                      <button
                        onClick={() => setShoppingList((prev) => prev.filter((i) => i.id !== item.id))}
                        className="p-1.5 text-slate-500 hover:text-rose-400"
                        title="حذف البند"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* شاشة تصدير تقارير PDF الرسمية */}
        {activeTab === 'reports' && isAdmin && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 p-6 rounded-3xl border border-slate-800 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileDown className="w-5 h-5 text-emerald-400" />
                <span>نظام استخراج وطباعة تقارير PDF الرسمية</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* تقرير نهاية الشهر التقويمي */}
                <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-3">
                  <h3 className="font-bold text-sm text-white">1. تقرير نهاية الشهر التقويمي (PDF)</h3>
                  <p className="text-xs text-slate-400">يصدر جدول الأرصدة المتبقية لكافة المحافظ وكافة حركات الشهر.</p>
                  <button
                    onClick={() => {
                      const monthName = ARABIC_MONTH_NAMES[new Date().getMonth()];
                      const year = new Date().getFullYear();
                      const filename = `الحركات المالية لشهر ${monthName} ${year}.pdf`;
                      const html = `
                        <div class="header">
                          <h1>ميزانية العائلة - تقرير الحركات المالية لشهر ${escapeHtml(monthName)} ${year}</h1>
                          <p>المشرف: ${escapeHtml(currentUser.name)} | التاريخ: ${new Date().toLocaleDateString('ar-JO')}</p>
                        </div>
                        <h3>أرصدة المحافظ بنهاية الشهر:</h3>
                        <table>
                          <tr><th>المحفظة</th><th>الرصيد المتبقي الفعلي</th></tr>
                          ${wallets.map(w => `<tr><td>${escapeHtml(w.name)}</td><td class="amount">${formatJOD(w.currentBalance)}</td></tr>`).join('')}
                        </table>
                        <h3>سجل حركات الشهر:</h3>
                        <table>
                          <tr><th>التاريخ</th><th>التصنيف</th><th>الوصف</th><th>المبلغ</th></tr>
                          ${visibleTransactions.map(t => `<tr><td>${formatShortDate(t.date)}</td><td>${escapeHtml(t.category)}</td><td>${escapeHtml(t.description || '-')}</td><td class="amount ${t.amount > 0 ? 'text-green' : 'text-red'}">${t.amount > 0 ? '+' : ''}${formatJOD(t.amount)}</td></tr>`).join('')}
                        </table>
                      `;
                      handlePrintPdf('تقرير نهاية الشهر', filename, html);
                    }}
                    className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 font-bold" />
                    <span>تصدير تقرير نهاية الشهر الحالي (PDF)</span>
                  </button>
                </div>

                {/* التقرير المالي السنوي الشامل */}
                <div className="p-5 bg-slate-950/60 border border-slate-800 rounded-2xl space-y-3">
                  <h3 className="font-bold text-sm text-white">2. التقرير المالي السنوي الشامل (PDF)</h3>
                  <p className="text-xs text-slate-400">ملخص شهري لكافة أشهر السنة وتحليل لأكثر البنود التي صرف عليها المال.</p>
                  <button
                    onClick={() => {
                      const year = new Date().getFullYear();
                      const filename = `التقرير المالي السنوي لسنة ${year}.pdf`;
                      const html = `
                        <div class="header">
                          <h1>ميزانية العائلة - التقرير المالي السنوي الشامل لسنة ${year}</h1>
                          <p>المسؤول: ${escapeHtml(currentUser.name)} | إجمالي المصروفات السنوية: -${formatJOD(totalOutflows)}</p>
                        </div>
                        <h3>أرصدة المحافظ الإجمالية:</h3>
                        <table>
                          <tr><th>المحفظة</th><th>الرصيد</th></tr>
                          ${wallets.map(w => `<tr><td>${escapeHtml(w.name)}</td><td class="amount">${formatJOD(w.currentBalance)}</td></tr>`).join('')}
                        </table>
                      `;
                      handlePrintPdf('التقرير السنوي الشامل', filename, html);
                    }}
                    className="w-full py-2.5 bg-teal-500 hover:bg-teal-600 text-slate-950 font-black text-xs rounded-xl shadow-md flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4 font-bold" />
                    <span>تصدير التقرير السنوي الشامل (PDF)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* شاشة إدارة المحافظ والأعضاء */}
        {activeTab === 'wallets' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
              <h2 className="text-base font-bold text-white">إدارة المحافظ وأفراد العائلة</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsRedeemModalOpen(true)}
                  className="bg-slate-800 hover:bg-slate-700 text-teal-300 border border-teal-500/30 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>انضمام برمز</span>
                </button>
                {isAdmin && (
                  <button
                    onClick={() => { setGeneratedInviteCode(generateSecureInviteCode()); setIsInviteModalOpen(true); }}
                    className="bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>دعوة فرد</span>
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
              {wallets.map((w) => (
                <div key={w.id} className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between gap-3">
                  <div>
                    <span className="font-bold text-white block">📁 {w.name}</span>
                    <span className="font-mono text-sm font-bold text-teal-300 mt-1 block">{formatJOD(w.currentBalance)}</span>
                    <span className="text-[11px] text-slate-400 mt-1 block">الأعضاء: {w.members.length}</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <button
                      onClick={() => setActiveWalletId(w.id)}
                      className={`text-xs font-bold py-1 px-3 rounded-lg ${w.id === activeWallet.id ? 'bg-teal-500 text-slate-950' : 'bg-slate-800 text-slate-300'}`}
                    >
                      {w.id === activeWallet.id ? 'النشطة' : 'اختيار'}
                    </button>
                    {isAdmin && w.id !== 'wallet_main' && (
                      <button onClick={() => setWalletToDelete(w)} className="p-1.5 text-slate-500 hover:text-rose-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* نافذة تسجيل حركة يدوية */}
      {isTxModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6">
            <h3 className="font-bold text-sm text-white mb-4">تسجيل حركة مالية جديدة</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleAddTransaction(new FormData(e.target)); }} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <label className="p-2.5 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                  <input type="radio" name="type" value="EXPENSE" defaultChecked className="accent-rose-500" />
                  <span className="text-xs font-bold text-rose-300">مصروف / سحب</span>
                </label>
                <label className="p-2.5 bg-slate-800 border border-slate-700 rounded-xl flex items-center justify-center gap-2 cursor-pointer">
                  <input type="radio" name="type" value="INCOME" className="accent-emerald-500" />
                  <span className="text-xs font-bold text-emerald-300">دخل / إيداع</span>
                </label>
              </div>
              <input type="number" name="amount" step="0.01" min="0.01" required placeholder="المبلغ بالدينار (مثال: 15.50)" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-sm font-bold" />
              <input type="text" name="category" required placeholder="التصنيف (مثال: بقالة، كهرباء، وقود)" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-xs" />
              {!isEmergencyWallet && <input type="text" name="description" placeholder="ملاحظة أو بيان إضافي (اختياري)" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-xs" />}
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsTxModalOpen(false)} className="w-1/2 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">إلغاء</button>
                <button type="submit" className="w-1/2 py-2 bg-teal-500 text-slate-950 rounded-xl text-xs font-black">حفظ المعاملة</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة إضافة غرض تسوق */}
      {isShoppingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6">
            <h3 className="font-bold text-sm text-white mb-4">إضافة غرض لقائمة التسوق</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveShoppingItem(new FormData(e.target)); }} className="space-y-4">
              <input type="text" name="title" defaultValue={editingShoppingItem?.title || ''} required placeholder="اسم الغرض (مثال: حليب، خضار، معكرونة)" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-xs" />
              <input type="text" name="quantity" defaultValue={editingShoppingItem?.quantity || '1'} placeholder="الكمية (مثال: 2 كغم، عبوة)" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-xs" />
              <select name="category" defaultValue={editingShoppingItem?.category || 'ألبان وأجبان'} className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-xs">
                {Object.keys(SHOPPING_CATEGORIES).map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="text" name="notes" defaultValue={editingShoppingItem?.notes || ''} placeholder="ملاحظة إضافية (الماركة، المكان)" className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white text-xs" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsShoppingModalOpen(false)} className="w-1/2 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">إلغاء</button>
                <button type="submit" className="w-1/2 py-2 bg-teal-500 text-slate-950 rounded-xl text-xs font-black">إضافة للنواقص</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة إدخال سعر الشراء الفعلي بالسوق */}
      {purchasingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6">
            <h3 className="font-bold text-sm text-white mb-2">إدخال سعر الشراء الفعلي</h3>
            <p className="text-xs text-slate-400 mb-4">{purchasingItem.title} ({purchasingItem.quantity})</p>
            <form onSubmit={(e) => { e.preventDefault(); handleConfirmPurchase(purchasingItem, new FormData(e.target).get('price')); }} className="space-y-4">
              <input type="number" name="price" step="0.01" min="0.01" required autoFocus placeholder="السعر المدفوع بالدينار (مثال: 3.50)" className="w-full bg-slate-800 border border-emerald-500 rounded-xl p-3 text-white text-base font-bold font-mono" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setPurchasingItem(null)} className="w-1/2 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">إلغاء</button>
                <button type="submit" className="w-1/2 py-2 bg-emerald-500 text-slate-950 rounded-xl text-xs font-black">تأكيد الشراء والخصم</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة تعديل سعر المشترى وتسوية الفرق بالمحفظة */}
      {editingPriceItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6">
            <h3 className="font-bold text-sm text-white mb-2">تعديل سعر المنتج وتسوية الفرق</h3>
            <p className="text-xs text-slate-400 mb-4">{editingPriceItem.title} (مسجل حالياً: {formatJOD(editingPriceItem.actualPrice)})</p>
            <form onSubmit={(e) => { e.preventDefault(); handleUpdatePurchasedPrice(editingPriceItem, newPriceInput); }} className="space-y-4">
              <input type="number" step="0.01" min="0.01" required autoFocus value={newPriceInput} onChange={(e) => setNewPriceInput(e.target.value)} placeholder="السعر الفعلي الجديد" className="w-full bg-slate-800 border border-amber-500 rounded-xl p-3 text-white text-base font-bold font-mono" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setEditingPriceItem(null)} className="w-1/2 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">إلغاء</button>
                <button type="submit" className="w-1/2 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-black">تأكيد وتسوية الرصيد</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة الانضمام عبر رمز دعوة مشفر */}
      {isRedeemModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl w-full max-w-md p-6">
            <h3 className="font-bold text-sm text-white mb-3">الانضمام للمحفظة برمز مشفر</h3>
            <form onSubmit={(e) => {
              e.preventDefault();
              const code = redeemCodeInput.trim().toUpperCase();
              if (code === generatedInviteCode) {
                showToast('تم الانضمام للمحفظة بنجاح');
                setIsRedeemModalOpen(false);
              } else {
                showToast('رمز الدعوة غير صحيح', 'error');
              }
            }} className="space-y-4">
              <input type="text" value={redeemCodeInput} onChange={(e) => setRedeemCodeInput(e.target.value)} placeholder="FB-XXXX-XXXX-XXXX" required className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-teal-300 font-mono text-center tracking-widest text-sm" />
              <div className="flex gap-2 pt-2">
                <button type="button" onClick={() => setIsRedeemModalOpen(false)} className="w-1/2 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">إلغاء</button>
                <button type="submit" className="w-1/2 py-2 bg-teal-500 text-slate-950 rounded-xl text-xs font-black">تأكيد الانضمام</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* نافذة تأكيد حذف محفظة */}
      {walletToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-rose-800 rounded-3xl w-full max-w-md p-6">
            <h3 className="font-bold text-sm text-rose-400 mb-2">تأكيد حذف المحفظة نهائياً</h3>
            <p className="text-xs text-slate-300 mb-4">هل أنت متأكد من حذف محفظة "{walletToDelete.name}" وكافة حركاتها المالية؟ لا يمكن التراجع عن هذا الإجراء.</p>
            <div className="flex gap-2">
              <button onClick={() => setWalletToDelete(null)} className="w-1/2 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold">إلغاء</button>
              <button onClick={() => handleDeleteWallet(walletToDelete.id)} className="w-1/2 py-2 bg-rose-600 text-white rounded-xl text-xs font-black">تأكيد الحذف</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
