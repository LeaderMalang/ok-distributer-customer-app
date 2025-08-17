/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, FormEvent, useRef, FC, useCallback } from "react";
import ReactDOM from "react-dom/client";
const API_BASE_URL = "http://127.0.0.1:8000";

// --- Toast Notification Component ---
interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast toast-${type}`}>
      <p>{message}</p>
      <button onClick={onClose}>&times;</button>
    </div>
  );
};
// --- Static Data ---
const STATIC_PRODUCTS = [
  {
    id: 1,
    name: "PainAway",
    description: "Fast-acting relief for headaches and muscle pain.",
    price: 9.99,
    imageUrl: "https://picsum.photos/seed/PainAway/400/300",
  },
  {
    id: 2,
    name: "AllergyClear",
    description: "24-hour non-drowsy relief from allergy symptoms.",
    price: 14.5,
    imageUrl: "https://picsum.photos/seed/AllergyClear/400/300",
  },
  {
    id: 3,
    name: "CoughCalm",
    description: "Soothes dry coughs and relieves chest congestion.",
    price: 11.25,
    imageUrl: "https://picsum.photos/seed/CoughCalm/400/300",
  },
  {
    id: 4,
    name: "SleepWell",
    description: "Natural sleep aid to help you fall asleep faster.",
    price: 18.0,
    imageUrl: "https://picsum.photos/seed/SleepWell/400/300",
  },
  {
    id: 5,
    name: "DigestEase",
    description: "Relieves heartburn, indigestion, and upset stomach.",
    price: 7.5,
    imageUrl: "https://picsum.photos/seed/DigestEase/400/300",
  },
  {
    id: 6,
    name: "FlexiJoint",
    description: "Supports joint health and improves mobility.",
    price: 25.0,
    imageUrl: "https://picsum.photos/seed/FlexiJoint/400/300",
  },
  {
    id: 7,
    name: "VitaBoost",
    description: "Daily multivitamin for energy and immune support.",
    price: 21.75,
    imageUrl: "https://picsum.photos/seed/VitaBoost/400/300",
  },
  {
    id: 8,
    name: "ColdSnap",
    description: "Reduces the duration and severity of cold symptoms.",
    price: 13.99,
    imageUrl: "https://picsum.photos/seed/ColdSnap/400/300",
  },
  {
    id: 9,
    name: "FocusMax",
    description: "Enhances mental clarity and cognitive function.",
    price: 29.99,
    imageUrl: "https://picsum.photos/seed/FocusMax/400/300",
  },
  {
    id: 10,
    name: "DermaHeal",
    description: "Cream for treating minor cuts, scrapes, and burns.",
    price: 8.75,
    imageUrl: "https://picsum.photos/seed/DermaHeal/400/300",
  },
  {
    id: 11,
    name: "HeartGuard",
    description: "Helps maintain healthy cholesterol levels.",
    price: 32.5,
    imageUrl: "https://picsum.photos/seed/HeartGuard/400/300",
  },
  {
    id: 12,
    name: "ImmunoShield",
    description: "Echinacea supplement to boost the immune system.",
    price: 15.0,
    imageUrl: "https://picsum.photos/seed/ImmunoShield/400/300",
  },
];

// --- Icon Components ---
const SearchIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

const CartIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
    />
  </svg>
);

const UserIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const CloseIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

// --- Components ---

const BrandHeader = () => (
  <div className="brand-header">
    <img src="icons/app-icon.svg" alt="App Icon" className="app-icon" />
    <h1 className="brand-name">Ok Distributor</h1>
    <p className="tagline">Customer App</p>
  </div>
);

const LoginPage = ({
  onLogin,
  onSwitchToRegister,
  onSwitchToResetPassword,
  onApiError,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/user/auth/login/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: email, password }),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("party", JSON.stringify(data.party));
        onLogin({ name: data.party.name, email });
      } else {
        const errorMessage =
          data.non_field_errors[0] ||
          "Login failed. Please check your credentials.";
        onApiError(errorMessage);
      }
    } catch (error) {
      console.error('Login error:', error.non_field_errors[0]);
      onApiError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
    // const users = JSON.parse(localStorage.getItem("users") || "{}");
    // if (users[email] && users[email].password === password) {
    //   onLogin({ name: users[email].proprietorName, email });
    // } else {
    //   alert("Invalid email or password.");
    // }
  };

  return (
    <div className="auth-container">
      <BrandHeader />
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
        </div>
        <div className="auth-options">
          <button
            type="button"
            className="btn-link"
            onClick={onSwitchToResetPassword}
          >
            Forgot Password?
          </button>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
      <div className="auth-switch">
        Don't have an account?{" "}
        <button onClick={onSwitchToRegister} className="btn-link">
          Register
        </button>
      </div>
    </div>
  );
};

const ResetPasswordPage = ({ onSwitchToLogin, onApiSuccess, onApiError }) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendCode = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // NOTE: This is a placeholder for your actual API endpoint.
      const response = await fetch(
        `${API_BASE_URL}/user/auth/reset-password/request/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        onApiSuccess(
          data.message || "A password reset code has been sent to your email."
        );
        setStep(2);
      } else {
        const errorMessage =
          data.non_field_errors[0] ||
          "Failed to send reset code. Please check the email address.";
        onApiError(errorMessage);
      }

      // MOCK BEHAVIOR
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // if (email) {
      //   onApiSuccess("A password reset code has been sent to your email.");
      //   setStep(2);
      // } else {
      //   onApiError("Please enter a valid email address.");
      // }
    } catch (error) {
      onApiError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      onApiError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      // NOTE: This is a placeholder for your actual API endpoint.
      const response = await fetch(
        `${API_BASE_URL}/user/auth/reset-password/confirm/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            code: code,
            new_password: password,
          }),
        }
      );
      console.log(response);
      if (response.status === 204) {
        onApiSuccess(
          "Password has been reset successfully. Please log in with your new password."
        );
        onSwitchToLogin();
      } else {
        const data = await response.json();
        const errorMessage =
          data.non_field_errors[0] ||
          "Failed to reset password. The code may be invalid or expired.";
        onApiError(errorMessage);
      }

      // MOCK BEHAVIOR
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      // if (code === "123456") {
      //   onApiSuccess(
      //     "Password has been reset successfully. Please log in with your new password."
      //   );
      //   onSwitchToLogin();
      // } else {
      //   onApiError(
      //     "Failed to reset password. The code may be invalid or expired."
      //   );
      // }
    } catch (error) {
      console.error("Reset password error:", error);
      onApiError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <BrandHeader />
      <h2>Reset Password</h2>
      {step === 1 ? (
        <form className="auth-form" onSubmit={handleSendCode}>
          <p className="form-description">
            Enter your email address and we'll send you a code to reset your
            password.
          </p>
          <div className="form-group">
            <label htmlFor="reset-email">Email</label>
            <input
              id="reset-email"
              type="email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-label="Email"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Sending..." : "Send Reset Code"}
          </button>
        </form>
      ) : (
        <form className="auth-form" onSubmit={handleResetPassword}>
          <p className="form-description">
            A reset code has been sent to <strong>{email}</strong>. Please enter
            the code and your new password below.
          </p>
          <div className="form-group">
            <label htmlFor="reset-code">Reset Code</label>
            <input
              id="reset-code"
              type="text"
              className="form-input"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
              aria-label="Reset Code"
            />
          </div>
          <div className="form-group">
            <label htmlFor="new-password">New Password</label>
            <input
              id="new-password"
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              aria-label="New Password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirm-password">Confirm New Password</label>
            <input
              id="confirm-password"
              type="password"
              className="form-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              aria-label="Confirm New Password"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      )}
      <div className="auth-switch">
        Remember your password?{" "}
        <button onClick={onSwitchToLogin} className="btn-link">
          Login
        </button>
      </div>
    </div>
  );
};

const RegisterPage = ({ onSwitchToLogin, onApiSuccess, onApiError }) => {
  const [businessName, setBusinessName] = useState("");
  const [proprietorName, setProprietorName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [drugLicense, setDrugLicense] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [businessImage, setBusinessImage] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBusinessImage(e.target.files[0]);
    }
  };
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("Geolocation is not supported by your browser.");
      return;
    }

    setLocationStatus("Getting location...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude.toString());
        setLongitude(position.coords.longitude.toString());
        setLocationStatus("Location captured successfully!");
      },
      () => {
        setLocationStatus(
          "Unable to retrieve location. Please check browser permissions."
        );
      }
    );
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setLoading(true);
    const formData = new FormData();
    formData.append("name", businessName);
    formData.append("proprietor", proprietorName);
    formData.append("phone", phoneNumber);
    formData.append("email", email);
    formData.append("license_no", drugLicense);
    formData.append("license_expiry", licenseExpiry);
    formData.append("password", password);
    formData.append("address", address);
    formData.append("latitude", parseFloat(latitude).toFixed(6));
    formData.append("longitude", parseFloat(longitude).toFixed(6));
    if (businessImage) {
      formData.append("business_image", businessImage);
    }
    try {
      const response = await fetch(
        "http://127.0.0.1:8000/user/auth/register/",
        {
          method: "POST",
          // headers: {
          //   "Content-Type": "application/json",
          // },
          // body: JSON.stringify({
          //   name: businessName,
          //   proprietor: proprietorName,
          //   phone: phoneNumber,
          //   email: email,
          //   license_no: drugLicense,
          //   license_expiry: licenseExpiry,
          //   password: password,
          //   address: address,
          //   business_image:businessImage
          // }),
          body: formData,
        }
      );
      const data = await response.json();
      if (!response.ok) {
        //const errorData = await response.json();
        // Flatten errors if they are in an object
        const errorMessage = Object.values(data).flat().join("\n");
        onApiError(errorMessage || "Registration failed.");
      } else {
        onApiSuccess(data.message);
      }

      //localStorage.setItem('users', JSON.stringify(users));
      //onRegister({ name: proprietorName, email });
    } catch (error) {
      onApiError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <BrandHeader />
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="business-name">Business Name</label>
          <input
            id="business-name"
            type="text"
            className="form-input"
            value={businessName}
            onChange={(e) => setBusinessName(e.target.value)}
            required
            aria-label="Business Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="proprietor-name">Owner Name</label>
          <input
            id="proprietor-name"
            type="text"
            className="form-input"
            value={proprietorName}
            onChange={(e) => setProprietorName(e.target.value)}
            required
            aria-label="Proprietor Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone-number">Phone Number</label>
          <input
            id="phone-number"
            type="tel"
            className="form-input"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            aria-label="Phone Number"
          />
        </div>
        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            className="form-input"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            aria-label="Address"
          />
        </div>
        <div className="form-group">
          <label>Business Location</label>
          <div className="location-group">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleGetLocation}
            >
              Get Current Location
            </button>
            <p className="location-status">{locationStatus}</p>
          </div>
          <div className="location-coords">
            <div className="form-group">
              <label htmlFor="latitude">Latitude</label>
              <input
                id="latitude"
                type="text"
                className="form-input"
                value={latitude}
                readOnly
                aria-label="Latitude"
                placeholder="Latitude"
              />
            </div>
            <div className="form-group">
              <label htmlFor="longitude">Longitude</label>
              <input
                id="longitude"
                type="text"
                className="form-input"
                value={longitude}
                readOnly
                aria-label="Longitude"
                placeholder="Longitude"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="business-image">Business Image</label>
          <input
            id="business-image"
            type="file"
            className="form-input"
            accept="image/*"
            onChange={handleImageChange}
            aria-label="Business Image"
          />
        </div>
        <div className="form-group">
          <label htmlFor="drug-license">Drug License No.</label>
          <input
            id="drug-license"
            type="text"
            className="form-input"
            value={drugLicense}
            onChange={(e) => setDrugLicense(e.target.value)}
            required
            aria-label="Drug License No."
          />
        </div>
        <div className="form-group">
          <label htmlFor="license-expiry">License Expiry</label>
          <input
            id="license-expiry"
            type="date"
            className="form-input"
            value={licenseExpiry}
            onChange={(e) => setLicenseExpiry(e.target.value)}
            required
            aria-label="License Expiry"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="Email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            aria-label="Password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
      <div className="auth-switch">
        Already have an account?{" "}
        <button onClick={onSwitchToLogin} className="btn-link">
          Login
        </button>
      </div>
    </div>
  );
};

const UserMenu = ({ user, onLogout, onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-secondary user-menu-button"
      >
        <UserIcon />
        <span className="btn-text">{user.name}</span>
      </button>
      {isOpen && (
        <div className="user-menu-dropdown">
          <button
            onClick={() => {
              onNavigate("profile");
              setIsOpen(false);
            }}
          >
            My Profile
          </button>
          <button
            onClick={() => {
              onNavigate("orders");
              setIsOpen(false);
            }}
          >
            My Orders
          </button>
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, onAddToCart, onShowToast }) => {
  const [quantity, setQuantity] = useState(1);
  const [bidPrice, setBidPrice] = useState(product.price.toFixed(2));

  const handleAddToCart = () => {
    const bid = parseFloat(bidPrice);
    if (quantity > 0 && bid > 0) {
      onAddToCart(product, quantity, bid);
      onShowToast(`${quantity} of ${product.name} added to cart!`, "success");
    } else {
      onShowToast("Please enter a valid quantity and bid price.", "error");
    }
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} />
      <div className="product-card-content">
        <h3>{product.name}</h3>
        <p className="product-price">
          Standard Price: {product.price.toFixed(2)} RS
        </p>
        <p>{product.description}</p>
        <div className="product-actions">
          <div className="form-group">
            <label htmlFor={`quantity-${product.id}`}>Quantity</label>
            <input
              id={`quantity-${product.id}`}
              type="number"
              className="form-input"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
              min="1"
              aria-label="Quantity"
            />
          </div>
          <div className="form-group">
            <label htmlFor={`bid-${product.id}`}>Your Bid (RS)</label>
            <input
              id={`bid-${product.id}`}
              type="number"
              className="form-input"
              value={bidPrice}
              onChange={(e) => setBidPrice(e.target.value)}
              min="0.01"
              step="0.01"
              aria-label="Bid Price"
            />
          </div>
          <button className="btn btn-primary" onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const CatalogPage = ({
  user,
  onLogout,
  cartItemCount,
  onNavigate,
  onAddToCart,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);
  const mobileSearchInputRef = useRef<HTMLInputElement>(null);

  const fetchProducts = useCallback(
    async (isNewSearch = false) => {
      let url;
      if (isNewSearch) {
        const params = new URLSearchParams({ limit: "8" });
        if (searchQuery) {
          params.append("q", searchQuery);
        }
        url = `${API_BASE_URL}/inventory/products/?${params.toString()}`;
      } else {
        url = nextUrl;
      }

      if (!url || isLoading) return;
      setIsLoading(true);

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        const transformedProducts = data.results.map((p) => ({
          id: p.id,
          name: p.name,
          description:
            p.description || `Stock: ${p.stock} | Barcode: ${p.barcode}`,
          price: parseFloat(p.retailPrice),
          imageUrl:
            p.image_1 && !p.image_1.startsWith("http")
              ? `${API_BASE_URL}${p.image_1}`
              : p.image_1 || `https://picsum.photos/seed/${p.id}/400/300`, // Fallback image
        }));

        setProducts((prev) =>
          isNewSearch ? transformedProducts : [...prev, ...transformedProducts]
        );
        setNextUrl(data.next);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Optionally, set an error state to show a message to the user
      } finally {
        setIsLoading(false);
      }
    },
    [searchQuery, nextUrl, isLoading]
  );

  // Effect for handling search with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchProducts(true);
    }, 300); // 300ms debounce
    return () => clearTimeout(handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const loadMoreProducts = useCallback(() => {
    if (!isLoading && nextUrl) {
      fetchProducts(false);
    }
  }, [isLoading, nextUrl, fetchProducts]);

  // Effect for infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 150
      ) {
        loadMoreProducts();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMoreProducts]);

  useEffect(() => {
    if (isMobileSearchActive) {
      mobileSearchInputRef.current?.focus();
    }
  }, [isMobileSearchActive]);

  const hasMore = nextUrl !== null;

  return (
    <div className="catalog-container">
      <header className="catalog-header">
        {isMobileSearchActive ? (
          <div className="mobile-search-wrapper">
            <input
              ref={mobileSearchInputRef}
              type="search"
              placeholder="Search products..."
              className="form-input search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onBlur={() => setIsMobileSearchActive(false)}
              aria-label="Search products"
            />
            <button
              className="btn-icon search-close"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setIsMobileSearchActive(false)}
              aria-label="Close search"
            >
              <CloseIcon />
            </button>
          </div>
        ) : (
          <>
            <h1>Welcome!</h1>
            <div className="search-container">
              <input
                type="search"
                placeholder="Search products..."
                className="form-input search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search products"
              />
            </div>
            <div className="header-actions">
              <button
                className="btn-icon search-toggle"
                onClick={() => setIsMobileSearchActive(true)}
                aria-label="Open search"
              >
                <SearchIcon />
              </button>
              <button
                onClick={() => onNavigate("cart")}
                className="btn btn-secondary cart-button"
                aria-label={`Cart with ${cartItemCount} items`}
              >
                <CartIcon />
                {cartItemCount > 0 && (
                  <span className="cart-badge">{cartItemCount}</span>
                )}
              </button>
              <UserMenu
                user={user}
                onLogout={onLogout}
                onNavigate={onNavigate}
              />
            </div>
          </>
        )}
      </header>
      <main>
        {products.length > 0 && (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onShowToast={onShowToast}
              />
            ))}
          </div>
        )}
        {isLoading && <div className="loader">Loading...</div>}
        {!isLoading && products.length === 0 && (
          <p className="empty-catalog-message">
            {searchQuery
              ? `No products found for "${searchQuery}".`
              : "No products available."}
          </p>
        )}
        {!isLoading && !hasMore && products.length > 0 && (
          <p className="end-of-results-message">
            You've reached the end of the list.
          </p>
        )}
      </main>
    </div>
  );
};

