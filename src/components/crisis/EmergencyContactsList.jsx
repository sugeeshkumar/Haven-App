import React from 'react';
import { useRecovery } from '../../context/RecoveryContext';
import { PhoneCall, ShieldAlert, Heart } from 'lucide-react';

export function EmergencyContactsList() {
  const { emergencyContacts } = useRecovery();

  return (
    <div className="glass-card rounded-3xl p-5 border border-rose-500/20 my-4 bg-rose-950/10">
      <h4 className="font-display font-semibold text-sm text-rose-300 mb-3 flex items-center gap-2">
        <ShieldAlert className="w-4 h-4 text-rose-400" />
        <span>1-Tap Helpline & Emergency Contacts</span>
      </h4>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {emergencyContacts.map((contact, idx) => (
          <a
            key={idx}
            href={`tel:${contact.phone}`}
            className="p-3 rounded-2xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-white transition-all flex items-center justify-between group active:scale-95"
          >
            <div>
              <div className="font-semibold text-xs text-rose-200">{contact.name}</div>
              <div className="text-[10px] text-slate-400">{contact.category} • {contact.phone}</div>
            </div>
            <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-rose-500/30">
              <PhoneCall className="w-4 h-4" />
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
