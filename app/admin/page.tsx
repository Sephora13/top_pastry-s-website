// src/app/admin/page.tsx
'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faPlus, 
  faTrash, 
  faEye, 
  faBell, 
  faSearch, 
  faSlidersH, 
  faExpand, 
  faChevronDown, 
  faCheck, 
  faTimes, 
  faHome, 
  faClipboardList, 
  faBox, 
  faEllipsisH, 
  faArrowLeft, 
  faChevronRight,
  faImage,
  faPlusCircle,
  faHistory,
  faSignOutAlt,
  faBuilding,
  faKey,
  faFileContract,
  faUserPlus,
  faCheckCircle,
  faUserShield
} from '@fortawesome/free-solid-svg-icons';
import { getProducts, addProduct, deleteProduct, getCategoryName } from '../components/lib/storage';
import { getOrders } from '../services/order.service';
import { Product, Order } from '@/app/types';
import clsx from 'clsx';

// Predefined library of high-quality image choices for product creation
const MEDIA_LIBRARY = [
  'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724236/gateau6_dc6vwq.jpg',
  'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724232/gateau7_enoey1.jpg',
  'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724230/gateau3_vpcpkr.jpg',
  'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724230/snack_sale%CC%81_5_ar3whq.jpg',
  'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707761/Screenshot_20251028_123049_WhatsAppBusiness_gyogtd.jpg',
  'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707736/mini_burger2_awtum1.jpg',
  'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707745/salade7_b3twpq.jpg',
  'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707747/salade8_a4wx77.jpg',
  'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707732/jus2_uq7lf0.jpg',
  'https://res.cloudinary.com/dkxzqwnou/image/upload/v1776707733/jus3_ot3oaf.jpg',
  'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724225/pack_snack_abjqce.jpg',
  'https://res.cloudinary.com/dkxzqwnou/image/upload/v1777724226/detox_rqyh2f.jpg',
];