const CartPage = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onPlaceOrder,
  onNavigateToCatalog,
}) => {
  const [deliveryAddress, setDeliveryAddress] = useState("");

  const calculateTotal = () => {
    return cart
      .reduce((total, item) => total + item.bidPrice * item.quantity, 0)
      .toFixed(2);
  };

  const handlePlaceOrder = (e: FormEvent) => {
    e.preventDefault();
    if (!deliveryAddress.trim()) {
      alert("Please enter a delivery address.");
      return;
    }
    onPlaceOrder(deliveryAddress);
  };

  return (
    <div className="page-container">
      <header className="catalog-header">
        <h1>Your Cart</h1>
        <button onClick={onNavigateToCatalog} className="btn btn-secondary">
          &larr; Back to Catalog
        </button>
      </header>
      <main>
        {cart.length === 0 ? (
          <p className="empty-cart-message">Your cart is empty.</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={`${item.id}-${item.bidPrice}`} className="cart-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="cart-item-details">
                    <h3>{item.name}</h3>
                    <p className="cart-item-bid-price">
                      Your Bid: {Number(item.bidPrice).toFixed(2)} Rs
                    </p>
                    <p className="cart-item-standard-price">
                      Standard: {item.price.toFixed(2)} Rs
                    </p>
                  </div>
                  <div className="cart-item-actions">
                    <label htmlFor={`cart-quantity-${item.id}`}>Qty:</label>
                    <input
                      id={`cart-quantity-${item.id}`}
                      type="number"
                      value={item.quantity}
                      onChange={(e) =>
                        onUpdateQuantity(
                          item.id,
                          item.bidPrice,
                          Math.max(1, Number(e.target.value))
                        )
                      }
                      min="1"
                      className="form-input"
                    />
                    <button
                      onClick={() => onRemoveItem(item.id, item.bidPrice)}
                      className="btn-remove"
                    >
                      Remove
                    </button>
                  </div>
                  <div className="cart-item-subtotal">
                    {(item.bidPrice * item.quantity).toFixed(2)} Rs
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <h2>Order Summary</h2>
              <div className="summary-total">
                <span>Total Bid Value</span>
                <span>{calculateTotal()} Rs</span>
              </div>
              <form className="checkout-form" onSubmit={handlePlaceOrder}>
                <div className="form-group">
                  <label htmlFor="delivery-address">Delivery Address</label>
                  <input
                    id="delivery-address"
                    type="text"
                    className="form-input"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your full delivery address"
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Place Order
                </button>
              </form>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

const ProfilePage = ({
  user,
  onNavigateToCatalog,
  onUpdateProfile,
  onApiError,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  // 'profileData' holds the original, unmodified data from the server
  const [profileData, setProfileData] = useState(null);
  // 'formData' holds the data for the form fields while editing
  const [formData, setFormData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);
  const [newBusinessImage, setNewBusinessImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(`${API_BASE_URL}/user/me/me/`, {
          headers: { Authorization: `Token ${token}` },
        });

        const data = await response.json();
        console.log(data);
        if (!response.ok) {
          throw new Error("Failed to fetch profile data.");
        }
        setProfileData(data.party);
        setFormData(data.party); // Initialize form data with fetched data
        if (data.party.business_image) {
          setImagePreviewUrl(API_BASE_URL + data.party.business_image);
        }
      } catch (err) {
        setError(err.message);
        onApiError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [onApiError]);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    if (file) {
      setNewBusinessImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleCancel = () => {
    setFormData(profileData); // Reset changes from original data
    setIsEditing(false);
    // Reset image preview to original
    if (profileData.business_image) {
      setImagePreviewUrl(API_BASE_URL + profileData.business_image);
    } else {
      setImagePreviewUrl("");
    }
    setNewBusinessImage(null);
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const formDataForApi = new FormData();
    // Use the formData state for submission
    Object.entries(formData).forEach(([key, value]) => {
      if (
        value !== null &&
        key !== "business_image" &&
        typeof value !== "object"
      ) {
        formDataForApi.append(key, String(value));
      }
    });

    if (newBusinessImage) {
      formDataForApi.append("business_image", newBusinessImage);
    }

    const token = localStorage.getItem("token");
    try {
      const response = await fetch(`${API_BASE_URL}/user/me/profile/`, {
        method: "POST",
        headers: { Authorization: `Token ${token}` },
        body: formDataForApi,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile.");
      }

      onUpdateProfile(data.party.name);
      // Update both original and form data with the new successful data
      setProfileData(data.party);
      setFormData(data.party);
      if (data.party.business_image) {
        setImagePreviewUrl(API_BASE_URL + data.party.business_image);
      }
      setNewBusinessImage(null);
      setIsEditing(false);
    } catch (err) {
      onApiError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="loader">Loading profile...</div>;
  if (error) return <p className="error-message">Error: {error}</p>;
  if (!formData) return <p>No profile data found.</p>;

  const fields = [
    { id: "name", label: "Business Name", type: "text" },
    { id: "proprietor", label: "Proprietor Name", type: "text" },
    { id: "phone", label: "Phone Number", type: "tel" },
    { id: "address", label: "Address", type: "text" },
    { id: "license_no", label: "Drug License No.", type: "text" },
    { id: "license_expiry", label: "License Expiry", type: "date" },
  ];

  return (
    <div className="page-container">
      <header className="catalog-header">
        <h1>My Profile</h1>
        <button onClick={onNavigateToCatalog} className="btn btn-secondary">
          &larr; Back to Catalog
        </button>
      </header>
      <main>
        <form className="profile-form" onSubmit={handleSave}>
          {/* {isEditing && (
            <div className="profile-image-container form-group">
                <label htmlFor="business_image">Business Image</label>
                {imagePreviewUrl && <img src={imagePreviewUrl} alt="Business Preview" className="profile-image" />}
                <input
                    id="business_image"
                    type="file"
                    className="form-input"
                    accept="image/*"
                    onChange={handleImageChange}
                    aria-label="Business Image"
                />
            </div>
          )} */}
          {/* {!isEditing && imagePreviewUrl && (
             <div className="profile-image-container">
                <img src={imagePreviewUrl} alt="Business" className="profile-image" />
            </div>
          )} */}
          {fields.map((field) => (
            <div className="form-group" key={field.id}>
              <label htmlFor={field.id}>{field.label}</label>
              <input
                id={field.id}
                type={field.type}
                className="form-input"
                value={formData[field.id] || ""}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          ))}
          <div className="profile-actions">
            {isEditing ? (
              <>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSaving}
                >
                  {isSaving ? "Saving..." : "Save Changes"}
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="btn btn-primary"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
};

const OrdersPage = ({ onNavigateToCatalog }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState({
    searchTerm: "",
    status: "",
    startDate: "",
    endDate: "",
  });
  const [activeFilters, setActiveFilters] = useState(filters);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const limit = 10;

  const fetchOrders = useCallback(
    async (isNewSearch = false) => {
      if (isNewSearch) {
        setIsLoading(true);
      } else {
        setIsFetchingMore(true);
      }
      setError(null);
      const token = localStorage.getItem("token");
      const currentOffset = isNewSearch ? 0 : offset;

      const params = new URLSearchParams({
        limit: String(limit),
        offset: String(currentOffset),
      });
      if (activeFilters.searchTerm)
        params.append("searchTerm", activeFilters.searchTerm);
      if (activeFilters.status) params.append("status", activeFilters.status);
      if (activeFilters.startDate)
        params.append("startDate", activeFilters.startDate);
      if (activeFilters.endDate)
        params.append("endDate", activeFilters.endDate);

      try {
        const response = await fetch(
          `${API_BASE_URL}/sales/invoices/?${params.toString()}`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }
        const data = await response.json();
        setOrders((prev) =>
          isNewSearch ? data.results : [...prev, ...data.results]
        );
        setOffset(currentOffset + limit);
        setHasMore(data.next !== null);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
        setIsFetchingMore(false);
      }
    },
    [offset, activeFilters]
  );

  useEffect(() => {
    fetchOrders(true);
  }, [activeFilters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    setActiveFilters(filters);
    setOrders([]);
    setOffset(0);
  };

  return (
    <div className="page-container">
      <header className="catalog-header">
        <h1>My Orders</h1>
        <button onClick={onNavigateToCatalog} className="btn btn-secondary">
          &larr; Back to Catalog
        </button>
      </header>
      <main>
        <form className="orders-filter-bar" onSubmit={handleFilterSubmit}>
          <div className="form-group">
            <input
              name="searchTerm"
              type="search"
              className="form-input"
              placeholder="Search Invoice # or Name"
              value={filters.searchTerm}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <select
              name="status"
              className="form-input"
              value={filters.status}
              onChange={handleFilterChange}
            >
              <option value="">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <div className="form-group">
            <input
              name="startDate"
              type="date"
              className="form-input"
              value={filters.startDate}
              onChange={handleFilterChange}
            />
          </div>
          <div className="form-group">
            <input
              name="endDate"
              type="date"
              className="form-input"
              value={filters.endDate}
              onChange={handleFilterChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Apply
          </button>
        </form>

        {isLoading ? (
          <div className="loader">Loading orders...</div>
        ) : error ? (
          <p className="error-message">Error: {error}</p>
        ) : orders.length === 0 ? (
          <p className="empty-cart-message">
            You have not placed any orders yet.
          </p>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order.id} className="order-card">
                <div
                  className="order-summary"
                  onClick={() =>
                    setExpandedOrderId(
                      expandedOrderId === order.id ? null : order.id
                    )
                  }
                >
                  <div className="order-summary-item">
                    <strong>Order ID:</strong> #{order.invoice_no || order.id}
                  </div>
                  <div className="order-summary-item">
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </div>
                  <div className="order-summary-item">
                    <strong>Total:</strong>{" "}
                    {Number(order.grand_total).toFixed(2)} RS
                  </div>
                  <div className="order-summary-item">
                    <strong>Status:</strong>{" "}
                    <span
                      className={`status-badge status-${order.status?.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <span
                    className={`order-toggle ${
                      expandedOrderId === order.id ? "expanded" : ""
                    }`}
                  >
                    &#9660;
                  </span>
                </div>
                {expandedOrderId === order.id && (
                  <div className="order-details">
                    <p>
                      <strong>Delivery Address:</strong> {order.address}
                    </p>
                    <h4>Items:</h4>
                    <div className="order-items-list">
                      {order.items.map((item) => (
                        <div key={item.id} className="order-item">
                          <div className="order-item-info">
                            <span>
                              <strong>Product ID:</strong> {item.product}
                            </span>
                            <span>
                              <strong>Qty:</strong> {item.quantity}
                            </span>
                          </div>
                          <div className="order-item-price">
                            <span>
                              <strong>Rate:</strong>{" "}
                              {Number(item.rate).toFixed(2)} RS
                            </span>
                            <span>
                              <strong>Bid:</strong>{" "}
                              {Number(item.bid_amount).toFixed(2)} RS
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        {isFetchingMore && <div className="loader">Loading more...</div>}
        {!isLoading && hasMore && !isFetchingMore && (
          <div className="load-more-container">
            <button
              onClick={() => fetchOrders(false)}
              className="btn btn-secondary"
            >
              Load More
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

// --- Main App Component ---

function App() {
  const [page, setPage] = useState("login"); // 'login', 'register', 'resetPassword', 'catalog', 'cart', 'profile', 'orders'
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      setPage("catalog");
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  const addToast = (message, type) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, user]);

  const handleLogin = (loggedInUser) => {
    sessionStorage.setItem("user", JSON.stringify(loggedInUser));
    
    setUser(loggedInUser);
    setPage("catalog");
  };

  const handleRegister = (registeredUser) => {
    //handleLogin(registeredUser);
    console.log("Registered User:", registeredUser);
    addToast(registeredUser, "success");
    setPage("login");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("cart");
    setUser(null);
    setCart([]);
    setPage("login");
  };

  const handleAddToCart = (product, quantity, bidPrice) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id && item.bidPrice === bidPrice
      );
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        return updatedCart;
      }
      return [...prevCart, { ...product, quantity, bidPrice }];
    });
  };

  const handleUpdateCartQuantity = (productId, bidPrice, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId && item.bidPrice === bidPrice
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId, bidPrice) => {
    setCart((prevCart) =>
      prevCart.filter(
        (item) => !(item.id === productId && item.bidPrice === bidPrice)
      )
    );
  };

  const handlePlaceOrder = async (deliveryAddress) => {
    const token = localStorage.getItem("token");
    if (!token || !user) {
      addToast("You must be logged in to place an order.", "error");
      return;
    }
    const party=localStorage.getItem("party");
    // console.log(JSON.parse(party).id);
    // JSON.parse(party);
     const total = cart.reduce(
      (sum, item) => sum + Number(item.bidPrice) * Number(item.quantity),
      0
    );
    setIsSubmitting(true);
    const payload = {
      invoice_no:"INV-" + Date.now(),
      company_invoice_number:null,
      warehouse: 1,
      salesman: 1,
      booking_man_id: 1,
      supplying_man_id: 1,
      delivery_man_id: 1,
      sub_total:total,
      discount:0,
      tax:0,
      net_amount:total,
      grand_total:total,
      total_amount:total,
      paid_amount:0,
      qr_code:"",
      city_id:4,
      area_id:1,
      customer: JSON.parse(party).id,
      date: new Date().toISOString().split("T")[0],
      address: deliveryAddress,
      items: cart.map((item) => ({
        product: item.id,
        batch: null,
        rate: String(item.price),
        bonus:"0",
        packing:10,
        discount1:"0",
        discount2:"0",
        amount: String(item.bidPrice * item.quantity),
        net_amount: String(item.bidPrice * item.quantity),
        quantity: item.quantity,
        bid_amount: String(item.bidPrice),
      })),
      payment_method: "Credit",
      status: "Pending",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/sales/invoices/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
       
      console.log("Order response:", data);
      if (!response.ok) {
        const errorMessage = Object.values(data).flat().join("\n");
        throw new Error(errorMessage || "Failed to place order.");
      }
      addToast("Order placed successfully!", "success");
      setCart([]);
      localStorage.removeItem("cart");
      setPage("orders");
    } catch (error) {
      console.error("Order placement error:", error);
      addToast(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProfile = (newName) => {
    const currentUser = JSON.parse(sessionStorage.getItem("user"));
    const updatedUser = { ...currentUser, name: newName };
    sessionStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    addToast("Profile updated successfully!", "success");
  };

  const renderPage = () => {
    switch (page) {
      case "catalog":
        return (
          <>
            <div className="toast-container">
              {toasts.map((toast) => (
                <Toast
                  key={toast.id}
                  {...toast}
                  onClose={() => removeToast(toast.id)}
                />
              ))}
            </div>
            <CatalogPage
              user={user}
              onLogout={handleLogout}
              cartItemCount={cart.reduce(
                (count, item) => count + item.quantity,
                0
              )}
              onNavigate={setPage}
              onAddToCart={handleAddToCart}
              onShowToast={addToast}
            />
          </>
        );
      case "cart":
        return (
          <>
            <div className="toast-container">
              {toasts.map((toast) => (
                <Toast
                  key={toast.id}
                  {...toast}
                  onClose={() => removeToast(toast.id)}
                />
              ))}
            </div>
            <CartPage
              cart={cart}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={handleRemoveFromCart}
              onPlaceOrder={handlePlaceOrder}
              onNavigateToCatalog={() => setPage("catalog")}
            />
          </>
        );
      case "profile":
        return (
          <>
            <div className="toast-container">
              {toasts.map((toast) => (
                <Toast
                  key={toast.id}
                  {...toast}
                  onClose={() => removeToast(toast.id)}
                />
              ))}
            </div>
            <ProfilePage
              user={user}
              onNavigateToCatalog={() => setPage("catalog")}
              onUpdateProfile={handleUpdateProfile}
              onApiError={(msg) => addToast(msg, "error")}
            />
          </>
        );
      case "orders":
        return (
          <>
            <div className="toast-container">
              {toasts.map((toast) => (
                <Toast
                  key={toast.id}
                  {...toast}
                  onClose={() => removeToast(toast.id)}
                />
              ))}
            </div>
            <OrdersPage
              user={user}
              onNavigateToCatalog={() => setPage("catalog")}
            />
          </>
        );
      case "register":
        return (
          <>
            <div className="toast-container">
              {toasts.map((toast) => (
                <Toast
                  key={toast.id}
                  {...toast}
                  onClose={() => removeToast(toast.id)}
                />
              ))}
            </div>
            <RegisterPage
              onSwitchToLogin={() => setPage("login")}
              onApiSuccess={handleRegister}
              onApiError={(msg) => addToast(msg, "error")}
            />
          </>
        );
      case "resetPassword":
        return (
          <>
            <div className="toast-container">
              {toasts.map((toast) => (
                <Toast
                  key={toast.id}
                  {...toast}
                  onClose={() => removeToast(toast.id)}
                />
              ))}
            </div>
            <ResetPasswordPage
              onSwitchToLogin={() => setPage("login")}
              onApiSuccess={(msg) => addToast(msg, "success")}
              onApiError={(msg) => addToast(msg, "error")}
            />
          </>
        );
      case "login":
      default:
        return (
          <>
            <div className="toast-container">
              {toasts.map((toast) => (
                <Toast
                  key={toast.id}
                  {...toast}
                  onClose={() => removeToast(toast.id)}
                />
              ))}
            </div>
            <LoginPage
              onLogin={handleLogin}
              onSwitchToRegister={() => setPage("register")}
              onSwitchToResetPassword={() => setPage("resetPassword")}
              onApiError={(msg) => addToast(msg, "error")}
            />
          </>
        );
    }
  };

  return <>{renderPage()}</>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
