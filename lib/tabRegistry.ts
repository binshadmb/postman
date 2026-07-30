// tabRegistry.ts — Single source of truth for all 7 mother tabs × 7 child tabs

export type TabId =
  | "print-post"
  | "cards"
  | "registered-mail"
  | "ads"
  | "bulk"
  | "track"
  | "account";

export interface ChildTab {
  id: string;
  label: string;
  description: string;
}

export interface MotherTab {
  id: TabId;
  title: string;
  badge: string;
  icon: string;
  color: string;
  children: ChildTab[];
}

export const TAB_REGISTRY: MotherTab[] = [
  {
    id: "print-post",
    title: "Document Print & Post",
    badge: "High-margin volume line",
    icon: "🖨️",
    color: "#b72d32",
    children: [
      { id: "upload",     label: "Upload Document",   description: "Upload PDF, DOCX, or image for printing" },
      { id: "print-opts", label: "Print Options",      description: "Color, paper GSM, size, binding" },
      { id: "post-opts",  label: "Post Options",       description: "Regular, Speed Post, Registered, Courier" },
      { id: "calculator", label: "Price Calculator",   description: "Live price estimate before checkout" },
      { id: "history",    label: "Order History",      description: "Past print & post orders" },
      { id: "addresses",  label: "Saved Addresses",    description: "Saved delivery addresses" },
      { id: "reorder",    label: "Reorder / Templates", description: "Reuse previous order settings" },
    ],
  },
  {
    id: "cards",
    title: "Greeting Cards",
    badge: "Personalized card service",
    icon: "💌",
    color: "#ae7f2b",
    children: [
      { id: "occasion",   label: "Choose Occasion",   description: "Birthday, anniversary, festival, custom" },
      { id: "format",     label: "Card Format",        description: "Size, fold style, stock, color" },
      { id: "personal",   label: "Personalization",    description: "Message, font, photo insert" },
      { id: "addons",     label: "Add-ons",            description: "Voucher, note card, ribbon/seal" },
      { id: "calculator", label: "Price Calculator",   description: "Estimate card price by options" },
      { id: "history",    label: "Order History",      description: "Past card orders" },
      { id: "designs",    label: "Saved Designs",      description: "Saved card customizations" },
    ],
  },
  {
    id: "registered-mail",
    title: "Registered / Certified Mail",
    badge: "Receipts and legal-post workflow",
    icon: "📮",
    color: "#186b70",
    children: [
      { id: "registered", label: "Registered Post",          description: "India Post registered with receipt" },
      { id: "speed",      label: "Speed Post",               description: "Tracked Speed Post — fastest India Post" },
      { id: "legal",      label: "Legal Notice Format Check", description: "Optional format review before posting" },
      { id: "calculator", label: "Price Calculator",          description: "Estimate registered/speed post cost" },
      { id: "history",    label: "Order History",             description: "Past registered mail orders" },
      { id: "recipients", label: "Saved Recipients",          description: "Saved recipient details" },
      { id: "archive",    label: "Proof / Receipt Archive",   description: "Booking slips and delivery proofs" },
    ],
  },
  {
    id: "ads",
    title: "Newspaper / Media Ad Placement",
    badge: "Cost-plus convenience line",
    icon: "📰",
    color: "#3d7354",
    children: [
      { id: "ad-type",    label: "Ad Type Selection",  description: "Obituary, matrimonial, legal, classified" },
      { id: "paper",      label: "Select Paper",        description: "Choose newspaper, language, edition, date" },
      { id: "size-color", label: "Size & Color",        description: "Column-cm, B&W or color" },
      { id: "proof",      label: "Proof Delivery",      description: "E-paper clipping or physical tearsheet" },
      { id: "calculator", label: "Price Calculator",    description: "Column-cm × per-cm rate + service margin" },
      { id: "history",    label: "Order History",       description: "Past ad bookings" },
      { id: "templates",  label: "Saved Ad Templates",  description: "Reuse ad copy for recurring placements" },
    ],
  },
  {
    id: "bulk",
    title: "Bulk / Business Mail",
    badge: "CSV and repeat sender workflow",
    icon: "📦",
    color: "#6b5ea8",
    children: [
      { id: "csv",        label: "CSV Upload",           description: "Upload recipient list with data merge" },
      { id: "template",   label: "Template Selection",   description: "Choose or upload document template" },
      { id: "batch-opts", label: "Batch Print Options",  description: "Paper, color, binding for entire batch" },
      { id: "calculator", label: "Price Calculator",     description: "Per-unit × quantity − volume discount" },
      { id: "history",    label: "Order History",        description: "Past bulk mail batches" },
      { id: "lists",      label: "Saved Recipient Lists", description: "Reusable CSV recipient lists" },
      { id: "templates",  label: "Saved Templates",      description: "Saved document templates for bulk use" },
    ],
  },
  {
    id: "track",
    title: "Track Order",
    badge: "Timeline, proof, and support",
    icon: "📍",
    color: "#c05c00",
    children: [
      { id: "timeline",  label: "Order Status Timeline",    description: "Full status trail from received to delivered" },
      { id: "slip",      label: "Payment Slip Download",    description: "GST invoice and booking slip PDF" },
      { id: "awb",       label: "India Post / AWB Tracking", description: "Embedded India Post tracking link" },
      { id: "proof-view",label: "Proof / Tearsheet Viewer", description: "View published ad proof or delivery photo" },
      { id: "confirm",   label: "Delivery Confirmation",    description: "Mark as received or flag issue" },
      { id: "support",   label: "Support / Raise Issue",    description: "Contact us about your order" },
      { id: "rate",      label: "Rate This Order",          description: "Leave feedback for completed orders" },
    ],
  },
  {
    id: "account",
    title: "Account",
    badge: "Customer identity and preferences",
    icon: "👤",
    color: "#555",
    children: [
      { id: "signup",    label: "Account Creation / Sign-up", description: "Create your Postman Khagatara account" },
      { id: "login",     label: "Login",                      description: "Sign in to your account" },
      { id: "kyc",       label: "Profile & KYC",              description: "Name, address, identity details" },
      { id: "payment",   label: "Payment Methods",            description: "Saved cards and UPI details" },
      { id: "addresses", label: "Address Book",               description: "Saved delivery addresses" },
      { id: "history",   label: "Order History",              description: "All orders across all modules" },
      { id: "prefs",     label: "Notifications / Preferences", description: "Email alerts, language, currency" },
    ],
  },
];

export function getMotherTab(id: TabId): MotherTab | undefined {
  return TAB_REGISTRY.find((t) => t.id === id);
}

export function getAllChildTabs() {
  return TAB_REGISTRY.flatMap((t) =>
    t.children.map((c) => ({ ...c, motherId: t.id, motherTitle: t.title }))
  );
}