const getCookie = (name: string): string => {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift() || '';
  return '';
};

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'orders' | 'products' | 'more'>('products');
  const [currentView, setCurrentView] = useState<'list' | 'create'>('list');
  const [isMediaModalOpen, setIsMediaModalOpen] = useState(false);
  
  // Auth state
  const [adminEmail, setAdminEmail] = useState('');
  const [adminRole, setAdminRole] = useState('admin');
  const [adminName, setAdminName] = useState('Admin');

  // Search and filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | Product['category']>('all');
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);

  // Form states for creation
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'active' | 'inactive'>('active');
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Product['category']>('gateaux');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('Chocolat');
  const [stocks, setStocks] = useState('120');
  const [tempSelectedMedia, setTempSelectedMedia] = useState<string[]>([]);
  const [confirmedMedia, setConfirmedMedia] = useState<string[]>([]);
  
  // Custom states for content library tab
  const [mediaTab, setMediaTab] = useState<'library' | 'upload'>('library');
  const [customUploadUrl, setCustomUploadUrl] = useState('');

  // Notification states for paid orders
  const [readNotificationIds, setReadNotificationIds] = useState<string[]>([]);
  const [showNotificationsPanel, setShowNotificationsPanel] = useState(false);

  // Dynamic Settings states (More tab)
  const [companyName, setCompanyName] = useState('Top Pastry');
  const [adminsList, setAdminsList] = useState<any[]>([]);
  const [policies, setPolicies] = useState<any>({
    confidentiality: 'Politique de confidentialité de Top Pastry...',
    tos: 'Conditions générales de vente de Top Pastry...',
    returns: 'Politique de retour de Top Pastry...'
  });

  // Settings form states
  const [editCompanyName, setEditCompanyName] = useState('');
  const [editAdminName, setEditAdminName] = useState('');
  const [editAdminEmail, setEditAdminEmail] = useState('');
  const [editAdminPassword, setEditAdminPassword] = useState('');

  const [editConfidentiality, setEditConfidentiality] = useState('');
  const [editTos, setEditTos] = useState('');
  const [editReturns, setEditReturns] = useState('');

  const [newAdminName, setNewAdminName] = useState('');
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newAdminPassword, setNewAdminPassword] = useState('');
  const [newAdminRole, setNewAdminRole] = useState<'admin' | 'super'>('admin');

  // Load products, orders, settings and auth on mount
  useEffect(() => {
    loadProducts();
    loadOrders();
    loadSettings();
    loadAuth();
  }, []);

  const loadProducts = () => {
    setProducts(getProducts());
  };

  const loadOrders = () => {
    const loadedOrders = getOrders();
    setOrders(loadedOrders);
  };

  const loadAuth = () => {
    const emailCookie = getCookie('admin_email');
    const roleCookie = getCookie('admin_role') || 'admin';
    setAdminEmail(emailCookie);
    setAdminRole(roleCookie);
  };

  const loadSettings = () => {
    const storedSettings = localStorage.getItem('top_pastry_admin_settings');
    let settings: any = {};
    if (storedSettings) {
      try {
        settings = JSON.parse(storedSettings);
      } catch (e) {
        console.error(e);
      }
    }

    const compName = settings.companyName || 'Top Pastry';
    const list = settings.admins || [
      { email: 'admin@toppastry.com', password: 'admin123', name: 'Super Admin', role: 'super' }
    ];
    const pols = settings.policies || {
      confidentiality: 'Politique de confidentialité de Top Pastry...',
      tos: 'Conditions générales de vente de Top Pastry...',
      returns: 'Politique de retour de Top Pastry...'
    };

    setCompanyName(compName);
    setAdminsList(list);
    setPolicies(pols);

    // Prepopulate inputs
    setEditCompanyName(compName);
    setEditConfidentiality(pols.confidentiality);
    setEditTos(pols.tos);
    setEditReturns(pols.returns);

    // Prepopulate current admin credentials
    const emailCookie = getCookie('admin_email');
    const currentAdmin = list.find((a: any) => a.email.toLowerCase() === emailCookie.toLowerCase());
    if (currentAdmin) {
      setAdminName(currentAdmin.name || 'Admin');
      setEditAdminName(currentAdmin.name || '');
      setEditAdminEmail(currentAdmin.email || '');
      setEditAdminPassword(currentAdmin.password || '');
    }

    // Load read notifications
    const storedReadIds = localStorage.getItem('top_pastry_read_notifications');
    if (storedReadIds) {
      try {
        setReadNotificationIds(JSON.parse(storedReadIds));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const handleSaveSettings = (type: 'company' | 'credentials' | 'policies') => {
    const storedSettings = localStorage.getItem('top_pastry_admin_settings');
    let settings: any = {};
    if (storedSettings) {
      try {
        settings = JSON.parse(storedSettings);
      } catch (e) {
        console.error(e);
      }
    }

    if (type === 'company') {
      if (!editCompanyName.trim()) return;
      settings.companyName = editCompanyName;
      setCompanyName(editCompanyName);
      alert('Nom de l\'entreprise mis à jour !');
    } else if (type === 'credentials') {
      if (!editAdminName.trim() || !editAdminEmail.trim() || !editAdminPassword.trim()) {
        alert('Veuillez remplir tous les champs.');
        return;
      }
      
      const emailCookie = getCookie('admin_email');
      const updatedAdmins = (settings.admins || []).map((admin: any) => {
        if (admin.email.toLowerCase() === emailCookie.toLowerCase()) {
          return {
            ...admin,
            name: editAdminName,
            email: editAdminEmail,
            password: editAdminPassword
          };
        }
        return admin;
      });

      settings.admins = updatedAdmins;
      setAdminsList(updatedAdmins);
      setAdminName(editAdminName);
      setAdminEmail(editAdminEmail);
      
      // Update cookies with new values
      document.cookie = `admin_email=${editAdminEmail}; path=/; max-age=86400; SameSite=Lax`;
      
      alert('Vos informations de connexion ont été mises à jour !');
    } else if (type === 'policies') {
      const updatedPolicies = {
        confidentiality: editConfidentiality,
        tos: editTos,
        returns: editReturns
      };
      settings.policies = updatedPolicies;
      setPolicies(updatedPolicies);
      alert('Les politiques de l\'entreprise ont été mises à jour !');
    }

    localStorage.setItem('top_pastry_admin_settings', JSON.stringify(settings));
  };

  const handleAddAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdminName.trim() || !newAdminEmail.trim() || !newAdminPassword.trim()) {
      alert('Veuillez remplir tous les champs du nouvel administrateur.');
      return;
    }

    const storedSettings = localStorage.getItem('top_pastry_admin_settings');
    let settings: any = {};
    if (storedSettings) {
      try {
        settings = JSON.parse(storedSettings);
      } catch (e) {
        console.error(e);
      }
    }

    const currentAdmins = settings.admins || [];
    if (currentAdmins.some((a: any) => a.email.toLowerCase() === newAdminEmail.toLowerCase())) {
      alert('Cet email est déjà associé à un administrateur.');
      return;
    }

    const newAdmin = {
      name: newAdminName,
      email: newAdminEmail,
      password: newAdminPassword,
      role: newAdminRole
    };

    const updatedAdmins = [...currentAdmins, newAdmin];
    settings.admins = updatedAdmins;
    
    localStorage.setItem('top_pastry_admin_settings', JSON.stringify(settings));
    setAdminsList(updatedAdmins);

    // Reset inputs
    setNewAdminName('');
    setNewAdminEmail('');
    setNewAdminPassword('');
    setNewAdminRole('admin');

    alert(`L'administrateur ${newAdmin.name} a été nommé avec succès !`);
  };

  const handleCreateProduct = () => {
    if (!title.trim() || !price.trim()) {
      alert('Veuillez remplir le titre et le prix.');
      return;
    }

    const imageToUse = confirmedMedia.length > 0 ? confirmedMedia[0] : MEDIA_LIBRARY[0];

    const newProduct: Product = {
      id: Date.now(),
      name: title,
      price: parseFloat(price),
      category: selectedCategory,
      image: imageToUse,
      description: description || 'Délicieuse création fait maison.',
      status: status,
      color: color || 'Unique',
      stocks: parseInt(stocks) || 100
    };

    addProduct(newProduct);
    loadProducts();

    // Reset Form
    setTitle('');
    setStatus('active');
    setDescription('');
    setSelectedCategory('gateaux');
    setPrice('');
    setColor('Chocolat');
    setStocks('120');
    setConfirmedMedia([]);
    setTempSelectedMedia([]);
    
    setCurrentView('list');
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      deleteProduct(id);
      loadProducts();
    }
  };

  const handleSeedProducts = () => {
    localStorage.removeItem('cafeteria_products_v2');
    loadProducts();
    alert('Les produits par défaut ont été rechargés !');
  };

  const handleLogout = () => {
    document.cookie = "admin_logged_in=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "admin_email=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    document.cookie = "admin_role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    window.location.href = '/admin/login';
  };

  // Notification helpers
  const paidOrders = orders.filter(order => order.status === 'paid');
  const unreadOrders = paidOrders.filter(order => !readNotificationIds.includes(order.id));

  const handleMarkNotificationAsRead = (orderId: string) => {
    if (readNotificationIds.includes(orderId)) return;
    const newReadIds = [...readNotificationIds, orderId];
    setReadNotificationIds(newReadIds);
    localStorage.setItem('top_pastry_read_notifications', JSON.stringify(newReadIds));
  };

  const handleClearNotifications = () => {
    const allPaidIds = paidOrders.map(order => order.id);
    setReadNotificationIds(allPaidIds);
    localStorage.setItem('top_pastry_read_notifications', JSON.stringify(allPaidIds));
  };

  // Filter products
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' && (product.status === 'active' || !product.status)) ||
      (statusFilter === 'inactive' && product.status === 'inactive');
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center md:py-12 relative overflow-hidden font-sans">
      
      {/* Decorative Background Gradients */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-orange-medium/10 blur-[120px] pointer-events-none" />

      {/* Main Grid Container (Phone Frame Removed) */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Side: Desktop Companion Information Panel */}
        <div className="lg:col-span-5 text-left text-slate-800 flex flex-col justify-between hidden lg:flex pr-6 py-4">
          <div className="space-y-6">
            <div>
              <span className="bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest px-3 py-1 rounded-full">
                ADMINISTRATEUR ({adminRole === 'super' ? 'Super Admin' : 'Admin'})
              </span>
              <h1 className="text-4xl font-black mt-3 text-slate-900 tracking-tight leading-none">
                {companyName} <span className="text-primary">Dashboard</span>
              </h1>
              <p className="text-slate-600 mt-4 text-base font-medium leading-relaxed">
                Modifiez l&apos;assortiment, gérez les stocks, changez les statuts et ajoutez de nouvelles créations en temps réel.
              </p>
            </div>

            {/* Quick Statistics Card */}
            <div className="bg-white/70 backdrop-blur-md border border-white/80 p-6 rounded-3xl shadow-xl space-y-4">
              <h3 className="font-bold text-lg text-slate-950 flex items-center gap-2 border-b border-slate-100 pb-3">
                📊 Statistiques globales
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-primary/5 p-3 rounded-2xl border border-primary/10">
                  <span className="block text-2xl font-black text-primary">{products.length}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Produits</span>
                </div>
                <div className="bg-green-50 p-3 rounded-2xl border border-green-100">
                  <span className="block text-2xl font-black text-green-700">
                    {products.filter(p => p.status === 'active' || !p.status).length}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Actifs</span>
                </div>
                <div className="bg-amber-50 p-3 rounded-2xl border border-amber-100">
                  <span className="block text-2xl font-black text-amber-600">
                    {products.filter(p => p.status === 'inactive').length}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">Inactifs</span>
                </div>
              </div>
              
              <div className="flex gap-3 pt-2">
                <button 
                  onClick={handleSeedProducts}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <FontAwesomeIcon icon={faHistory} />
                  Réinitialiser la base
                </button>
                <Link 
                  href="/" 
                  className="flex-1 bg-primary text-white hover:bg-primary-dark px-4 py-2.5 rounded-xl font-bold text-xs transition flex items-center justify-center gap-2 shadow-md"
                >
                  <FontAwesomeIcon icon={faEye} />
                  Boutique en ligne
                </Link>
              </div>
            </div>
          </div>

          {/* User profile section at the bottom of left sidebar */}
          <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-lg flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/20 text-primary border border-primary/30 flex items-center justify-center font-bold text-sm">
                {adminName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="font-extrabold text-sm truncate max-w-[150px]">{adminName}</p>
                <p className="text-[10px] text-slate-400 capitalize">{adminRole === 'super' ? 'Super Admin' : 'Admin'}</p>
              </div>
            </div>
            <button 
              onClick={handleLogout}
              className="text-xs bg-white/10 hover:bg-white/20 text-white font-bold px-3.5 py-2 rounded-xl transition flex items-center gap-2 cursor-pointer"
            >
              <FontAwesomeIcon icon={faSignOutAlt} />
              Déconnexion
            </button>
          </div>
        </div>

        {/* Right/Center Side: Clean Borderless Interface Container */}
        <div className="lg:col-span-7 flex justify-center w-full h-full md:h-auto">
          <div className="relative w-full max-w-[480px] h-[100dvh] md:h-[780px] bg-white md:rounded-[40px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 overflow-hidden flex flex-col">
            
            {/* VIEWPORT AREA */}
            <div className="flex-1 bg-white relative overflow-hidden flex flex-col">
              
              {currentView === 'list' ? (
                // --- SCREEN 1: PRODUCTS LIST ---
                <div className="flex-grow flex flex-col h-full overflow-hidden">
                  
                  {/* Header Row */}
                  <div className="flex justify-between items-center px-6 pt-[calc(env(safe-area-inset-top,16px)+8px)] pb-2 shrink-0">
                    <h2 className="text-3xl font-black text-slate-950 tracking-tight">{companyName}</h2>
                    <div className="flex items-center gap-2">
                      
                      {/* Notification Bell */}
                      <button 
                        onClick={() => {
                          setShowNotificationsPanel(!showNotificationsPanel);
                          loadOrders(); // reload orders to check new notifications
                        }}
                        className="w-11 h-11 bg-slate-100 rounded-2xl flex items-center justify-center relative cursor-pointer hover:bg-slate-200 transition-colors"
                      >
                        <FontAwesomeIcon icon={faBell} className="text-slate-700 text-sm" />
                        {unreadOrders.length > 0 && (
                          <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white text-[9px] font-black rounded-full flex items-center justify-center border-2 border-white">
                            {unreadOrders.length}
                          </span>
                        )}
                      </button>

                      {/* Mobile Profile & Logout */}
                      <button 
                        onClick={handleLogout}
                        className="w-11 h-11 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center cursor-pointer hover:bg-red-100 transition-colors lg:hidden"
                        title="Déconnexion"
                      >
                        <FontAwesomeIcon icon={faSignOutAlt} className="text-sm" />
                      </button>

                      {/* Avatar */}
                      <div className="w-11 h-11 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-xs cursor-default">
                        {adminName.substring(0, 2).toUpperCase()}
                      </div>
                    </div>
                  </div>

                  {/* Notifications Panel in normal flow */}
                  {showNotificationsPanel && (
                    <div className="px-6 pb-2 shrink-0">
                      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-4 text-slate-800 space-y-3">
                        <div className="flex justify-between items-center border-b border-slate-100 pb-2">
                          <h3 className="font-black text-sm text-slate-900 flex items-center gap-1.5">
                            🔔 Notifications
                          </h3>
                          <div className="flex items-center gap-2">
                            {unreadOrders.length > 0 && (
                              <button 
                                onClick={handleClearNotifications}
                                className="text-[10px] text-primary font-black hover:underline cursor-pointer bg-transparent border-none outline-none"
                              >
                                Tout lire
                              </button>
                            )}
                            <button
                              onClick={() => setShowNotificationsPanel(false)}
                              className="text-[10px] text-slate-400 hover:text-slate-600 font-bold cursor-pointer"
                            >
                              Fermer
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2.5 max-h-[200px] overflow-y-auto pr-1">
                          {paidOrders.length === 0 ? (
                            <p className="text-center py-6 text-xs font-bold text-slate-400">Aucune notification de commande</p>
                          ) : (
                            paidOrders.map((order) => {
                              const isUnread = !readNotificationIds.includes(order.id);
                              return (
                                <div 
                                  key={order.id} 
                                  onClick={() => handleMarkNotificationAsRead(order.id)}
                                  className={clsx(
                                    "p-3 rounded-2xl border text-xs cursor-pointer transition-all relative flex flex-col gap-1",
                                    isUnread ? "bg-primary/5 border-primary/20" : "bg-slate-50 border-slate-100"
                                  )}
                                >
                                  {isUnread && <span className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full" />}
                                  <div className="font-extrabold text-slate-900 flex justify-between pr-4">
                                    <span>Commande {order.id}</span>
                                    <span className="text-green-600">Payé</span>
                                  </div>
                                  <p className="text-slate-500 font-medium leading-normal">
                                    Nouvelle commande validée pour <span className="font-bold text-slate-800">{order.customerName}</span> d&apos;un montant de <span className="font-black text-primary">{order.totalAmount.toLocaleString()} FCFA</span>.
                                  </p>
                                  <p className="text-[10px] text-slate-400 font-bold mt-1">
                                    📞 {order.customerPhone}
                                  </p>
                                </div>
                              );
                            })
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Search Bar Block */}
                  <div className="flex gap-2 px-6 pb-2 shrink-0">
                    <div className="flex-1 bg-[#F5F5F5] rounded-2xl flex items-center px-4 py-3 gap-3 border border-slate-100">
                      <FontAwesomeIcon icon={faSearch} className="text-slate-400 text-sm" />
                      <input 
                        type="text" 
                        placeholder="Search" 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="bg-transparent border-none outline-none text-slate-800 text-sm w-full placeholder-slate-400 font-medium"
                      />
                    </div>
                    <button className="w-12 h-12 bg-[#F5F5F5] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-slate-200 border border-slate-100 transition-colors">
                      <FontAwesomeIcon icon={faSlidersH} className="text-slate-700 text-sm" />
                    </button>
                    <button className="w-12 h-12 bg-[#F5F5F5] rounded-2xl flex items-center justify-center cursor-pointer hover:bg-slate-200 border border-slate-100 transition-colors">
                      <FontAwesomeIcon icon={faExpand} className="text-slate-700 text-sm" />
                    </button>
                  </div>

                  {/* Filters / Badges Row */}
                  <div className="flex gap-2.5 px-6 pb-4 shrink-0 relative z-30">
                    
                    {/* Status Dropdown */}
                    <div className="relative">
                      <button 
                        onClick={() => {
                          setShowStatusDropdown(!showStatusDropdown);
                          setShowCategoryDropdown(false);
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-2 border border-slate-200 transition-colors cursor-pointer"
                      >
                        <span>Status</span>
                        <FontAwesomeIcon icon={faChevronDown} className="text-[9px] text-slate-500" />
                      </button>
                      
                      {showStatusDropdown && (
                        <div className="absolute left-0 mt-2 w-40 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50">
                          {['all', 'active', 'inactive'].map((st) => (
                            <button
                              key={st}
                              onClick={() => {
                                setStatusFilter(st as any);
                                setShowStatusDropdown(false);
                              }}
                              className={clsx(
                                "w-full text-left px-4 py-2 text-xs font-bold capitalize transition-colors hover:bg-slate-50",
                                statusFilter === st ? "text-primary" : "text-slate-700"
                              )}
                            >
                              {st === 'all' ? 'Tous' : st === 'active' ? 'Actif' : 'Inactif'}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Category Dropdown */}
                    <div className="relative">
                      <button 
                        onClick={() => {
                          setShowCategoryDropdown(!showCategoryDropdown);
                          setShowStatusDropdown(false);
                        }}
                        className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-4 py-2.5 rounded-full flex items-center gap-2 border border-slate-200 transition-colors cursor-pointer"
                      >
                        <span>Category</span>
                        <FontAwesomeIcon icon={faChevronDown} className="text-[9px] text-slate-500" />
                      </button>

                      {showCategoryDropdown && (
                        <div className="absolute left-0 mt-2 w-52 bg-white border border-slate-200 rounded-2xl shadow-xl py-2 z-50">
                          <button
                            onClick={() => {
                              setCategoryFilter('all');
                              setShowCategoryDropdown(false);
                            }}
                            className={clsx(
                              "w-full text-left px-4 py-2 text-xs font-bold transition-colors hover:bg-slate-50",
                              categoryFilter === 'all' ? "text-primary" : "text-slate-700"
                            )}
                          >
                            Toutes les catégories
                          </button>
                          {(['gateaux', 'viennoiseries', 'salades', 'jus'] as const).map((cat) => (
                            <button
                              key={cat}
                              onClick={() => {
                                setCategoryFilter(cat);
                                setShowCategoryDropdown(false);
                              }}
                              className={clsx(
                                "w-full text-left px-4 py-2 text-xs font-bold transition-colors hover:bg-slate-50",
                                categoryFilter === cat ? "text-primary" : "text-slate-700"
                              )}
                            >
                              {getCategoryName(cat)}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Scrollable list of items */}
                  <div className="flex-grow overflow-y-auto px-6 pb-8 space-y-4 pr-1">
                    {filteredProducts.length === 0 ? (
                      <div className="text-center py-16 text-slate-400">
                        <FontAwesomeIcon icon={faBox} className="text-5xl mb-3 opacity-20" />
                        <p className="text-sm font-semibold">Aucun produit disponible</p>
                      </div>
                    ) : (
                      filteredProducts.map(product => {
                        const isActive = product.status === 'active' || !product.status;
                        return (
                          <div key={product.id} className="flex gap-4 items-center group relative border-b border-slate-100 pb-4">
                            {/* Image container */}
                            <div className="relative w-16 h-16 rounded-2xl overflow-hidden shadow-sm shrink-0 bg-slate-100">
                              <Image 
                                src={product.image} 
                                alt={product.name} 
                                fill 
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>

                            {/* Info */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-1.5 mb-1">
                                <span className={clsx(
                                  "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wide uppercase",
                                  isActive ? "bg-green-50 text-green-700 border border-green-100" : "bg-slate-100 text-slate-600 border border-slate-200"
                                )}>
                                  <span className={clsx("w-1 h-1 rounded-full", isActive ? "bg-green-600" : "bg-slate-500")} />
                                  {isActive ? 'Active' : 'Inactive'}
                                </span>
                              </div>
                              <h4 className="font-extrabold text-slate-900 text-[14px] leading-tight truncate">
                                {product.name}
                              </h4>
                              <p className="text-slate-500 text-[11px] font-bold mt-1 tracking-wide">
                                {product.price.toLocaleString()} FCFA • <span className="text-slate-400 font-medium">{product.color || 'Chocolat'}</span> • <span className="text-slate-400 font-medium">{product.stocks || 145} stocks</span>
                              </p>
                            </div>

                            {/* Actions */}
                            <div className="shrink-0 flex items-center gap-2">
                              <button 
                                onClick={() => handleDeleteProduct(product.id)}
                                className="w-8 h-8 rounded-full bg-red-50 text-red-600 hover:bg-red-100 flex items-center justify-center transition-colors cursor-pointer"
                                title="Supprimer"
                              >
                                <FontAwesomeIcon icon={faTrash} className="text-xs" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>
              ) : (
                // --- SCREEN 2: CREATE PRODUCT FORM ---
                <div className="flex-grow flex flex-col h-full overflow-hidden relative">
                  {/* Header Row */}
                  <div className="flex justify-between items-center pt-[calc(env(safe-area-inset-top,16px)+12px)] pb-4 px-6 border-b border-slate-100 shrink-0">
                    <button 
                      onClick={() => {
                        setTitle('');
                        setPrice('');
                        setDescription('');
                        setConfirmedMedia([]);
                        setCurrentView('list');
                      }}
                      className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors"
                    >
                      <FontAwesomeIcon icon={faArrowLeft} className="text-slate-800 text-sm" />
                    </button>
                    <h2 className="text-base font-black text-slate-900">Create Product</h2>
                    <div className="w-10" />
                  </div>

                  {/* Form fields scroll block */}
                  <div className="flex-grow overflow-y-auto px-6 py-4 pb-28 space-y-5">
                    
                    {/* Media selector */}
                    <div>
                      <span className="block text-xs font-black text-slate-800 mb-2">Media</span>
                      <button 
                        onClick={() => setIsMediaModalOpen(true)}
                        className="w-full bg-white border border-slate-200 rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 hover:border-slate-300 transition-all text-left shadow-sm"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500">
                            <FontAwesomeIcon icon={faImage} className="text-base" />
                          </div>
                          <div>
                            <p className="text-sm font-black text-slate-800">Add Media</p>
                            <p className="text-xs font-bold text-slate-400">Add media for this product</p>
                          </div>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} className="text-slate-400 text-xs" />
                      </button>

                      {/* Preview selected media */}
                      {confirmedMedia.length > 0 && (
                        <div className="mt-3 grid grid-cols-4 gap-3">
                          {confirmedMedia.map((mediaUrl, idx) => (
                            <div key={idx} className="relative aspect-square rounded-xl overflow-hidden group shadow-sm">
                              <Image src={mediaUrl} alt="Selected preview media" fill className="object-cover" />
                              <button 
                                onClick={() => setConfirmedMedia(confirmedMedia.filter(url => url !== mediaUrl))}
                                className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px] hover:bg-red-600 shadow-md"
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <label htmlFor="prod-title" className="block text-xs font-black text-slate-800 mb-2">Product Title</label>
                      <input 
                        id="prod-title"
                        type="text" 
                        placeholder="Enter product title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full bg-[#F9F9F9] border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 text-sm font-bold placeholder-slate-400 outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition-all shadow-2xs"
                      />
                    </div>

                    {/* Status radio cards */}
                    <div>
                      <label className="block text-xs font-black text-slate-800 mb-2">Status</label>
                      <div className="grid grid-cols-2 gap-4">
                        <div 
                          role="button"
                          tabIndex={0}
                          onClick={() => setStatus('active')}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setStatus('active'); }}
                          className={clsx(
                            "border rounded-2xl p-3 flex items-center gap-3 cursor-pointer select-none transition-all shadow-2xs",
                            status === 'active' 
                              ? "bg-white border-slate-900 ring-1 ring-slate-900" 
                              : "bg-[#F9F9F9] border-slate-200"
                          )}
                        >
                          <div className={clsx(
                            "w-5 h-5 rounded-full border flex items-center justify-center",
                            status === 'active' ? "border-blue-600 bg-white" : "border-slate-300"
                          )}>
                            {status === 'active' && <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                          </div>
                          <span className="text-sm font-black text-slate-800">Active</span>
                        </div>
                        <div 
                          role="button"
                          tabIndex={0}
                          onClick={() => setStatus('inactive')}
                          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setStatus('inactive'); }}
                          className={clsx(
                            "border rounded-2xl p-3 flex items-center gap-3 cursor-pointer select-none transition-all shadow-2xs",
                            status === 'inactive' 
                              ? "bg-white border-slate-900 ring-1 ring-slate-900" 
                              : "bg-[#F9F9F9] border-slate-200"
                          )}
                        >
                          <div className={clsx(
                            "w-5 h-5 rounded-full border flex items-center justify-center",
                            status === 'inactive' ? "border-blue-600 bg-white" : "border-slate-300"
                          )}>
                            {status === 'inactive' && <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />}
                          </div>
                          <span className="text-sm font-black text-slate-800">Inactive</span>
                        </div>
                      </div>
                    </div>

                    {/* Descriptions */}
                    <div>
                      <label htmlFor="prod-desc" className="block text-xs font-black text-slate-800 mb-2">Descriptions</label>
                      <textarea 
                        id="prod-desc"
                        rows={4} 
                        placeholder="Product description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full bg-[#F9F9F9] border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 text-sm font-bold placeholder-slate-400 outline-none focus:bg-white focus:border-slate-400 focus:ring-1 focus:ring-slate-300 transition-all resize-none shadow-2xs"
                      />
                    </div>

                    {/* Category selectors */}
                    <div className="border-t border-slate-100 pt-4 flex justify-between items-start">
                      <div className="flex items-start gap-4">
                        <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-500 mt-0.5">
                          <FontAwesomeIcon icon={faBox} className="text-xs" />
                        </div>
                        <div>
                          <p className="text-sm font-black text-slate-900">Category</p>
                          <p className="text-xs font-bold text-slate-400 mt-0.5 capitalize">
                            {getCategoryName(selectedCategory)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        {(['gateaux', 'viennoiseries', 'salades', 'jus'] as const).map((cat) => (
                          <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={clsx(
                              "px-2.5 py-1 rounded-full text-[10px] font-black uppercase transition-all shadow-2xs",
                              selectedCategory === cat 
                                ? "bg-primary text-white" 
                                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                            )}
                          >
                            {cat.substring(0, 3)}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color & Stock options input */}
                    <div className="border-t border-slate-100 pt-4 grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="prod-color" className="block text-xs font-black text-slate-800 mb-1">Color / Variant</label>
                        <input 
                          id="prod-color"
                          type="text"
                          placeholder="Ex: Caramel, Black"
                          value={color}
                          onChange={(e) => setColor(e.target.value)}
                          className="w-full bg-[#F9F9F9] border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs font-bold outline-none"
                        />
                      </div>
                      <div>
                        <label htmlFor="prod-stock" className="block text-xs font-black text-slate-800 mb-1">Stocks Count</label>
                        <input 
                          id="prod-stock"
                          type="number"
                          placeholder="Ex: 145"
                          value={stocks}
                          onChange={(e) => setStocks(e.target.value)}
                          className="w-full bg-[#F9F9F9] border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs font-bold outline-none"
                        />
                      </div>
                    </div>

                    {/* Price */}
                    <div className="border-t border-slate-100 pt-4">
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center gap-4">
                          <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center text-slate-500">
                            <span>💵</span>
                          </div>
                          <span className="text-sm font-black text-slate-900">Price (FCFA)</span>
                        </div>
                      </div>
                      <input 
                        type="number" 
                        placeholder="Ex: 25000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full bg-[#F9F9F9] border border-slate-200 rounded-2xl px-4 py-3 text-slate-900 text-sm font-bold placeholder-slate-400 outline-none focus:bg-white focus:border-slate-400 transition-all shadow-2xs"
                      />
                    </div>
                  </div>

                  {/* Form Footer Action Buttons */}
                  <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 grid grid-cols-2 gap-3 z-30">
                    <button 
                      onClick={() => {
                        setTitle('');
                        setPrice('');
                        setDescription('');
                        setConfirmedMedia([]);
                        setCurrentView('list');
                      }}
                      className="bg-white border border-slate-200 text-slate-800 font-black py-3 rounded-2xl text-sm transition-all hover:bg-slate-50 shadow-sm cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={handleCreateProduct}
                      className="bg-orange-medium hover:bg-orange-dark text-white font-black py-3 rounded-2xl text-sm transition-all shadow-md cursor-pointer"
                    >
                      Add Product
                    </button>
                  </div>
                </div>
              )}

              {/* Additional Mock Screens for other tabs */}
              {currentView === 'list' && activeTab !== 'products' && (
                <div className="absolute inset-0 bg-white z-40 flex flex-col overflow-hidden">
                  <div className="flex justify-between items-center px-6 pt-[calc(env(safe-area-inset-top,16px)+8px)] pb-4 border-b border-slate-100 shrink-0">
                    <h2 className="text-xl font-black text-slate-900 capitalize">{activeTab} View</h2>
                    <button 
                      onClick={() => setActiveTab('products')}
                      className="text-xs bg-slate-100 hover:bg-slate-200 px-3 py-1.5 rounded-full font-bold text-slate-600 transition-colors cursor-pointer"
                    >
                      Retour
                    </button>
                  </div>

                  <div className="flex-grow overflow-y-auto px-6 py-4 pb-8 space-y-6">
                  
                  {activeTab === 'home' && (
                    <div className="py-8 text-center space-y-4">
                      <div className="w-16 h-16 bg-orange-light/20 text-orange-medium rounded-full flex items-center justify-center mx-auto text-3xl">🏠</div>
                      <h3 className="font-extrabold text-slate-900">Bienvenue sur l&apos;administration</h3>
                      <p className="text-xs font-bold text-slate-500 leading-relaxed px-4">
                        Ce panneau de configuration vous permet de piloter la pâtisserie en direct. Utilisez les autres onglets pour voir le catalogue et les commandes.
                      </p>
                      <div className="pt-4 px-4">
                        <Link href="/" className="block w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 rounded-2xl text-xs transition shadow-md">
                          Aller sur le Site Public
                        </Link>
                      </div>
                    </div>
                  )}

                  {activeTab === 'orders' && (
                    <div className="py-6 space-y-4">
                      <h3 className="font-extrabold text-slate-900 text-base">Historique des commandes</h3>
                      <p className="text-xs font-bold text-slate-500">
                        Liste de toutes les commandes validées par les clients du site public.
                      </p>
                      <div className="space-y-3 overflow-y-auto max-h-[350px]">
                        {paidOrders.length === 0 ? (
                          <div className="text-center py-8 text-slate-400">
                            <p className="text-xs font-bold">Aucune commande disponible</p>
                          </div>
                        ) : (
                          paidOrders.map((order) => (
                            <div key={order.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-2.5 text-xs shadow-2xs">
                              <div className="flex justify-between font-extrabold text-slate-800">
                                <span>Commande {order.id}</span>
                                <span className="text-green-600 bg-green-50 border border-green-100 px-2 py-0.5 rounded-full text-[9px] uppercase tracking-wide">
                                  Payé
                                </span>
                              </div>
                              <div className="text-slate-600 font-bold">
                                {order.items?.map((item, idx) => (
                                  <div key={idx} className="flex justify-between font-medium">
                                    <span>{item.quantity}x {item.name}</span>
                                    <span>{(item.price * item.quantity).toLocaleString()} FCFA</span>
                                  </div>
                                ))}
                              </div>
                              <div className="border-t border-slate-100 pt-2 flex justify-between items-center text-[10px] text-slate-400 font-bold">
                                <span>Client: {order.customerName} ({order.customerPhone})</span>
                                <span className="text-slate-900 font-black text-sm">{order.totalAmount.toLocaleString()} FCFA</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'more' && (
                    <div className="py-4 space-y-8 pb-10">
                      
                      {/* Section 1: Nom de l'entreprise */}
                      <div className="space-y-3 bg-slate-50/50 p-4 rounded-3xl border border-slate-100">
                        <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                          <FontAwesomeIcon icon={faBuilding} className="text-primary text-xs" />
                          Nom de l&apos;entreprise
                        </h4>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            value={editCompanyName}
                            onChange={(e) => setEditCompanyName(e.target.value)}
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                          />
                          <button 
                            onClick={() => handleSaveSettings('company')}
                            className="bg-primary text-white hover:bg-primary-dark px-3 py-2 rounded-xl text-xs font-bold transition cursor-pointer"
                          >
                            Sauver
                          </button>
                        </div>
                      </div>

                      {/* Section 2: Info de connexion */}
                      <div className="space-y-3 bg-slate-50/50 p-4 rounded-3xl border border-slate-100">
                        <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                          <FontAwesomeIcon icon={faKey} className="text-primary text-xs" />
                          Infos de connexion admin
                        </h4>
                        <div className="space-y-2">
                          <div>
                            <label htmlFor="edit-adm-name" className="block text-[10px] font-black text-slate-500 uppercase mb-1">Nom complet</label>
                            <input 
                              id="edit-adm-name"
                              type="text" 
                              value={editAdminName}
                              onChange={(e) => setEditAdminName(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                            />
                          </div>
                          <div>
                            <label htmlFor="edit-adm-email" className="block text-[10px] font-black text-slate-500 uppercase mb-1">Adresse Email</label>
                            <input 
                              id="edit-adm-email"
                              type="email" 
                              value={editAdminEmail}
                              onChange={(e) => setEditAdminEmail(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                            />
                          </div>
                          <div>
                            <label htmlFor="edit-adm-pass" className="block text-[10px] font-black text-slate-500 uppercase mb-1">Mot de passe</label>
                            <input 
                              id="edit-adm-pass"
                              type="password" 
                              value={editAdminPassword}
                              onChange={(e) => setEditAdminPassword(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                            />
                          </div>
                          <button 
                            onClick={() => handleSaveSettings('credentials')}
                            className="w-full bg-primary text-white hover:bg-primary-dark py-2.5 rounded-xl text-xs font-bold transition mt-2 cursor-pointer"
                          >
                            Sauvegarder mes identifiants
                          </button>
                        </div>
                      </div>

                      {/* Section 3: Gestion des politiques de l'entreprise */}
                      <div className="space-y-3 bg-slate-50/50 p-4 rounded-3xl border border-slate-100">
                        <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                          <FontAwesomeIcon icon={faFileContract} className="text-primary text-xs" />
                          Politiques de l&apos;entreprise
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <label htmlFor="edit-conf" className="block text-[10px] font-black text-slate-500 uppercase mb-1">Confidentialité</label>
                            <textarea 
                              id="edit-conf"
                              rows={3}
                              value={editConfidentiality}
                              onChange={(e) => setEditConfidentiality(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none resize-none"
                            />
                          </div>
                          <div>
                            <label htmlFor="edit-tos" className="block text-[10px] font-black text-slate-500 uppercase mb-1">CGV (Conditions de Vente)</label>
                            <textarea 
                              id="edit-tos"
                              rows={3}
                              value={editTos}
                              onChange={(e) => setEditTos(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none resize-none"
                            />
                          </div>
                          <div>
                            <label htmlFor="edit-returns" className="block text-[10px] font-black text-slate-500 uppercase mb-1">Politique de retour</label>
                            <textarea 
                              id="edit-returns"
                              rows={3}
                              value={editReturns}
                              onChange={(e) => setEditReturns(e.target.value)}
                              className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none resize-none"
                            />
                          </div>
                          <button 
                            onClick={() => handleSaveSettings('policies')}
                            className="w-full bg-primary text-white hover:bg-primary-dark py-2.5 rounded-xl text-xs font-bold transition cursor-pointer"
                          >
                            Mettre à jour les politiques
                          </button>
                        </div>
                      </div>

                      {/* Section 4: Administrateurs (Super Admin seulement) */}
                      <div className="space-y-4 bg-slate-50/50 p-4 rounded-3xl border border-slate-100">
                        <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                          <FontAwesomeIcon icon={faUserShield} className="text-primary text-xs" />
                          Nommer un autre Administrateur
                        </h4>
                        
                        {adminRole === 'super' ? (
                          <>
                            <form onSubmit={handleAddAdmin} className="space-y-2.5">
                              <div>
                                <label htmlFor="new-adm-name" className="block text-[10px] font-black text-slate-500 uppercase mb-1">Nom du collaborateur</label>
                                <input 
                                  id="new-adm-name"
                                  type="text" 
                                  required
                                  placeholder="Ex: Marc L."
                                  value={newAdminName}
                                  onChange={(e) => setNewAdminName(e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                                />
                              </div>
                              <div>
                                <label htmlFor="new-adm-email" className="block text-[10px] font-black text-slate-500 uppercase mb-1">Email de connexion</label>
                                <input 
                                  id="new-adm-email"
                                  type="email" 
                                  required
                                  placeholder="collaborateur@toppastry.com"
                                  value={newAdminEmail}
                                  onChange={(e) => setNewAdminEmail(e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                                />
                              </div>
                              <div>
                                <label htmlFor="new-adm-pass" className="block text-[10px] font-black text-slate-500 uppercase mb-1">Mot de passe provisoire</label>
                                <input 
                                  id="new-adm-pass"
                                  type="password" 
                                  required
                                  placeholder="Ex: Collabo123"
                                  value={newAdminPassword}
                                  onChange={(e) => setNewAdminPassword(e.target.value)}
                                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                                />
                              </div>
                              <div>
                                <label htmlFor="new-adm-role" className="block text-[10px] font-black text-slate-500 uppercase mb-1">Rôle administratif</label>
                                <select 
                                  id="new-adm-role"
                                  value={newAdminRole}
                                  onChange={(e) => setNewAdminRole(e.target.value as any)}
                                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold outline-none"
                                >
                                  <option value="admin">Administrateur Standard</option>
                                  <option value="super">Super Administrateur</option>
                                </select>
                              </div>
                              <button 
                                type="submit"
                                className="w-full bg-orange-medium hover:bg-orange-dark text-white py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                              >
                                <FontAwesomeIcon icon={faUserPlus} />
                                Nommer cet Administrateur
                              </button>
                            </form>

                            {/* Administrators list directory */}
                            <div className="pt-2">
                              <h5 className="text-[10px] font-black text-slate-500 uppercase mb-2">Administrateurs nommés ({adminsList.length})</h5>
                              <div className="space-y-1.5">
                                {adminsList.map((admin: any, idx: number) => (
                                  <div key={idx} className="flex justify-between items-center bg-white p-2 rounded-xl border border-slate-100 text-xs font-bold text-slate-700">
                                    <span>{admin.name} <span className="text-[10px] text-slate-400 font-medium font-sans">({admin.email})</span></span>
                                    <span className={clsx(
                                      "text-[9px] px-2 py-0.5 rounded-full capitalize",
                                      admin.role === 'super' ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"
                                    )}>
                                      {admin.role === 'super' ? 'Super Admin' : 'Admin'}
                                    </span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-4 rounded-2xl">
                            ⚠️ Seul le **Super Administrateur** est autorisé à nommer de nouveaux administrateurs et gérer les comptes collaborateurs.
                          </div>
                        )}
                      </div>

                      {/* Reset section */}
                      <div className="space-y-3 bg-red-50/50 p-4 rounded-3xl border border-red-100">
                        <h4 className="font-extrabold text-red-700 text-sm">
                          Danger Zone
                        </h4>
                        <button 
                          onClick={() => {
                            if (confirm('Voulez-vous vider toutes les commandes ?')) {
                              localStorage.removeItem('top_pastry_orders');
                              loadOrders();
                            }
                          }}
                          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold p-3 rounded-xl text-center text-xs transition shadow-sm cursor-pointer"
                        >
                          Supprimer toutes les commandes
                        </button>
                      </div>

                    </div>
                  )}
                  </div>
                </div>
              )}
            </div>

            {/* BOTTOM NAVIGATION TAB BAR */}
            {currentView === 'list' && (
              <div className="h-16 bg-white border-t border-slate-100 flex items-center justify-between px-4 z-40 shrink-0 relative">
                
                <button 
                  onClick={() => setActiveTab('home')}
                  className={clsx(
                    "flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors",
                    activeTab === 'home' ? "text-orange-medium" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <FontAwesomeIcon icon={faHome} className="text-base" />
                  <span className="text-[9px] font-bold">Home</span>
                </button>

                <button 
                  onClick={() => setActiveTab('orders')}
                  className={clsx(
                    "flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors",
                    activeTab === 'orders' ? "text-orange-medium" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <FontAwesomeIcon icon={faClipboardList} className="text-base" />
                  <span className="text-[9px] font-bold">Orders</span>
                </button>

                <div className="flex-1 flex justify-center -mt-6 select-none relative z-50">
                  <button 
                    onClick={() => setCurrentView('create')}
                    className="w-12 h-12 bg-orange-medium text-white rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer border-4 border-white"
                  >
                    <FontAwesomeIcon icon={faPlus} className="text-base" />
                  </button>
                </div>

                <button 
                  onClick={() => setActiveTab('products')}
                  className={clsx(
                    "flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors",
                    activeTab === 'products' ? "text-orange-medium" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <FontAwesomeIcon icon={faBox} className="text-base" />
                  <span className="text-[9px] font-bold">Products</span>
                </button>

                <button 
                  onClick={() => setActiveTab('more')}
                  className={clsx(
                    "flex-1 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors",
                    activeTab === 'more' ? "text-orange-medium" : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  <FontAwesomeIcon icon={faEllipsisH} className="text-base" />
                  <span className="text-[9px] font-bold">More</span>
                </button>
              </div>
            )}

            {/* SCREEN 3: MEDIA LIBRARY DRAWER MODAL SHEET (Sliding Over screen) */}
            {isMediaModalOpen && (
              <div className="absolute inset-0 bg-black/60 z-50 flex flex-col justify-end">
                <div className="flex-grow cursor-pointer" onClick={() => setIsMediaModalOpen(false)} />
                <div className="bg-white rounded-t-[32px] p-5 flex flex-col max-h-[90%] shadow-2xl relative">
                  <div className="w-10 h-1 bg-slate-200 rounded-full mx-auto mb-4" />
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-black text-slate-900">Add Media</h3>
                    <button 
                      onClick={() => setIsMediaModalOpen(false)}
                      className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors cursor-pointer"
                    >
                      <FontAwesomeIcon icon={faTimes} className="text-slate-800 text-sm" />
                    </button>
                  </div>

                  <div className="flex bg-[#F5F5F5] rounded-xl p-1 gap-1 mb-5">
                    <button 
                      onClick={() => setMediaTab('library')}
                      className={clsx(
                        "flex-1 py-2 text-xs font-black rounded-lg transition-all cursor-pointer",
                        mediaTab === 'library' ? "bg-[#1E192D] text-white" : "text-slate-500 hover:text-slate-800"
                      )}
                    >
                      Content Library
                    </button>
                    <button 
                      onClick={() => setMediaTab('upload')}
                      className={clsx(
                        "flex-1 py-2 text-xs font-black rounded-lg transition-all cursor-pointer",
                        mediaTab === 'upload' ? "bg-[#1E192D] text-white" : "text-slate-500 hover:text-slate-800"
                      )}
                    >
                      Upload New
                    </button>
                  </div>

                  {mediaTab === 'library' && (
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-black text-slate-800">
                        Selected <span className="text-blue-600 font-black">{tempSelectedMedia.length}</span>
                      </span>
                      <button 
                        onClick={() => setTempSelectedMedia([])}
                        className="text-xs font-black text-slate-500 hover:text-slate-900 underline underline-offset-2 cursor-pointer"
                      >
                        Unselect all
                      </button>
                    </div>
                  )}

                  {mediaTab === 'library' ? (
                    <div className="grid grid-cols-3 gap-3 overflow-y-auto max-h-[220px] mb-5 pr-1 py-1">
                      {MEDIA_LIBRARY.map((imageUrl, idx) => {
                        const isSelected = tempSelectedMedia.includes(imageUrl);
                        return (
                          <div 
                            key={idx}
                            role="button"
                            tabIndex={0}
                            onClick={() => {
                              if (isSelected) {
                                setTempSelectedMedia(tempSelectedMedia.filter(url => url !== imageUrl));
                              } else {
                                setTempSelectedMedia([...tempSelectedMedia, imageUrl]);
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                if (isSelected) {
                                  setTempSelectedMedia(tempSelectedMedia.filter(url => url !== imageUrl));
                                } else {
                                  setTempSelectedMedia([...tempSelectedMedia, imageUrl]);
                                }
                              }
                            }}
                            className={clsx(
                              "relative aspect-square rounded-[18px] overflow-hidden cursor-pointer select-none transition-all shadow-2xs border-2",
                              isSelected ? "border-blue-600" : "border-transparent"
                            )}
                          >
                            <Image src={imageUrl} alt={`Gallery selection image ${idx}`} fill className="object-cover" />
                            {isSelected && (
                              <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-md">
                                <FontAwesomeIcon icon={faCheck} className="text-[9px] text-white" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="py-4 space-y-4 mb-5">
                      <div>
                        <label htmlFor="cust-url" className="block text-xs font-black text-slate-800 mb-2">Image URL</label>
                        <input 
                          id="cust-url"
                          type="text"
                          placeholder="https://example.com/ma-patisserie.jpg"
                          value={customUploadUrl}
                          onChange={(e) => setCustomUploadUrl(e.target.value)}
                          className="w-full bg-[#F9F9F9] border border-slate-200 rounded-xl px-3 py-2 text-slate-900 text-xs font-bold outline-none"
                        />
                      </div>
                      <button
                        onClick={() => {
                          if (customUploadUrl.trim()) {
                            setTempSelectedMedia([...tempSelectedMedia, customUploadUrl]);
                            setConfirmedMedia([...confirmedMedia, customUploadUrl]);
                            setCustomUploadUrl('');
                            setMediaTab('library');
                            alert('Image ajoutée avec succès !');
                          }
                        }}
                        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2.5 rounded-xl text-xs transition"
                      >
                        Valider l&apos;URL
                      </button>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                    <button 
                      onClick={() => setIsMediaModalOpen(false)}
                      className="bg-white border border-slate-200 text-slate-800 font-black py-3 rounded-2xl text-xs transition-all hover:bg-slate-50 cursor-pointer text-center"
                    >
                      Cancel
                    </button>
                    <button 
                      onClick={() => {
                        setConfirmedMedia(tempSelectedMedia);
                        setIsMediaModalOpen(false);
                      }}
                      className="bg-orange-medium hover:bg-orange-dark text-white font-black py-3 rounded-2xl text-xs transition-all shadow-md cursor-pointer text-center"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}