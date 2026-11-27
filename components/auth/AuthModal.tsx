'use client';

import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  KeyRound,
  Mail,
  Phone,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Sparkles,
  User,
  Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useDashboardStore } from '@/lib/store';
import type { UserProfile, UserRole } from '@/types';

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  defaultRole?: UserRole;
}

export function AuthModal({ open, onOpenChange, defaultRole }: AuthModalProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { userRole, setUserRole, userProfile, setUserProfile, setIsAuthenticated, showToast } =
    useDashboardStore();

  const [activeRole, setActiveRole] = useState<UserRole>(defaultRole || userRole);

  // Form Fields - Government
  const [govName, setGovName] = useState(userProfile?.role === 'government' ? userProfile.name : 'Dr. Rajesh Verma');
  const [govEmail, setGovEmail] = useState(userProfile?.role === 'government' ? userProfile.email : 'r.verma@mcd.gov.in');
  const [govDepartment, setGovDepartment] = useState('Municipal Corporation of Delhi (MCD) · Urban Resilience Cell');
  const [govOfficerId, setGovOfficerId] = useState('MCD-URC-7491');
  const [govPasscode, setGovPasscode] = useState('MCD-2026');

  // Form Fields - Citizen
  const [citizenName, setCitizenName] = useState(userProfile?.role === 'citizen' ? userProfile.name : 'Priya Sundaram');
  const [citizenPhone, setCitizenPhone] = useState('+91 98712 34567');
  const [citizenWard, setCitizenWard] = useState('Ward 24 - Dwarka Sector 12, New Delhi');
  const [citizenOtp, setCitizenOtp] = useState('492018');
  const [otpSent, setOtpSent] = useState(false);

  // Form Fields - Researcher
  const [researcherName, setResearcherName] = useState(userProfile?.role === 'researcher' ? userProfile.name : 'Prof. A. Sengupta');
  const [researcherEmail, setResearcherEmail] = useState(userProfile?.role === 'researcher' ? userProfile.email : 'asengupta@iitd.ac.in');
  const [researcherInstitution, setResearcherInstitution] = useState('Centre for Atmospheric Sciences, IIT Delhi');
  const [researcherScholarId, setResearcherScholarId] = useState('IITD-CAS-2026');

  // Validation Error State
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (defaultRole) {
      setActiveRole(defaultRole);
    }
  }, [defaultRole]);

  const handleSendOtp = () => {
    setOtpSent(true);
    setCitizenOtp('492018');
    showToast('📱 SMS OTP Sent: 492018 (Auto-filled for demo)', 'info');
  };

  const handleFillDemoGovt = () => {
    setGovName('Dr. Rajesh Verma');
    setGovEmail('r.verma@mcd.gov.in');
    setGovDepartment('Municipal Corporation of Delhi (MCD) · Urban Resilience Cell');
    setGovOfficerId('MCD-URC-7491');
    setGovPasscode('MCD-2026');
    setErrorMessage(null);
  };

  const handleFillDemoCitizen = () => {
    setCitizenName('Priya Sundaram');
    setCitizenPhone('+91 98712 34567');
    setCitizenWard('Ward 24 - Dwarka Sector 12, New Delhi');
    setCitizenOtp('492018');
    setErrorMessage(null);
  };

  const handleFillDemoResearcher = () => {
    setResearcherName('Prof. A. Sengupta');
    setResearcherEmail('asengupta@iitd.ac.in');
    setResearcherInstitution('Centre for Atmospheric Sciences, IIT Delhi');
    setResearcherScholarId('IITD-CAS-2026');
    setErrorMessage(null);
  };

  const handleVerifyAndSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (activeRole === 'government') {
      // 1. Verify Government Domain
      const emailLower = govEmail.trim().toLowerCase();
      const validGovDomains = ['.gov.in', '.nic.in', '.gov', '@mcd.gov.in', '@bbmp.gov.in', '@smartcities.gov.in', '@delhi.gov.in'];
      const isGovDomain = validGovDomains.some((d) => emailLower.includes(d));

      if (!isGovDomain) {
        setErrorMessage(
          'Access Denied: Government Portal requires an official departmental domain email ending in .gov.in, .nic.in, or @mcd.gov.in',
        );
        return;
      }

      if (!govOfficerId.trim()) {
        setErrorMessage('Please enter your Municipal Officer Service ID / Employee Code.');
        return;
      }

      if (!govPasscode.trim()) {
        setErrorMessage('Please enter your Municipal Department Authorization Passcode.');
        return;
      }

      const verifiedProfile: UserProfile = {
        name: govName.trim(),
        email: govEmail.trim(),
        role: 'government',
        organization: govDepartment.trim(),
        department: 'Urban Resilience Cell (URC)',
        officerId: govOfficerId.trim(),
        badge: `🏛️ Verified MCD Officer (${govOfficerId.trim()})`,
        verified: true,
      };

      setUserRole('government');
      setUserProfile(verifiedProfile);
      setIsAuthenticated(true);
      showToast(`🏛️ Municipal Clearance Granted: ${verifiedProfile.name} (${verifiedProfile.officerId})`, 'success');
      onOpenChange(false);
      if (pathname === '/') router.push('/dashboard');
      return;
    }

    if (activeRole === 'citizen') {
      if (!citizenName.trim()) {
        setErrorMessage('Please provide your full resident name.');
        return;
      }
      if (!citizenPhone.trim() || citizenPhone.trim().length < 8) {
        setErrorMessage('Please provide a valid 10-digit mobile number.');
        return;
      }
      if (!citizenOtp.trim()) {
        setErrorMessage('Please enter the 6-digit SMS OTP verification code.');
        return;
      }

      const verifiedProfile: UserProfile = {
        name: citizenName.trim(),
        email: `${citizenName.toLowerCase().replace(/\s+/g, '.')}@citizen.climora.in`,
        role: 'citizen',
        organization: citizenWard.trim(),
        department: 'Resident Community Action Group',
        officerId: `RES-${Math.floor(1000 + Math.random() * 9000)}`,
        badge: `👥 Verified Resident (${citizenWard.split('-')[0].trim()})`,
        verified: true,
      };

      setUserRole('citizen');
      setUserProfile(verifiedProfile);
      setIsAuthenticated(true);
      showToast(`👥 Resident Verified: ${verifiedProfile.name} (${verifiedProfile.badge})`, 'success');
      onOpenChange(false);
      if (pathname === '/') router.push('/dashboard');
      return;
    }

    if (activeRole === 'researcher') {
      const emailLower = researcherEmail.trim().toLowerCase();
      const isAcademic = emailLower.includes('.ac.in') || emailLower.includes('.edu') || emailLower.includes('.res.in') || emailLower.includes('iit');

      if (!isAcademic) {
        setErrorMessage(
          'Access Denied: Climate Telemetry Researcher access requires an academic/institutional email (.ac.in, .edu, etc.).',
        );
        return;
      }

      const verifiedProfile: UserProfile = {
        name: researcherName.trim(),
        email: researcherEmail.trim(),
        role: 'researcher',
        organization: researcherInstitution.trim(),
        department: 'Atmospheric Physics & Telemetry Lab',
        officerId: researcherScholarId.trim(),
        badge: `🔬 Verified Scholar (${researcherScholarId.trim()})`,
        verified: true,
      };

      setUserRole('researcher');
      setUserProfile(verifiedProfile);
      setIsAuthenticated(true);
      showToast(`🔬 Academic Clearance: ${verifiedProfile.name} (${researcherScholarId.trim()})`, 'success');
      onOpenChange(false);
      if (pathname === '/') router.push('/dashboard');
      return;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-gray-950 border border-gray-800 text-gray-100 p-5 sm:p-6 font-alliance max-h-[90vh] overflow-y-auto">
        <DialogHeader className="pb-3 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-lg sm:text-xl font-bold flex items-center gap-2 text-white">
              <ShieldCheck className="h-5 w-5 text-emerald-400" />
              Role Authentication & Verification
            </DialogTitle>
            <Badge variant="outline" className="text-[10px] border-emerald-500/40 text-emerald-400 uppercase">
              Identity Gate
            </Badge>
          </div>
          <DialogDescription className="text-xs text-gray-400 mt-1">
            To ensure legitimate access, verify your identity with authorized departmental or resident credentials:
          </DialogDescription>
        </DialogHeader>

        {/* Role Selector Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-gray-900 rounded-xl border border-gray-800 my-3">
          <button
            type="button"
            onClick={() => {
              setActiveRole('government');
              setErrorMessage(null);
            }}
            className={`py-2 px-1.5 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeRole === 'government'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Building2 className="h-4 w-4" />
            <span>🏛️ Municipal</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRole('citizen');
              setErrorMessage(null);
            }}
            className={`py-2 px-1.5 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeRole === 'citizen'
                ? 'bg-sky-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users className="h-4 w-4" />
            <span>👥 Citizen</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveRole('researcher');
              setErrorMessage(null);
            }}
            className={`py-2 px-1.5 rounded-lg text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
              activeRole === 'researcher'
                ? 'bg-purple-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <User className="h-4 w-4" />
            <span>🔬 Researcher</span>
          </button>
        </div>

        {/* Inline Error Message */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-red-950/80 border border-red-500/60 text-red-200 text-xs flex items-start gap-2 animate-in fade-in">
            <AlertTriangle className="h-4 w-4 text-red-400 shrink-0 mt-0.5" />
            <span className="leading-snug">{errorMessage}</span>
          </div>
        )}

        {/* Form Body for Current Role */}
        <form onSubmit={handleVerifyAndSubmit} className="space-y-3.5">
          {activeRole === 'government' && (
            <div className="space-y-3 rounded-xl p-3.5 bg-emerald-950/20 border border-emerald-500/30">
              <div className="flex items-center justify-between pb-1 border-b border-emerald-500/20">
                <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" />
                  Official Municipal Credentials
                </span>
                <button
                  type="button"
                  onClick={handleFillDemoGovt}
                  className="text-[10px] text-emerald-300 hover:text-white underline cursor-pointer"
                >
                  Insert Demo Clearance
                </button>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Officer Full Name
                </label>
                <input
                  type="text"
                  required
                  value={govName}
                  onChange={(e) => setGovName(e.target.value)}
                  placeholder="e.g. Dr. Rajesh Verma"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Official Government Domain Email <span className="text-emerald-400">(*.gov.in / *.nic.in)</span>
                </label>
                <div className="relative">
                  <Mail className="h-3.5 w-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={govEmail}
                    onChange={(e) => setGovEmail(e.target.value)}
                    placeholder="officer@mcd.gov.in"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">Must be an official government or municipal domain.</p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Officer Service ID / Code
                  </label>
                  <input
                    type="text"
                    required
                    value={govOfficerId}
                    onChange={(e) => setGovOfficerId(e.target.value)}
                    placeholder="MCD-URC-7491"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Municipal Passcode
                  </label>
                  <div className="relative">
                    <KeyRound className="h-3.5 w-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      required
                      value={govPasscode}
                      onChange={(e) => setGovPasscode(e.target.value)}
                      placeholder="MCD-2026"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Department / Authority
                </label>
                <input
                  type="text"
                  required
                  value={govDepartment}
                  onChange={(e) => setGovDepartment(e.target.value)}
                  placeholder="Municipal Corporation of Delhi · Urban Resilience Cell"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>
            </div>
          )}

          {activeRole === 'citizen' && (
            <div className="space-y-3 rounded-xl p-3.5 bg-sky-950/20 border border-sky-500/30">
              <div className="flex items-center justify-between pb-1 border-b border-sky-500/20">
                <span className="text-[11px] font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  Resident Community Verification
                </span>
                <button
                  type="button"
                  onClick={handleFillDemoCitizen}
                  className="text-[10px] text-sky-300 hover:text-white underline cursor-pointer"
                >
                  Insert Demo Resident
                </button>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Resident Full Name
                </label>
                <input
                  type="text"
                  required
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder="Priya Sundaram"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Residential Ward & Locality
                </label>
                <input
                  type="text"
                  required
                  value={citizenWard}
                  onChange={(e) => setCitizenWard(e.target.value)}
                  placeholder="Ward 24 - Dwarka Sector 12, New Delhi"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Mobile Number (SMS OTP Verification)
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Phone className="h-3.5 w-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      required
                      value={citizenPhone}
                      onChange={(e) => setCitizenPhone(e.target.value)}
                      placeholder="+91 98712 34567"
                      className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className="px-3 py-1.5 rounded-lg bg-sky-700 hover:bg-sky-600 text-white text-xs font-semibold shrink-0 cursor-pointer"
                  >
                    {otpSent ? 'Resend' : 'Send Code'}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  6-Digit SMS Verification OTP
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={citizenOtp}
                  onChange={(e) => setCitizenOtp(e.target.value)}
                  placeholder="492018"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-sky-500 font-mono tracking-widest text-center"
                />
                <p className="text-[10px] text-gray-400 mt-1 text-center">Demo OTP is 492018</p>
              </div>
            </div>
          )}

          {activeRole === 'researcher' && (
            <div className="space-y-3 rounded-xl p-3.5 bg-purple-950/20 border border-purple-500/30">
              <div className="flex items-center justify-between pb-1 border-b border-purple-500/20">
                <span className="text-[11px] font-bold text-purple-400 uppercase tracking-wider flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  Academic Researcher Credentials
                </span>
                <button
                  type="button"
                  onClick={handleFillDemoResearcher}
                  className="text-[10px] text-purple-300 hover:text-white underline cursor-pointer"
                >
                  Insert Demo Academic
                </button>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Scientist / Scholar Full Name
                </label>
                <input
                  type="text"
                  required
                  value={researcherName}
                  onChange={(e) => setResearcherName(e.target.value)}
                  placeholder="Prof. A. Sengupta"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                  Institutional Email <span className="text-purple-400">(*.ac.in / *.edu)</span>
                </label>
                <input
                  type="email"
                  required
                  value={researcherEmail}
                  onChange={(e) => setResearcherEmail(e.target.value)}
                  placeholder="asengupta@iitd.ac.in"
                  className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    University / Lab
                  </label>
                  <input
                    type="text"
                    required
                    value={researcherInstitution}
                    onChange={(e) => setResearcherInstitution(e.target.value)}
                    placeholder="IIT Delhi"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-300 block mb-1">
                    Scholar ID
                  </label>
                  <input
                    type="text"
                    required
                    value={researcherScholarId}
                    onChange={(e) => setResearcherScholarId(e.target.value)}
                    placeholder="IITD-CAS-2026"
                    className="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-2 pt-2 border-t border-gray-800">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-700 text-gray-300 hover:bg-gray-800 text-xs"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className={`text-xs font-bold text-white shadow-lg cursor-pointer ${
                activeRole === 'government'
                  ? 'bg-emerald-600 hover:bg-emerald-500'
                  : activeRole === 'citizen'
                    ? 'bg-sky-600 hover:bg-sky-500'
                    : 'bg-purple-600 hover:bg-purple-500'
              }`}
            >
              Verify Credentials & Unlock Portal →
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
