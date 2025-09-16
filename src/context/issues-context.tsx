/**
 * @license
 * Copyright 2024 Neural Nomads
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { Issue, IssueStatus } from '@/types';
import { issues as initialIssues } from '@/lib/data';

interface IssuesContextType {
  issues: Issue[];
  addIssue: (issue: Issue) => void;
  updateIssueStatus: (issueId: string, status: IssueStatus) => void;
}

const IssuesContext = createContext<IssuesContextType | undefined>(undefined);

export function IssuesProvider({ children }: { children: ReactNode }) {
  const [issues, setIssues] = useState<Issue[]>(initialIssues);

  const addIssue = (issue: Issue) => {
    setIssues((prevIssues) => [issue, ...prevIssues]);
  };

  const updateIssueStatus = (issueId: string, status: IssueStatus) => {
    setIssues((prevIssues) =>
      prevIssues.map((issue) =>
        issue.id === issueId ? { ...issue, status } : issue
      )
    );
  };

  return (
    <IssuesContext.Provider value={{ issues, addIssue, updateIssueStatus }}>
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
