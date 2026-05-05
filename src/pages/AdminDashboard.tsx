import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useAuth, SignInButton, UserButton } from "@clerk/react";
import {
  Users,
  Mail,
  Calendar,
  Award,
  UserCircle,
  Users2,
  MessageSquare,
  Handshake,
  Briefcase,
  ShieldCheck,
  Trash2,
  Plus,
  LayoutDashboard,
  LogOut,
  ChevronRight,
  Search,
  ArrowLeft,
  CheckCircle2,
  Clock,
  Download,
  FileText,
  Archive,
  ChevronDown,
  ChevronUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// --- Types ---
type TabType =
  | "attendees" | "newsletter"
  | "agenda" | "sponsors" | "speakers" | "team"
  | "speak_apps" | "sponsor_apps" | "partner_apps" | "exhibit_apps" | "core_team_apps";

export default function AdminDashboard() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isSignedIn) {
    return (
      <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-purple-500/30 relative">
        <div className="absolute top-8 left-8">
          <Link to="/">
            <Button variant="ghost" className="text-white/60 hover:text-white hover:bg-white/5 gap-2 rounded-full px-6">
              <ArrowLeft className="w-4 h-4" />
              Back to Homepage
            </Button>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white">Admin Access</h1>
            <p className="text-white/60">Please sign in to access the management portal.</p>
          </div>
          <SignInButton mode="modal">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 h-12 text-lg rounded-full shadow-[0_0_20px_rgba(168,85,247,0.3)]">
              Sign In to Continue
            </Button>
          </SignInButton>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-[#050505] text-white font-sans selection:bg-purple-500/30">
      <DashboardContent />
    </div>
  );
}

function DashboardContent() {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("attendees");
  const [searchTerm, setSearchTerm] = useState("");
  const [exportFilter, setExportFilter] = useState<"all" | "paid" | "unpaid">("all");
  const [exportFormat, setExportFormat] = useState<"csv" | "pdf">("csv");
  const [exportOpen, setExportOpen] = useState(false);
  const registrations = useQuery(api.registrations.list);

  const handleExport = () => {
    if (!registrations || registrations.length === 0) {
      toast.error("No data available to export");
      return;
    }

    const filtered = registrations.filter((item: any) => {
      if (exportFilter === "paid") return item.isPaid;
      if (exportFilter === "unpaid") return !item.isPaid;
      return true;
    });

    if (filtered.length === 0) {
      toast.error("No records match the selected filter");
      return;
    }

    const headers = ["Name", "Email", "Tier", "Qty", "Price (PKR)", "Paid"];
    const rows = filtered.map((item: any) => [
      item.name || "",
      item.email || "",
      item.tier || "",
      String(item.quantity ?? ""),
      String(item.totalPrice ?? ""),
      item.isPaid ? "Yes" : "No",
    ]);

    const timestamp = new Date().toISOString().slice(0, 10);
    const filterLabel = exportFilter === "all" ? "all" : exportFilter;

    if (exportFormat === "csv") {
      const csvContent = [
        headers.join(","),
        ...rows.map(row => row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `attendees-${filterLabel}-${timestamp}.csv`;
      link.click();
      URL.revokeObjectURL(url);
      toast.success(`Exported ${filtered.length} records as CSV`);
    } else {
      const doc = new jsPDF();
      doc.setFontSize(16);
      doc.text("Future Forward — Attendee Report", 14, 18);
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text(`Filter: ${filterLabel.charAt(0).toUpperCase() + filterLabel.slice(1)}  •  Generated: ${timestamp}`, 14, 26);

      autoTable(doc, {
        head: [headers],
        body: rows,
        startY: 32,
        theme: "grid",
        headStyles: { fillColor: [123, 63, 228], textColor: 255, fontStyle: "bold" },
        alternateRowStyles: { fillColor: [245, 243, 255] },
        styles: { fontSize: 9, cellPadding: 3 },
      });

      doc.save(`attendees-${filterLabel}-${timestamp}.pdf`);
      toast.success(`Exported ${filtered.length} records as PDF`);
    }

    setExportOpen(false);
  };

  const sidebarSections = [
    {
      title: "Core",
      items: [
        { id: "attendees", label: "Attendees", icon: Users },
        { id: "newsletter", label: "Newsletter", icon: Mail },
      ]
    },
    {
      title: "Content",
      items: [
        { id: "agenda", label: "Agenda", icon: Calendar },
        { id: "sponsors", label: "Sponsors", icon: Award },
        { id: "speakers", label: "Speakers", icon: UserCircle },
        { id: "team", label: "Team", icon: Users2 },
      ]
    },
    {
      title: "Applications",
      items: [
        { id: "speak_apps", label: "Speak", icon: MessageSquare },
        { id: "sponsor_apps", label: "Sponsor", icon: Handshake },
        { id: "partner_apps", label: "Partner", icon: Briefcase },
        { id: "exhibit_apps", label: "Exhibit", icon: LayoutDashboard },
        { id: "core_team_apps", label: "Core Team", icon: ShieldCheck },
      ]
    }
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 border-r border-white/10 bg-black/40 backdrop-blur-xl flex flex-col shrink-0">
        <div className="p-6 border-b border-white/10 flex flex-col gap-6">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Admin Portal
          </h1>
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group w-fit"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Website
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
          {sidebarSections.map((section) => (
            <div key={section.title} className="space-y-2">
              <h2 className="text-xs font-semibold text-white/40 uppercase tracking-wider px-2">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as TabType)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${activeTab === item.id
                        ? "bg-purple-600/20 text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                        : "text-white/60 hover:text-white hover:bg-white/5"
                      }`}
                  >
                    <item.icon className={`w-4 h-4 ${activeTab === item.id ? "text-purple-400" : ""}`} />
                    <span className="text-sm font-medium">{item.label}</span>
                    {activeTab === item.id && <ChevronRight className="w-3 h-3 ml-auto opacity-50" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 bg-black/60">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <UserButton />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="flex flex-col cursor-pointer hover:bg-white/5 p-1 -ml-1 rounded-md transition-colors">
                    <span className="text-xs font-medium text-white/80">Admin</span>
                    <span className="text-[10px] text-green-500 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                      Live
                    </span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" side="top" className="bg-[#0a0a0a] border-white/10 text-white min-w-[140px] mb-1 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                  <DropdownMenuItem 
                    onClick={() => signOut()}
                    className="text-red-400 hover:text-red-300 hover:bg-red-400/10 cursor-pointer gap-2 focus:bg-red-400/10 focus:text-red-300"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-16 border-b border-white/10 bg-black/20 backdrop-blur-md flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center gap-4 text-sm text-white/60">
            <span className="capitalize">{activeTab.replace("_", " ")}</span>
            <span className="text-white/20">/</span>
            <span className="text-white">Management</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <Input
                placeholder="Search records..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/5 border-white/10 focus:border-purple-500/50 transition-all rounded-full h-9 text-sm"
              />
            </div>

            {activeTab === "attendees" && (
              <Popover open={exportOpen} onOpenChange={setExportOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="gap-2 text-white/60 hover:text-white hover:bg-white/5 rounded-full px-4 h-9 text-sm border border-white/10"
                  >
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" sideOffset={8} className="w-72 bg-[#0a0a0a] border-white/10 text-white p-0 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-sm font-semibold text-white">Export Attendees</p>
                    <p className="text-xs text-white/40 mt-0.5">Download registration data</p>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Data Filter</label>
                      <Select value={exportFilter} onValueChange={(v: any) => setExportFilter(v)}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-9 rounded-lg focus:ring-purple-500/40 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                          <SelectItem value="all">All Registrations</SelectItem>
                          <SelectItem value="paid">Paid Only</SelectItem>
                          <SelectItem value="unpaid">Unpaid Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-white/50 uppercase tracking-wider">Format</label>
                      <Select value={exportFormat} onValueChange={(v: any) => setExportFormat(v)}>
                        <SelectTrigger className="bg-white/5 border-white/10 text-white h-9 rounded-lg focus:ring-purple-500/40 text-sm">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-[#0a0a0a] border-white/10 text-white">
                          <SelectItem value="csv">
                            <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> CSV</span>
                          </SelectItem>
                          <SelectItem value="pdf">
                            <span className="flex items-center gap-2"><FileText className="w-3.5 h-3.5" /> PDF</span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="px-4 pb-4">
                    <Button
                      onClick={handleExport}
                      disabled={!registrations || registrations.length === 0}
                      className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2 rounded-lg h-9 shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            )}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-blue-900/5">
          <div className="max-w-6xl mx-auto space-y-6">
            <TabContent activeTab={activeTab} searchTerm={searchTerm} />
          </div>
        </div>
      </main>
    </div>
  );
}

function TabContent({ activeTab, searchTerm }: { activeTab: TabType; searchTerm: string }) {
  const [isArchivedOpen, setIsArchivedOpen] = useState(false);

  switch (activeTab) {
    case "attendees":
      return (
        <div className="space-y-12">

          <GenericTable
            title="Pending Payments"
            description="Registrations awaiting payment confirmation."
            query={api.registrations.list}
            removeMutation={api.registrations.remove}
            updateMutation={api.registrations.updatePaidStatus}
            bulkRemoveMutation={api.registrations.bulkRemove}
            bulkUpdateMutation={api.registrations.bulkUpdatePaidStatus}
            archiveMutation={api.registrations.updateArchivedStatus}
            bulkArchiveMutation={api.registrations.bulkUpdateArchivedStatus}
            isArchiveTable={false}
            hideMarkUnpaid={true}
            dataFilter={(item) => !item.isPaid && !item.isArchived}
            columns={[
              { key: "isPaid", label: "Paid", checkbox: true },
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "tier", label: "Tier", badge: true },
              { key: "quantity", label: "Qty" },
              { key: "totalPrice", label: "Price", prefix: "PKR " },
            ]}
            searchTerm={searchTerm}
          />
          <GenericTable
            title="Confirmed Registrations"
            description="All paid and verified attendees."
            query={api.registrations.list}
            removeMutation={api.registrations.remove}
            updateMutation={api.registrations.updatePaidStatus}
            bulkRemoveMutation={api.registrations.bulkRemove}
            bulkUpdateMutation={api.registrations.bulkUpdatePaidStatus}
            archiveMutation={api.registrations.updateArchivedStatus}
            bulkArchiveMutation={api.registrations.bulkUpdateArchivedStatus}
            isArchiveTable={false}
            hideMarkPaid={true}
            dataFilter={(item) => item.isPaid && !item.isArchived}
            columns={[
              { key: "isPaid", label: "Paid", checkbox: true },
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "tier", label: "Tier", badge: true },
              { key: "quantity", label: "Qty" },
              { key: "totalPrice", label: "Price", prefix: "PKR " },
            ]}
            searchTerm={searchTerm}
          />
          
          <div className="pt-2">
            <button 
              onClick={() => setIsArchivedOpen(!isArchivedOpen)}
              className="flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4 ml-1"
            >
              {isArchivedOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              <span className="font-medium text-sm">Archived Registrations</span>
            </button>
            
            {isArchivedOpen && (
              <GenericTable
                title="Archived Registrations"
                description="Registrations that have been archived."
                query={api.registrations.list}
                removeMutation={api.registrations.remove}
                updateMutation={api.registrations.updatePaidStatus}
                bulkRemoveMutation={api.registrations.bulkRemove}
                bulkUpdateMutation={api.registrations.bulkUpdatePaidStatus}
                archiveMutation={api.registrations.updateArchivedStatus}
                bulkArchiveMutation={api.registrations.bulkUpdateArchivedStatus}
                isArchiveTable={true}
                dataFilter={(item) => !!item.isArchived}
                columns={[
                  { key: "isPaid", label: "Paid", checkbox: true },
                  { key: "name", label: "Name" },
                  { key: "email", label: "Email" },
                  { key: "tier", label: "Tier", badge: true },
                  { key: "quantity", label: "Qty" },
                  { key: "totalPrice", label: "Price", prefix: "PKR " },
                ]}
                searchTerm={searchTerm}
              />
            )}
          </div>
        </div>
      );
    case "newsletter":
      return <GenericTable
        title="Newsletter Subscribers"
        description="Users who have signed up for the newsletter."
        query={api.newsletter.list}
        removeMutation={api.newsletter.remove}
        columns={[
          { key: "email", label: "Email" },
          { key: "_creationTime", label: "Joined", date: true },
        ]}
        searchTerm={searchTerm}
      />;
    case "agenda":
      return <GenericTable
        title="Agenda Sessions"
        description="Manage the event schedule and sessions."
        query={api.agenda.list}
        removeMutation={api.agenda.remove}
        createMutation={api.agenda.create}
        columns={[
          { key: "time", label: "Time" },
          { key: "title", label: "Title" },
          { key: "tag", label: "Tag", badge: true },
          { key: "track", label: "Track" },
        ]}
        searchTerm={searchTerm}
        formType="agenda"
      />;
    case "sponsors":
      return <GenericTable
        title="Sponsors & Partners"
        description="Manage event sponsors and community partners."
        query={api.sponsors.list}
        removeMutation={api.sponsors.remove}
        createMutation={api.sponsors.create}
        columns={[
          { key: "name", label: "Name" },
          { key: "tier", label: "Tier", badge: true },
          { key: "url", label: "Website" },
        ]}
        searchTerm={searchTerm}
        formType="sponsor"
      />;
    case "speakers":
      return <GenericTable
        title="Confirmed Speakers"
        description="Manage the featured speakers for the event."
        query={api.speakers.list}
        removeMutation={api.speakers.remove}
        createMutation={api.speakers.create}
        columns={[
          { key: "name", label: "Name" },
          { key: "title", label: "Role" },
          { key: "topic", label: "Topic" },
        ]}
        searchTerm={searchTerm}
        formType="speaker"
      />;
    case "team":
      return <GenericTable
        title="Team Members"
        description="The organizing committee members."
        query={api.team.list}
        removeMutation={api.team.remove}
        createMutation={api.team.create}
        columns={[
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
        ]}
        searchTerm={searchTerm}
        formType="team"
      />;
    case "speak_apps":
      return <GenericTable
        title="Speaker Applications"
        description="Submissions from potential speakers."
        query={api.speaker_applications.list}
        removeMutation={api.speaker_applications.remove}
        columns={[
          { key: "fullName", label: "Name" },
          { key: "email", label: "Email" },
          { key: "talkTitle", label: "Talk Title" },
          { key: "status", label: "Status", badge: true },
        ]}
        searchTerm={searchTerm}
      />;
    case "sponsor_apps":
      return <GenericTable
        title="Sponsorship Applications"
        description="Companies interested in sponsoring."
        query={api.sponsor_applications.list}
        removeMutation={api.sponsor_applications.remove}
        columns={[
          { key: "fullName", label: "Contact" },
          { key: "companyName", label: "Company" },
          { key: "tier", label: "Tier", badge: true },
          { key: "status", label: "Status", badge: true },
        ]}
        searchTerm={searchTerm}
      />;
    case "partner_apps":
      return <GenericTable
        title="Partner Applications"
        description="Organizations interested in partnering."
        query={api.partner_applications.list}
        removeMutation={api.partner_applications.remove}
        columns={[
          { key: "orgName", label: "Organization" },
          { key: "contactName", label: "Contact" },
          { key: "email", label: "Email" },
          { key: "status", label: "Status", badge: true },
        ]}
        searchTerm={searchTerm}
      />;
    case "exhibit_apps":
      return <GenericTable
        title="Exhibitor Applications"
        description="Startups and companies wanting to exhibit."
        query={api.exhibitor_applications.list}
        removeMutation={api.exhibitor_applications.remove}
        columns={[
          { key: "fullName", label: "Name" },
          { key: "companyName", label: "Company" },
          { key: "category", label: "Category" },
          { key: "status", label: "Status", badge: true },
        ]}
        searchTerm={searchTerm}
      />;
    case "core_team_apps":
      return <GenericTable
        title="Core Team Applications"
        description="People wanting to join the organizing team."
        query={api.core_team_applications.list}
        removeMutation={api.core_team_applications.remove}
        columns={[
          { key: "fullName", label: "Name" },
          { key: "email", label: "Email" },
          { key: "role", label: "Role", badge: true },
          { key: "status", label: "Status", badge: true },
        ]}
        searchTerm={searchTerm}
      />;
    default:
      return null;
  }
}



interface Column {
  key: string;
  label: string;
  badge?: boolean;
  date?: boolean;
  checkbox?: boolean;
  prefix?: string;
}

function GenericTable({
  title,
  description,
  query,
  removeMutation,
  createMutation,
  updateMutation,
  bulkRemoveMutation,
  bulkUpdateMutation,
  columns,
  searchTerm,
  formType,
  dataFilter,
  archiveMutation,
  bulkArchiveMutation,
  isArchiveTable,
  hideMarkPaid,
  hideMarkUnpaid
}: {
  title: string;
  description: string;
  query: any;
  removeMutation: any;
  createMutation?: any;
  updateMutation?: any;
  bulkRemoveMutation?: any;
  bulkUpdateMutation?: any;
  columns: Column[];
  searchTerm: string;
  formType?: string;
  dataFilter?: (item: any) => boolean;
  archiveMutation?: any;
  bulkArchiveMutation?: any;
  isArchiveTable?: boolean;
  hideMarkPaid?: boolean;
  hideMarkUnpaid?: boolean;
}) {
  const [selectedIds, setSelectedIds] = useState<any[]>([]);
  const [selectedRecord, setSelectedRecord] = useState<any | null>(null);
  const data = useQuery(query);
  const remove = useMutation(removeMutation);
  const update = useMutation(updateMutation || removeMutation);
  const bulkRemove = useMutation(bulkRemoveMutation || removeMutation);
  const bulkUpdate = useMutation(bulkUpdateMutation || removeMutation);
  const archive = useMutation(archiveMutation || removeMutation);
  const bulkArchive = useMutation(bulkArchiveMutation || removeMutation);

  const filteredData = data?.filter((item: any) => {
    const matchesSearch = Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesFilter = dataFilter ? dataFilter(item) : true;
    return matchesSearch && matchesFilter;
  });

  const handleDelete = async (id: any) => {
    try {
      await remove({ id });
      toast.success("Record deleted successfully");
    } catch (error) {
      toast.error("Failed to delete record");
    }
  };

  const handleTogglePaid = async (id: any, newValue: any) => {
    if (!updateMutation) {
      toast.error("Update functionality not configured for this table");
      return;
    }
    try {
      // Ensure we're passing a clean boolean to the mutation
      const isPaid = !!newValue;
      await update({ id, isPaid });
      toast.success(isPaid ? "Marked as paid" : "Marked as unpaid");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(`Failed to update: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleBulkDelete = async () => {
    if (!bulkRemoveMutation || selectedIds.length === 0) return;
    try {
      await bulkRemove({ ids: selectedIds });
      toast.success(`Deleted ${selectedIds.length} records`);
      setSelectedIds([]);
    } catch (error) {
      toast.error("Failed to delete selected records");
    }
  };

  const handleBulkUpdatePaid = async (isPaid: boolean) => {
    if (!bulkUpdateMutation || selectedIds.length === 0) return;
    try {
      await bulkUpdate({ ids: selectedIds, isPaid });
      toast.success(`Updated ${selectedIds.length} records`);
      setSelectedIds([]);
    } catch (error) {
      toast.error("Failed to update selected records");
    }
  };

  const handleBulkArchive = async (isArchived: boolean) => {
    if (!bulkArchiveMutation || selectedIds.length === 0) return;
    try {
      await bulkArchive({ ids: selectedIds, isArchived });
      toast.success(isArchived ? `Archived ${selectedIds.length} records` : `Unarchived ${selectedIds.length} records`);
      setSelectedIds([]);
    } catch (error) {
      toast.error("Failed to update archive status");
    }
  };

  const handleArchive = async (id: any, isArchived: boolean) => {
    if (!archiveMutation) return;
    try {
      await archive({ id, isArchived });
      toast.success(isArchived ? "Record archived" : "Record unarchived");
    } catch (error) {
      toast.error("Failed to update archive status");
    }
  };

  const toggleSelectAll = () => {
    if (selectedIds.length === filteredData?.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredData?.map(item => item._id) || []);
    }
  };

  const toggleSelect = (id: any) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  return (
    <Card className="bg-black/40 border-white/10 backdrop-blur-sm overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
        <div className="flex items-center gap-4">
          <div>
            <div className="flex items-center gap-3">
              <CardTitle className="text-xl text-white font-bold">{title}</CardTitle>
              {data && (
                <div className="px-2.5 py-0.5 rounded-full bg-purple-600/20 border border-purple-600/30 text-[10px] font-bold text-purple-400 uppercase tracking-wider">
                  {filteredData?.length} Records
                </div>
              )}
            </div>
            <CardDescription className="text-white/40">{description}</CardDescription>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {selectedIds.length > 0 && (
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 animate-in fade-in slide-in-from-right-4 duration-300">
              <span className="text-xs text-white/60 font-medium mr-2">{selectedIds.length} selected</span>
              {bulkUpdateMutation && (
                <>
                  {!hideMarkPaid && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBulkUpdatePaid(true)}
                      className="h-7 px-2 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-400/10 gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" /> Mark Paid
                    </Button>
                  )}
                  {!hideMarkUnpaid && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBulkUpdatePaid(false)}
                      className="h-7 px-2 text-xs text-orange-400 hover:text-orange-300 hover:bg-orange-400/10 gap-1"
                    >
                      <Clock className="w-3 h-3" /> Mark Unpaid
                    </Button>
                  )}
                </>
              )}
              {bulkArchiveMutation && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleBulkArchive(!isArchiveTable)}
                  className={`h-7 px-2 text-xs gap-1 ${isArchiveTable ? "text-blue-400 hover:text-blue-300 hover:bg-blue-400/10" : "text-amber-400 hover:text-amber-300 hover:bg-amber-400/10"}`}
                >
                  {isArchiveTable ? <ChevronUp className="w-3 h-3" /> : <Archive className="w-3 h-3" />}
                  {isArchiveTable ? "Unarchive" : "Archive"}
                </Button>
              )}
              {bulkRemoveMutation && (!archiveMutation || isArchiveTable) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBulkDelete}
                  className="h-7 px-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-400/10 gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </Button>
              )}
              <div className="w-[1px] h-4 bg-white/10 mx-1" />
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedIds([])}
                className="h-7 w-7 p-0 rounded-full text-white/40 hover:text-white hover:bg-white/10"
              >
                <Plus className="w-3 h-3 rotate-45" />
              </Button>
            </div>
          )}
          {createMutation && (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2 rounded-full px-5 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                  <Plus className="w-4 h-4" /> Add New
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#0a0a0a] border-white/10 text-white max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add New {title.split(" ")[0]}</DialogTitle>
                </DialogHeader>
                <GenericForm formType={formType!} createMutation={createMutation} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {!data ? (
          <div className="flex flex-col items-center justify-center p-20 gap-4">
            <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-white/40">Loading records...</p>
          </div>
        ) : filteredData?.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-20 text-white/40">
            <p>No records found matching your search.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableHead className="w-12 py-4 border-r border-white/5">
                    <Checkbox
                      checked={selectedIds.length === filteredData?.length && filteredData?.length > 0}
                      onCheckedChange={toggleSelectAll}
                      className="rounded-none border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                  </TableHead>
                  {columns.map((col) => (
                    <TableHead key={col.key} className={`text-white/60 font-medium py-4 ${col.checkbox ? 'text-center' : ''}`}>
                      {col.label}
                    </TableHead>
                  ))}
                  <TableHead className="text-right py-4 pr-6">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item: any) => (
                  <TableRow
                    key={item._id}
                    onClick={() => setSelectedRecord(item)}
                    className={`border-white/5 cursor-pointer transition-colors ${selectedIds.includes(item._id) ? 'bg-purple-600/10' : 'hover:bg-white/5'}`}
                  >
                    <TableCell className="py-4 border-r border-white/5" onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedIds.includes(item._id)}
                        onCheckedChange={() => toggleSelect(item._id)}
                        className="rounded-none border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                      />
                    </TableCell>
                    {columns.map((col) => (
                      <TableCell key={col.key} className="py-4">
                        {col.checkbox ? (
                          <div className="flex items-center justify-center w-full">
                            <Checkbox
                              checked={item[col.key]}
                              onCheckedChange={(checked) => handleTogglePaid(item._id, checked)}
                              className="border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                          </div>
                        ) : col.badge ? (
                          <Badge className={`${getBadgeColor(item[col.key])} border-none`}>
                            {item[col.key]}
                          </Badge>
                        ) : col.date ? (
                          new Date(item[col.key]).toLocaleDateString()
                        ) : (
                          <span className="text-white/80">
                            {col.prefix}{item[col.key]}
                          </span>
                        )}
                      </TableCell>
                    ))}
                    <TableCell className="text-right py-4 pr-6" onClick={(e) => e.stopPropagation()}>
                      <div className="flex justify-end gap-2">
                        {archiveMutation && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleArchive(item._id, !isArchiveTable)}
                            className={`transition-all rounded-full w-8 h-8 ${isArchiveTable ? "text-blue-400/50 hover:text-blue-400 hover:bg-blue-400/10" : "text-amber-400/50 hover:text-amber-400 hover:bg-amber-400/10"}`}
                          >
                            {isArchiveTable ? <ChevronUp className="w-4 h-4" /> : <Archive className="w-4 h-4" />}
                          </Button>
                        )}
                        {(!archiveMutation || isArchiveTable) && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(item._id)}
                            className="text-white/20 hover:text-red-500 hover:bg-red-500/10 transition-all rounded-full w-8 h-8"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>

      {/* Record Details Modal */}
      <Dialog open={!!selectedRecord} onOpenChange={(open) => !open && setSelectedRecord(null)}>
        <DialogContent className="bg-black/80 backdrop-blur-2xl border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.15)] text-white max-w-2xl max-h-[85vh] overflow-y-auto custom-scrollbar">
          <DialogHeader className="border-b border-white/5 pb-4">
            <DialogTitle className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Record Details
            </DialogTitle>
          </DialogHeader>
          {selectedRecord && (() => {
            const regKeys = ["tier", "quantity", "totalPrice", "isPaid", "paymentProof"];
            
            const availableKeys = Object.keys(selectedRecord).filter(k => k !== "_id");
            const personalGroup = availableKeys.filter(k => !regKeys.includes(k));
            const regGroup = availableKeys.filter(k => regKeys.includes(k));

            const sortFn = (a: string, b: string) => {
              const order = [
                "name", "company", "email", "phone", "cnic", "_creationTime",
                "tier", "quantity", "totalPrice", "isPaid"
              ];
              if (a === "paymentProof") return 1;
              if (b === "paymentProof") return -1;
              
              const idxA = order.indexOf(a);
              const idxB = order.indexOf(b);
              
              if (idxA !== -1 && idxB !== -1) return idxA - idxB;
              if (idxA !== -1) return -1;
              if (idxB !== -1) return 1;
              return a.localeCompare(b);
            };

            personalGroup.sort(sortFn);
            regGroup.sort(sortFn);

            const renderField = (key: string) => {
              const value = selectedRecord[key];
              const isPaymentProof = key === "paymentProof" && value && typeof value === "string";
              const isCreationTime = key === "_creationTime";
              
              return (
                <div key={key} className={`space-y-1.5 p-4 rounded-xl border border-white/5 bg-gradient-to-br from-white/[0.03] to-transparent hover:border-purple-500/30 transition-all duration-300 ${isPaymentProof ? 'md:col-span-2' : ''}`}>
                  <p className="text-[10px] font-bold text-purple-400/80 uppercase tracking-wider flex items-center gap-2">
                    {isCreationTime ? "Created At" : key.replace(/([A-Z])/g, ' $1').trim()}
                  </p>
                  <div className="text-sm text-white/90 break-words font-medium">
                    {isPaymentProof ? (
                      <PaymentProofViewer storageId={value as string} />
                    ) : isCreationTime ? (
                      new Date(value as number).toLocaleString()
                    ) : typeof value === "boolean" ? (
                      <span className={`px-2.5 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${value ? "bg-green-500/20 text-green-400 border border-green-500/20" : "bg-red-500/20 text-red-400 border border-red-500/20"}`}>
                        {value ? "Yes" : "No"}
                      </span>
                    ) : value === undefined || value === null || value === "" ? (
                      <span className="text-white/20 italic font-normal">Not provided</span>
                    ) : (
                      String(value)
                    )}
                  </div>
                </div>
              );
            };

            return (
              <div className="space-y-8 py-2">
                {personalGroup.length > 0 && (
                  <div className="space-y-4">
                    {regGroup.length > 0 && (
                      <h3 className="text-xs font-bold text-purple-400/60 uppercase tracking-widest pl-1">
                        Personal Details
                      </h3>
                    )}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {personalGroup.map(renderField)}
                    </div>
                  </div>
                )}
                
                {regGroup.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-purple-400/60 uppercase tracking-widest pl-1">
                      Registration Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {regGroup.map(renderField)}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </Card>
  );
}

function getBadgeColor(status: string) {
  const s = String(status).toLowerCase();
  if (s === "pending" || s === "break") return "bg-purple-500/10 text-purple-500";
  if (s === "standard" || s === "talk" || s === "general") return "bg-blue-500/10 text-blue-500";
  if (s === "vip" || s === "keynote" || s === "sponsor") return "bg-purple-500/10 text-purple-500";
  if (s === "workshop" || s === "partner") return "bg-green-500/10 text-green-500";
  return "bg-white/10 text-white/60";
}

function GenericForm({ formType, createMutation }: { formType: string; createMutation: any }) {
  const create = useMutation(createMutation);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data: any = {};

    formData.forEach((value, key) => {
      if (value !== "") {
        data[key] = value;
      }
    });

    // Convert types for Convex
    if (data.quantity) data.quantity = Number(data.quantity);
    if (data.totalPrice) data.totalPrice = Number(data.totalPrice);

    // Checkbox handling for boolean fields
    if (formType === "team") {
      data.isApply = formData.get("isApply") === "on";
    }

    try {
      await create(data);
      toast.success("Added successfully");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      console.error(err);
      toast.error("Failed to add record");
    } finally {
      setLoading(false);
    }
  };

  const renderFields = () => {
    switch (formType) {
      case "agenda":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-white/40">Time (e.g. 09:00)</label>
              <Input name="time" required className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Duration</label>
              <Input name="duration" required className="bg-white/5 border-white/10" />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-xs text-white/40">Title</label>
              <Input name="title" required className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Tag</label>
              <select name="tag" className="w-full bg-white/5 border border-white/10 rounded-md h-10 px-3 text-sm outline-none focus:border-purple-500/50">
                <option value="Talk">Talk</option>
                <option value="Keynote">Keynote</option>
                <option value="Workshop">Workshop</option>
                <option value="Panel">Panel</option>
                <option value="Break">Break</option>
                <option value="Social">Social</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Track</label>
              <select name="track" className="w-full bg-white/5 border border-white/10 rounded-md h-10 px-3 text-sm outline-none focus:border-purple-500/50">
                <option value="General">General</option>
                <option value="AI & Autonomous Systems">AI & Autonomous Systems</option>
                <option value="Venture & Digital Business">Venture & Digital Business</option>
                <option value="Climate Tech & SDGs">Climate Tech & SDGs</option>
                <option value="Health & Bio-Innovation">Health & Bio-Innovation</option>
                <option value="Women Building the Future">Women Building the Future</option>
                <option value="Skills for Tomorrow">Skills for Tomorrow</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Speaker Name (Who)</label>
              <Input name="who" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Speaker Image URL</label>
              <Input name="img" className="bg-white/5 border-white/10" />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-xs text-white/40">Description</label>
              <Input name="description" required className="bg-white/5 border-white/10" />
            </div>
          </div>
        );
      case "sponsor":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2">
              <label className="text-xs text-white/40">Name</label>
              <Input name="name" required className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Icon URL</label>
              <Input name="icon" required className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Tier</label>
              <select name="tier" className="w-full bg-white/5 border border-white/10 rounded-md h-10 px-3 text-sm outline-none focus:border-purple-500/50">
                <option value="sponsor">Sponsor</option>
                <option value="partner">Partner</option>
              </select>
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-xs text-white/40">URL</label>
              <Input name="url" className="bg-white/5 border-white/10" />
            </div>
          </div>
        );
      case "speaker":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-white/40">Name</label>
              <Input name="name" required className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Title/Role</label>
              <Input name="title" required className="bg-white/5 border-white/10" />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-xs text-white/40">Topic</label>
              <Input name="topic" required className="bg-white/5 border-white/10" />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-xs text-white/40">Image URL</label>
              <Input name="img" required className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">LinkedIn</label>
              <Input name="linkedin" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Twitter</label>
              <Input name="twitter" className="bg-white/5 border-white/10" />
            </div>
          </div>
        );
      case "team":
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs text-white/40">Name</label>
              <Input name="name" required className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Role</label>
              <Input name="role" required className="bg-white/5 border-white/10" />
            </div>
            <div className="col-span-2 space-y-2">
              <label className="text-xs text-white/40">Bio</label>
              <textarea
                name="bio"
                required
                className="w-full min-h-[100px] rounded-md bg-white/5 border border-white/10 p-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Image URL</label>
              <Input name="img" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2 flex items-center gap-2 pt-6">
              <input type="checkbox" name="isApply" id="isApply" className="w-4 h-4" />
              <label htmlFor="isApply" className="text-sm text-white/60">Is Applicant?</label>
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">LinkedIn</label>
              <Input name="linkedin" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Twitter</label>
              <Input name="twitter" className="bg-white/5 border-white/10" />
            </div>
            <div className="space-y-2">
              <label className="text-xs text-white/40">Email (Optional)</label>
              <Input name="email" type="email" className="bg-white/5 border-white/10" />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pt-4">
      {renderFields()}
      <Button
        type="submit"
        disabled={loading}
        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 text-lg font-bold rounded-xl"
      >
        {loading ? "Adding..." : "Confirm & Save"}
      </Button>
    </form>
  );
}

