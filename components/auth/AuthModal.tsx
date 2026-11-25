'use client';

import { Building2, CheckCircle2, Shield, User, Users } from 'lucide-react';
import { useState } from 'react';
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
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const { userRole, setUserRole, userProfile, setUserProfile, setIsAuthenticated } =
    useDashboardStore();

  const [selectedRole, setSelectedRole] = useState<UserRole>(userRole);
  const [name, setName] = useState(userProfile?.name || 'Aditi Sharma');
  const [org, setOrg] = useState(userProfile?.organization || 'Municipal Corporation of Delhi (MCD)');

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'government') {
      setName('Dr. Rajesh Verma');
      setOrg('Municipal Corporation of Delhi (MCD) - Urban Climate Cell');
    } else if (role === 'citizen') {
      setName('Priya Sundaram');
      setOrg('Citizen Community Member (Ward 24)');
    } else {
      setName('Prof. A. Sengupta');
      setOrg('Center for Atmospheric Sciences, IIT Delhi');
    }
  };

  const handleSave = () => {
    const updatedProfile: UserProfile = {
      name,
      email:
        selectedRole === 'government'
          ? 'r.verma@mcd.gov.in'
          : selectedRole === 'citizen'
            ? 'priya.s@gmail.com'
            : 'asengupta@iitd.ac.in',
      role: selectedRole,
      organization: org,
      department:
        selectedRole === 'government'
          ? 'Urban Resilience & Environment Cell'
          : selectedRole === 'citizen'
            ? 'Resident Action Group'
            : 'Climate Research Lab',
      verified: true,
    };

    setUserRole(selectedRole);
    setUserProfile(updatedProfile);
    setIsAuthenticated(true);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-gray-950 border-gray-800 text-gray-100 p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2 text-white">
            <Shield className="h-5 w-5 text-emerald-400" />
            Climora Identity & Access
          </DialogTitle>
          <DialogDescription className="text-gray-400 text-xs">
            Select your organization role to customize heat intelligence tools, approvals, and data access.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-3">
          {/* Role selector cards */}
          <div className="grid grid-cols-1 gap-2.5">
            {/* Government */}
            <button
              type="button"
              onClick={() => handleRoleSelect('government')}
              className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                selectedRole === 'government'
                  ? 'border-emerald-500 bg-emerald-950/40 text-white ring-1 ring-emerald-500'
                  : 'border-gray-800 bg-gray-900/60 text-gray-300 hover:border-gray-700'
              }`}
            >
              <div className="rounded-md bg-emerald-500/20 p-2 text-emerald-400 shrink-0 mt-0.5">
                <Building2 className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Government / Municipal Authority</span>
                  {selectedRole === 'government' && (
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Access mitigation approval, budget allocation, municipal reports, and heat action policy.
                </p>
              </div>
            </button>

            {/* Citizen */}
            <button
              type="button"
              onClick={() => handleRoleSelect('citizen')}
              className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                selectedRole === 'citizen'
                  ? 'border-sky-500 bg-sky-950/40 text-white ring-1 ring-sky-500'
                  : 'border-gray-800 bg-gray-900/60 text-gray-300 hover:border-gray-700'
              }`}
            >
              <div className="rounded-md bg-sky-500/20 p-2 text-sky-400 shrink-0 mt-0.5">
                <Users className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Citizen / Community Member</span>
                  {selectedRole === 'citizen' && (
                    <CheckCircle2 className="h-4 w-4 text-sky-400" />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Report neighbourhood hotspots, find public cooling centers, and volunteer for green initiatives.
                </p>
              </div>
            </button>

            {/* Researcher */}
            <button
              type="button"
              onClick={() => handleRoleSelect('researcher')}
              className={`flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                selectedRole === 'researcher'
                  ? 'border-purple-500 bg-purple-950/40 text-white ring-1 ring-purple-500'
                  : 'border-gray-800 bg-gray-900/60 text-gray-300 hover:border-gray-700'
              }`}
            >
              <div className="rounded-md bg-purple-500/20 p-2 text-purple-400 shrink-0 mt-0.5">
                <User className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm">Climate Researcher / Academic</span>
                  {selectedRole === 'researcher' && (
                    <CheckCircle2 className="h-4 w-4 text-purple-400" />
                  )}
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Raw NASA telemetry, satellite NDVI parameters, and microclimate algorithmic data.
                </p>
              </div>
            </button>
          </div>

          {/* User Details */}
          <div className="space-y-3 pt-2 border-t border-gray-800">
            <div>
              <label className="text-xs font-medium text-gray-300 block mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-300 block mb-1">
                Organization / Department
              </label>
              <input
                type="text"
                value={org}
                onChange={(e) => setOrg(e.target.value)}
                className="w-full bg-gray-900 border border-gray-700 rounded-md px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
          >
            Confirm & Apply Access
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
