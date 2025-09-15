'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Issue } from '@/types';
import { issues as initialIssues } from '@/lib/data';

interface IssuesContextType {
  issues: Issue[];
  addIssue: (issue: Issue) => void;
}

const IssuesContext = createContext<IssuesContextType | undefined>(undefined);

export function IssuesProvider({ children }: { children: ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);

  const addIssue = (issue: Issue) => {
    setIssues((prevIssues) => [issue, ...prevIssues]);
  };

  return (
    <IssuesContext.Provider value={{ issues, addIssue }}>
      {children}
    </IssuesContext.Provider>
  );
}

export function useIssues() {
  const context = useContext(IssuesContext);
  if (context === undefined) {
    throw new Error('useIssues must be used within an IssuesProvider');
  }
  return context;
}
