import { useState, useMemo } from "react";
import { Search, MapPin, ChevronDown, ShoppingCart, Plus, Minus, X, Clock, Zap, ChevronRight, Star, Tag } from "lucide-react";

const CATEGORIES = [
  { id: "vegetables", name: "Vegetables & Fruits", emoji: "🥦", bg: "#E8F5E9", count: 120 },
  { id: "dairy", name: "Dairy & Breakfast", emoji: "🥛", bg: "#FFF8E1", count: 85 },
  { id: "snacks", name: "Munchies", emoji: "🍿", bg: "#FBE9E7", count: 200 },
  { id: "beverages", name: "Cold Drinks & Juices", emoji: "🧃", bg: "#E3F2FD", count: 140 },
  { id: "bakery", name: "Bakery & Biscuits", emoji: "🍞", bg: "#F3E5F5", count: 60 },
  { id: "instant", name: "Instant & Frozen", emoji: "🍜", bg: "#E0F7FA", count: 95 },
  { id: "personal", name: "Personal Care", emoji: "🧴", bg: "#FCE4EC", count: 180 },
  { id: "cleaning", name: "Cleaning Essentials", emoji: "🧹", bg: "#E8EAF6", count: 75 },
  { id: "baby", name: "Baby Care", emoji: "🍼", bg: "#FFF3E0", count: 110 },
  { id: "pet", name: "Pet Care", emoji: "🐾", bg: "#F1F8E9", count: 45 },
];

