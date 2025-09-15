import Header from '@/components/header';
import { IssueMap } from '@/components/issue-map';

export default function MapPage() {
  return (
    <div className="flex h-full flex-1 flex-col">
      <Header pageTitle="Issue Map" />
      <main className="flex-1">
        <IssueMap />
      </main>
    </div>
  );
}
