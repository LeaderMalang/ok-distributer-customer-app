/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { useState, useEffect, FormEvent, useRef, FC, useCallback } from "react";
import ReactDOM from "react-dom/client";
import { createPortal } from "react-dom";
const API_BASE_URL = "https://erp.okdtts.com";

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

// --- Install Prompt Component ---
const InstallPrompt = ({ onInstall, onDismiss }) => {
  return (
    <div className="install-prompt">
      <p>Install the app for a better experience!</p>
      <div className="install-prompt-actions">
        <button onClick={onInstall} className="btn btn-primary">
          Install
        </button>
        <button onClick={onDismiss} className="btn-icon">
          <CloseIcon width="16" height="16" />
        </button>
      </div>
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

const InstagramIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const XIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 6 6 18"></path>
    <path d="m6 6 12 12"></path>
  </svg>
);

const LinkedInIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const FacebookIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const TikTokIcon = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 12a4 4 0 1 0 4 4V4a2 2 0 1 0-4 0v12a4 4 0 0 0-4-4H4a2 2 0 1 1 0-4h4a2 2 0 1 1 0 4h4a2 2 0 1 1 0-4h4" />
  </svg>
);

// --- Components ---
const PaymentModal = ({ order, onClose, onApiSuccess, onApiError }) => {
  // FIX: Use a string for amount state to correctly handle controlled input behavior.
  const remainingAmount = parseFloat(
    (parseFloat(order.total_amount) - parseFloat(order.paid_amount)).toFixed(2)
  );
  const [amount, setAmount] = useState(String(remainingAmount));
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalContentRef = useRef<HTMLDivElement>(null);
  const [modalRoot, setModalRoot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // This ensures the portal root element exists in the DOM before we try to use it.
    // The lookup is done once when the component mounts.
    setModalRoot(document.getElementById("modal-root"));
  }, []);

  // Effect for improved modal UX: close on escape, close on outside click, prevent body scroll
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose(false);
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalContentRef.current &&
        !modalContentRef.current.contains(event.target as Node)
      ) {
        onClose(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);
    document.body.style.overflow = "hidden"; // Prevent background scrolling

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "unset"; // Restore scrolling
    };
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      onApiError("Please enter a valid amount.");
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem("token");
    const payload = {
      date: new Date().toISOString().split("T")[0],
      amount: numericAmount,
      description: description,
    };

    try {
      const response = await fetch(
        `${API_BASE_URL}/sales/sale-invoices/${order.sale_invoice}/pay/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        const errorMessage =
          Object.values(data).flat().join("\n") || "Payment failed.";
        throw new Error(errorMessage);
      }

      onApiSuccess("Payment submitted successfully!");
      onClose(true); // Pass true to indicate success and trigger refetch
    } catch (error) {
      onApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  // If the modal root isn't found in the DOM yet, don't render the portal.
  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal-content" ref={modalContentRef}>
        <h2>Record Payment for Order #{order.order_no || order.id}</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="payment-amount">Amount</label>
            <input
              id="payment-amount"
              type="number"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              step="0.01"
            />
          </div>
          <div className="form-group">
            <label htmlFor="payment-description">Description</label>
            <textarea
              id="payment-description"
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional: Add a note..."
              rows="3"
            />
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onClose(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Payment"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    modalRoot
  );
};

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
  const [isSalesLogin, setIsSalesLogin] = useState(false);

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
      //console.log(data);
      if (response.ok) {
        localStorage.setItem("token", data.token);
        if (data.employee && (data.role === "SALES" || isSalesLogin)) {
          localStorage.setItem("employee", JSON.stringify(data.employee));
          onLogin(
            { name: data.employee.name, email: data.employee.email || email },
            "sales"
          );
        } else if (data.party) {
          localStorage.setItem("party", JSON.stringify(data.party));
          onLogin({ name: data.party.name, email }, "customer");
        } else {
          onApiError(
            "Login successful, but user role could not be determined."
          );
        }
      } else {
        const errorMessage =
          data.non_field_errors?.[0] ||
          "Login failed. Please check your credentials.";
        onApiError(errorMessage);
      }
    } catch (error) {
      console.error("Login error:", error);
      onApiError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <BrandHeader />
      <div className="login-toggle">
        <button
          className={!isSalesLogin ? "active" : ""}
          onClick={() => setIsSalesLogin(false)}
          aria-pressed={!isSalesLogin}
        >
          Customer Login
        </button>
        <button
          className={isSalesLogin ? "active" : ""}
          onClick={() => setIsSalesLogin(true)}
          aria-pressed={isSalesLogin}
        >
          Sales Rep Login
        </button>
      </div>
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
      {!isSalesLogin && (
        <div className="auth-switch">
          Don't have an account?{" "}
          <button onClick={onSwitchToRegister} className="btn-link">
            Register
          </button>
        </div>
      )}
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
      //console.log(response);
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
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBusinessImage(e.target.files[0]);
    }
  };

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, ""); // Remove non-digits
    let formattedNumber = input.substring(0, 11); // Limit to 11 digits

    if (formattedNumber.length > 4) {
      formattedNumber = `${formattedNumber.slice(0, 4)}-${formattedNumber.slice(
        4
      )}`;
    }
    setPhoneNumber(formattedNumber);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !businessName ||
      !proprietorName ||
      !phoneNumber ||
      !address ||
      !drugLicense ||
      !licenseExpiry ||
      !email ||
      !password ||
      !businessImage
      
    ) {
      onApiError("All fields are required. Please fill out the entire form.");
      return;
    }

    if (phoneNumber.replace(/\D/g, "").length !== 11) {
      onApiError(
        "Please enter a valid 11-digit Pakistani phone number (e.g., 0300-1234567)."
      );
      return;
    }

    setLoading(true);

    try {
      const position = await new Promise<GeolocationPosition>(
        (resolve, reject) => {
          if (!navigator.geolocation) {
            reject(new Error("Geolocation is not supported by your browser."));
            return;
          }
          navigator.geolocation.getCurrentPosition(resolve, reject);
        }
      );

      const currentLatitude = position.coords.latitude;
      const currentLongitude = position.coords.longitude;

      const formData = new FormData();
      formData.append("name", businessName);
      formData.append("proprietor", proprietorName);
      formData.append("phone", phoneNumber);
      formData.append("email", email);
      formData.append("license_no", drugLicense);
      formData.append("license_expiry", licenseExpiry);
      formData.append("password", password);
      formData.append("address", address);
      // FIX: Explicitly cast the latitude and longitude to strings when appending to FormData to resolve a type inference issue.
      formData.append("latitude", currentLatitude.toString());
      formData.append("longitude", currentLongitude.toString());
      if (businessImage) {
        formData.append("business_image", businessImage);
      }

      const response = await fetch(`${API_BASE_URL}/user/auth/register/`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        const errorMessage = Object.values(data).flat().join("\n");
        throw new Error(errorMessage || "Registration failed.");
      } else {
        onApiSuccess(data.message);
      }
    } catch (error) {
      let errorMessage = "An unexpected error occurred during registration.";
      if (error instanceof GeolocationPositionError) {
        switch (error.code) {
          case GeolocationPositionError.PERMISSION_DENIED:
            errorMessage =
              "Location permission denied. Please allow location access to register.";
            break;
          case GeolocationPositionError.POSITION_UNAVAILABLE:
            errorMessage =
              "Location information is unavailable. Please check your device settings.";
            break;
          case GeolocationPositionError.TIMEOUT:
            errorMessage =
              "The request to get your location timed out. Please try again.";
            break;
          default:
            errorMessage =
              "Failed to get location. Please ensure location services are enabled.";
            break;
        }
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      onApiError(errorMessage);
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
            onChange={handlePhoneNumberChange}
            required
            placeholder="0347-6914936"
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
          <label htmlFor="business-image">Business Image</label>
          <input
            id="business-image"
            type="file"
            className="form-input"
            accept="image/*"
            onChange={handleImageChange}
            aria-label="Business Image"
            required
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
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Registering..." : "Register"}
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

const UserMenu = ({
  user,
  role,
  onLogout,
  onNavigate,
  onChangeCustomer,
  customerSelected,
}) => {
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

  const canNavigate = typeof onNavigate === "function";

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="btn btn-secondary user-menu-button"
      >
        <UserIcon />
        <span className="btn-text">{user?.name}</span>
      </button>
      {isOpen && (
        <div className="user-menu-dropdown">
          {role === "customer" && onNavigate && (
            <>
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
            </>
          )}

          {role === "sales" && onNavigate && (
            <>
              {customerSelected && (
                <>
                  <button
                    onClick={() => {
                      onNavigate("salesman_orders");
                      setIsOpen(false);
                    }}
                  >
                    My Orders
                  </button>
                  <button
                    onClick={() => {
                      onNavigate("payments");
                      setIsOpen(false);
                    }}
                  >
                    Payments
                  </button>
                </>
              )}
              {onChangeCustomer && (
                <button
                  onClick={() => {
                    onChangeCustomer();
                    setIsOpen(false);
                  }}
                >
                  Change Customer
                </button>
              )}
            </>
          )}
          <button onClick={onLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};

const ProductCard = ({ product, onAddToCart, onShowToast, role }) => {
  // FIX: Initialize quantity state with a string to prevent it from being undefined.
  // This resolves multiple type errors related to using an uninitialized state variable
  // for a controlled input component and its corresponding logic.
  const [quantity, setQuantity] = useState("");
  const [bidPrice, setBidPrice] = useState(product.price.toFixed(2));
  const [bidError, setBidError] = useState("");
  const minBidPrice = product.price * 0.945;
  const bidPrice12=product.price+.12*product.price;
  const imageUrl=API_BASE_URL+"/"+product.imageUrl;
  const handleBidChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newBid = e.target.value;
    setBidPrice(newBid);

    const numericBid = parseFloat(newBid);
    // Only validate if it's a number. Empty string or partial numbers (like '9.') are handled.
    if (role === "sales") {
      const numericBid = parseFloat(newBid);
      if (!isNaN(numericBid) && numericBid < minBidPrice) {
        setBidError(
          ` bid range ${product.price} -- ${minBidPrice.toFixed(2)} RS`
        );
      } else {
        setBidError("");
      }
    } else {
      setBidError("");
    }
  };
  const handleAddToCart = () => {
    if (bidPrice.trim() === "") {
      onShowToast("Please enter a bid price.", "error");
      return;
    }

    const bid = parseFloat(bidPrice);
    if (isNaN(bid) || bid <= 0) {
      onShowToast("Please enter a valid bid price.", "error");
      return;
    }

    if (role === "sales" && bid < minBidPrice) {
      onShowToast(
        `محترم!اگریہ قیمت ملے؟
     
 توہمارااگلی خریدای آپ سے!`,
        "error"
      );
      return;
    }

    // FIX: Convert quantity from a string to a number for logical checks and for passing to the event handler.
    // This resolves the type mismatch where a number was expected but a string was provided.
    const numericQuantity = parseInt(quantity, 10);
    if (numericQuantity > 0) {
      onAddToCart(product, numericQuantity, bid);
      onShowToast(`${numericQuantity} of ${product.name} added to cart!`, "success");
    } else {
      onShowToast("Please enter a valid quantity.", "error");
    }
  };

  return (
    <div className="product-card">
     {product.imageUrl && <img src={imageUrl} alt={product.name} />}
      <div className="product-card-content">
        <h3>{product.name}</h3>
        <p className="product-price">
          Standard Price: {bidPrice} RS 
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
              onChange={(e) => setQuantity(e.target.value)}
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
              onChange={handleBidChange}
              min={role === "sales" ? minBidPrice.toFixed(2) : "0.01"}
              step="0.01"
              aria-label="Bid Price"
              aria-describedby={
                bidError ? `bid-error-${product.id}` : undefined
              }
              aria-invalid={!!bidError}
            />
            {bidError && (
              <span
                id={`bid-error-${product.id}`}
                className="error-text"
                role="alert"
              >
                {bidError}
              </span>
            )}
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
  role,
  selectedCustomer,
  onChangeCustomer,
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
          description: `Packing: ${p.packing} | Barcode: ${p.barcode}`,
          price: parseFloat(p.tradePrice),
          imageUrl:
            p.image_1 
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
            {role === "sales" ? (
              <div className="sales-header-info">
                <h1>{selectedCustomer.name}</h1>
                <button onClick={onChangeCustomer} className="btn-link">
                  Change Customer
                </button>
              </div>
            ) : (
              <h1>Welcome!</h1>
            )}
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
                role={role}
                onLogout={onLogout}
                onNavigate={role === "customer" ? onNavigate : onNavigate}
                onChangeCustomer={role === "sales" ? onChangeCustomer : null}
                customerSelected={role === "sales" && !!selectedCustomer}
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
                role={role}
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
    // if (!deliveryAddress.trim()) {
    //   alert("Please enter a delivery address.");
    //   return;
    // }
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
                {/* <div className="form-group">
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
                </div> */}
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
        //console.log(data);
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

const OrdersPage = ({ onNavigateToCatalog, customerId }) => {
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
      if (!customerId) {
        setError("No customer selected.");
        setIsLoading(false);
        return;
      }
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
          `${API_BASE_URL}/ecommerce/orders/customer/${customerId}/?${params.toString()}`,
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
    [offset, activeFilters, customerId]
  );

  useEffect(() => {
    fetchOrders(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters, customerId]);

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
              <option value="confirmed">Confirmed</option>

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
                    <strong>Order ID:</strong> #{order.order_no || order.id}
                  </div>
                  <div className="order-summary-item">
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </div>
                  <div className="order-summary-item">
                    <strong>Total:</strong>{" "}
                    {Number(order.total_amount).toFixed(2)} RS
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
                    {/* <p>
                      <strong>Delivery Address:</strong> {order.address}
                    </p> */}
                    <h4>Items:</h4>
                    <div className="order-items-list">
                      {order.items.map((item) => (
                        <div key={item.id} className="order-item">
                          <div className="order-item-info">
                            <span>
                              <strong>Product ID:</strong> {item.product.name}
                            </span>
                            <span>
                              <strong>Qty:</strong> {item.quantity}
                            </span>
                          </div>
                          <div className="order-item-price">
                            <span>
                              <strong>Rate:</strong>{" "}
                              {Number(item.price).toFixed(2)} RS
                            </span>
                            <span>
                              <strong>Bid:</strong>{" "}
                              {Number(item.bid_price).toFixed(2)} RS
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

const SearchableSelect = ({
  options,
  value,
  onChange,
  placeholder,
  disabled,
}) => {
  const [inputValue, setInputValue] = useState(value ? value.name : "");
  const [showOptions, setShowOptions] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setInputValue(value ? value.name : "");
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setShowOptions(false);
        setInputValue(value ? value.name : ""); // Reset on blur if no selection
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  const filteredOptions = (options || []).filter((option) =>
    option.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  const handleSelect = (option) => {
    onChange(option);
    setInputValue(option.name);
    setShowOptions(false);
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange(null);
    setInputValue("");
    wrapperRef.current?.querySelector("input")?.focus();
  };

  return (
    <div className="searchable-select" ref={wrapperRef}>
      <div className="searchable-select-input-wrapper">
        <input
          type="text"
          className="form-input"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onFocus={() => setShowOptions(true)}
          placeholder={placeholder}
          disabled={disabled}
          aria-label={placeholder}
        />
        {inputValue && !disabled && (
          <button
            type="button"
            className="btn-icon clear-btn"
            onClick={handleClear}
            aria-label="Clear selection"
          >
            <CloseIcon width="14" height="14" />
          </button>
        )}
      </div>
      {showOptions && !disabled && (
        <ul className="searchable-select-options">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option) => (
              <li
                key={option.id}
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(option)}
              >
                {option.name}
              </li>
            ))
          ) : (
            <li className="no-options">No options found</li>
          )}
        </ul>
      )}
    </div>
  );
};

const CustomerSearchPage = ({
  onSelectCustomer,
  user,
  role,
  onLogout,
  onNavigate,
}) => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${API_BASE_URL}/management/cities/?limit=10000`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch cities.");
        const data = await response.json();
        setCities(data.results);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchCities();
  }, []);

  // Fetch areas when a city is selected
  useEffect(() => {
    if (!selectedCity) {
      setAreas([]);
      return;
    }
    const fetchAreas = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${API_BASE_URL}/management/cities/${selectedCity.id}/areas/?limit=10000`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch areas.");
        const data = await response.json();
        setAreas(data);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchAreas();
  }, [selectedCity]);

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem("token");
    const params = new URLSearchParams();
    params.append("partyType", "customer");
    if (searchQuery) params.append("q", searchQuery);
    if (selectedCity) params.append("cityId", selectedCity.id);
    if (selectedArea) params.append("areaId", selectedArea.id);

    try {
      const response = await fetch(
        `${API_BASE_URL}/inventory/parties/?${params.toString()}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch customers.");
      const data = await response.json();
      setCustomers(data.results);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, selectedCity, selectedArea]);

  useEffect(() => {
    const handler = setTimeout(() => {
      fetchCustomers();
    }, 500); // Debounce search
    return () => clearTimeout(handler);
  }, [fetchCustomers]);

  return (
    <div className="page-container">
      <header className="catalog-header">
        <h1>Select a Customer</h1>
        <UserMenu
          user={user}
          role={role}
          onLogout={onLogout}
          onNavigate={onNavigate}
          onChangeCustomer={null}
          customerSelected={false}
        />
      </header>
      <main>
        <div className="customer-search-filters orders-filter-bar">
          <div className="form-group">
            <SearchableSelect
              options={cities}
              value={selectedCity}
              onChange={(city) => {
                setSelectedCity(city);
                setSelectedArea(null);
              }}
              placeholder="Filter by city"
              disabled={false}
            />
          </div>
          <div className="form-group">
            <SearchableSelect
              options={areas}
              value={selectedArea}
              onChange={setSelectedArea}
              placeholder="Filter by area"
              disabled={!selectedCity}
            />
          </div>
          <div className="form-group">
            <input
              type="search"
              placeholder="Search name, business, or phone..."
              className="form-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search Customers"
            />
          </div>
        </div>

        {isLoading && <div className="loader">Loading customers...</div>}
        {error && <p className="error-message">Error: {error}</p>}
        {!isLoading && !error && customers.length === 0 && (
          <p className="empty-catalog-message">No customers found.</p>
        )}
        {!isLoading && !error && customers.length > 0 && (
          <div className="customer-list">
            {customers.map((customer) => (
              <div key={customer.id} className="customer-card">
                <div className="customer-card-details">
                  <h3>{customer.name}</h3>
                  <p>{customer.proprietor}</p>
                  <p>{customer.address}</p>
                  <p>{customer.phone}</p>
                </div>
                <button
                  onClick={() => onSelectCustomer(customer)}
                  className="btn btn-primary"
                >
                  Select
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};
const SalesmanOrdersPage = ({
  user,
  role,
  onLogout,
  onNavigate,
  onChangeCustomer,
  selectedCustomer,
  onApiSuccess,
  onApiError,
}) => {
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
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState(null);
  const limit = 10;
  const employeeData = localStorage.getItem("employee");
  const employeeId = employeeData ? JSON.parse(employeeData).id : null;

  const fetchOrders = useCallback(
    async (isNewSearch = false) => {
      if (!employeeId || !selectedCustomer) {
        setError("Sales representative or customer ID not found.");
        setIsLoading(false);
        return;
      }
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
          `${API_BASE_URL}/ecommerce/orders/salesman/${employeeId}/customer/${selectedCustomer}/?${params.toString()}`,
          {
            headers: { Authorization: `Token ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch orders.");
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
    [offset, activeFilters, employeeId, selectedCustomer]
  );

  useEffect(() => {
    fetchOrders(true);
  }, [fetchOrders]);

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

  const handleStatusUpdate = useCallback(async (orderId, newStatus) => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${API_BASE_URL}/ecommerce/orders/${orderId}/status/?new_status=${newStatus}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Failed to update status.");
      }
      onApiSuccess("Order status updated successfully.");
      // Refetch orders to ensure UI is in sync with backend
      fetchOrders(true);
    } catch (err) {
      onApiError(err.message);
    }
  }, [fetchOrders, onApiSuccess, onApiError]);

  const handleOpenPaymentModal = (order, e) => {
    e.stopPropagation();
    setSelectedOrderForPayment(order);
    setIsPaymentModalOpen(true);
  };

  const handleClosePaymentModal = useCallback((paymentSubmitted) => {
    setIsPaymentModalOpen(false);
    setSelectedOrderForPayment(null);
    if (paymentSubmitted) {
      fetchOrders(true); // Refetch orders
    }
  }, [fetchOrders]);

  return (
    <div className="page-container">
      {isPaymentModalOpen && (
        <PaymentModal
          order={selectedOrderForPayment}
          onClose={handleClosePaymentModal}
          onApiSuccess={onApiSuccess}
          onApiError={onApiError}
        />
      )}
      <header className="catalog-header">
        <div className="header-title-group">
          <h1>My Orders</h1>
          <button
            onClick={() => onNavigate("catalog")}
            className="btn btn-secondary"
          >
            &larr; Back to Catalog
          </button>
        </div>
        <div className="header-actions">
          {user && (
            <UserMenu
              user={user}
              role={role}
              onLogout={onLogout}
              onNavigate={onNavigate}
              onChangeCustomer={onChangeCustomer}
              customerSelected={!!selectedCustomer}
            />
          )}
        </div>
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
              <option value="confirmed">Confirmed</option>
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
                    <strong>Customer:</strong> {order.customer.name}
                  </div>
                  <div className="order-summary-item">
                    <strong>Order ID:</strong> #{order.order_no || order.id}
                  </div>
                  <div className="order-summary-item">
                    <strong>Date:</strong>{" "}
                    {new Date(order.date).toLocaleDateString()}
                  </div>
                  <div className="order-summary-item">
                    <strong>Total:</strong>{" "}
                    {Number(order.total_amount).toFixed(2)} RS
                  </div>
                  <div className="order-summary-item">
                    <select
                      value={order.status}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleStatusUpdate(order.id, e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                      className={`status-select status-${order.status?.toLowerCase()}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  {order.sale_invoice && (
                    <button
                      className="btn btn-primary pay-button"
                      onClick={(e) => handleOpenPaymentModal(order, e)}
                    >
                      Pay
                    </button>
                  )}
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
                    {/* <p>
                      <strong>Delivery Address:</strong> {order.address}
                    </p> */}
                    <h4>Items:</h4>
                    <div className="order-items-list">
                      {order.items.map((item) => (
                        <div key={item.id} className="order-item">
                          <div className="order-item-info">
                            <span>
                              <strong>Product:</strong> {item.product.name}
                            </span>
                            <span>
                              <strong>Qty:</strong> {item.quantity}
                            </span>
                          </div>
                          <div className="order-item-price">
                            <span>
                              <strong>Rate:</strong>{" "}
                              {Number(item.price).toFixed(2)} RS
                            </span>
                            <span>
                              <strong>Bid:</strong>{" "}
                              {Number(item.bid_price).toFixed(2)} RS
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

const PaymentsPage = ({
  onNavigateToCatalog,
  selectedCustomer,
  onApiSuccess,
  onApiError,
}) => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);

    if (isNaN(numericAmount) || numericAmount <= 0) {
      onApiError("Please enter a valid positive amount.");
      return;
    }

    setIsSubmitting(true);
    const token = localStorage.getItem("token");
    const payload = {
      date: new Date().toISOString().split("T")[0],
      customer: selectedCustomer.id,
      warehouse: 1, // Default warehouse ID
      amount: numericAmount,
      description: description,
    };

    try {
      const response = await fetch(`${API_BASE_URL}/finance/receipts/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = await response.json();
        const errorMessage =
          Object.values(data).flat().join("\n") ||
          "Failed to record payment.";
        throw new Error(errorMessage);
      }

      onApiSuccess("Payment recorded successfully!");
      // Reset form after successful submission
      setAmount("");
      setDescription("");
    } catch (error) {
      onApiError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <header className="catalog-header">
        <h1>Record Payment for {selectedCustomer.name}</h1>
        <button onClick={onNavigateToCatalog} className="btn btn-secondary">
          &larr; Back to Catalog
        </button>
      </header>
      <main className="payment-page-main">
        <form className="auth-form" onSubmit={handleSubmit}>
          <p className="form-description">
            Use this form to record old payments or advances received from the
            customer that are not linked to a specific order.
          </p>
          <div className="form-group">
            <label htmlFor="receipt-amount">Amount</label>
            <input
              id="receipt-amount"
              type="number"
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              // FIX: The step and min props for an input element should be numbers to ensure consistency and prevent potential type mismatches.
              step={0.01}
              min={0.01}
              placeholder="Enter amount received"
            />
          </div>
          <div className="form-group">
            <label htmlFor="receipt-description">Description</label>
            <textarea
              id="receipt-description"
              className="form-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Optional: Add a note (e.g., old balance clearance)"
              rows="4"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Record Payment"}
          </button>
        </form>
      </main>
    </div>
  );
};

const Footer = () => (
  <footer className="app-footer">
    <div className="footer-content">
      <div className="social-links">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="X (formerly Twitter)"
        >
          <XIcon />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <LinkedInIcon />
        </a>
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
        >
          <FacebookIcon />
        </a>
        <a
          href="https://tiktok.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="TikTok"
        >
          <TikTokIcon />
        </a>
      </div>
      <div className="footer-links">
        <a href="http://Okdtts.com" target="_blank" rel="noopener noreferrer">
          Okdtts.com
        </a>
        <span>© 2025 Ok Distributor. All Rights Reserved.</span>
      </div>
    </div>
  </footer>
);
// --- Main App Component ---

function App() {
  const [page, setPage] = useState("login"); // 'login', 'register', 'resetPassword', 'catalog', 'cart', 'profile', 'orders', 'customer_selection', 'payments'
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null); // 'customer' or 'sales'
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [cart, setCart] = useState([]);
  const [toasts, setToasts] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [installPromptEvent, setInstallPromptEvent] = useState(null);
  const [isInstallPromptVisible, setIsInstallPromptVisible] = useState(false);

  useEffect(() => {
    const loggedInUser = sessionStorage.getItem("user");
    const userRole = sessionStorage.getItem("role");
    if (loggedInUser && userRole) {
      setUser(JSON.parse(loggedInUser));
      setRole(userRole);
      setPage(userRole === "sales" ? "customer_selection" : "catalog");
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    }
  }, []);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      const dismissedInSession = sessionStorage.getItem("installPromptDismissed");
      if (!dismissedInSession) {
        setInstallPromptEvent(e);
        setIsInstallPromptVisible(true);
      }
    };
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstall = async () => {
    if (!installPromptEvent) return;
    installPromptEvent.prompt();
    const { outcome } = await installPromptEvent.userChoice;
    //console.log(`User response to the install prompt: ${outcome}`);
    setIsInstallPromptVisible(false);
    setInstallPromptEvent(null);
  };

  const handleDismissInstall = () => {
    setIsInstallPromptVisible(false);
    sessionStorage.setItem("installPromptDismissed", "true");
  };

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

  const handleLogin = (loggedInUser, userRole) => {
    sessionStorage.setItem("user", JSON.stringify(loggedInUser));
    sessionStorage.setItem("role", userRole);
    setUser(loggedInUser);
    setRole(userRole);
    if (userRole === "sales") {
      setPage("customer_selection");
    } else {
      setPage("catalog");
    }
  };

  const handleRegister = (registeredUser) => {
    addToast(registeredUser, "success");
    setPage("login");
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role");
    localStorage.removeItem("cart");
    setUser(null);
    setRole(null);
    setSelectedCustomer(null);
    setCart([]);
    setPage("login");
  };

  const handleCustomerSelect = (customer) => {
    setSelectedCustomer(customer);
    setPage("catalog");
  };

  const handleChangeCustomer = () => {
    setSelectedCustomer(null);
    setCart([]); // Clear cart for the new customer
    localStorage.removeItem("cart");
    setPage("customer_selection");
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

    const partyData = localStorage.getItem("party");
    const partyId =
      role === "sales"
        ? selectedCustomer.id
        : partyData
        ? JSON.parse(partyData).id
        : null;

    if (!partyId) {
      addToast("Could not identify the customer for this order.", "error");
      return;
    }

    const total = cart.reduce(
      (sum, item) => sum + Number(item.bidPrice) * Number(item.quantity),
      0
    );
    setIsSubmitting(true);
    const payload = {
      order_no: "EO-" + Date.now(),
      total_amount: total,
      paid_amount: 0,
      customer: partyId,
      salesman:
        role === "sales"
          ? JSON.parse(localStorage.getItem("employee")).id
          : null,
      date: new Date().toISOString().split("T")[0],
      address: deliveryAddress,
      items: cart.map((item) => ({
        product: item.id,
        price: String(item.price),
        amount: String(item.bidPrice * item.quantity),
        quantity: item.quantity,
        bid_price: String(item.bidPrice),
      })),
      status: "Pending",
    };

    try {
      const response = await fetch(`${API_BASE_URL}/ecommerce/orders/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      //console.log("Order response:", data);
      if (!response.ok) {
        const errorMessage = Object.values(data).flat().join("\n");
        throw new Error(errorMessage || "Failed to place order.");
      }
      addToast("Order placed successfully!", "success");
      setCart([]);
      localStorage.removeItem("cart");
      if (role === "customer") {
        setPage("orders");
      } else {
        // For sales, stay on the current customer's catalog
        setPage("catalog");
      }
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
    // For salesman, if no customer is selected, always show selection page.
    if (
      role === "sales" &&
      !selectedCustomer &&
      page !== "login" &&
      page !== "resetPassword"
    ) {
      return (
        <CustomerSearchPage
          user={user}
          role={role}
          onSelectCustomer={handleCustomerSelect}
          onLogout={handleLogout}
          onNavigate={setPage}
        />
      );
    }

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
              role={role}
              selectedCustomer={selectedCustomer}
              onChangeCustomer={handleChangeCustomer}
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
        const partyData = localStorage.getItem("party");
        const customerIdForOrders =
          role === "sales"
            ? selectedCustomer.id
            : partyData
            ? JSON.parse(partyData).id
            : null;
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
              onNavigateToCatalog={() => setPage("catalog")}
              customerId={customerIdForOrders}
            />
          </>
        );
      case "salesman_orders":
        // FIX: Ensure customer ID is a number to prevent type errors.
        const customerID = Number(selectedCustomer.id);
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
            <SalesmanOrdersPage
              user={user}
              role={role}
              onLogout={handleLogout}
              onNavigate={setPage}
              onChangeCustomer={handleChangeCustomer}
              selectedCustomer={customerID}
              onApiSuccess={(msg) => addToast(msg, "success")}
              onApiError={(msg) => addToast(msg, "error")}
            />
          </>
        );
      case "payments":
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
            <PaymentsPage
              onNavigateToCatalog={() => setPage("catalog")}
              selectedCustomer={selectedCustomer}
              onApiSuccess={(msg) => addToast(msg, "success")}
              onApiError={(msg) => addToast(msg, "error")}
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

  return (
    <>
      {isInstallPromptVisible && (
        <InstallPrompt
          onInstall={handleInstall}
          onDismiss={handleDismissInstall}
        />
      )}
      {renderPage()}
      <Footer />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);