const PRODUCTS = [
  { id: 1, category: "vegetables", name: "Organic Spinach", weight: "250g", price: 29, mrp: 40, img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=200&h=200&fit=crop&auto=format", badge: "Organic", rating: 4.5, off: 28 },
  { id: 2, category: "vegetables", name: "Cherry Tomatoes", weight: "500g", price: 49, mrp: 65, img: "https://images.unsplash.com/photo-1558818498-28c1e002b655?w=200&h=200&fit=crop&auto=format", badge: null, rating: 4.3, off: 25 },
  { id: 3, category: "vegetables", name: "Bananas", weight: "6 pcs", price: 39, mrp: 50, img: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200&h=200&fit=crop&auto=format", badge: "Fresh", rating: 4.7, off: 22 },
  { id: 4, category: "dairy", name: "Amul Full Cream Milk", weight: "1L", price: 68, mrp: 72, img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=200&h=200&fit=crop&auto=format", badge: null, rating: 4.6, off: 6 },
  { id: 5, category: "dairy", name: "Greek Yogurt", weight: "400g", price: 89, mrp: 110, img: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200&h=200&fit=crop&auto=format", badge: "Probiotic", rating: 4.4, off: 19 },
  { id: 6, category: "snacks", name: "Lay's Classic Salted", weight: "73g", price: 20, mrp: 20, img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=200&h=200&fit=crop&auto=format", badge: null, rating: 4.2, off: 0 },
  { id: 7, category: "snacks", name: "Too Yumm! Multigrain", weight: "55g", price: 15, mrp: 20, img: "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=200&h=200&fit=crop&auto=format", badge: "25% OFF", rating: 4.1, off: 25 },
  { id: 8, category: "beverages", name: "Tropicana Orange", weight: "1L", price: 99, mrp: 120, img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=200&h=200&fit=crop&auto=format", badge: "No Sugar", rating: 4.5, off: 18 },
  { id: 9, category: "beverages", name: "Coca-Cola Can", weight: "330ml", price: 40, mrp: 45, img: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?w=200&h=200&fit=crop&auto=format", badge: null, rating: 4.3, off: 11 },
  { id: 10, category: "bakery", name: "Whole Wheat Bread", weight: "400g", price: 45, mrp: 52, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=200&h=200&fit=crop&auto=format", badge: "Fresh Baked", rating: 4.6, off: 13 },
  { id: 11, category: "instant", name: "Maggi 2-Minute Noodles", weight: "70g × 4", price: 56, mrp: 64, img: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=200&h=200&fit=crop&auto=format", badge: null, rating: 4.8, off: 13 },
  { id: 12, category: "personal", name: "Dove Body Wash", weight: "250ml", price: 199, mrp: 250, img: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=200&h=200&fit=crop&auto=format", badge: "Bestseller", rating: 4.5, off: 20 },
];

const DEALS = [
  { id: "d1", title: "Flat 40% OFF", subtitle: "On all dairy products", color: "#FFF8E1", accent: "#F59E0B", img: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=300&h=150&fit=crop&auto=format" },
  { id: "d2", title: "Buy 2 Get 1 FREE", subtitle: "Snacks & munchies", color: "#FBE9E7", accent: "#EF4444", img: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=300&h=150&fit=crop&auto=format" },
  { id: "d3", title: "₹50 OFF on ₹299+", subtitle: "Use code: BLINK50", color: "#E3F2FD", accent: "#3B82F6", img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=150&fit=crop&auto=format" },
  { id: "d4", title: "Fresh Veggies", subtitle: "Starting at ₹19", color: "#E8F5E9", accent: "#22C55E", img: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=300&h=150&fit=crop&auto=format" },
];

type Cart = Record<number, number>;

function ProductCard({ product, cart, onAdd, onRemove }: {
  product: typeof PRODUCTS[0];
  cart: Cart;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  const qty = cart[product.id] || 0;
  return (
    <div className="bg-card rounded-xl p-3 flex flex-col gap-2 border border-border hover:shadow-md transition-shadow duration-200">
      <div className="relative">
        {product.badge && (
          <span className="absolute top-1 left-1 z-10 text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-primary text-primary-foreground">
            {product.badge}
          </span>
        )}
        {product.off > 0 && (
          <span className="absolute top-1 right-1 z-10 text-[10px] font-semibold px-1.5 py-0.5 rounded-md bg-green-100 text-green-700">
            {product.off}% OFF
          </span>
        )}
        <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-50">
          <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
        </div>
      </div>
      <div className="flex flex-col gap-0.5 flex-1">
        <p className="text-[11px] text-muted-foreground">{product.weight}</p>
        <p className="text-sm font-semibold text-foreground leading-tight line-clamp-2">{product.name}</p>
        <div className="flex items-center gap-1 mt-0.5">
          <Star size={10} className="fill-yellow-400 text-yellow-400" />
          <span className="text-[10px] text-muted-foreground">{product.rating}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div>
          <p className="text-sm font-bold text-foreground">₹{product.price}</p>
          {product.mrp > product.price && (
            <p className="text-[10px] text-muted-foreground line-through">₹{product.mrp}</p>
          )}
        </div>
        {qty === 0 ? (
          <button
            onClick={() => onAdd(product.id)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg border-2 border-accent text-accent font-bold text-sm hover:bg-accent hover:text-accent-foreground transition-colors duration-150"
          >
            <Plus size={14} />
            ADD
          </button>
        ) : (
          <div className="flex items-center gap-1 bg-accent rounded-lg overflow-hidden">
            <button onClick={() => onRemove(product.id)} className="px-2 py-1.5 text-accent-foreground hover:bg-green-700 transition-colors">
              <Minus size={14} />
            </button>
            <span className="text-accent-foreground font-bold text-sm min-w-[20px] text-center">{qty}</span>
            <button onClick={() => onAdd(product.id)} className="px-2 py-1.5 text-accent-foreground hover:bg-green-700 transition-colors">
              <Plus size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function CartSidebar({ cart, onAdd, onRemove, onClose }: {
  cart: Cart;
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  onClose: () => void;
}) {
  const cartItems = PRODUCTS.filter(p => (cart[p.id] || 0) > 0);
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * cart[p.id], 0);
  const deliveryFee = subtotal > 199 ? 0 : 25;
  const savings = cartItems.reduce((sum, p) => sum + (p.mrp - p.price) * cart[p.id], 0);

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1 bg-black/40" onClick={onClose} />
      <div className="w-[360px] bg-background flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-primary px-4 py-3 flex items-center justify-between">
          <div>
            <p className="font-bold text-primary-foreground text-base">Your Cart</p>
            <div className="flex items-center gap-1 text-primary-foreground/80 text-xs">
              <Clock size={11} />
              <span>Delivery in 10 mins</span>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-black/10 rounded-full transition-colors">
            <X size={20} className="text-primary-foreground" />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-4 p-8 text-center">
            <div className="text-6xl">🛒</div>
            <p className="font-bold text-foreground text-lg">Your cart is empty</p>
            <p className="text-muted-foreground text-sm">Add items to get started</p>
            <button onClick={onClose} className="px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-lg text-sm hover:bg-yellow-400 transition-colors">
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Savings banner */}
            {savings > 0 && (
              <div className="mx-3 mt-3 px-3 py-2 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
                <Tag size={14} className="text-accent" />
                <p className="text-xs font-semibold text-accent">You save ₹{savings} on this order!</p>
              </div>
            )}

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-3 py-3 space-y-3 scrollbar-hide">
              {cartItems.map(product => (
                <div key={product.id} className="flex items-center gap-3 bg-card rounded-xl p-2.5 border border-border">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-50 flex-shrink-0">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground leading-tight">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{product.weight}</p>
                    <p className="text-sm font-bold text-foreground mt-0.5">₹{product.price * cart[product.id]}</p>
                  </div>
                  <div className="flex items-center gap-1 bg-accent rounded-lg flex-shrink-0">
                    <button onClick={() => onRemove(product.id)} className="px-2 py-1.5 text-accent-foreground hover:bg-green-700 transition-colors rounded-l-lg">
                      <Minus size={13} />
                    </button>
                    <span className="text-accent-foreground font-bold text-sm min-w-[18px] text-center">{cart[product.id]}</span>
                    <button onClick={() => onAdd(product.id)} className="px-2 py-1.5 text-accent-foreground hover:bg-green-700 transition-colors rounded-r-lg">
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bill */}
            <div className="border-t border-border mx-3 pt-3 space-y-1.5 pb-2">
              <p className="font-bold text-sm text-foreground">Bill Details</p>
              <div className="flex justify-between text-sm text-foreground">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery fee</span>
                <span className={deliveryFee === 0 ? "text-accent font-semibold" : "text-foreground"}>
                  {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
              </div>
              {deliveryFee > 0 && (
                <p className="text-[11px] text-muted-foreground">Add ₹{199 - subtotal} more for free delivery</p>
              )}
              <div className="flex justify-between font-bold text-foreground border-t border-border pt-2 mt-2">
                <span>Total</span>
                <span>₹{subtotal + deliveryFee}</span>
              </div>
            </div>

            <div className="px-3 pb-4">
              <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-xl text-base hover:bg-yellow-400 transition-colors flex items-center justify-between px-5">
                <span>{Object.values(cart).reduce((a, b) => a + b, 0)} items</span>
                <span>Proceed to Pay ₹{subtotal + deliveryFee}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [cart, setCart] = useState<Cart>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const addToCart = (id: number) => setCart(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  const removeFromCart = (id: number) => setCart(prev => {
    const next = { ...prev };
    if (next[id] <= 1) delete next[id];
    else next[id]--;
    return next;
  });

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartTotal = PRODUCTS.filter(p => cart[p.id]).reduce((sum, p) => sum + p.price * cart[p.id], 0);

  const displayedProducts = useMemo(() => {
    let list = PRODUCTS;
    if (activeCategory) list = list.filter(p => p.category === activeCategory);
    if (searchQuery) list = list.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return list;
  }, [activeCategory, searchQuery]);

  const activeCategoryName = activeCategory ? CATEGORIES.find(c => c.id === activeCategory)?.name : null;

  return (
    <div className="min-h-screen bg-background" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-primary shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-2.5 flex items-center gap-3">
          {/* Logo */}
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <Zap size={18} className="text-primary fill-primary" />
            </div>
            <span className="font-extrabold text-xl text-primary-foreground tracking-tight">blinkit</span>
          </div>

          {/* Location */}
          <button className="hidden sm:flex items-center gap-1 text-primary-foreground/90 text-sm border-r border-black/20 pr-3 mr-1 hover:text-primary-foreground transition-colors max-w-[160px]">
            <MapPin size={14} className="flex-shrink-0" />
            <span className="font-semibold truncate">Koramangala, Bengaluru</span>
            <ChevronDown size={13} className="flex-shrink-0" />
          </button>

          {/* Search */}
          <div className="flex-1 relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder='Search "eggs"'
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-black/20 font-normal"
            />
          </div>

          {/* Cart */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex-shrink-0 flex items-center gap-2 bg-black text-white px-3 py-2 rounded-lg text-sm font-bold hover:bg-gray-800 transition-colors relative"
          >
            <ShoppingCart size={16} />
            {cartCount > 0 ? (
              <span>{cartCount} item{cartCount > 1 ? "s" : ""} · ₹{cartTotal}</span>
            ) : (
              <span className="hidden sm:inline">My Cart</span>
            )}
          </button>
        </div>

        {/* Delivery badge */}
        <div className="bg-black/10 border-t border-black/10">
          <div className="max-w-5xl mx-auto px-4 py-1.5 flex items-center gap-2">
            <Zap size={13} className="text-primary-foreground fill-primary-foreground" />
            <span className="text-xs font-bold text-primary-foreground">Delivery in 10 minutes</span>
            <span className="text-xs text-primary-foreground/70">· Free delivery above ₹199</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6">
        {/* Hero Banner */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-yellow-300 to-yellow-400 mb-6 h-36 md:h-48">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop&auto=format"
            alt="Fresh groceries"
            className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-30"
          />
          <div className="relative z-10 p-6 flex flex-col justify-center h-full">
            <p className="text-xs font-bold uppercase tracking-widest text-black/60 mb-1">Limited time offer</p>
            <h1 className="text-2xl md:text-3xl font-extrabold text-black leading-tight">Get 40% OFF<br />your first order</h1>
            <button className="mt-3 self-start px-5 py-2 bg-black text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-colors">
              Shop now →
            </button>
          </div>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-8xl opacity-40 select-none hidden md:block">🛒</div>
        </div>

        {/* Flash Deals */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Zap size={18} className="text-primary fill-primary" />
              <h2 className="font-extrabold text-lg text-foreground">Flash Deals</h2>
            </div>
            <button className="text-accent text-sm font-semibold flex items-center gap-0.5 hover:underline">
              See all <ChevronRight size={15} />
            </button>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide -mx-4 px-4">
            {DEALS.map(deal => (
              <div
                key={deal.id}
                className="flex-shrink-0 w-64 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                style={{ backgroundColor: deal.color }}
              >
                <div className="relative h-28">
                  <img src={deal.img} alt={deal.title} className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <p className="font-extrabold text-base text-gray-900 leading-tight">{deal.title}</p>
                    <p className="text-xs text-gray-700 font-medium">{deal.subtitle}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories */}
        <section className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-lg text-foreground">Shop by Category</h2>
            {activeCategory && (
              <button
                onClick={() => setActiveCategory(null)}
                className="text-sm text-accent font-semibold flex items-center gap-1 hover:underline"
              >
                <X size={13} /> Clear
              </button>
            )}
          </div>
          <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(prev => prev === cat.id ? null : cat.id)}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-xl transition-all duration-150 border-2 ${
                  activeCategory === cat.id
                    ? "border-accent shadow-md scale-95"
                    : "border-transparent hover:border-border hover:shadow-sm"
                }`}
                style={{ backgroundColor: cat.bg }}
              >
                <span className="text-2xl">{cat.emoji}</span>
                <span className="text-[9px] sm:text-[10px] font-semibold text-gray-700 text-center leading-tight line-clamp-2">{cat.name}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Products */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-extrabold text-lg text-foreground">
              {searchQuery
                ? `Results for "${searchQuery}"`
                : activeCategoryName
                  ? activeCategoryName
                  : "Best Sellers"}
            </h2>
            <span className="text-xs text-muted-foreground">{displayedProducts.length} items</span>
          </div>

          {displayedProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-bold text-foreground text-lg">No products found</p>
              <p className="text-muted-foreground text-sm mt-1">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {displayedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  cart={cart}
                  onAdd={addToCart}
                  onRemove={removeFromCart}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Floating cart button (mobile) */}
      {cartCount > 0 && !isCartOpen && (
        <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
          <button
            onClick={() => setIsCartOpen(true)}
            className="w-full flex items-center justify-between bg-accent text-accent-foreground px-5 py-3.5 rounded-xl shadow-lg font-bold text-sm"
          >
            <div className="flex items-center gap-2">
              <ShoppingCart size={18} />
              <span>{cartCount} item{cartCount > 1 ? "s" : ""}</span>
            </div>
            <span>₹{cartTotal} · View Cart →</span>
          </button>
        </div>
      )}

      {/* Cart Sidebar */}
      {isCartOpen && (
        <CartSidebar
          cart={cart}
          onAdd={addToCart}
          onRemove={removeFromCart}
          onClose={() => setIsCartOpen(false)}
        />
      )}
    </div>
  );
}