function PaymentProofViewer({ storageId }: { storageId: string }) {
  const url = useQuery(api.registrations.getFileUrl, { storageId: storageId as any });
  const [imgError, setImgError] = useState(false);
  
  if (url === undefined) {
    return (
      <div className="text-white/40 text-xs animate-pulse mt-2 flex items-center gap-2">
        <div className="w-3 h-3 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" /> 
        Loading file...
      </div>
    );
  }
  
  if (url === null) {
    return <div className="text-red-400 text-xs mt-2">File not found</div>;
  }

  return (
    <div className="mt-3 space-y-3">
      <div className="relative rounded-xl overflow-hidden border border-white/10 bg-black/40 aspect-video flex items-center justify-center">
        {!imgError ? (
          <img 
            src={url} 
            alt="Payment Proof" 
            className="w-full h-full object-contain"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-white/40 gap-3 p-8 text-center">
            <FileText className="w-12 h-12 opacity-50 text-blue-400" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/60">Document File</span>
            <span className="text-[10px] text-white/40">File might be a PDF or unsupported image format. Please download to view.</span>
          </div>
        )}
      </div>
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="inline-flex items-center justify-center w-full gap-2 text-sm font-bold text-white hover:text-white bg-purple-600 hover:bg-purple-500 px-4 py-3 rounded-xl transition-all duration-300 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)]"
      >
        <FileText className="w-4 h-4" />
        View / Download Full File
      </a>
    </div>
  );
}
